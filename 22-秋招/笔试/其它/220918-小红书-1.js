function solution(a = [1, 2, 2, 1], x = 2, as = [[4], [7, 7], [6, 6], [8]]) {
  let min = Number.MAX_VALUE;
  for (let i = 0; i < 4; ++i) {
    let count = 0;
    for (let j = 0; j < a[i]; ++j) {
      if (as[i][j] > x) {
        ++count;
      }
    }
    min = Math.min(min, count);
  }

  return min;
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
  const arr = readArray();
  const as = [];
  for (let i = 0; i < 4; ++i) {
    as.push(readLargeArray(arr[i]));
  }

  console.log(solution(arr.slice(0, 4), arr[4], as));
}

main();

console.log(solution());
