// 数组扁平化
function myFlatten(arr = [], depth = 1) {
  if (depth === 0) {
    return arr;
  }
  return arr.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(myFlatten(curr, depth - 1));
    }
    return prev.concat(curr);
  }, []);
}

let arr = JSON.parse(`[1, [2, [3, [4]], 5]]`);
let depth = 2;
console.log(JSON.stringify(myFlatten(arr, depth)));
