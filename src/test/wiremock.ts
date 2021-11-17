import {ChildProcess, exec} from "child_process";
import fetch from "node-fetch";
import {join} from "path";


let process: ChildProcess;
export const shutdownMockServer = async () => {
	if (process) {
		process.kill("SIGINT");
		process = void 0;
	}

	await waitForShutdown();
}

export const startMockServer = async () => {
	if (process || await isWiremockReady() === true)
		throw Error("mock server already started");

	process = exec("npm run test-server");
	const readyTime = await waitForReadiness();
	// console.debug(`wiremock ready after ${readyTime}ms`);
}

export const waitForShutdown = async (delay: number = 100, retries: number = 50) => {
	try {
		await fetch(`http://localhost:8081/__admin/shutdown`, {
			method: "POST"
		});
		return await waitForShutdown(delay, --retries)
	} catch (e) {
		if (e.code === "ECONNREFUSED")
			return true;
		return waitForShutdown(waitForShutdown(delay, --retries));
	}
}

export const verifyNoUnmatchedRequests = async () => {
	const journal = await getJournal();
	journal.requests.filter(req => !req.wasMatched)
		.forEach(entry => {
			if (!isAllowedUnmatchedRequest(entry))
				throw Error(`Unmatched stub mappings. Please delete the mapping or check your test. Request ${entry.id} with url ${entry.request.url}`);
		});
}

function isAllowedUnmatchedRequest(entry) {
	const url = entry.request.url;
	const allowedUrls = ["index.window.bundle.js", "__healthcheck", "page.html"];
	return !!allowedUrls.find(allowedUrl => url.indexOf(allowedUrl) > -1);
}

export const waitForReadiness = async (delay: number = 100, retries: number = 50) => {
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

export const isWiremockReady = async () => {
	try {
		const res: Response = await fetch(`http://localhost:8081/__healthcheck`, {
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

class StubAsserter {

	private disposed: boolean;
	private testFunctions: Array<Function> = [];

	constructor(private readonly stub) {
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
		await verifyStubMappingCallCount(this.stub.id, callCount);
	}

	verifyBody(assertFn: (body: any) => void) {
		this.testFunctions.push(async () => {
			await this._verifyBody(assertFn);
		});
		return this;
	}

	private async _verifyBody(assertFn: (body: any) => void) {
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.body);
	}

	verifyHeaders(assertFn: (headers: { [key: string]: string }) => void) {
		this.testFunctions.push(async () => {
			await this._verifyHeaders(assertFn);
		});
		return this;
	}

	private async _verifyHeaders(assertFn: (headers: { [key: string]: string }) => void) {
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.headers);
	}

	verifyCookies(assertFn: (cookies: { [key: string]: string }) => void) {
		this.testFunctions.push(async () => {
			await this._verifyCookies(assertFn);
		});
		return this;
	}

	private async _verifyCookies(assertFn: (cookies: { [key: string]: string }) => void) {
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.cookies);
	}

	verifyRequest(assertFn: (request: any) => void) {
		this.testFunctions.push(async () => {
			await this._verifyRequest(assertFn);
		});
		return this;
	}

	private async _verifyRequest(assertFn: (request: any) => void) {
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request);
	}

	verifyQueryParams(assertFn: (queryParams: { [key: string]: { key: string, values: Array<string> } }) => void) {
		this.testFunctions.push(async () => {
			await this._verifyQueryParams(assertFn);
		});
		return this;
	}

	private async _verifyQueryParams(assertFn: (queryParams: { [key: string]: { key: string, values: Array<string> } }) => void) {
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.queryParams);
	}

	private async fetchJournalEntry() {
		const entry = (await getJournal()).requests.find(entry => entry.stubMapping.id === this.stub.id);
		if (!entry)
			throw Error(`Could not find stub for id ${this.stub.id} with filename ${this.stub.__filename}, 
			probably (1) your api-stub did not match your request or \n 
			(2) there were no request at all or \n
			(3) another stub matched your request.`);

		return entry;
	}

	private async dispose() {
		this.disposed = true;
		await deleteStubMapping(this.stub.id);
	}

	private checkDisposed() {
		if (this.disposed === true)
			throw Error("This asserter is already disposed");
	}
}

export const deleteStubMapping = async (id: string) => {
	const res: Response = await fetch(`http://localhost:8081/__admin/mappings/${id}`, {
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

export const createStubAsserter = async (filename: string): Promise<StubAsserter> => {
	const stub = await createStubMapping(filename);
	stub.__filename = filename;
	return new StubAsserter(stub);
}

export const createStubMapping = async (filename: string) => {
	const mapping: any = require(join(__dirname, "mock", "api-stubs", filename));

	if (!mapping)
		throw Error(`mapping ${filename} not found`);

	const res = await fetch(`http://localhost:8081/__admin/mappings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(mapping)
	});

	return await res.json();
}

export const verifyStubMappingCallCount = async (id: string, callCount: number) => {
	const journal = await getJournal();
	const called = journal.requests.reduce((acc, request) => request.stubMapping.id === id ? ++acc : acc, 0);
	expect(called).toBe(callCount);
}

export const getJournal = async () => {
	return await (await fetch("http://localhost:8081/__admin/requests", {method: "GET"})).json();
}

export const wait = async (ms) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}