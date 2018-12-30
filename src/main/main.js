var Collector = require("./Collector");
var ClickCollector = require("./collectors/ClickCollector");
var SearchResultCollector = require("./collectors/SearchResultCollector");
var InstantSearchQueryCollector = require("./collectors/InstantSearchQueryCollector");
var BrowserCollector = require("./collectors/BrowserCollector");
var ImpressionCollector = require("./collectors/ImpressionCollector");
var CookieSessionResolver = require("./resolvers/CookieSessionResolver");
var PositionResolver = require("./resolvers/PositionResolver");
var FilterClickCollector = require("./collectors/FilterClickCollector");
var ProductClickCollector = require("./collectors/ProductClickCollector");
var ProductListCollector = require("./collectors/ProductListCollector");
var SearchEventResultCollector = require("./collectors/SearchEventResultCollector");
var GenericEventCollector = require("./collectors/GenericEventCollector");
var Trail = require("./query/Trail");
var Query = require("./query/Query");
var Util = require("./utils/Util");

// Main entry and global export point
var SearchCollector = {
  "Collector" : Collector,
  "ClickCollector" : ClickCollector,
  "SearchResultCollector" : SearchResultCollector,
  "BrowserCollector" : BrowserCollector,
  "ImpressionCollector" : ImpressionCollector,
  "CookieSessionResolver" : CookieSessionResolver,
  "PositionResolver" : PositionResolver,
  "InstantSearchQueryCollector" : InstantSearchQueryCollector,
  "FilterClickCollector" : FilterClickCollector,
  "ProductClickCollector" : ProductClickCollector,
  "ProductListCollector" : ProductListCollector,
  "SearchEventResultCollector" : SearchEventResultCollector,
  "GenericEventCollector" : GenericEventCollector,
  "Trail" : Trail,
  "Query" : Query,
  "Util" : Util
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
