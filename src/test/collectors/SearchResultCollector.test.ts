import {Page} from "puppeteer";
import {shutdownMockServer, startMockServer, verifyApiCallCount} from "../wiremock";

declare const page: Page;

describe('SearchResultCollector Suite', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	beforeEach(async  () => {

	})

	test('track search result data', async () => {
		await page.goto("http://localhost:8081/SearchResultCollector.page.html", {waitUntil: 'load'});
		await verifyApiCallCount(1, "SearchResultCollectorTracking.json");
	});
});