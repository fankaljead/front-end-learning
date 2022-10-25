/**
 * 扁平化数组
 * 使用栈
 * @param {number} depth 需要 flat 的深度，默认为 1
 * @returns {number[]}
 */
Array.prototype.myflat = function (depth = 1) {
  // 返回新数组
  let arr = this.slice(0);
  if (arr.length < 1) {
    return [];
  }

  let stack = [];
  // 当前深度
  let curentDepth = 0;

  while (arr.length) {
    const len = arr.length;
    // arr 中有一个元素为数组，所有元素不为数组时推出循环
    let flag = true;
    for (let i = 0; i < len; i++) {
      const cur = arr.shift();
      if (Array.isArray(cur)) {
        stack.push(...cur);
        flag = false;
      } else {
        stack.push(cur);
      }
    }

    curentDepth++;

    arr = stack.slice(0);
    stack = [];

    // arr 所有元素不为数组 或者 到达指定的深度 返回
    if (flag || curentDepth === depth) {
      break;
    }
  }

  return arr;
};

const arr = [[1, 2, [3], 4], 5, 6, [7], [[[[[8]]]]]];

console.log(arr.flat(1));
console.log(arr.myflat(1));
console.log(arr.flat(10));
console.log(arr.myflat(10));
console.log(arr.myflat());
