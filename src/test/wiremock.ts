import {ChildProcess, exec} from "child_process";
import fetch from "node-fetch";
import {join} from "path";
import {getRandomInt, wait} from "./util";

export class StubAsserter {

	private disposed: boolean;
	private testFunctions: Array<Function> = [];

	constructor(private readonly stub,
							private readonly serverPort: number) {
	}

	async verify() {
		this.checkDisposed();
		try {
			for (let i = 0; i < this.testFunctions.length; i++) {
				await this.testFunctions[i]();
			}
		} catch (e) {
			throw e;
		} finally {
			await this.dispose();
		}
	}

	verifyCallCount(callCount: number) {
		this.testFunctions.push(async () => {
			await this._verifyCallCount(callCount);
		});
		return this;
	}

	private async _verifyCallCount(callCount: number) {
		await this.verifyStubMappingCallCount(this.stub.id, callCount);
	}

	verifyBody(assertFn: (body: any) => void) {
		this.testFunctions.push(async () => {
			await this._verifyBody(assertFn);
		});
		return this;
	}

	private async _verifyBody(assertFn: (body: any, i: number) => void) {
		const entries = await this.fetchJournalEntry();
		for (let i = 0; i < entries.length; i++) {
			await assertFn(entries[i].request.body, i);
		}
	}

	verifyHeaders(assertFn: (headers: { [key: string]: string }) => void) {
		this.testFunctions.push(async () => {
			await this._verifyHeaders(assertFn);
		});
		return this;
	}

	private async _verifyHeaders(assertFn: (headers: { [key: string]: string }, i: number) => void) {
		const entries = await this.fetchJournalEntry();
		for (let i = 0; i < entries.length; i++) {
			await assertFn(entries[i].request.headers, i);
		}
	}

	verifyCookies(assertFn: (cookies: { [key: string]: string }) => void) {
		this.testFunctions.push(async () => {
			await this._verifyCookies(assertFn);
		});
		return this;
	}

	private async _verifyCookies(assertFn: (cookies: { [key: string]: string }, i: number) => void) {
		const entries = await this.fetchJournalEntry();
		for (let i = 0; i < entries.length; i++) {
			await assertFn(entries[i].request.cookies, i);
		}
	}

	verifyRequest(assertFn: (request: any) => void) {
		this.testFunctions.push(async () => {
			await this._verifyRequest(assertFn);
		});
		return this;
	}

	private async _verifyRequest(assertFn: (request: any, i: number) => void) {
		const entries = await this.fetchJournalEntry();
		for (let i = 0; i < entries.length; i++) {
			await assertFn(entries[i].request, i);
		}
	}

	verifyQueryParams(assertFn: (queryParams: { [key: string]: { key: string, values: Array<string> } }, i:number) => void) {
		this.testFunctions.push(async () => {
			await this._verifyQueryParams(assertFn);
		});
		return this;
	}

	private async _verifyQueryParams(assertFn: (queryParams: {
		[key: string]: { key: string, values: Array<string> }
	}, i: number) => void) {
		const entries = await this.fetchJournalEntry();
		for (let i = 0; i < entries.length; i++) {
			await assertFn(entries[i].request.queryParams, i);
		}
	}

	private async fetchJournalEntry() {
		const requests = (await this.getJournal()).requests;
		const entries = requests.filter(entry => entry.stubMapping.id === this.stub.id);
		if (entries?.length == 0)
			throw Error(`Could not find stub for id ${this.stub.id} with filename ${this.stub.__filename}, 
			probably (1) your api-stub did not match your request or \n 
			(2) there were no request at all or \n
			(3) another stub matched your request.`);

		return entries;
	}

	private async dispose() {
		this.disposed = true;
		await this.deleteStubMapping(this.stub.id);
	}

	private async verifyStubMappingCallCount(id: string, callCount: number) {
		const journal = await this.getJournal();
		const called = journal.requests.reduce((acc, request) => request.stubMapping.id === id ? ++acc : acc, 0);
		expect(called).toBe(callCount);
	}

	private async getJournal() {
		return await (await fetch(`http://localhost:${this.serverPort}/__admin/requests`, {method: "GET"})).json();
	}

	private async deleteStubMapping(id: string) {
		const res = await fetch(`http://localhost:${this.serverPort}/__admin/mappings/${id}`, {
			method: "DELETE"
		});

		if (res.status === 404) {
			console.debug(`stub mapping with id ${id} did not exist`);
			return false;
		} else if (res.status !== 200) {
			console.error(`could not delete stub mapping with id ${id}`);
			return false;
		}

		return true;
	}

	private checkDisposed() {
		if (this.disposed === true)
			throw Error("This asserter is already disposed");
	}
}


export const createMockServer = (port = getRandomInt(49152, 65535)) => {
	let process: ChildProcess;

	const shutdown = async () => {
		try {
			await fetch(`http://localhost:${port}/__admin/shutdown`, {
				method: "POST"
			});
			return false;
		} catch (e) {
			return e.code === "ECONNREFUSED";
		}
	}

	const waitForShutdown = async (delay: number = 50, retries: number = 100) => {
		if (await shutdown())
			return true;
		else {
			await wait(delay);
			return await waitForShutdown(delay, --retries)
		}
	}

	function isAllowedUnmatchedRequest(entry) {
		const url = entry.request.url;
		const allowedUrls = ["index.window.bundle.js", "__healthcheck", "page.html"];
		return !!allowedUrls.find(allowedUrl => url.indexOf(allowedUrl) > -1);
	}

	const waitForReadiness = async (delay: number = 250, retries: number = 50) => {
		const origRetries = retries;
		while (retries > 0) {
			const isReady = await isWiremockReady();
			if (isReady)
				return delay * Math.min((origRetries - retries), 1);

			retries--;
			await wait(delay);
		}

		throw Error(`wiremock is not ready after ${origRetries} retries each ${delay}ms`);
	}

	const createStubMapping = async (filename: string) => {
		const mapping: any = require(join(__dirname, "mock", "api-stubs", filename));

		if (!mapping)
			throw Error(`mapping ${filename} not found`);

		const res = await fetch(`http://localhost:${port}/__admin/mappings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(mapping)
		});

		return await res.json();
	}

	const getJournal = async () => {
		return await (await fetch(`http://localhost:${port}/__admin/requests`, {method: "GET"})).json();
	}

	const isWiremockReady = async () => {
		try {
			const res = await fetch(`http://localhost:${port}/__healthcheck`, {
				method: "GET"
			});

			await res.json();

			if (res.status === 200)
				return true;
		} catch (e) {
			//nop
		}

		return false;
	}

	return {
		startMockServer: async () => {
			if (process || await isWiremockReady() === true)
				throw Error("mock server already started");

			process = exec(`npx wiremock --port ${port} --verbose --root-dir ${__dirname + "/mock"}`);
			process.stderr.on("data", data => console.error(data));
			process.stdout.on("data", data => console.debug(data));
			const readyTime = await waitForReadiness();
			// console.debug(`wiremock ready after ${readyTime}ms`);
		},
		shutdownMockServer: async () => {
			if (process) {
				process.kill("SIGKILL");
				process = void 0;

				await shutdown();
				await wait(100);
				await waitForShutdown();
			}
		},
		createStubAsserter: async (filename: string): Promise<StubAsserter> => {
			const stub = await createStubMapping(filename);
			stub.__filename = filename;
			return new StubAsserter(stub, port);
		},
		verifyNoUnmatchedRequests: async () => {
			const journal = await getJournal();
			journal.requests.filter(req => !req.wasMatched)
				.forEach(entry => {
					if (!isAllowedUnmatchedRequest(entry))
						throw Error(`Unmatched stub mappings. Please delete the mapping or check your test. Request ${entry.id} with url ${entry.request.url}`);
				});
		},
		getPort: () => {
			return port;
		},
		getHost: () => {
			return `http://localhost:${port}`;
		}
	}
}
