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

function solution(n = 3) {
  let c = 0n;
  for (let i = 0; i <= n + 1; ++i) {
    c += combination(n + 1, i);
  }
  let s = 0;
  if (n - 5 <= 0) {
    s = 9n;
  } else {
    s = BigInt(Math.pow(9, n - 5));
  }

  let r = BigInt(9 ** n) - c - s;

  return (r % 1000000007n).toString();
}

// const readline = read_line;

// // 读取一行为一个数字
// const readInt = () => {
//   return parseInt(readline());
// };

// function main() {
//   const n = readInt();
//   console.log(solution(n));
// }

// main();

console.log(solution(3));
console.log(solution(4));
console.log(solution(5));
