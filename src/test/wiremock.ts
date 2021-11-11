import {ChildProcess, exec} from "child_process";
import fetch from "node-fetch";
import {join} from "path";


let process: ChildProcess;
export const shutdownMockServer = async () => {
	if (process) {
		process.kill("SIGINT");
		process = void 0;

		try {
			await fetch(`http://localhost:8081/__admin/shutdown`, {
				method: "POST"
			});
		} catch (e) {
			console.error("Could not stop wiremock server: ", e);
		}
	}
}

export const startMockServer = async () => {
	if (process || await isWiremockReady() === true)
		throw Error("mock server already started");

	process = exec("npm run test-server");
	const readyTime = await waitForReadiness();
	console.debug(`wiremock ready after ${readyTime}ms`);
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

		if (res.status === 200)
			return true;
	} catch (e) {
		//nop
	}

	return false;
}

export const verifyApiCallCount = async (callCount: number, filename: string) => {
	const mapping: any = require(join(__dirname, "mock", "mappings", filename));

	if (!mapping)
		throw Error(`mapping ${filename} not found`);

	if (!mapping.request)
		throw Error("mapping ${filename} doesnt contain a request section");

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