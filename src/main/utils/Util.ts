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
	}
}
