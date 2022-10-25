function solution(n = 5, nums = [1, 7, 13, 19, 22]) {
  const stack = [nums[0]];
  for (let i = 1; i < n; i++) {
    const top = stack[stack.length - 1];
    if ((top + nums[i]) % 10 === 0) {
      stack.pop();
    } else {
      stack.push(nums[i]);
    }
  }

  return nums.length - stack.length;
}
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0;
let nums = [];
rl.on("line", function (line) {
  if (n === 0) {
    n = parseInt(line);
  } else {
    nums = line.split(" ").map(Number);
  }

  if (nums.length === n) {
    console.log(solution(n, nums));
  }
});

solution(5, [1, 13, 19, 7, 22]);
