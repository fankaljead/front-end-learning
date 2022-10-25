function solution(n = 5, k = 2, nums = [1, 5, 3, 4, 2]) {
  let costs = new Array(n).fill(Number.MAX_VALUE);
  costs[0] = 0;
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= k && i - j >= 0; j++) {
      let cost = nums[i] < nums[i - j] ? 0 : nums[i] - nums[i - j];
      costs[i] = Math.min(costs[i], costs[i - j] + cost);
    }
  }
  return costs[n - 1];
}

// 输入输出相关
const input = readline || read_line;

// 输入
// 从一行中读取一列数组
const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const [n, k] = readArray();
  const nums = readLargeArray(n);

  console.log(solution(n, k, nums));
}

main();

console.log(solution());
