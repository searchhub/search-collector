import {Page} from "puppeteer";
import {createMockServer} from "../wiremock";
import {wait} from "../util";

declare const page: Page;

describe('ProductClickCollector Suite', () => {

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

	test('track all product click data', async () => {
		const asserter = await createStubAsserter("ProductClickCollectorTracking.json");

		await page.goto(getHost() + "/ProductClickCollector.page.html?collector=all", {waitUntil: 'networkidle0'});
		await page.click("#clickMe");
		await wait(100);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.id).toBe("5");
				expect(trackingData.position).toBe(4);
				expect(trackingData.price).toBe(5.99);
				expect(trackingData.image).toBe("image.jpg");
				expect(trackingData.metadata).toBe("DIV");
			})
			.verify();
	});

	test('track product click data', async () => {
		const asserter = await createStubAsserter("ProductClickCollectorTracking.json");

		await page.goto(getHost() + "/ProductClickCollector.page.html?collector=none", {waitUntil: 'networkidle0'});
		await page.click("#clickMe");
		await wait(100);

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.id).toBe("5");
				expect(trackingData.position).toBeFalsy();
				expect(trackingData.price).toBeFalsy();
				expect(trackingData.image).toBeFalsy();
				expect(trackingData.metadata).toBeFalsy();
			})
			.verify();
	});

	test('track product click data with existing path trail', async () => {
		const asserter = await createStubAsserter("ProductClickCollectorTracking.json");

		await page.goto(getHost() + "/ProductClickCollector.page.html?collector=all&useTrailQuery=customQuery", {waitUntil: 'networkidle0'});
		await page.click("#clickMe");
		await wait(100);

		// make sure a trail for that path exists
		const trail = await page.evaluate(() => {
			return localStorage.getItem("search-collector-trail");
		});
		const pathInfo = JSON.parse(trail)["/ProductClickCollector.page.html"];
		expect(pathInfo.query).toBe("$s=customQuery/");

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				const trackingData = JSON.parse(params.data.values[0]);
				expect(trackingData.type).toBe("product");
				expect(trackingData.id).toBe("5");
				expect(trackingData.position).toBe(4);
				expect(trackingData.price).toBe(5.99);
				expect(trackingData.image).toBe("image.jpg");
				expect(trackingData.query).toBe("$s=customQuery/");
				expect(trackingData.metadata).toBe("DIV");
			})
			.verify();
	});
});
