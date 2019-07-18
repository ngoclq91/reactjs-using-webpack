const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
            },
            {
                // use: ['style-loader', 'css-loader'], // nếu ko sử dụng plugin extract-text-webpack-plugin thì sủ dụng cái này (nếu sử dụng plugin thì sử dụng cách viết dưới)
                use: ExtractTextPlugin.extract({
                    use: "css-loader",
                    fallback: "style-loader"
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.bundle.css'
        })
    ]
};

module.exports = config;