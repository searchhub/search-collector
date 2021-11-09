import {AbstractCollector} from "./AbstractCollector";
import {Context} from "../resolvers/Context";
import {BooleanResolver, CallbackResolver} from "../resolvers/Resolver";

/**
 * Keep track of human triggered searches followed by a redirec to a page different than the search result page
 */
export class RedirectCollector extends AbstractCollector {

	triggerResolver: CallbackResolver;
	expectedPageResolver: BooleanResolver;

	/**
	 * Construct search result collector
	 *
	 * @constructor
	 * @param {function} triggerResolver - Function that fires when a search happens, should return the keyword
	 * @param {function} expectedPageResolver - Function that should return whether the page we load is the expected one
	 */
	constructor(triggerResolver: CallbackResolver, expectedPageResolver: BooleanResolver, contextResolver?: Context) {
		super("search", contextResolver);
		this.triggerResolver = triggerResolver;
		this.expectedPageResolver = expectedPageResolver;
	}

	/**
	 * Check whether we should be recording a redirect event
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		const win = this.context.getWindow();

		this.triggerResolver(keyword => {
			win.sessionStorage.setItem("lastSearch", keyword);
		});

		// Fetch the latest search if any
		const lastSearch = win.sessionStorage.getItem("lastSearch");
		if (lastSearch) {
			// Remove the search action, as we're either on a search result page or we've redirected
			win.sessionStorage.removeItem("lastSearch");

			// If we have not landed on the expected search page, it must have been (looove) a redirect
			if (!this.expectedPageResolver()) {
				// Thus record the redirect
				writer.write({
					"type": "redirect",
					"keywords": lastSearch
				});
			}
		}
	}
}