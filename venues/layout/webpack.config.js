const path = require("path");
const setConf = require("@css-pad/config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, args) => {
  const { mode = "development" } = args;
  return merge([
    setConf(mode),
    {
      context: path.resolve(__dirname, "./src"),
      entry: {
        grid: "./grid/app.js",
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./grid/index.html",
          filename: "grid/index.html",
          chunks: ["grid"],
        }),
      ],
      devServer: {
        open: {
          target: "grid",
        },
      },
    },
  ]);
};
