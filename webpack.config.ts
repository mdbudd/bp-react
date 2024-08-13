import path from "path"
import webpack, {Configuration} from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ESLintPlugin from "eslint-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin"
import dotenv from "dotenv"
const envExt = dotenv.config().parsed

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development
        ? {}
        : {
              devtool: "eval-source-map",
              devServer: {
                  port: 8888,
                  host: "0.0.0.0", // to accept connections from outside container
                  allowedHosts: "all",
                  static: path.join(__dirname, "dist"),
                  historyApiFallback: true,
                  hot: true,
                  devMiddleware: {
                      writeToDisk: true,
                  },
                  //   open: {
                  //       target: ["/"],
                  //       app: {
                  //           name: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
                  //       },
                  //   },
                  // https: {
                  //     key: fs.readFileSync("certs/cert.key"),
                  //     cert: fs.readFileSync("certs/cert.crt"),
                  //     ca: fs.readFileSync("certs/ca.crt"),
                  // },
                  // client: {
                  //     webSocketURL: {
                  //         port: 443,
                  //     },
                  // },
              },
          }),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
        // plugins: [new TsconfigPathsPlugin()] // TODO: try this https://stackoverflow.com/questions/66502671/tsconfigpathsplugin-type-not-compatible-with-webpack-5
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "app.bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: /dist/,
            },
            {
                test: /\.s?css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    // {
                    //     loader: "resolve-url-loader",
                    //     options: { removeCR: true },
                    // },
                    {loader: "sass-loader"},
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: env.development
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
                        options: env.development
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
                test: /\.(png|jpeg|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: env.development
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
                exclude: /fonts/,
                use: [
                    {loader: "babel-loader"},
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true,
                            svgo: {plugins: [{removeViewBox: false}]},
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
                        options: {idPrefix: true},
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            title: "",
            template: "./public/index.html",
            favicon: "./assets/favicon/favicon.ico",
            filename: "./index.html",
            ppurl: `https://www.paypal.com/sdk/js?client-id=${
                env.production ? envExt?.PP_CID : envExt?.PPS_CID
            }&currency=GBP`,
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            "process.env.VERSION": JSON.stringify(require("./package.json").version),
            "process.env.APP_NAME": JSON.stringify(envExt?.APP_NAME) || "",
            "process.env.APP_STRAP": JSON.stringify(envExt?.APP_STRAP) || "",
            "process.env.APP_TITLE": JSON.stringify(envExt?.APP_TITLE) || "",
            "process.env.APP1_NAME": JSON.stringify(envExt?.APP1_NAME) || "",
            "process.env.APP1_STRAP": JSON.stringify(envExt?.APP1_STRAP) || "",
            "process.env.APP1_TITLE": JSON.stringify(envExt?.APP1_TITLE) || "",
            "process.env.SERVER_DEV": JSON.stringify(envExt?.SERVER_DEV) || "",
            "process.env.SERVER_PROD": JSON.stringify(envExt?.SERVER_PROD) || "",
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({files: "./src/**/*.{ts,tsx,js,jsx}"}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, "assets"), to: "assets"},
            ],
        }),
    ],
})

export default webpackConfig
