const path = require('path');
const fs = require("fs");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    // env.WEBPACK_BUNDLE = false;
    const {mode} = argv;
    const entries = getEntries();
    return {
        entry: "./src/main/index.ts",
        target: "web",
        mode,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            // context: __dirname + '/src/main'
                            // configFile: "tsconfig-ems.json"
                        }
                    },
                    exclude: [/node_modules/, /test/]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, './dist'),
        },
        plugins: [
            new CleanWebpackPlugin()
        ],
        // optimization: {
        //     minimize: false
        // }
    };
};

// one entry for each subfolder
const getEntries = () => {
    return getAllFiles('./src/main/')
        .map(filepath => ({[filepath.replace(__dirname + "/src/main/", "").replace(".ts", "")]: filepath}))
        .reduce((acc, dirData) => ({...acc, ...dirData}), {});

}

const getAllFiles = function (dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        }
    })

    return arrayOfFiles
}