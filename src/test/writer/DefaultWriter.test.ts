import {createMockServer} from "../wiremock";
import {Page} from "puppeteer";
import {wait} from "../util";

declare var page: Page;

describe('Test the DefaultWriter', () => {

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

	test('DefaultWriter', async () => {
		const asserter = await createStubAsserter("DefaultWriter.json");

		await page.goto(getHost() + "/DefaultWriter.page.html", {waitUntil: 'networkidle0'});
		await wait(1200); // wait more than a second for the buffering writer

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				expect(params["MessageBody"].values.length).toBe(1);
				// timestamp is shimmed in browser to always be 555, this way we can just assert the encoded string
				expect(params["MessageBody"].values[0]).toBe("JTVCJTdCJTIyZW50cnklMjIlM0ExJTJDJTIyZGF0YSUyMiUzQSUyMmRhdGElMjIlMkMlMjJ0aW1lc3RhbXAlMjIlM0E1NTUlMkMlMjJzZXNzaW9uJTIyJTNBJTIybXktc2Vzc2lvbiUyMiUyQyUyMmNoYW5uZWwlMjIlM0ElMjJkZWZhdWx0LXdyaXRlci1jaGFubmVsJTIyJTJDJTIycXVlcnklMjIlM0ElMjIlMjIlN0QlMkMlN0IlMjJlbnRyeSUyMiUzQTIlMkMlMjJkYXRhJTIyJTNBJTIyZGF0YSUyMiUyQyUyMnRpbWVzdGFtcCUyMiUzQTU1NSUyQyUyMnNlc3Npb24lMjIlM0ElMjJteS1zZXNzaW9uJTIyJTJDJTIyY2hhbm5lbCUyMiUzQSUyMmRlZmF1bHQtd3JpdGVyLWNoYW5uZWwlMjIlMkMlMjJxdWVyeSUyMiUzQSUyMiUyMiU3RCUyQyU3QiUyMmVudHJ5JTIyJTNBMyUyQyUyMmRhdGElMjIlM0ElMjJkYXRhJTIyJTJDJTIydGltZXN0YW1wJTIyJTNBNTU1JTJDJTIyc2Vzc2lvbiUyMiUzQSUyMm15LXNlc3Npb24lMjIlMkMlMjJjaGFubmVsJTIyJTNBJTIyZGVmYXVsdC13cml0ZXItY2hhbm5lbCUyMiUyQyUyMnF1ZXJ5JTIyJTNBJTIyJTIyJTdEJTVE");
			})
			.verify();
	})

});

