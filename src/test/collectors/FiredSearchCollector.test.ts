import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer, verifyNoUnmatchedRequests, wait} from "../wiremock";

declare const page: Page;

describe('FiredSearchCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track impression data', async () => {
		const stubAsserter = await createStubAsserter("FiredSearchCollectorTracking.json");

		await page.goto("http://localhost:8081/FiredSearchCollector.page.html", {waitUntil: 'load'});
		await page.click("#searchButton");

		await wait(100); // wait for the request to settle

		await stubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("fired-search");
				expect(trackingData.keywords).toBe("THE QUERY");
				expect(trackingData.query).toBe("$s=THE QUERY");
			})
			.verify();
	});
});