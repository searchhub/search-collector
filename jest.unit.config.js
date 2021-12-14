module.exports = {
	testEnvironment: "jsdom",
	testTimeout: 5000,
	testMatch: [
		"**/test/**/*.test.unit.ts"
	],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	moduleDirectories: ["node_modules", "src"],
	coverageDirectory: "./coverage",
	verbose: true
}
