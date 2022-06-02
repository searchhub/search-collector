import {createMockServer} from "../wiremock";
import {Page} from "puppeteer";
import {wait} from "../util";

declare var page: Page;

describe('Test the SQSErrorTransport', () => {

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

	test('SQSErrortTransport', async () => {
		const asserter = await createStubAsserter("SQSErrortTransport.json");

		await page.goto(getHost() + "/SQSErrorTransport.page.html", {waitUntil: 'networkidle0'});
		await wait(1200); // wait more than a second for the buffering writer

		await asserter.verifyCallCount(1)
			.verifyQueryParams(params => {
				expect(params["MessageBody"].values.length).toBe(1);
				// timestamp is shimmed in browser to always be 555, this way we can just assert the encoded string
				expect(params["MessageBody"].values[0]).toBe("JTVCJTdCJTIydHlwZSUyMiUzQSUyMmVycm9yJTIyJTJDJTIybXNnJTIyJTNBJTIyc29tZSUyMGVycm9yJTIwbWVzc2FnZSUyMiUyQyUyMmNoYW5uZWwlMjIlM0ElMjJkZWZhdWx0LXdyaXRlci1jaGFubmVsJTIyJTJDJTIyc2Vzc2lvbiUyMiUzQSUyMm15LXNlc3Npb24lMjIlMkMlMjJ0aW1lc3RhbXAlMjIlM0E1NTUlN0QlNUQ=");
			})
			.verify();
	})

});
