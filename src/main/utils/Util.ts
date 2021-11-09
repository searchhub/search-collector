let localStorageState = {};

export const Util = {
	/**
	 * Parse the browser query string or the passed string into a javascript object
	 * with keys the query parameter names and values the corresponding values.
	 *
	 * @param {string} q - the query string to parse, window.location.search if not available
	 * @return {object}
	 */
	parseQueryString: (q = window.location.search.substring(1)) => {
		const string = decodeURIComponent(q);

		const queryString = {};
		string.replace(
			new RegExp("([^?=&]+)(=([^&]*))?", "g"),
			//TODO ts unknown overload?
			//@ts-ignore
			function ($0, $1, $2, $3) {
				queryString[$1] = $3;
			}
		);

		return queryString;
	},

	//TODO maybe its worth implementing a localStorage mock which relies on cookies or something similar to track state across page reloads
	/**
	 * Some browser like Safari prevent accessing localStorage in private mode by throwing exceptions.
	 * Use this method to retrieve a mock impl which will at least prevent errors.
	 */
	getLocalStorage: (): Storage => {
		return localStorage || {
			getItem(key: string) {
				return localStorageState[key] || null;
			},
			setItem(key: string, value: string) {
				localStorageState[key] = value;
			},
			removeItem(key: string) {
				delete localStorageState[key];
			},
			clear() {
				localStorageState = {};
			},
			key(n: number) {
				const keys = Object.keys(localStorageState);
				if (n > keys.length - 1)
					return null;

				return keys[n];
			},
			get length() {
				return Object.keys(localStorageState).length;
			}
		};
	},

	setCookie(name, value, ttlMinutes): void {
		let expires = "";

		if (ttlMinutes) {
			const date = new Date();
			date.setTime(date.getTime() + (ttlMinutes * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}

		// Handle the upcoming forced switch to SameSite & Secure params https://www.chromestatus.com/feature/5633521622188032
		// Since this is a generic library, we can't restrict the domain under which it's beeing served, thus not setting domain
		// for the cookie. It's usually loaded and subsequently requested from a third-party domain, thus we need to specify SameSite=None which
		// per the latest specifications requires the Secure attribute.
		//
		// To allow local debugging, we won't set these when loaded on localhost. Note, after this change, you won't be able to serve
		// the collector to real clients over non-https connections - the session cookies won't match
		const sameSite = window.location.hostname === "localhost" ? "" : "; SameSite=None; Secure";

		document.cookie = name + "=" + (value || "") + expires + "; path=/" + sameSite;
	},

	getCookie(cname: string): string | "" {
		const name = cname + "=";
		const decodedCookie = decodeURIComponent(document.cookie);

		const ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}

			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},

	generateId() {
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let text = "";
		for (let i = 0; i < 7; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}
