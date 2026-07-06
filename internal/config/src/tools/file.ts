import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// 获取当前文件路径
function getCurrentPath(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}

export {
  getCurrentPath,
};
