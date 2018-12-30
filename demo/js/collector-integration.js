window.addEventListener("load", function() {

  // React on "filter" events sent by js/main.js to keep a query state
  var queryState = {};
  window.addEventListener("filter", e => {
    if (e.detail.search) {
      queryState.search = e.detail.search;
      queryState.count = e.detail.count;
    }

    queryState.filter = e.detail.filter || undefined;
  });

  var queryResolver = () => {
      var q = new SearchCollector.Query();

      if (queryState.search) {
        q.addSelection("$s", "=", queryState.search);
      }

      if (queryState.filter) {
        let split = queryState.filter.split("=");
        q.addSelection(split[0], "=", split[1]);
      }

      return q.toString();
  };

  var collector = new SearchCollector.Collector({
    "sessionResolver" : new SearchCollector.CookieSessionResolver(),
    "queryResolver" : queryResolver,
    "endpoint" : "/collector",
    "debug" : true
  });

  collector.add(new SearchCollector.BrowserCollector());
  collector.add(new SearchCollector.FilterClickCollector(".facet", element => element.getAttribute("data-filter")));
  collector.add(new SearchCollector.SearchEventResultCollector("search"));
  collector.add(new SearchCollector.ProductClickCollector(".grid-item", {
      "idResolver" : element => element.getAttribute("id"),
      "positionResolver" : element => new SearchCollector.PositionResolver(".grid-item", element).get()
  }));
  collector.start();
});