const path = require('path');
var webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')

module.exports = (env) => {
    return {
        entry: {
            "index": "./src/index.tsx",
            "admin": "./src/admin.tsx",
        },
        output: {
            filename: '[name].[chunkhash].js',
            publicPath: '/',
            //path: path.resolve("./", 'dist'),
            path: path.resolve(__dirname, 'dist'),
        },
        devtool: 'source-map',
        devServer: {
            contentBase: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
            index: './index.html',
            proxy: {
                '/api': {
                    target: 'http://localhost:5783',
                    //secure: false,
                }
            },
            historyApiFallback: true
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
            alias: {
                COMMON: path.resolve(__dirname, 'src/common/'),
                UTILS: path.resolve(__dirname, 'src/utils/'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.mp4$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'awesome-typescript-loader',
                },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                }
            ],
        },

        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.DefinePlugin({ 'process.env.API': JSON.stringify(env.API) }),
            new CopyPlugin([{ from: './public', to: '' }]),
            new HtmlPlugin({
                inject: true,
                chunks: ['index'],
                filename: 'index.html',
                template: path.resolve('public', 'index.html')
            }),
            new HtmlPlugin({
                inject: true,
                chunks: ['admin'],
                filename: 'admin.html',
                template: path.resolve('public', 'admin.html')
            })
        ]
    }
};
