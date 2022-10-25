const MOD = 1e9 + 7;
function levelorder(root) {
  const res = [];
  const q = [root];

  while (q.length) {
    const len = q.length;
    const level = [];
    for (let i = 0; i < len; ++i) {
      const node = q.shift();

      level.push(node.val);

      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }

    res.push(...level);
  }

  return res;
}

function solution(arr = [1, 1, 1, 1, 1]) {
  // const arrr = levelorder(root);
  const height = Math.floor(Math.log2(arr.length)) + 1,
    len = arr.length;
  const v = new Array(len).fill(1);

  for (let i = 2 ** (height - 1) - 1; i < len; ++i) {
    arr[i] = 1;
    v[Math.floor((i - 1) / 2)] = 2;
  }

  for (let i = height - 1; i > 1; --i) {
    for (let j = 2 ** (i - 1) - 1, r = 2 ** i - 1; j < r; ++j) {
      if (j * 2 + 1 < len && 2 * j + 2 < len) {
        v[j] = v[j * 2 + 1] + v[j * 2 + 2] + 1;
        arr[j] = 1;
      } else {
        arr[j] = v[j - 1];
        v[j] = v[j - 1];
      }
    }
  }

  return arr.reduce((a, b) => a + b) % MOD;
}

function main() {
  console.log(solution());
  console.log(solution([1, 1, 1]));
}

main();

function getTreeSum(tree) {
  // write code here
  const dfs = (node) => {
    if (!node) return 0;

    if (!node.left && !node.right) return 1;

    let left = dfs(node.left);
    let right = dfs(node.right);

    if (left === right) {
      return left + right + 1;
    } else {
      return Math.max(left, right) * 2 + 1;
    }
  };

  return dfs(tree) % (Math.pow(10, 9) + 7);
}
