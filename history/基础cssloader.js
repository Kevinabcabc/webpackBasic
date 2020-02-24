let path =require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',// production development
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
    ],
    module: {
        rules: [//loader 有顺序 从右向左 从下到上
            {
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert:'title'
                        }
                    },
                    'css-loader'
                ]
            },//css-loader  解析 @import语法   style-loader 把css插入header中   loader 特点功能单一
            {
                test:/\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert:'title'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    }
}