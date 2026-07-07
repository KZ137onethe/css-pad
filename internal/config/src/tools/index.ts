import type { UnknownRecord } from "type-fest";

import { cloneDeep, difference, intersection, mergeWith, uniq } from "es-toolkit";
import { isFunction, isPlainObject } from "es-toolkit/predicate";

type MergeFn<T = unknown> = (val1: T, val2: T, key?: string) => unknown;
interface CustomMergeFn {
  customizeObject?: MergeFn<Record<string | number | symbol, any>>;
  customizeArray?: MergeFn<any[]>;
}

// 自适应合并,同 webpack-merge 的默认行为，主要用于合并webpack配置选项
function adaptiveMerge(
  target: UnknownRecord,
  source: UnknownRecord,
  mergeFn: MergeFn = defaultMerge,
): UnknownRecord {
  const cloned = cloneDeep(target);
  // 防止修改源对象
  return mergeWith(cloned, source, mergeFn);
}

/**
 * 自适应合并的默认合并方法
 * 1. 数据类型不一样，后面完全覆盖前面；
 * 2. 如果两者都是基础数据类型，后面覆盖前面；
 * 3. 如果两者都是数组，就会把两个数组进行合并
 * 4. 如果两者都是对象，那么里面的对象会递归合并成一个对象
 * @param originVal  原值
 * @param newVal  新值
 * @returns unknown
 */
function defaultMerge(originVal: unknown, newVal: unknown, inKey?: string): unknown {
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
  const typeValues = [originVal, newVal].map(protoName);
  const [originType, newValType] = typeValues;
  // 数据类型不一样，后面完全覆盖前面；
  if (newValType !== originType) {
    return newVal;
  }

  // 都是基础数据类型，后面覆盖前面；
  if (typeValues.every((val) => {
    const types = val.toLowerCase();
    return primitiveSet.has(types);
  })) {
    return newVal;
  }

  // 都是数组，就会把两个数组进行合并
  if ([originVal, newVal].every(val => Array.isArray(val))) {
    return uniq([...originVal as unknown[], ...newVal as unknown[]]);
  }

  // 都是对象，那么里面的对象会递归合并成一个对象
  if (
    isPlainObject(originVal) && isPlainObject(newVal)
  ) {
    const clonedVal = cloneDeep(originVal);

    // originVal和newVal的键构成数组的交集
    const ownKeys = intersection(Object.keys(originVal), Object.keys(newVal));
    // originVal的键数组去除相同的newVal的键数组的数组
    const deleteKeys = difference(Object.keys(originVal), Object.keys(newVal));
    // newVal的键数组去除相同的originVal的键数组的数组
    const appendKeys = difference(Object.keys(newVal), Object.keys(originVal));
    // originVal对象的键和newVal对象的键都存在
    for (const key of ownKeys) {
      clonedVal[key] = defaultMerge(originVal[key], newVal[key]);
    }
    // originVal对象的键存在而newVal对象的键不存在
    for (const key of deleteKeys) {
      delete clonedVal[key];
    }
    // newVal对象的键存在而originVal对象的键不存在
    for (const key of appendKeys) {
      clonedVal[key] = newVal[key] as unknown;
    }

    return clonedVal;
  }

  // 其他类型的,如: Date，RegExp，Function等等，后面覆盖前面；
  return newVal;
}

// 自定义合并函数，没有自定义的部分默认走 defaultMerge 函数
function customMergeFn(fn: CustomMergeFn): MergeFn {
  const { customizeArray, customizeObject } = fn;

  return function (originVal: any, newVal: any, key?: string) {
    if (isPlainObject(originVal) && isPlainObject(newVal)) {
      if (isFunction(customizeObject)) {
        return customizeObject(originVal, newVal, key);
      }
    }

    if (Array.isArray(originVal) && Array.isArray(newVal)) {
      if (isFunction(customizeArray)) {
        return customizeArray(originVal, newVal, key);
      }
    }

    return defaultMerge(originVal, newVal);
  };
}

// TODO: 接受传入一个对象, 接受一个合并函数和一个合并配置数组项
function multipleAdaptiveMerge(target: UnknownRecord, ...args: UnknownRecord[]): UnknownRecord {
  return [...args].reduce((pre, cur) => adaptiveMerge(pre, cur), target);
}

export { getCurrentPath } from "./file.ts";
export {
  adaptiveMerge,
  customMergeFn,
  multipleAdaptiveMerge,
};
