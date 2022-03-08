import {Page} from "puppeteer";
import {createMockServer} from "./wiremock";

declare const page: Page;

describe('Test header and title of the page', () => {

	const {
		startMockServer,
		shutdownMockServer,
		getHost
	} = createMockServer();

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	test('Title of the page', async () => {
		await page.goto(getHost() + "/example.page.html", {waitUntil: 'domcontentloaded'});
		const title = await page.title();
		expect(title).toBe('E2E Testing');
	});
});
