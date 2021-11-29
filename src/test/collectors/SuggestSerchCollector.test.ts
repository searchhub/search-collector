import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer, verifyNoUnmatchedRequests, wait} from "../wiremock";

declare const page: Page;

describe('SuggestSearchCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track suggest search data', async () => {
		const stubAsserter = await createStubAsserter("SuggestSearchCollectorTracking.json");

		await page.goto("http://localhost:8081/SuggestSearchCollector.page.html", {waitUntil: 'load'});
		await page.click('[data-id="S5"]');

		await wait(100); // wait for the request to settle

		await stubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("suggest-search");
				expect(trackingData.keywords).toBe("S5");
				expect(trackingData.query).toBe("$s=S5");
			})
			.verify();
	});
});