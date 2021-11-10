const path = require('path');

/**
 * webpack is used to generate the different bundles for browser (window), commonjs and amd module loader
 * bundles will be placed to /dist
 */
const confFactory = (mode, type, name) => {
	return {
		entry: "./src/main/index.ts",
		target: "web",
		mode,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								configFile: "tsconfig.webpack.json"
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		},
		output: {
			filename: `index.${type}.js`,
			path: path.join(__dirname, './dist'),
			library: {
				name,
				type
			}
		},
		optimization: {
			minimize: false
		}
	};
}

module.exports = (env, {mode}) => ["window", "commonjs", "amd"].map(
	libType => confFactory(mode, libType, libType === "window" ? "SearchCollector" : void 0)
);