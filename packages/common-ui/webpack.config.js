import path from "node:path";
import tools from "@css-pad/config/tools";
import setConf from "@css-pad/config/webpack";

import CopyPlugin from "copy-webpack-plugin";
import * as es from "es-toolkit";
import HtmlWebpackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge, mergeWithCustomize } from "webpack-merge";

const { getCurrentPath } = tools;
const __dirname = getCurrentPath(import.meta.url);

// 合并配置的函数
const mergeFn = mergeWithCustomize({
  customizeObject(arg1, arg2, key) {
    if (key === "module") {
      return es.merge({}, arg1, arg2);
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
  return mergeFn(setConf(mode), {
    entry: {
      "e-switch": "./src/switch/index.ts",
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
        // {
        //   test: /\.css$/,
        //   oneOf: [
        //     {
        //       assert: { type: "css" },
        //       loader: "css-loader",
        //       options: {
        //         exportType: "css-style-sheet",
        //         // Other options
        //       },
        //     },
        //     {
        //       use: [
        //         {
        //           loader: MiniCssExtractPlugin.loader,
        //         },
        //         {
        //           loader: "css-loader",
        //           options: {
        //             url: true,
        //           },
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./play/index.html",
        filename: "play/index.html",
        chunks: ["e-switch"],
      }),
    ],
    devServer: {
      open: {
        target: "play",
      },
    },
  });
}
