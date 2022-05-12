import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";
import {wait} from "../util";

declare const page: Page;

describe('IframeCollector Suite', () => {

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

	test('execute from within iframe', async () => {
		const asserter = await createStubAsserter("IframeCollectorTracking.json");

		await page.goto(getHost() + "/ContextTestMain.page.html", {waitUntil: 'load'});
		await page.click("#clickMe");
		await wait(1000);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.id).toBe("5");
			})
			.verify();
	});
});
