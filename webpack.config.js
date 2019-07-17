const path = require('path');
const config = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'build') // == `${__dirname}/output`
    }
};

module.exports = config;