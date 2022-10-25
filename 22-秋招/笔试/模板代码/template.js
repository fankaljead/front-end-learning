// JavaScript 大根堆 和 小顶堆
class Heap {
  static MaxHeap = () => new Heap("max");
  static MinHeap = () => new Heap("min");
  constructor(type = "min") {
    this.type = type;
    this.value = [];
  }
  create() {
    const length = this.value.length;
    for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
      this.ajust(i, length);
    }
  }
  ajust(index, length) {
    const array = this.value;
    for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
      if (i + 1 < length) {
        if (
          (this.type === "max" && array[i + 1] > array[i]) ||
          (this.type === "min" && array[i + 1] < array[i])
        ) {
          i++;
        }
      }
      if (
        (this.type === "max" && array[index] < [array[i]]) ||
        (this.type === "min" && array[index] > [array[i]])
      ) {
        [array[index], array[i]] = [array[i], array[index]];
        index = i;
      } else {
        break;
      }
    }
  }
  add(element) {
    const array = this.value;
    array.push(element);
    if (array.length > 1) {
      let index = array.length - 1;
      let target = Math.floor((index - 1) / 2);
      while (target >= 0) {
        if (
          (this.type === "min" && array[index] < array[target]) ||
          (this.type === "max" && array[index] > array[target])
        ) {
          [array[index], array[target]] = [array[target], array[index]];
          index = target;
          target = Math.floor((index - 1) / 2);
        } else {
          break;
        }
      }
    }
  }
  pop() {
    const array = this.value;
    let result = null;
    if (array.length > 1) {
      result = array[0];
      array[0] = array.pop();
      this.ajust(0, array.length);
    } else if (array.length === 1) {
      return array.pop();
    }
    return result;
  }
}

// 常用数学函数
const max = Math.max;
const min = Math.min;

// 最大公约数
const gcd = (x = 1, y = 1) => {
  let max, min, temp;
  max = x > y ? x : y;
  min = x < y ? x : y;
  if (x == 0 || y == 0) {
    return max;
  }
  while (max % min) {
    temp = max % min;
    max = min;
    min = temp;
  }
  return min;
};

//最小公倍数
function gbs(x = 1, y = 1) {
  return (x * y) / gcd(x, y);
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

// 阶乘
function factorial(n = 10) {
  if (n === 0) {
    return 1n;
  }
  let r = 1n;
  const N = BigInt(n);
  for (let i = 1n; i <= N; ++i) {
    r *= i;
  }

  return r;
}

// 排列数
function permutations(n = 10, m = 2) {
  return factorial(n) / factorial(n - m);
}

function combination(n = 10, m = 2) {
  return permutations(n, m) / factorial(m);
}

// 输出
const printArrToString = (arr = []) => console.log(arr.join(""));

// 多行输出一个数组 每行为一个元素
const printArrToLines = (arr = []) => arr.forEach((item) => console.log(item));

// 数组从小到大排序
Array.prototype.accendSort = function () {
  return this.sort((a, b) => a - b);
};

// 数组从大到小排序
Array.prototype.descendSort = function () {
  return this.sort((a, b) => b - a);
};

// 转换数字为 radix 进制
function formatRadixNumber(n = 1, radix = 10) {
  return n["toString"](radix);
}

const N = 1e6;
function solve(arr = []) {
  const res = arr.reduce((a, b) => a + b);

  return res;
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
