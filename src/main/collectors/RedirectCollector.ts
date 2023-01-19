import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../utils/Context";
import {
	BooleanResolver,
	CallbackResolver,
	cookieSessionResolver,
	NumberResolver,
	StringResolver
} from "../resolvers/Resolver";
import {getSessionStorage} from "../utils";
import {Query, Trail, TrailType} from "../query";

export type RedirectKpiCollectorParams = {
	resultCountResolver?: NumberResolver
	collectors?: Array<AbstractCollector>,
	redirectTTLMillis?: number
}

/**
 * Keep track of human triggered searches followed by a redirect to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	private static STORAGE_KEY = "__lastSearch";
	private static PATH_STORAGE_KEY = "___pathStorage";

	private readonly resultCountResolver: NumberResolver;
	private readonly collectors: Array<AbstractCollector>;
	private readonly queryResolver: (phrase) => Query;
	private readonly sessionResolver: StringResolver;
	private readonly redirectTTL: number;
	private readonly redirectTrail: Trail;
	private isCollectorsAttached = false;

	/**
	 * Used to track if the trigger has been installed already in case attached is called multiple times
	 */
	private isTriggerInstalled = false;

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
		this.redirectTTL = this.redirectKpiParams.redirectTTLMillis || 86400000;

		this.queryResolver = (phrase) => {
			const query = new Query();
			query.setSearch(phrase);
			return query;
		};

		this.sessionResolver = () => cookieSessionResolver();

		this.redirectTrail = new Trail(() => {
			const pathInfo = RedirectCollector.getRedirectPathInfo(window.location.pathname);
			return new Query(pathInfo?.query);
		}, this.sessionResolver);
	}

	public setContext(context: Context) {
		super.setContext(context);
		this.collectors.forEach(collector => collector.setContext(context));
	}

	/**
	 * Marks this path as a redirect landing page.
	 * @param path the pathname e.g. /some-path
	 * @param query the query which lead to this path
	 * @private
	 */
	private static setRedirectPath(path: string, query: string) {
		const redirectPaths = this.getRedirectPaths();
		redirectPaths[path] = {
			query,
			timestamp: new Date().getTime()
		};

		getSessionStorage().setItem(RedirectCollector.PATH_STORAGE_KEY, JSON.stringify(redirectPaths));
	}

	/**
	 * Get all marked paths
	 * @private
	 */
	private static getRedirectPaths() {
		return JSON.parse(getSessionStorage().getItem(RedirectCollector.PATH_STORAGE_KEY) || "{}");
	}

	/**
	 * Retrieve data for the given path
	 * @param path
	 * @private
	 */
	private static getRedirectPathInfo(path: string) {
		return this.getRedirectPaths()[path];
	}

	/**
	 * Delete all expired redirect paths
	 * @private
	 */
	private expireRedirectPaths() {
		const redirectPaths = RedirectCollector.getRedirectPaths();
		const now = new Date().getTime();
		Object.keys(redirectPaths).forEach(path => {
			const pathInfo = redirectPaths[path];
			if (now - Number(pathInfo.timestamp) > this.redirectTTL) {
				delete redirectPaths[path];
			}
		});
		getSessionStorage().setItem(RedirectCollector.PATH_STORAGE_KEY, JSON.stringify(redirectPaths));
	}

	/**
	 * Check whether we should be recording a redirect event
	 *
	 * @param {object} writer - The writer to send the data to
	 * @param log
	 */
	attach(writer, log) {
		if (this.isTriggerInstalled === false) {
			this.resolve(this.triggerResolver, log, keyword => getSessionStorage().setItem(RedirectCollector.STORAGE_KEY, keyword));
			this.isTriggerInstalled = true;
		}

		this.expireRedirectPaths();

		// Fetch the latest search if any
		const lastSearch = getSessionStorage().getItem(RedirectCollector.STORAGE_KEY);

		if (lastSearch) {
			getSessionStorage().removeItem(RedirectCollector.STORAGE_KEY);

			// If we have not landed on the expected search page, it must have been a redirect
			if (shouldTrackRedirect(document.referrer) && !this.resolve(this.expectedPageResolver, log)) {
				const query = this.queryResolver(lastSearch).toString()
				writer.write({
					type: "redirect",
					keywords: lastSearch,
					query,
					url: window.location.href,
					resultCount: this.resolve(this.resultCountResolver, log)
				});

				// mark as redirect landing page
				RedirectCollector.setRedirectPath(window.location.pathname, query);
				// register a trail with the pathname for subsequent click events. See ProductClickCollector.ts
				this.redirectTrail.register(window.location.pathname, TrailType.Main, query);
			}
		}

		/**
		 * Check if we have tracked this path before and if it is still valid.
		 * If valid, we have to attach the KPI collectors to gather KPIs for this landing page.
		 * We have to do this because people can navigate away from the landing page and back again and we don't want to lose all subsequent clicks etc.
		 */
		const pathInfo = RedirectCollector.getRedirectPathInfo(this.getWindow().location.pathname);
		if (pathInfo && this.isCollectorsAttached !== true) {
			this.attachCollectors(writer, log, pathInfo.query);
			this.isCollectorsAttached = true;
		}
	}

	private attachCollectors(writer, log, query) {
		// attach all collectors which are responsible to gather kpi's after the redirect
		this.collectors.forEach(collector => {
			try {
				collector.attach({
					write(data) {
						writer.write({...data, query: data.query || query});
					}
				}, log)
			} catch (e) {
				if (log)
					log.error(e);
			}
		});
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
