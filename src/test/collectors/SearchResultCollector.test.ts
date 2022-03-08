import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";

declare const page: Page;

describe('SearchResultCollector Suite', () => {

	const {
		startMockServer,
		shutdownMockServer,
		verifyNoUnmatchedRequests,
		createStubAsserter,
		getHost
	} = createMockServer();

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track search result data', async () => {
		const stubAsserter = await createStubAsserter("SearchResultCollectorTracking.json");

		await page.goto(getHost() + "/SearchResultCollector.page.html", {waitUntil: 'load'});

		await stubAsserter.verifyCallCount(1)
			.verifyBody(body => expect(body).toBeDefined())
			.verifyHeaders(headers => expect(headers["Accept"]).toContain("image"))
			.verifyRequest(request => expect(request).toBeDefined())
			.verifyCookies(cookies => expect(Object.keys(cookies).length).toBe(0))
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("search");
				expect(trackingData.keywords).toBe("THE QUERY");
				expect(trackingData.count).toBe(10);
				expect(params.data.values.length).toBe(1);
			})
			.verify();
	});
});
