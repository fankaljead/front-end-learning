/**
 * 验证出栈顺序
 * https://leetcode.cn/problems/validate-stack-sequences/solution/by-ac_oier-84qd/
 * https://leetcode.cn/problems/validate-stack-sequences/
 * leetcode 946
 * 不修改原数组，时间复杂度 O(n), 空间复杂度 O(n)
 * @param {*} pushed 入栈顺序
 * @param {*} popped 出栈顺序
 * @returns
 */
function validateStackSequences(
  pushed = [1, 2, 3, 4, 5],
  popped = [4, 5, 3, 2, 1]
) {
  let n = pushed.length,
    he = 0,
    ta = 0;
  const stack = new Array(n).fill(0);

  for (let i = 0, j = 0; i < n; ++i) {
    stack[ta++] = pushed[i];

    while (he < ta && stack[ta - 1] === popped[j] && ++j >= 0) {
      --ta;
    }
  }

  return he === ta;
}

const pushed = [1, 2, 3, 4, 5],
  popped = [4, 5, 3, 2, 1];

console.log(`pushed: ${pushed}`);
console.log(`pushed: ${popped}`);
console.log(validateStackSequences(pushed, popped));

// 修改了原数组 空间复杂度降为 O(1)
function validateStackSequences2(
  pushed = [1, 2, 3, 4, 5],
  popped = [4, 5, 3, 2, 1]
) {
  let n = pushed.length,
    idx = 0;
  for (let i = 0, j = 0; i < n; ++i) {
    pushed[idx++] = pushed[i];
    while (idx > 0 && pushed[idx - 1] === popped[j] && ++j >= 0) {
      idx--;
    }
  }

  return idx === 0;
}
