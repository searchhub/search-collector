import {Page} from "puppeteer";
import {shutdownMockServer, startMockServer} from "./wiremock";

declare const page: Page;

describe('Test header and title of the page', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(async () => {
		await shutdownMockServer();
	})

	test('Title of the page', async () => {
		await page.goto("http://localhost:8081/example.page.html", {waitUntil: 'domcontentloaded'});
		const title = await page.title();
		expect(title).toBe('E2E Testing');
	});
});