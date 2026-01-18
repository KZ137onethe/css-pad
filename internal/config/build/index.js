import * as esbuild from "esbuild";
import * as path from "path";
import { fileURLToPath } from "url";

const rootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");

// 构建
const ctx = await esbuild.context({
  entryPoints: [
    { in: path.resolve(rootPath, "tools/index.ts"), out: "tools" },
    { in: path.resolve(rootPath, "webpack/index.ts"), out: "webpack" },
  ],
  bundle: true,
  platform: "node",
  outdir: "target",
  // 将 esbuild 生成的文件的文件扩展名自定义
  outExtension: { ".js": ".mjs" },
  format: "esm",
  // 标记为 外部，不参与打包
  external: ["mini-css-extract-plugin", "fork-ts-checker-webpack-plugin"],
  sourcemap: "external",
  minify: false,
  treeShaking: true,
  allowOverwrite: true,
  alias: {
    "#": rootPath,
  },
  resolveExtensions: [".ts"],
  plugins: [],
});

// 监听
await ctx.watch();
