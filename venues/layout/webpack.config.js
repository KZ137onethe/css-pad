import path from "node:path";
import setConf from "@css-pad/config";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default function (env, args) {
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
}
