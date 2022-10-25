function solution(n = 4, x = 1, y = 5, K = 1, a = [2, 6, 3, 8]) {
  a.sort((a, b) => b - a);

  let res = 0;

  let count = 0;
  for (let i = 0; i < K && y <= a[i] * x; ++i) {
    count++;
    res += y;
  }

  for (let i = count; i < n; ++i) {
    res += a[i] * x;
  }

  return res;
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
  const [n, x, y, K] = readArray();
  const a = readLargeArray(n);
  console.log(solution(n, x, y, K, a));
}

main();

console.log(solution());
