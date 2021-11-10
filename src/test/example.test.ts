import {Page} from "puppeteer";
import {shutdownMockServer, startMockServer} from "./util";

declare const page: Page;

const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('Test header and title of the page', () => {

	beforeAll(async () => {
		await startMockServer();
	})

	afterAll(() => {
		shutdownMockServer();
	})

	test('Title of the page', async () => {
		await page.goto("http://localhost:8081/example.page.html", {waitUntil: 'domcontentloaded'});
		const title = await page.title();
		expect(title).toBe('E2E Testing');

	}, timeout);
});