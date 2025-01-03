const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = (env) => {
    return {
        mode: env === 'production' ? 'production' : 'development',
        entry: env === 'development' ? {
            hot: 'webpack/hot/dev-server.js',
            client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
            main: './src/index.ts',
        } : {
            main: './src/index.ts'
        },
        output: {
            clean: true,
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: './',// 设置资源路径以 `./` 开头
            filename: '[name].bundle.js',
            assetModuleFilename: 'assets/[name].[hash].js',
        },
        devtool: 'source-map',
        stats: 'errors-only',
        module: {
            rules: [{
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset',
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }]
        },
        plugins: [new HTMLWebpackPlugin({
            inject: 'body',
            minify: true,
            scriptLoading: 'defer',
            template: path.resolve(__dirname, './public', 'index.html')
        })],
        devServer: env === 'development' && {
            static: {
                directory: path.join(__dirname, 'dist')
            },
            compress: true,
            port: 9000,
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                }
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            extensions: ['.ts', '.js']
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            runtimeChunk: 'single',

        }
    }
}