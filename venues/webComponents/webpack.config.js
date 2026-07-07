/* eslint-disable e18e/prefer-static-regex */
import path from "node:path";
import { adaptiveMerge, customMergeFn, getCurrentPath } from "@css-pad/config/tools";
import setConf from "@css-pad/config/webpack";

import CopyPlugin from "copy-webpack-plugin";
import * as es from "es-toolkit";
import HtmlWebpackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = getCurrentPath(import.meta.url);

// 合并配置的函数
const mergeFn = customMergeFn({
  customizeObject(arg1, arg2, key) {
    if (key === "module") {
      if ("rules" in arg1 && "rules" in arg2) {
        if (Array.isArray(arg1.rules) && Array.isArray(arg2.rules)) {
          const cloned = es.cloneDeep(arg1);
          cloned.rules = es.uniqBy([...arg2.rules, ...arg1.rules], v => v.test.source);
          return cloned;
        }
      }
      return es.toMerged(arg1, arg2);
    }
  },
  customizeArray(arg1, arg2, key) {
    if (key === "plugins") {
      return es.uniq([...arg1, ...arg2]);
    }
  },
});

export default function (env, args) {
  const { mode = "development" } = args;
  return adaptiveMerge(
    setConf(mode),
    {
      context: path.resolve(__dirname, "./example"),
      entry: {
        "word-count": "./word-count/app.js",
        "popup-info": "./popup-info/app.js",
        "emoji-switch": "./emoji-switch/app.js",
        "expanding-list": "./expanding-list/app.js",
        "custom-square": "./custom-square/app.js",
        "filled-circle": "./filled-circle/app.js",
      },
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/,
            oneOf: [
              {
                assert: { type: "css" },
                use: [
                  {
                    loader: "css-loader",
                    options: {
                      exportType: "css-style-sheet",
                      // Other options
                    },
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      api: "modern-compiler",
                    },
                  },
                ],
              },
              {
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  {
                    loader: "css-loader",
                    options: {
                      url: true,
                    },
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      api: "modern-compiler",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: "popup-info/assets", to: "assets" },
            { from: "expanding-list/assets", to: "assets" },
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
        new HtmlWebpackPlugin({
          template: "./expanding-list/index.html",
          filename: "expanding-list/index.html",
          chunks: ["expanding-list"],
        }),
        new HtmlWebpackPlugin({
          template: "./custom-square/index.html",
          filename: "custom-square/index.html",
          chunks: ["custom-square"],
        }),
        new HtmlWebpackPlugin({
          template: "./filled-circle/index.html",
          filename: "filled-circle/index.html",
          chunks: ["filled-circle"],
        }),
      ],
      devServer: {
        open: {
          // 打开路径
          target: "custom-square",
        },
      },
    },
    mergeFn,
  );
}
