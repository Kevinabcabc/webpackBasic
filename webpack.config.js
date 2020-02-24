let path =require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let MiniCssRxtractPlugins =  require('mini-css-extract-plugin')
let optimizeCss = require('optimize-css-assets-webpack-plugin')
let uglifyJsPlugin =  require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    // devServer: {
    //     port: 3000,
    //     progress: true,
    //     contentBase: './dist',
    //     compress: true
    // },
    optimization: {//优化项
        // minimizer: [
        //     new uglifyJsPlugin({
        //         cache: true,//缓存
        //         parallel: true,//并发打包
        //         sourceMap: true
        //     }),
        //     new optimizeCss()
        // ]
    },
    mode: 'development',// production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        // publicPath: 'http://www.baidu.com'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'html/index.html',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
            },
            hash:true
        }),
        new MiniCssRxtractPlugins({
            filename: 'css/main.css'
        }),
        // new webpack.ProvidePlugin({
        //     "$": "jquery"
        // })
    ],
    externals:{
        jquery:'$'
    },
    module: {
        rules: [//loader 有顺序 从右向左 从下到上
            // {
            //     test: /\.js/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'
            //         }
            //     }
            // },
            // {
            //     test: require.resolve('jquery'),
            //     use:'expose-loader?$'
            // },
            {
                test: /\.(html|htm)$/i,
                use: 'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            outputPath: '/assets',
                            limit: 1,
                            publicPath: 'http://www.baidu.com'
                        }
                    }
                ]
            },
            {
                test: /\.js/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators',{"legacy":true}],
                            ['@babel/plugin-proposal-class-properties',{"loose": true}],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname,'src'),
                exclude:/node_modules/,
            },
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