const path = require('path');

const confFactory = (mode, type, name) => {
    return {
        entry: "./src/main/index.ts",
        target: "web",
        mode,
        devtool: mode === "production" ? false : "inline-source-map",
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
            filename: `index.${type}.bundle.js`,
            path: path.join(__dirname, './dist'),
            library: {
                name,
                type
            }
        },
        optimization: {
            minimize: mode === "production",
            usedExports: false
        }
    };
}

module.exports = (env, {mode}) => ["window", "commonjs", "amd"].map(
    libType => confFactory(mode, libType, libType === "window" ? "SearchCollector" : void 0)
);