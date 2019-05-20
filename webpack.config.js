module.exports = {
    devtool: 'eval',
    entry: './client',
    output: {
        path: __dirname,
        filename: 'public/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
}
