// 输入输出相关
const input = readline || read_line;
// 输入
// 从一行中读取一列数组
const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

function solution(n = 5, k = 3, arr = [1, 1, 1, 2, 1]) {
  let sum1 = 0,
    sum2 = 0,
    max = 0;
  for (const a of arr) {
    if (sum1 + a <= k) {
      sum1 += a;
    } else {
      sum2 += a;
    }
    max = Math.max(max, Math.abs(sum1 - sum2));
    if (sum1 === k || sum2 === k) {
      break;
    }
  }

  return max;
}

function main() {
  const [n, k] = readArray();
  const arr = readArray();
  console.log(solution(n, k, arr));
}

main();
