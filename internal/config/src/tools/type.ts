function isPlainObject<T = unknown>(val: unknown): val is Record<string, T> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

export {
  isPlainObject,
};
