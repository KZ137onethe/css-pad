import path from "path";
import setConf from "@css-pad/config/webpack";
import tools from "@css-pad/config/tools";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

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
        "popup-info": "./popup-info/app.js",
        "emoji-switch": "./emoji-switch/app.js",
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: "popup-info/assets", to: "assets" },
          ],
        }),
        new HtmlWebpackPlugin({
          template: "./word-count/index.html",
          filename: "word-count/index.html",
          chunks: ["word-count"],
        }),
        new HtmlWebpackPlugin({
          template: "./popup-info/index.html",
          filename: "popup-info/index.html",
          chunks: ["popup-info"],
        }),
        new HtmlWebpackPlugin({
          template: "./emoji-switch/index.html",
          filename: "emoji-switch/index.html",
          chunks: ["emoji-switch"],
        }),
      ],
      devServer: {
        open: {
          target: "emoji-switch",
        },
      },
    },
  ]);
}
