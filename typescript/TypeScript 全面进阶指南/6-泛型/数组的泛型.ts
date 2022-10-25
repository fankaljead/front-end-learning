let arr: Array<number> = [1, 2, 3];
let sum = arr.reduce((a, b) => a + b);

arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, 1);
let a: number[] = [];

arr.reduce((prev, curr, idx, arr) => {
  return [...prev, curr];
}, a);

arr.reduce((prev, curr, idx, arr) => {
  return [...prev, curr];
}, []);
