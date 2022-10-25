function solution(n = 10, nums = [1, 2, 3]) {
  let sum = 0;

  for (let i = 0; i < n; ++i) {
    sum += nums[i];
  }

  return sum;
}
// 输入输出相关
const input = readline || read_line;
// 输入
// 从一行中读取一列数组
const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

// 读取一行为一个数字
const readLineInt = () => {
  return parseInt(input());
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const n = readLineInt();
  const nums = readLargeArray(n);

  console.log(solution(n, nums));
}

main();
