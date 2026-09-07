function* range(start: number, end: number): Generator<number> {
  while (start < end) {
    yield start++;
  }
}

function* times(n: number): Generator<number> {
  while (n > 0) {
    yield n--;
  }
}

export {
  range,
  times,
};
