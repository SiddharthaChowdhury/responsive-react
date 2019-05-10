const path    = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist'),
        libraryTarget: 'commonjs2'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module:{
        rules:[
            {
                test: /\.(tsx|ts)?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}