import path from "path";
import setConf from "@css-pad/config/webpack";
import tools from "@css-pad/config/tools";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

const { getCurrentPath } = tools;
const __dirname = getCurrentPath(import.meta.url);

export default function (env, args) {
  const { mode = "development" } = args;
  return merge([
    setConf(mode),
    {
      context: path.resolve(__dirname, "./example"),
      entry: {
        "word-count": "./word-count/app.js",
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./word-count/index.html",
          filename: "word-count/index.html",
          chunks: ["word-count"],
        }),
      ],
      devServer: {
        open: {
          target: "word-count",
        },
      },
    },
  ]);
}
