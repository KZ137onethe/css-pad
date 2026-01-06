const path = require("path");
const { merge } = require("webpack-merge");

const conConf = {
  output: {
    filename: "js/[name].[contenthash:5].bundle.js",
    chunkFilename: "js/[name].[contenthash:5].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader",
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
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    alias: {
      "#": path.resolve(__dirname, "src"),
    },
  },
  stats: {
    assets: true,
    colors: true,
    env: false,
    modules: false,
    hash: false,
  },
};

const devConf = {
  mode: "development",
  devtool: "cheap-source-map",
  devServer: {
    port: "auto",
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    host: "local-ip",
    open: {
      app: {
        name: "chrome",
      },
    },
  },
};

const prodConf = {
  mode: "production",
  devtool: false,
};

module.exports = (env) => {
  switch (env) {
    case "development": {
      return merge([conConf, devConf]);
    }
    case "production": {
      return merge([conConf, prodConf]);
    }
  }
};
