import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer, verifyNoUnmatchedRequests, wait} from "../wiremock";

declare const page: Page;

describe('BasketClickCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track a basket click', async () => {
		const asserter = await createStubAsserter("BasketClickCollectorTracking.json");

		await page.goto("http://localhost:8081/BasketClickCollector.page.html", {waitUntil: 'load'});
		await page.click("#clickMe");
		await wait(100);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("basket");
				expect(trackingData.id).toBe("5");
				expect(trackingData.price).toBe(5.99);
			})
			.verify();
	});
});