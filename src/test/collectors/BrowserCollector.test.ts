import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";

declare const page: Page;

describe('BrowserCollector Suite', () => {

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
		const recordUrlAsserter = await createStubAsserter("BrowserCollectorTracking.recordUrl.json");
		const recordReferrerAsserter = await createStubAsserter("BrowserCollectorTracking.recordReferrer.json");
		const recordLanguageAsserter = await createStubAsserter("BrowserCollectorTracking.recordLanguage.json");
		const recordUserAgentAsserter = await createStubAsserter("BrowserCollectorTracking.recordUserAgent.json");

		await page.goto(getHost() + "/BrowserCollector.page.html", {waitUntil: 'networkidle0'});
		await page.waitForNetworkIdle();

		await recordLanguageAsserter.verifyQueryParams(queryParams => {
			const trackingData = JSON.parse(queryParams.data.values[0]);
			expect(trackingData.lang).toBeDefined();
			expect(trackingData.ref).toBeFalsy();
			expect(trackingData.url).toBeFalsy();
		}).verify();

		await recordUserAgentAsserter.verifyQueryParams(queryParams => {
			const trackingData = JSON.parse(queryParams.data.values[0]);
			expect(trackingData.agent).toBeDefined();
			expect(trackingData.ref).toBeFalsy();
			expect(trackingData.url).toBeFalsy();
			expect(trackingData.lang).toBeFalsy();
		}).verify();

		await recordUrlAsserter.verifyQueryParams(queryParams => {
			const trackingData = JSON.parse(queryParams.data.values[0]);
			expect(trackingData.lang).toBeFalsy();
			expect(trackingData.ref).toBeFalsy();
			expect(trackingData.url).toBeDefined();
		}).verify();

		await recordReferrerAsserter.verifyQueryParams(queryParams => {
			const trackingData = JSON.parse(queryParams.data.values[0]);
			expect(trackingData.lang).toBeFalsy();
			expect(trackingData.ref).toBeDefined(); // this is empty string cause we dont redirect the browser before testing
			expect(trackingData.url).toBeFalsy();
		}).verify();
	});
});
