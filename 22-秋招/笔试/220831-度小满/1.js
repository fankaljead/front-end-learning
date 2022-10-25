function solution(n = 4, k = 2, nums = [4, 3, 2, 7]) {
  let max = nums[0],
    min = nums[0],
    count = 0;

  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      min = Math.min(...nums.slice(i, j + 1));
      max = Math.max(...nums.slice(i, j + 1));
      if (max === k * min) {
        count++;
      }
    }
  }

  // let count = 0;

  // for (let i = 0; i < n; i++) {
  //   for (let j = i + 1; j <= n; j++) {
  //     let arr = nums.slice(i, j);
  //     arr.sort((a, b) => a - b);
  //     if (k * arr[0] == arr[arr.length - 1]) {
  //       count++;
  //     }
  //   }
  // }

  return count;
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
  const [n, k] = readArray();
  const arr = readArray();

  const res = solution(n, k, arr);
  console.log(res);
}

main();
console.log(solution());
