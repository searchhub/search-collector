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
	}
}
