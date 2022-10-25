function solution(T = 3, n = 2, m = 4, k = 1, x = 2, nums = []) {
  let path = nums[0][0],
    flag = false;
  function dfs(nums, i, j, x) {
    if (i == nums.length - 1 && j == nums[0].length - 1 && path == x) {
      flag = true;
      return;
    }
    if (i + 1 < nums.length) {
      path += nums[i + 1][j];
      dfs(nums, i + 1, j, x);
      path -= nums[i + 1][j];
    }
    if (j + 1 < nums[0].length) {
      path += nums[i][j + 1];
      dfs(nums, i, j + 1, x);
      path -= nums[i][j + 1];
    }
  }

  dfs(nums, 0, 0, x);
  path = 0;

  if (flag == true) {
    console.log("yes");
    flag = false;
  } else {
    console.log("no");
  }
}

const readline = read_line;
// 从一行中读取一列数组
const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

// 读取一行为一个数字
const readInt = () => {
  return parseInt(readline());
};

function main() {
  const T = readInt();
  for (let i = 0; i < T; ++i) {
    const [n, m, k, x] = readArray();
    const arr = [];
    for (let j = 0; j < n; ++j) {
      arr.push(readArray());
    }
    solution(T, n, m, k, x, arr);
  }
}

main();
