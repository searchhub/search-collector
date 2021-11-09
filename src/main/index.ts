export * from "./Collector";
export * from "./collectors/ClickCollector";
export * from "./collectors/SearchResultCollector";
export * from "./collectors/InstantSearchQueryCollector";
export * from "./collectors/BrowserCollector";
export * from "./collectors/ImpressionCollector";
export * from "./resolvers/CookieSessionResolver";
export * from "./resolvers/PositionResolver";
export * from "./resolvers/Context";
export * from "./collectors/FilterClickCollector";
export * from "./collectors/ProductClickCollector";
export * from "./collectors/BasketClickCollector";
export * from "./collectors/ProductListCollector";
export * from "./collectors/AssociatedProductCollector";
export * from "./collectors/SearchEventResultCollector";
export * from "./collectors/GenericEventCollector";
export * from "./collectors/CheckoutClickCollector";
export * from "./collectors/AbstractCollector";
export * from "./collectors/SuggestSearchCollector";
export * from "./collectors/FiredSearchCollector";
export * from "./collectors/RedirectCollector";
export * from "./writers/DefaultWriter";
export * from "./writers/SplitStreamWriter";
export * from "./query/TrailResolver";
export * from "./query/Query";
export * from "./utils/Util";
export * from "./utils/Sentinel";

// Main entry and global export point
// export const SearchCollector = {
// 	"Collector": Collector,
// 	"ClickCollector": ClickCollector,
// 	"SearchResultCollector": SearchResultCollector,
// 	"BrowserCollector": BrowserCollector,
// 	"ImpressionCollector": ImpressionCollector,
// 	"CookieSessionResolver": CookieSessionResolver,
// 	"PositionResolver": PositionResolver,
// 	"ContextResolver": ContextResolver,
// 	"InstantSearchQueryCollector": InstantSearchQueryCollector,
// 	"FilterClickCollector": FilterClickCollector,
// 	"ProductClickCollector": ProductClickCollector,
// 	"BasketClickCollector": BasketClickCollector,
// 	"ProductListCollector": ProductListCollector,
// 	"AssociatedProductCollector": AssociatedProductCollector,
// 	"SearchEventResultCollector": SearchEventResultCollector,
// 	"GenericEventCollector": GenericEventCollector,
// 	"CheckoutClickCollector": CheckoutClickCollector,
// 	"SuggestSearchCollector": SuggestSearchCollector,
// 	"FiredSearchCollector": FiredSearchCollector,
// 	"AbstractCollector": AbstractCollector,
// 	"RedirectCollector": RedirectCollector,
// 	"DefaultWriter": DefaultWriter,
// 	"SplitStreamWriter": SplitStreamWriter,
// 	"Trail": TrailResolver,
// 	"Query": Query,
// 	"Util": Util,
// 	"Sentinel": Sentinel
// }

// When running through watchify, this gets called directly. When going through the build process
// browserify --standalone would produce the SearchCollector global. If you change the name of the global,
// change here and in package.json
// if (window) {
// 	//@ts-ignore
// 	window.SearchCollector = SearchCollector;
// }