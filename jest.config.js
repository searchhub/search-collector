module.exports = {
	preset: "jest-puppeteer",
	testTimeout: 15000,
	globals: {
		URL: "http://localhost:8081"
	},
	testMatch: [
		"**/test/**/*.test.ts"
	],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	moduleDirectories: ["node_modules", "src"],
	coverageDirectory: "./coverage",
	verbose: true
}
