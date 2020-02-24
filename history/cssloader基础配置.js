let path =require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let MiniCssRxtractPlugins =  require('mini-css-extract-plugin')
let optimizeCss = require('optimize-css-assets-webpack-plugin')
let uglifyJsPlugin =  require('uglifyjs-webpack-plugin')
module.exports = {
    // devServer: {
    //     port: 3000,
    //     progress: true,
    //     contentBase: './dist',
    //     compress: true
    // },
    optimization: {//优化项
        minimizer: [
            new uglifyJsPlugin({
                cache: true,//缓存
                parallel: true,//并发打包
                sourceMap: true
            }),
            new optimizeCss()
        ]
    },
    mode: 'production',// production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
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
        }),
        new MiniCssRxtractPlugins({
            filename: 'main.css'
        })
    ],
    module: {
        rules: [//loader 有顺序 从右向左 从下到上
            {
                test:/\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insert:'title'
                    //     }
                    // },
                    MiniCssRxtractPlugins.loader,
                    'css-loader',
                    'postcss-loader',

                ]
            },//css-loader  解析 @import语法   style-loader 把css插入header中   loader 特点功能单一
            {
                test:/\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insert:'title'
                    //     }
                    // },
                    MiniCssRxtractPlugins.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
        ]
    },

}