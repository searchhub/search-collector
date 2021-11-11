import {ChildProcess, exec} from "child_process";
import fetch from "node-fetch";
import {join} from "path";


let process: ChildProcess;
export const shutdownMockServer = async () => {
	if (process) {
		process.kill("SIGINT");
		process = void 0;
	}

	try {
		const res = await fetch(`http://localhost:8081/__admin/shutdown`, {
			method: "POST"
		});
	} catch (e) {
		// nop
	}

	await waitForShutdown();
}

export const startMockServer = async () => {
	if (process || await isWiremockReady() === true)
		throw Error("mock server already started");

	process = exec("npm run test-server");
	const readyTime = await waitForReadiness();
	console.debug(`wiremock ready after ${readyTime}ms`);
}

export const waitForShutdown = async (delay: number = 100, retries: number = 50) => {
	// TODO implement me
	return wait(100);
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

	disposed: boolean;

	constructor(private readonly stub) {
	}

	async verifyCallCount(callCount: number) {
		this.checkDisposed();
		await verifyStubMappingCallCount(this.stub.id, callCount);
		return this;
	}

	async verifyBody(assertFn: (body: any) => void) {
		this.checkDisposed();
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.body);
		return this;
	}

	async verifyHeaders(assertFn: (headers: { [key: string]: string }) => void) {
		this.checkDisposed();
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.headers);
		return this;
	}

	async verifyCookies(assertFn: (cookies: { [key: string]: string }) => void) {
		this.checkDisposed();
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.cookies);
		return this;
	}

	async verifyRequest(assertFn: (request: any) => void) {
		this.checkDisposed();
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request);
		return this;
	}

	async verifyQueryParams(assertFn: (queryParams: { [key: string]: { key: string, values: Array<string> } }) => void) {
		this.checkDisposed();
		const entry = await this.fetchJournalEntry();
		await assertFn(entry.request.queryParams);
		return this;
	}

	private async fetchJournalEntry() {
		const entry = (await getJournal()).requests.find(entry => entry.stubMapping.id === this.stub.id);
		if (!entry)
			throw Error(`Could not find stub for id ${this.stub.id}`);

		return entry;
	}

	private async dispose() {
		this.disposed = true;
		//TODO implement me
	}

	private checkDisposed() {
		if (this.disposed === true)
			throw Error("This asserter is already disposed");
	}
}

export const createStubAsserter = async (filename: string): Promise<StubAsserter> => {
	const stub = await createStubMapping(filename);
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

export const verifyApiCallCount = async (callCount: number, filename: string) => {
	const mapping: any = require(join(__dirname, "mock", "mappings", filename));

	if (!mapping)
		throw Error(`mapping ${filename} not found`);

	if (!mapping.request)
		throw Error(`mapping ${filename} doesnt contain a request section`);

	const res = await fetch(`http://localhost:8081/__admin/requests/count`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(mapping.request)
	});
	const body = await res.json();

	if (body.count !== callCount)
		throw Error(`Expected API ${JSON.stringify(mapping.request)} to be called ${callCount} but instead was ${body.count}`);
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