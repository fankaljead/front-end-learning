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

function solve(str = "abcdefg", start = "b", end = "f") {
  let start_number = 0,
    end_number = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == start) {
      start_number = i;
      break;
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] == end) {
      end_number = i;
    }
  }

  const chars = str.split("");
  const reverse = (arr, left, right) => {
    while (left < right) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  };

  reverse(chars, start_number, end_number);

  return chars.join("");
}

function main() {
  const s = input();
  const [str, start, end] = s.split(" ");

  const res = solve(str, start, end);
  console.log(res);
}

main();

console.log(solve());
