import {Util} from "../utils/Util";

/**
 * Resolve the id of the current search session. A search session is defined as
 * limited time slice of search activity across multiple tabs. By default a session
 * would be considered expired after 30 min of inactivity.
 *
 * In case the resolver is constructed with a cookie name, the session lifecycle
 * will be governed by the lifecycle of that cookie. Otherwise the resolver will
 * set its own cookie.
 */
export class CookieSessionResolver {

	private readonly name: string;

	/**
	 * Construct a resolver with the provided cookie name. Note that for this to work,
	 * the cookie should be exposed to the domain the collector is loading from.
	 *
	 * @constructor
	 * @param {string} name - Document query selector identifying all elements from the search result
	 */
	constructor(name?: string) {
		this.name = name;
	}

	/**
	 * Resolve the current session
	 */
	get() {
		// In case the page already provides accessible cookie information
		if (this.name) {
			return Util.getCookie(this.name);
		} else {
			// Handle session information directly, session works across all tabs
			// and expires after 30 min of inactivity across all tabs
			const name = "SearchCollectorSession";

			const session = Util.getCookie(name) || Util.generateId();

			// Expire after 1 day of inactivity, we don't need our sessions
			// for security purpose, but to rather stitch search actions.
			Util.setCookie(name, session, 60 * 24);

			return session;
		}
	}
}