const path = require('path');
const fs = require("fs");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    const {mode} = argv;
    //"window", "commonjs", "amd", "module"
    const type = "commonjs";
    const name = type === "window" ? "SearchCollector" : void 0;
    return {
        entry: "./dist/index.js",
        target: "web",
        mode,
        resolve: {
            extensions: ['.js']
        },
        output: {
            filename: `index.${type}.js`,
            path: path.resolve(__dirname, './dist/dist/'),
            library: {
                name,
                type
            }
        },
        plugins: [
            new CleanWebpackPlugin()
        ],
        optimization: {
            minimize: false,
            usedExports: false
        }
    };
};