import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../utils/Context";
import {BooleanResolver, CallbackResolver, NumberResolver, QueryResolver} from "../resolvers/Resolver";
import {getSessionStorage} from "../utils";
import {Query} from "../query";

type RedirectKpiCollectorParams = {
	resultCountResolver?: NumberResolver
	collectors?: Array<AbstractCollector>,
	queryResolver?: QueryResolver,
}

/**
 * Keep track of human triggered searches followed by a redirect to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	private static STORAGE_KEY = "__lastSearch";

	private readonly resultCountResolver: NumberResolver;
	private readonly collectors: Array<AbstractCollector>;
	private readonly queryResolver: QueryResolver | ((phrase) => Query);

	/**
	 * Construct redirect collector
	 *
	 * @constructor
	 * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
	 * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
	 * @param redirectKpiParams - Parameters for collecting KPI's after a redirect
	 * @param context
	 */
	constructor(private readonly triggerResolver: CallbackResolver,
							private readonly expectedPageResolver: BooleanResolver,
							private readonly redirectKpiParams: RedirectKpiCollectorParams = {},
							context?: Context) {
		super("redirect", context);
		this.triggerResolver = triggerResolver;
		this.expectedPageResolver = expectedPageResolver;

		this.collectors = redirectKpiParams.collectors || [];
		this.resultCountResolver = redirectKpiParams.resultCountResolver || (_ => void 0);
		this.queryResolver = redirectKpiParams.queryResolver || ((phrase) => {
			const query = new Query();
			query.setSearch(phrase);
			return query;
		});
	}

	public setContext(context: Context) {
		super.setContext(context);
		this.collectors.forEach(collector => collector.setContext(context));
	}

	/**
	 * Check whether we should be recording a redirect event
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		this.resolve(this.triggerResolver, log, keyword => {
			getSessionStorage().setItem(RedirectCollector.STORAGE_KEY, keyword);
		});

		// Fetch the latest search if any
		const lastSearch = getSessionStorage().getItem(RedirectCollector.STORAGE_KEY);
		if (lastSearch) {
			// Remove the search action, as we're either on a search result page or we've redirected
			getSessionStorage().removeItem(RedirectCollector.STORAGE_KEY);

			if (shouldTrackRedirect(document.referrer)) {
				// If we have not landed on the expected search page, it must have been (looove) a redirect
				if (!this.resolve(this.expectedPageResolver, log)) {
					// Thus record the redirect
					const query = this.queryResolver(lastSearch)

					writer.write({
						type: "redirect",
						keywords: lastSearch,
						query: query.toString(),
						url: window.location.href,
						resultCount: this.resolve(this.resultCountResolver, log)
					});

					// attach all collectors which are responsible to gather kpi's after the redirect
					this.collectors.forEach(collector => collector.attach({
						write(data) {
							writer.write({...data, query: query.toString()});
						}
					}, log));
				}
			}
		}
	}
}


function shouldTrackRedirect(referer: string) {
	if (referer) {
		try {
			const refUrl = new URL(referer);
			const currentUrl = new URL(window.location.href);
			if (currentUrl.origin && refUrl.origin)
				return refUrl.origin === currentUrl.origin;
		} catch (e) {
			console.error(e);
		}
	}

	return true;
}
