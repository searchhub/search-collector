import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../utils/Context";
import {BooleanResolver, CallbackResolver} from "../resolvers/Resolver";
import {getSessionStorage} from "../utils";
import {Query} from "../query";

/**
 * Keep track of human triggered searches followed by a redirect to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	private static STORAGE_KEY = "__lastSearch";

	private readonly triggerResolver: CallbackResolver;
	private readonly expectedPageResolver: BooleanResolver;

	/**
	 * Construct redirect collector
	 *
	 * @constructor
	 * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
	 * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
	 * @param context
	 */
	constructor(triggerResolver: CallbackResolver, expectedPageResolver: BooleanResolver, context?: Context) {
		super("redirect", context);
		this.triggerResolver = triggerResolver;
		this.expectedPageResolver = expectedPageResolver;
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
					const query = new Query();
					query.setSearch(lastSearch);

					writer.write({
						type: "redirect",
						keywords: lastSearch,
						query: query.toString(),
						url: window.location.href
					});
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
