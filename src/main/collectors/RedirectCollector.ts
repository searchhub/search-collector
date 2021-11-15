import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../utils/Context";
import {BooleanResolver, CallbackResolver} from "../resolvers/Resolver";

/**
 * Keep track of human triggered searches followed by a redirec to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	private static STORAGE_KEY = "__lastSearch";

	private readonly triggerResolver: CallbackResolver;
	private readonly expectedPageResolver: BooleanResolver;

	/**
	 * Construct search result collector
	 *
	 * @constructor
	 * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
	 * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
	 * @param context
	 */
	constructor(triggerResolver: CallbackResolver, expectedPageResolver: BooleanResolver, context?: Context) {
		super("search", context);
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
		const win = this.context.getWindow();

		this.resolve(this.triggerResolver, log, keyword => {
			win.sessionStorage.setItem(RedirectCollector.STORAGE_KEY, keyword);
		});

		// Fetch the latest search if any
		const lastSearch = win.sessionStorage.getItem(RedirectCollector.STORAGE_KEY);
		if (lastSearch) {
			// Remove the search action, as we're either on a search result page or we've redirected
			win.sessionStorage.removeItem(RedirectCollector.STORAGE_KEY);

			// If we have not landed on the expected search page, it must have been (looove) a redirect
			if (!this.resolve(this.expectedPageResolver, log)) {
				// Thus record the redirect
				writer.write({
					"type": "redirect",
					"keywords": lastSearch
				});
			}
		}
	}
}