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
		const redirectStubAsserter = await createStubAsserter("RedirectCollectorTracking.json");
		const clickStubAsserter = await createStubAsserter("RedirectProductClickCollectorTracking.json");

		await page.goto(getHost() + "/RedirectCollector.page.html?isSearchPage=true", {waitUntil: 'networkidle0'});

		await Promise.all([page.waitForNavigation({waitUntil: "networkidle0"}), page.click("#searchButton")]);

		await wait(100);

		await redirectStubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("redirect");
				expect(trackingData.keywords).toBe("THE REDIRECT QUERY");
				expect(trackingData.query).toBe("$s=THE REDIRECT QUERY/");
				expect(trackingData.url).toBe(getHost() + "/RedirectCollector.page.html?isSearchPage=false");
			})
			.verify();

		await clickStubAsserter.verifyCallCount(0)
			.verify();
	});

	test('track redirect data with product clicks', async () => {
		const redirectStubAsserter = await createStubAsserter("RedirectCollectorTracking.json");
		const clickStubAsserter = await createStubAsserter("RedirectProductClickCollectorTracking.json");

		await page.goto(getHost() + "/RedirectCollectorWithProductClicks.page.html?isSearchPage=true", {waitUntil: 'networkidle0'});

		await Promise.all([page.waitForNavigation({waitUntil: "networkidle0"}), page.click("#searchButton")]);

		await wait(100);

		await page.click("#clickMe");

		await wait(100);

		await redirectStubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("redirect");
				expect(trackingData.keywords).toBe("THE REDIRECT QUERY");
				expect(trackingData.query).toBe("$s=THE REDIRECT QUERY/");
				expect(trackingData.url).toBe(getHost() + "/RedirectCollectorWithProductClicks.page.html?isSearchPage=false");
				expect(trackingData.resultCount).toBe(5);
			})
			.verify();

		await clickStubAsserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.id).toBe("5");
				expect(trackingData.position).toBe(4);
				expect(trackingData.price).toBe(5.99);
				expect(trackingData.query).toBe("$s=THE REDIRECT QUERY/");
				expect(trackingData.image).toBe("image.jpg");
				expect(trackingData.metadata).toBe("DIV");
			})
			.verify();
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
