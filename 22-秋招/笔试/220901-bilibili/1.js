// 常用数学函数
const max = Math.max;
const min = Math.min;

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

// 读取一行为一个数字
const readInt = () => {
  return parseInt(input());
};

// 读取二维数组
const readTwoArray = (T = 1) => {
  const arr = [];
  while (T--) {
    arr.push(readArray());
  }
  return arr;
};

function solve(n = 12) {
  let ans = 0;
  let p = 2;
  let q = ~~Math.sqrt(n);
  while (true) {
    if (p > q) {
      break;
    }
    if (n % p == 0) {
      ans += p;
      n /= p;
      q = ~~Math.sqrt(n);
    } else {
      p++;
    }
  }
  return ans + n;
}

function main() {
  const n = readInt();
  const arr = [];
  while (n--) {
    arr.push(readArray());
  }

  const res = solve(arr);
  console.log(res);
}

main();

var readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  var n = parseInt(line);
  console.log(solve(n));
});
