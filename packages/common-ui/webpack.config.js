import path from "node:path";
import tools from "@css-pad/config/tools";
import setConf from "@css-pad/config/webpack";

import CopyPlugin from "copy-webpack-plugin";
import * as es from "es-toolkit";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack from "webpack";
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

export default function (env) {
  const { bundle, dev } = env;
  /* 开发环境 */
  if (dev) {
    return mergeFn(setConf("development"), {
      entry: {
        main: "./play/index.ts",
        register: "./src/index.ts",
        "e-switch": "./src/switch/index.ts",
      },
      output: {
        filename: "js/[name].[contenthash:5].bundle.js",
        chunkFilename: "js/[name].[contenthash:5].chunk.js",
        clean: true,
        library: {
          name: "ele",
          type: "window",
        },
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
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          _: __dirname,
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./play/index.html",
          filename: "play/index.html",
          chunks: ["register", "main"],
        }),
        // 定义全局变量，值只能是字符串
        new webpack.DefinePlugin({
          Ele: `window.ele`, // const Ele = window.ele
        }),
      ],
      devServer: {
        open: {
          target: "play",
        },
      },
    });
  } /* 打包环境 */ else if (bundle) {
    return mergeFn(setConf("production"), {
      entry: {
        "e-switch": "./src/switch/index.ts",
      },
      module: {
        // noPare: /^mobx$/,
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
      output: {
        path: path.resolve(__dirname, "target"),
        filename: "js/[name].js",
        chunkFilename: "js/[name].[contenthash:5].chunk.js",
        clean: true,
        library: {
          type: "module",
        },
      },
      target: "web",
      experiments: {
        outputModule: true,
      },
      externals: {
        mobx: "mobx",
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          _: __dirname,
        },
      },
    });
  }
}
