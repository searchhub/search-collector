import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer, verifyNoUnmatchedRequests, wait} from "../wiremock";

declare const page: Page;

describe('ProductClickCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track all product click data', async () => {
		const asserter = await createStubAsserter("ProductClickCollectorTracking.json");

		await page.goto("http://localhost:8081/ProductClickCollector.page.html?collector=all", {waitUntil: 'load'});
		await page.click("#clickMe");
		await wait(100);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.data.id).toBe("5");
				expect(trackingData.data.position).toBe(4);
				expect(trackingData.data.price).toBe(5.99);
				expect(trackingData.data.image).toBe("image.jpg");
				expect(trackingData.data.metadata).toBe("DIV");
			})
			.verify();
	});

	test('track product click data', async () => {
		const asserter = await createStubAsserter("ProductClickCollectorTracking.json");

		await page.goto("http://localhost:8081/ProductClickCollector.page.html?collector=none", {waitUntil: 'load'});
		await page.click("#clickMe");
		await wait(100);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.data.id).toBe("5");
				expect(trackingData.data.position).toBeFalsy();
				expect(trackingData.data.price).toBeFalsy();
				expect(trackingData.data.image).toBeFalsy();
				expect(trackingData.data.metadata).toBeFalsy();
			})
			.verify();
	});
});