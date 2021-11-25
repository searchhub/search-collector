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

		await wait(750); //ImpressionCollector is debounced, give it some more time

		await stubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const event = JSON.parse(params.data.values[0]);
				expect(event.type).toBe("impression");
				expect(event.data.length).toBe(10)

				event.data.forEach(impression => {
					expect(impression.position).toBeDefined();
					expect(typeof impression.position).toBe("number");
					expect(impression.id).toBeDefined();
					expect(typeof impression.id).toBe("string");
				});
			})
			.verify();
	});
});