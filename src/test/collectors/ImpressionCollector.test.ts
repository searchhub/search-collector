import {Page} from "puppeteer";
import {createStubAsserter, shutdownMockServer, startMockServer, verifyNoUnmatchedRequests, wait} from "../wiremock";

declare const page: Page;

describe('ImpressionCollectorTracking Suite', () => {

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
		const stubAsserter = await createStubAsserter("ImpressionCollectorTracking.json");

		await page.goto("http://localhost:8081/ImpressionCollector.page.html", {waitUntil: 'load'});
		await page.click("#scrollTarget");//click scrolls the element into view

		await wait(250);//wait for the requests to settle

		await stubAsserter.verifyCallCount(10)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("impression");
				expect(trackingData.position).toBeDefined();
				expect(typeof trackingData.position).toBe("number");
				expect(trackingData.id).toBeDefined();
				expect(typeof trackingData.id).toBe("string");
				expect(params.data.values.length).toBe(1);
			})
			.verify();
	});
});