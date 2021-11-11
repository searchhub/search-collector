import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer} from "../wiremock";

declare const page: Page;

describe('SearchResultCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	beforeEach(async () => {

	})

	test('track search result data', async () => {
		const stubAsserter = await createStubAsserter("SearchResultCollectorTracking.json");

		await page.goto("http://localhost:8081/SearchResultCollector.page.html", {waitUntil: 'load'});

		await stubAsserter.verifyCallCount(1)
		await stubAsserter.verifyBody(body => expect(body).toBeDefined());
		await stubAsserter.verifyHeaders(headers => expect(headers["Accept"]).toContain("image"));
		await stubAsserter.verifyQueryParams(params => {
			const trackingData = JSON.parse(params.data.values[0]);
			expect(trackingData.type).toBe("search");
			expect(trackingData.keywords).toBe("THE QUERY");
			expect(trackingData.count).toBe(10);
			expect(trackingData.timestamp).toBeDefined();
			expect(trackingData.session).toBe("search-result-collector-session");
			expect(trackingData.query).toBe("THE QUERY"); // TODO probably wrong
			expect(params.data.values.length).toBe(1);
		})
	});
});