import * as path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// @ts-ignore
import tools from "#/tools/index";

const { getCurrentPath, adaptiveMerge } = tools;
const __dirname = getCurrentPath(import.meta.url);

const conConf = {
  output: {
    filename: "js/[name].[contenthash:5].bundle.js",
    chunkFilename: "js/[name].[contenthash:5].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx?)$/i,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
			{
				test: /\.s[ac]ss$/,
				oneOf: [
					{
						assert: { type: "css" },
						use:[
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
						]
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
					}
				]
			},
      {
        test: /\.css$/,
				oneOf:[
					{
						assert: { type: "css" },
						loader: "css-loader",
						options: {
							exportType: "css-style-sheet",
							// Other options
						},
					},
					{
						use:[
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{

								loader: "css-loader",
								options: {
									url: true,
								},
							},
						],
					}
				]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].css",
      chunkFilename: "stylesheets/[name].chunk.css",
    }),
    // new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".mts", ".cts", ".ts", ".tsx", ".js", ".json"],
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
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
};

const prodConf = {
  mode: "production",
  devtool: false,
};

export default function (env) {
  switch (env) {
    case "development": {
      return adaptiveMerge(conConf, devConf);
    }
    case "production": {
      return adaptiveMerge(conConf, prodConf);
    }
  }
}
