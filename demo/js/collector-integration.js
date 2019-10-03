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

  var endpoint = "/collector";
  var sessionResolver = new SearchCollector.CookieSessionResolver();
  var trailResolver = new SearchCollector.Trail(queryResolver, sessionResolver, endpoint);
  var contextResolver = new SearchCollector.ContextResolver(window, window.document);

  var collector = new SearchCollector.Collector({
    "sessionResolver" : sessionResolver,
    "queryResolver" : queryResolver,
    "trailResolver" : trailResolver,
    "contextResolver" : contextResolver,
    "endpoint" : endpoint,
    "debug" : true,
    "recordUrl" : true,
    "recordReferrer" : true
  });

  collector.add(new SearchCollector.BrowserCollector());
  collector.add(new SearchCollector.FilterClickCollector(".facet", element => element.getAttribute("data-filter")));
  collector.add(new SearchCollector.SearchEventResultCollector("search"));
  collector.add(new SearchCollector.InstantSearchQueryCollector("#search-box"));
  collector.add(new SearchCollector.SuggestSearchCollector((writer, type, context) => {
    let element = context.getDocument().getElementById("suggestion");
    if (element) {
      element.addEventListener("click", e => {
        let words = element.innerText;
        writer.write({
          "type" : type,
          "keywords" : words
        }); 
      });
    }
  }));
  
  if (window.location.pathname == "/product.html") {
    let params = new URLSearchParams(window.location.search);
    let mainProductId = params.get('id');

    collector.add(new SearchCollector.AssociatedProductCollector(".grid-item", mainProductId, {
      "idResolver" : element => element.getAttribute("id"),
      "positionResolver" : element => new SearchCollector.PositionResolver(".grid-item", element).get(),
      "priceResolver" : element => element.getAttribute("data-price"),
      "trailResolver" : trailResolver
    }));
  } else {
    collector.add(new SearchCollector.ProductClickCollector(".grid-item", {
      "idResolver" : element => element.getAttribute("id"),
      "positionResolver" : element => new SearchCollector.PositionResolver(".grid-item", element).get(),
      "priceResolver" : element => element.getAttribute("data-price"),
      "trailResolver" : trailResolver
    }));
  }

  collector.add(new SearchCollector.BasketClickCollector("#add-to-basket", {
    "idResolver" : element => element.getAttribute("data-product"),
    "priceResolver" : element => element.getAttribute("data-price")
  }));
  collector.add(new SearchCollector.ProductListCollector("#checkout-content > tr", "checkout", {
    "idResolver" : element => element.getAttribute("data-product"),
    "priceResolver" : element => element.getAttribute("data-price")
  }));
  collector.add(new SearchCollector.CheckoutClickCollector("#purchase-button", "#checkout-content > tr", {
    "idResolver" : element => element.getAttribute("data-product"),
    "priceResolver" : element => element.getAttribute("data-price")
  }));
  collector.start();
});