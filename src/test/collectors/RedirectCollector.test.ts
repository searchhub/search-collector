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

	afterEach(async () => {
		await verifyNoUnmatchedRequests();
	})

	test('track redirect data', async () => {
		const stubAsserter = await createStubAsserter("RedirectCollectorTracking.json");

		await page.goto(getHost() + "/RedirectCollector.page.html", {waitUntil: 'load'});
		page.click("#searchButton");
		await page.waitForNavigation({waitUntil: "networkidle0"});

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
	});
});
