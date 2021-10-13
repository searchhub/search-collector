/* Template Notes:
 * - Visit all places that are marked with TODO and adjust accordingly
 * - For some special conditions you might change the way data is retrieved
 * */

// Register for window.load, it fires after everything on the page has been loaded, including dynamically included scripts
window.addEventListener("load", function () {
	try {
		var SearchCollector = require("search-collector");

		// these selectors are used at several places
		const searchFormSelector = 'TODO: search-form-selector';
		const searchInputSelector = 'TODO: search-input-selector';

		// the query resolves the current search-query in a standardized format
		var queryResolver = () => {
			// use SearchCollector.Query to build the 'query' string
			var query = new SearchCollector.Query();

			// TODO: retrieve search keywords that were used for a search result page
			// possible implementation:
			var qField = document.querySelector(searchInputSelector);
			if (qField && qField.value) {
				query.setSearch(qField.value);
			} else {
				var urlQuery = SearchCollector.Util.parseQueryString(window.location.search);
				// TODO: use correct query parameter
				if (urlQuery.q) query.setSearch(urlQuery.q);
			}

			// TODO
			// optionaly you can track selected filters as well.
			// if you don't need that, you can remove that block.
			//
			// examples:
			// standard filter:
			// query.addSelection("brand", "=", "puma");
			//
			// track filter with multiple values:
			// query.addSelection("color", "=", "red", null, "or");
			// query.addSelection("color", "=", "black", null, "or");
			//
			// numeric range:
			// query.addSelection("price", "><", 20, 42.99);

			return query.toString();
		}
		var sessionResolver = new SearchCollector.CookieSessionResolver();
		var trailResolver = new SearchCollector.Trail(queryResolver, sessionResolver);

		// if script will be included in iframe, use context resolver
		// var contextResolver =  new SearchCollector.ContextResolver(window.top, window.top.document);

		// TODO: specify http endpoint where the collected data should be sent
		const endpoint = "TODO";
		const debug = SearchCollector.Util.parseQueryString().debug === "true";

		// init collector
		var collector = new SearchCollector.Collector({
			"sessionResolver" : sessionResolver,
			"queryResolver" : queryResolver,
			"trailResolver" : trailResolver,
			// "contextResolver": contextResolver,
			"endpoint" : endpoint,
			"debug" : debug,
			"sqs" : false, // activate in case you are sending to SQS
			"recordUrl": false, // activate in case you want the url tracked as well
			"channel" : "TODO"
		});

		// Follow the typing in the input
		collector.add(new SearchCollector.InstantSearchQueryCollector("TODO"));

		var isSearchPage = () => { /*TODO: return boolean; */ };

		var firedSearchCallback = (callback) => { 
			var searchForm = doc.querySelector(searchFormSelector);
			if (searchForm) {
				searchForm.addEventListener("submit", function() {
					var input = doc.querySelector(searchInputSelector);
					if (input) {
						callback(input.value);
					}
				});
			}
		};

		var firedSearchResolver = (writer, type, context) => { 
			firedSearchCallback( (query) => {
						writer.write({
							"type" : type,
							"keywords" : query,
							"query" : "$s=" + query
						});
			});
		};

		collector.add(new SearchCollector.FiredSearchCollector(firedSearchResolver));
		
		collector.add(new SearchCollector.RedirectCollector(firedSearchCallback, isSearchPage, contextResolver));

		collector.add(new SearchCollector.InstantSearchQueryCollector(searchInputSelector));

		var suggestSearchResolver = (writer, type, context) => {
			context.getWindow().addEventListener("TODO: suggest-click-event", event => {
				// TODO: get selected suggest keywords from event or elsewhere..
				var keywords = "TODO";
				writer.write({
					"type": type,
					"keywords": keywords,
					"query": "$s="+keywords
				});
			});
		};
		collector.add(new SearchCollector.SuggestSearchCollector(suggestSearchResolver));

		// special collectors for search result page
		if (isSearchPage()) {
			var countResolver = () => { /*TODO: return int;*/ };
			
			collector.add(new SearchCollector.SearchResultCollector(() => {
				var phrase = new SearchCollector.Query(queryResolver()).getSearch();
				return phrase;
			}, countResolver));

			var productIdResolver = (element) => { /*TODO: return id; */ };
			var positionResolver = (element) => { /*TODO: return int; */ };
			collector.add(new SearchCollector.ProductClickCollector('TODO: click-element-selector', {
				"idResolver": productIdResolver, 
				"positionResolver": positionResolver,
				"trailResolver": trailResolver
			}));

			// if there are several links that lead to the product detail page, add several ProductClickCollector
			
			// Optional in case there are basket-links to the SRP, otherwise delete this block
			//var productPriceResolver = (element) => { /*TODO: return float; */ };
			//collector.add(new SearchCollector.BasketClickCollector("TODO: cart-button-selector", {
			//	"idResolver": productIdResolver,
			//	"priceResolver": productPriveResolver
			//}
		} 
		// special collectors for product detail page
		else if (window.location.pathname.indexOf("TODO: /product/detail/path/prefix") !== -1) {
			collector.add(new SearchCollector.BasketClickCollector("TODO: cart-button-selector", {
				"idResolver" : (element) => { /*TODO: return id; */},
				"priceResolver" : (element) => { /*TODO: return float */ }
			}));

			// Optional: Add selector for associated products, e.g. recommendations, cross-sellings etc.
			//var mainProductId = 'TODO';
			// The items selector should match all single associated products
			//var associatedItemsSelector = 'TODO';
			// The ID resolver will be called for each one of those matching elements
			//var associatedItemsResolver = {
			//	"idResolver": (element) => { /*TODO: return id; */},
			//	"trailResolver": trailResolver
			//};
			// this collector can be added repeatedly in case there are several blocks of associated products
			//collector.add(new SearchCollector.AssociatedProductCollector(associatedProductResolvers, mainProductId, associatedItemsResolver));
		} 
		// special collector for checkout page
		else if (window.location.pathname.indexOf("TODO: /checkout/page") !== -1) {
			// Selector of the "buy now" button or similar
			var checkoutSubmitSelector = 'TODO';
			// The cart-item-selector should match every single item in the cart.
			// For each item/element the idResolver and priceResolver are called.
			var cartItemSelector = 'TODO';
			collector.add(new SearchCollector.CheckoutClickCollector(checkoutSubmitSelector, cartItemSelector, {
				"idResolver" : (element) => { /*TODO: return id; */},
				"priceResolver" : (element) => { /*TODO: return float */ }
			}));
		}

	} catch (e) {
		console.log("Failed loading search-collector " + e);
	}
});

