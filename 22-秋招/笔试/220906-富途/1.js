function solution(n = 3, x = [2, 3, 6], m = 2, a = [1, 3]) {
  const chess = new Array(2020).fill(false);
  const map = new Map();

  for (let i = 0; i < n; ++i) {
    map.set(i + 1, x[i]);
    chess[x[i]] = true;
  }

  for (const aa of a) {
    if (!chess[map.get(aa) + 1] && map.get(aa) < 2019) {
      chess[map.get(aa)] = false;
      chess[map.get(aa) + 1] = true;
      map.set(aa, map.get(aa) + 1);
    }
  }

  return [...map.values()];
}

// 输入输出相关
// const input = readline || read_line;
// // 输入
// // 从一行中读取一列数组
// const readarray = () => {
//   const line = input();
//   return line.split(" ").map(Number);
// };
// // 读取一行为一个数字
// const readint = () => {
//   return parseInt(input());
// };

// const printArrToLines = (arr = []) => arr.forEach((item) => console.log(item));

// function main() {
//   const n = readint();
//   const x = readarray();
//   const m = readint();
//   const a = readarray();

//   printArrToLines(solution(n, x, m, a));
// }

// main();

console.log(solution());
console.log(solution(2, [1, 2016], 4, [2, 2, 2, 2]));
