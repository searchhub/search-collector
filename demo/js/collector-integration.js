const {
	CollectorModule,
	Context,
	cookieSessionResolver,
	debounce,
	DefaultWriter,
	FiredSearchCollector,
	InstantSearchQueryCollector,
	positionResolver,
	Query,
	Sentinel,
	Trail,
	TrailType,
	DebugWriter,
	QueryWriter,
	TrailWriter,
	JSONEnvelopeWriter,
	RedirectCollector,
	BrowserTrackingWriter,
	ProductClickCollector,
	ImpressionCollector,
	SearchResultCollector,
	BasketClickCollector,
	CheckoutClickCollector,
	ConsoleTransport,
	SuggestSearchCollector,
	AssociatedProductCollector,
	ListenerType,
} = window.SearchCollector;


const sessionResolver = () => cookieSessionResolver();

const queryResolver = () => {
	const params = new URLSearchParams(window.location.search);

	const query = new Query();
	query.setSearch(params.get("query"));

	return query;
}

const searchResultCountResolver = () => {
	return extractPrice(document.querySelector('[data-track-id="resultCountContainer"]')?.textContent);
}

const isSearchPage = () => {
	return window.location.href.indexOf("product-listing.html") > -1;
}

const firedSearchCallback = callback => {
	const searchBox = document.querySelector('[data-track-id="searchBox"]');
	const searchButton = document.querySelector('[data-track-id="searchButton"]');

	searchBox?.addEventListener("keypress", (event) => {
		if (event.key === "Enter" && searchBox.value && event.repeat === false) {
			callback(searchBox.value);
		}
	});

	searchButton?.addEventListener("click", (event) => {
		if (searchBox.value)
			callback(searchBox.value);
	});
}

const debug = true;
const trail = new Trail(queryResolver, sessionResolver);
const context = new Context(window, document);
const writer = new DemoWriter(queryResolver, sessionResolver, "demo-channel", debug);

const collectorModule = new CollectorModule({
	writer,
	context
});

collectorModule.addLogTransport(new ConsoleTransport());

collectorModule.add(new InstantSearchQueryCollector('[data-track-id="searchBox"]'));

collectorModule.add(new SuggestSearchCollector((writer, type, context) => {
	new Sentinel(context.getDocument()).on('[data-track-id="suggestSearchTerm"]', (element) => {
		element.addEventListener("mouseup", () => {
			writer.write({
				type,
				keywords: sanitize(element.textContent)
			});
		})
	});
}));

const redirectProductClickCollector = new ProductClickCollector('[data-track-id="product"]', {
	idResolver: element => element.getAttribute('data-product-id'),
	positionResolver: element => positionResolver('[data-track-id="product"]', element),
	priceResolver: element => extractPrice(element.querySelector('[data-track-id="priceContainer"]')?.textContent),
	metadataResolver: element => void 0, // metadata can be anything
	trail
});

const redirectImpressionCollector = new ImpressionCollector('[data-track-id="product"]',
	element => element.getAttribute('data-product-id'),
	element => positionResolver('[data-track-id="product"]', element));

redirectProductClickCollector.setContext(context);
redirectImpressionCollector.setContext(context);

collectorModule.add(new RedirectCollector(firedSearchCallback, isSearchPage, {
	resultCountResolver: searchResultCountResolver,
	collectors: [redirectProductClickCollector, redirectImpressionCollector],
	nestedRedirects: {
		depth: 2,
		subSelectors: ['[data-track-id="redirectSubSelector"]']
	}
}, ListenerType.Sentinel, context));
collectorModule.add(
	new BasketClickCollector('[data-track-id="addToCartPDP"]',
		element => element.getAttribute('data-product-id'),
		element => extractPrice(document.querySelector('[data-track-id="priceContainer"]').textContent))
);

collectorModule.add(
	new CheckoutClickCollector('[data-track-id="checkoutButton"]', '[data-track-id="checkoutProduct"]',
		element => element.getAttribute("data-product-id"),
		element => extractPrice(element.querySelector('[data-track-id="priceContainer"]').textContent),
		element => extractPrice(element.querySelector('[data-track-id="checkoutQuantity"]')?.value)));

collectorModule.add(new FiredSearchCollector((writer, type, context) => {
	firedSearchCallback((searchPhrase) => {
		const query = new Query();
		query.setSearch(searchPhrase);
		writer.write({
			"type": type,
			"keywords": searchPhrase,
			"query": query.toString()
		});
	});
}));

collectorModule.add(
	new AssociatedProductCollector(
		'[data-track-id="associatedProduct"]',
		new URLSearchParams(location.search).get("id"),
		{
			idResolver: element => element.getAttribute("data-product-id"),
			positionResolver: element => positionResolver('[data-track-id="associatedProduct"]', element),
			priceResolver: element => extractPrice(element.querySelector('[data-track-id="priceContainer"]')?.textContent),
			trail
		}
	));

if (isSearchPage()) {
	collectorModule.add(new SearchResultCollector(() => queryResolver().getSearch(), searchResultCountResolver));

	collectorModule.add(
		new ProductClickCollector('[data-track-id="product"]', {
			idResolver: element => element.getAttribute('data-product-id'),
			positionResolver: element => positionResolver('[data-track-id="product"]', element),
			priceResolver: element => extractPrice(element.querySelector('[data-track-id="priceContainer"]')?.textContent),
			metadataResolver: element => void 0, // metadata can be anything
			trail
		}));

	collectorModule.add(
		new ImpressionCollector('[data-track-id="product"]',
			element => element.getAttribute('data-product-id'),
			element => positionResolver('[data-track-id="product"]', element)));
}

collectorModule.start();

