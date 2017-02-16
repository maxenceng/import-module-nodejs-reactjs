module.exports = {
    entry: './src/assets/js/index.jsx',
    output: {
        path: __dirname + '/app/assets/js',
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}