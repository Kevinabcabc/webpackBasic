let path =require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    mode: 'production',// production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8]js',
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            hash:true
        })
    ]
}