var Collector = require("./Collector");
var ClickCollector = require("./collectors/ClickCollector");
var SearchResultCollector = require("./collectors/SearchResultCollector");
var InstantSearchQueryCollector = require("./collectors/InstantSearchQueryCollector");
var BrowserCollector = require("./collectors/BrowserCollector");
var ImpressionCollector = require("./collectors/ImpressionCollector");
var CookieSessionResolver = require("./resolvers/CookieSessionResolver");
var PositionResolver = require("./resolvers/PositionResolver");
var ContextResolver = require("./resolvers/ContextResolver");
var FilterClickCollector = require("./collectors/FilterClickCollector");
var ProductClickCollector = require("./collectors/ProductClickCollector");
var BasketClickCollector = require("./collectors/BasketClickCollector");
var ProductListCollector = require("./collectors/ProductListCollector");
var AssociatedProductCollector = require("./collectors/AssociatedProductCollector");
var SearchEventResultCollector = require("./collectors/SearchEventResultCollector");
var GenericEventCollector = require("./collectors/GenericEventCollector");
var CheckoutClickCollector = require("./collectors/CheckoutClickCollector");
var AbstractCollector = require("./collectors/AbstractCollector");
var SuggestSearchCollector = require("./collectors/SuggestSearchCollector");
var FiredSearchCollector = require("./collectors/FiredSearchCollector");
var RedirectCollector = require("./collectors/RedirectCollector");
var Trail = require("./query/Trail");
var Query = require("./query/Query");
var Util = require("./utils/Util");
var Sentinel = require("./utils/Sentinel");

// Main entry and global export point
var SearchCollector = {
  "Collector" : Collector,
  "ClickCollector" : ClickCollector,
  "SearchResultCollector" : SearchResultCollector,
  "BrowserCollector" : BrowserCollector,
  "ImpressionCollector" : ImpressionCollector,
  "CookieSessionResolver" : CookieSessionResolver,
  "PositionResolver" : PositionResolver,
  "ContextResolver" : ContextResolver,
  "InstantSearchQueryCollector" : InstantSearchQueryCollector,
  "FilterClickCollector" : FilterClickCollector,
  "ProductClickCollector" : ProductClickCollector,
  "BasketClickCollector" : BasketClickCollector,
  "ProductListCollector" : ProductListCollector,
  "AssociatedProductCollector" : AssociatedProductCollector,
  "SearchEventResultCollector" : SearchEventResultCollector,
  "GenericEventCollector" : GenericEventCollector,
  "CheckoutClickCollector" : CheckoutClickCollector,
  "SuggestSearchCollector" : SuggestSearchCollector,
  "FiredSearchCollector" : FiredSearchCollector,  
  "AbstractCollector" : AbstractCollector,
  "RedirectCollector" : RedirectCollector,
  "Trail" : Trail,
  "Query" : Query,
  "Util" : Util,
  "Sentinel" : Sentinel
}

// When running through watchify, this gets called directly. When going through the build process
// browserify --standalone would produce the SearchCollector global. If you change the name of the global,
// change here and in package.json
if (window) {
  window.SearchCollector = SearchCollector;
}

if (module && module.exports) {
  module.exports = SearchCollector;
}
