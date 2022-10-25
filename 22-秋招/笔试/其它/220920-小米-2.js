function solution(n = 10, stones = [0, 1, 3, 5, 6, 8, 12]) {
  let flag = false;
  let target = stones[n - 1];

  function dfs(k, current) {
    if (current === target) {
      flag = true;
      return;
    } else if (current < target) {
      [k - 1, k, k + 1].forEach((ck) => {
        if (ck > 0 && stones.includes(current + ck)) {
          console.log(current, ck);
          dfs(ck, current + ck);
        }
      });
    }
  }

  dfs(1, 0);

  return flag;
}
// const input = readline || read_line;

// const readArray = () => {
//   const line = input();
//   return line.split(" ").map(Number);
// };

// const readLineInt = () => {
//   return parseInt(input());
// };

// const readLargeArray = (n = 1e7) => {
//   const arr = [];
//   for (let i = 0; i < n; ++i) {
//     arr.push(readInt());
//   }
//   return arr;
// };

// function main() {
//   const n = readLineInt();
//   const stones = readLargeArray(n);

//   console.log(solution(n, stones));
// }

// main();

console.log(solution());
