function assertIsProps<T = any>(name: string, v: any): asserts v is T {
  // 写了属性，但没给值
  if (v === "") {
    throw new Error(`没有对属性名${name}进行赋值`);
  }
}

export {
  assertIsProps,
};
