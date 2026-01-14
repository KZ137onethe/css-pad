const path = require("path");
const setConf = require("@css-pad/config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, args) => {
  const { mode = "development" } = args;
  return merge([
    setConf(mode),
    {
      context: path.resolve(__dirname, "./example"),
      entry: {
        example_01: "./word-count/app.js",
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./word-count/index.html",
          filename: "word-count/index.html",
          chunks: ["example_01"],
        }),
      ],
      devServer: {
        open: {
          target: "word-count",
        },
      },
    },
  ]);
};
