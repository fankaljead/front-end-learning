// 阶乘 0 的数量
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; ++i) {
    result *= i;
  }
  return result;
}

function countZero(n) {
  let result = 0;
  while (n > 0) {
    if (n % 10 === 0) {
      result++;
    }
    n = Math.floor(n / 10);
  }
  return result;
}

function solve(n) {
  let nums = [
    1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
    6227020800, 87178291200, 1307674368000,
  ];
  let result = Array(15).fill(0);
  for (let i = 4; i <= 14; ++i) {
    result[i] = countZero(nums[i]);
  }
  console.table(nums);
  console.log(result);
}

solve();
console.log(factorial(15));
console.log(Number.MAX_SAFE_INTEGER);

let result = [0, 0, 0, 0, 1, 1, 2, 2, 1, 2, 2, 4, 4, 2, 4];
