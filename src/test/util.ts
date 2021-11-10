const {exec} = require('child_process');
const fetch = require('node-fetch');


export const shutdownMockServer = async () => {
	await fetch(`http://localhost:8081/__admin/shutdown`, {
		method: "POST"
	});
}

export const startMockServer = async () => {
	exec("npm run test-server");
}