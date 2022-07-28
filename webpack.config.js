const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// dev
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// prod
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const isProduction = env;
  const babelPlugins = [];

  if (!isProduction) {
    babelPlugins.push("react-refresh/babel");
  }

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
      filename: "bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: babelPlugins,
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    // dev
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      static: {
        directory: path.join(__dirname, "public/"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html")
      }),
      // dev
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      // prod
      new CopyPlugin({
        patterns: [{ from: "./public/static", to: "./" }],
      }),
    ],
  };
};
