import {createMockServer} from "../wiremock";
import {Page} from "puppeteer";
import {wait} from "../util";
import {base64Encode} from "../../main/utils/Util";

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

        const data = {
            type: "error",
            msg: "some error message",
            channel: "default-writer-channel",
            session: "my-session",
            timestamp: 555,
            arguments: [],
            url: "http://localhost:{port}/SQSErrorTransport.page.html".replace("{port}", String(asserter.getPort())),
            referrer: "",
            lang: "en-US"
        };

        await asserter.verifyCallCount(1)
            .verifyQueryParams(params => {
                expect(params["MessageBody"].values.length).toBe(1);
                // timestamp is shimmed in browser to always be 555, this way we can just assert the encoded string
                expect(params["MessageBody"].values[0]).toBe(base64Encode(encodeURIComponent(`[${JSON.stringify(data)}]`)));
            })
            .verify();
    })

});
