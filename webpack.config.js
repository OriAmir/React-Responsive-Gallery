/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const PrettierPlugin = require("prettier-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new PrettierPlugin(),
    // new BundleAnalyzerPlugin(),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg|ts)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "commonjs react",
  },
  devServer: {
    contentBase: "./dist",
  },
  devtool: "inline-source-map",
};
