const path = require('path');
const config = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'build') // == `${__dirname}/output`
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            }
        ]
    }
};

module.exports = config;