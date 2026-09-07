import * as path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { toMerged } from "es-toolkit";

import * as esbuild from "esbuild";
import { clean } from "esbuild-plugin-clean";
import { environmentPlugin } from "esbuild-plugin-environment";

const rootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const env = process.env.NODE_ENV;

const conf = {
  entryPoints: [
    { in: path.resolve(rootPath, "index.ts"), out: "main" },
  ],
  bundle: true,
  platform: "node",
  outdir: "dist",
  // 将 esbuild 生成的文件的文件扩展名自定义
  outExtension: { ".js": ".mjs" },
  format: "esm",
  // 标记为 外部，不参与打包
  external: [],
  treeShaking: true,
  allowOverwrite: true,
  alias: {
    "@": rootPath,
  },
  resolveExtensions: [".ts"],
  plugins: [
    // 提供环境变量
    environmentPlugin(["NODE_ENV"]),
    // 每次构建清理之前的构建产物
    clean({
      patterns: ["./dist/*"],
    }),
  ],
};

if (env === "dev") {
  // 监听
  (async () => {
    const config = toMerged(conf, {
      sourcemap: "external",
      minify: false,
    });
    const ctx = await esbuild.context(config);
    await ctx.watch();
  })();
} else if (env === "prod") {
  (async () => {
    const config = toMerged(conf, {
      sourcemap: false,
      minify: true,
    });
    const ctx = await esbuild.context(config);
    await ctx.rebuild();
    ctx.dispose();
  })();
}
