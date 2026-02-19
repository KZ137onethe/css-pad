import type { UnknownRecord } from "type-fest";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { cloneDeep, difference, intersection, mergeWith, uniq } from "es-toolkit";

/**
 * 自适应合并,同 webpack-merge 的默认行为，主要用于合并webpack配置选项
 * 1. 数据类型不一样，后面完全覆盖前面；
 * 2. 如果两者都是基础数据类型，后面覆盖前面；
 * 3. 如果两者都是数组，就会把两个数组进行合并
 * 4. 如果两者都是对象，那么里面的对象会递归合并成一个对象
 * @param target  目标对象
 * @param source  被合并对象
 * @returns
 */
function adaptiveMerge(target: UnknownRecord, source: UnknownRecord) {
  const protoName = (val: unknown): string => Object.prototype.toString.call(val).slice(8, -1);
  const primitiveSet = new Set([
    "string",
    "number",
    "bigint",
    "boolean",
    "undefined",
    "symbol",
    "null",
  ]);
  return mergeWith(target, source, customMerge);

  function customMerge(originVal, newVal, key: string) {
    const [originType, newValType] = [originVal, newVal].map(protoName);
    // 数据类型不一样，后面完全覆盖前面；
    if (newValType !== originType) {
      return newVal;
    }

    // 都是基础数据类型，后面覆盖前面；
    if (
      [originType, newValType]
        .map(val => String.prototype.toLowerCase.call(val))
        .every(val => primitiveSet.has(val))
    ) {
      return newVal;
    }

    // 都是数组，就会把两个数组进行合并
    if (Array.isArray(originVal) && Array.isArray(newVal)) {
      console.log("array");
      return uniq([...originVal, ...newVal]);
    }

    // 都是对象，那么里面的对象会递归合并成一个对象
    if (
      [originType, newValType]
        .map(val => String.prototype.toLowerCase.call(val))
        .every(val => val === "object")
    ) {
      const clonedVal = cloneDeep(originVal);

      const ownKeys = intersection(Object.keys(originVal), Object.keys(newVal));
      const deleteKeys = difference(Object.keys(originVal), Object.keys(newVal));
      const appendKeys = difference(Object.keys(newVal), Object.keys(originVal));
      // originVal对象的键和newVal对象的键都存在
      for (let key of ownKeys) {
        clonedVal[key] = customMerge(originVal, newVal, key);
      }
      // originVal对象的键存在而newVal对象的键不存在
      for (let key of deleteKeys) {
        delete clonedVal[key];
      }
      // newVal对象的键存在而originVal对象的键不存在
      for (let key of appendKeys) {
        clonedVal[key] = newVal[key];
      }

      return clonedVal;
    }

    // 其他类型的,如: Date，RegExp，Function等等，后面覆盖前面；
    return newVal;
  }
}

// 多个对象自适应合并
function multipleAdaptiveMerge(target: UnknownRecord, ...args: UnknownRecord[]) {
  return [...args].reduce((pre, cur) => adaptiveMerge(pre, cur), target);
}

// 获取当前文件路径
function getCurrentPath(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}

export default {
  adaptiveMerge,
  multipleAdaptiveMerge,
  getCurrentPath,
};
