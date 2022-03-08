import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";
import {wait} from "../util";

declare const page: Page;

describe('InstantSearchQueryCollector Suite', () => {

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

	test('track instant search data', async () => {
		const stubAsserter = await createStubAsserter("InstantSearchQueryCollectorTracking.json");

		await page.goto(getHost() + "/InstantSearchQueryCollector.page.html", {waitUntil: 'load'});
		await page.click("#searchInput");
		await page.keyboard.press('a');
		await page.keyboard.press('b');
		await page.keyboard.press('c');

		await wait(600);//wait Collector delay (500) + request time

		await stubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("instant-search");
				expect(trackingData.keywords).toBe("abc");
			})
			.verify();
	});
});
