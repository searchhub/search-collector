import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";
import {wait} from "../util";

declare const page: Page;

describe('RedirectCollector Suite', () => {

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

	test('track redirect data', async () => {
		const stubAsserter = await createStubAsserter("RedirectCollectorTracking.json");

		await page.goto(getHost() + "/RedirectCollector.page.html?isSearchPage=true", {waitUntil: 'networkidle0'});

		await Promise.all([page.waitForNavigation({waitUntil: "networkidle0"}), page.click("#searchButton")]);

		await wait(100); // wait for the request to settle

		await stubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("redirect");
				expect(trackingData.keywords).toBe("THE REDIRECT QUERY");
				expect(trackingData.query).toBe("$s=THE REDIRECT QUERY/");
				expect(trackingData.url).toBe(getHost() + "/RedirectCollector.page.html?isSearchPage=false");
			})
			.verify();

		await verifyNoUnmatchedRequests();
	});

	test('track redirect data different origin', async () => {
		const stubAsserter = await createStubAsserter("RedirectCollectorTracking.json");

		await page.goto(getHost() + "/RedirectCollector.page.html?isSearchPage=true", {
			waitUntil: 'networkidle0'
		});

		await page.click("#triggerFiredSearchButton");

		await page.goto("https://www.google.com/");

		await Promise.all([
			page.waitForNavigation({waitUntil: "networkidle0"}),
			page.evaluate((url) => {
				document.location.href = url;
			}, getHost() + "/RedirectCollector.page.html?isSearchPage=true")])

		await wait(200);

		await stubAsserter.verifyCallCount(0)
			.verify();
	});

});
