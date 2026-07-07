import path from "node:path";
import { adaptiveMerge, getCurrentPath } from "@css-pad/config/tools";
import setConf from "@css-pad/config/webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = getCurrentPath(import.meta.url);

export default function (env, args) {
  const { mode = "development" } = args;
  return adaptiveMerge(setConf(mode), {
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
  });
}
