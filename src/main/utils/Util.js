module.exports = {

  /**
   * Parse the browser query string or the passed string into a javascript object
   * with keys the query parameter names and values the corresponding values.
   *
   * @param {string} q - the query string to parse, window.location.search if not available
   * @return {object}
   */
  parseQueryString : function(q) {
      var string = q || window.location.search.substring(1);

      var queryString = {};
      string.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { queryString[$1] = $3; }
      );

      return queryString;
    }
}
