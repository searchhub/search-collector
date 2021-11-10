module.exports = {
	preset: "jest-puppeteer",
	testTimeout: 5000,
	globals: {
		URL: "http://localhost:8081"
	},
	testMatch: [
		"**/test/**/*.test.ts"
	],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	coverageDirectory: "./coverage",
	verbose: true
}
