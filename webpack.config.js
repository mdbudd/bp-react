const path = require("path")
const fs = require("fs")
const { resolve } = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = (env, argv) => {
    const devConfig = dotenv.config({ path: resolve(__dirname, "./.env") })
    const ENV = {
        ...env,
        ...process.env,
        ...(argv.mode === "development" ? devConfig.parsed : {}),
    }
    const webpackMode = argv.mode
    const minifyOptions = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyUrls: true,
    }

    const config = {
        entry: { main: ["index.jsx"] },
        mode: webpackMode,
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].[contenthash].min.js",
            publicPath: "/",
        },
        resolve: {
            extensions: [".js", ".jsx", ".css", ".scss"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    oneOf: [
                        { exclude: /node_modules/, use: "babel-loader" },
                        { use: "source-map-loader" },
                    ],
                },
                {
                    test: /\.s?css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        { loader: "sass-loader" },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options:
                                webpackMode === "development"
                                    ? {}
                                    : {
                                          limit: 100000,
                                          name: "[name].[contenthash].[ext]",
                                          outputPath: "fonts/",
                                      },
                        },
                    ],
                },
                {
                    test: /\.(md)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options:
                                webpackMode === "development"
                                    ? {}
                                    : {
                                          limit: 100000,
                                          name: "[name].[contenthash].[ext]",
                                          outputPath: "blogs/",
                                      },
                        },
                    ],
                },
                {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options:
                                webpackMode === "development"
                                    ? {}
                                    : {
                                          limit: 100000,
                                          name: "[name].[contenthash].[ext]",
                                          outputPath: "assets/",
                                      },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        { loader: "babel-loader" },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: true,
                                svgo: { plugins: [{ removeViewBox: false }] },
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    include: /___assets___/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "svg-inline-loader",
                            options: { idPrefix: true },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                hash: true,
                inject: true,
                title: "BP React",
                template: "./public/index.html",
                filename: "./index.html",
                favicon: "./public/favicon/favicon.ico",
                minify: webpackMode === "development" ? {} : minifyOptions,
            }),
            new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(argv.mode) }),
        ],
    }

    if (argv.mode === "development") {
        config.devtool = "eval-source-map"
        config.plugins = [
            new ESLintPlugin({ extensions: ["js", "jsx"] }),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
            ...config.plugins,
        ]
        config.devServer = {
            port: 8999,
            static: path.join(__dirname, "build"),
            historyApiFallback: true,
            hot: true,
            https: {
                key: fs.readFileSync("certs/cert.key"),
                cert: fs.readFileSync("certs/cert.crt"),
                ca: fs.readFileSync("certs/ca.crt"),
            },
        }
        config.optimization = { minimize: false, emitOnErrors: false }
    }

    if (argv.mode === "production") {
        config.devtool = undefined
        config.plugins = [
            new CompressionPlugin({ test: /\.(js|css)$/i }),
            new CopyWebpackPlugin(copyFiles),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].min.css",
                chunkFilename: "[id].[contenthash].min.css",
            }),
            ...config.plugins,
        ]
        config.optimization = {
            minimize: true,
            minimizer: [new CssMinimizerPlugin()],
            sideEffects: true,
            concatenateModules: true,
            nodeEnv: "production",
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]]/,
                        name: "vendor",
                        chunks: "all",
                    },
                },
            },
        }
    }
    return config
}
