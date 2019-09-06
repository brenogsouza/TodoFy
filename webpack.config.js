const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const devMode = process.env === "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    open: true,
    port: 3333
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ["*", ".js", ".jsx"]
        },
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/images/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};

if (process.env === "production") {
  module.exports.plugins.push(
    new OptimizeCSSAssets() // call the css optimizer (minification)
  );
}
