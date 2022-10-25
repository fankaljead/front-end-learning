function solution(nums = [1, 1, 4, 5, 1, 4]) {
  if (nums.length <= 2) {
    return 0;
  }

  let len = nums.length,
    dp = new Array(len).fill(0);

  for (let i = 2; i < len; ++i) {
    dp[i] += dp[i - 1];
    if (nums[i] > nums[i - 2]) {
      const gap = nums[i] - nums[i - 2];
      nums[i - 2] = nums[i];
      dp[i] += gap * Math.floor(i / 2);
    } else {
      dp[i] += nums[i - 2] - nums[i];
      nums[i] = nums[i - 2];
    }
    if (nums[i] === nums[i - 1]) {
      if (i & 1) {
        nums[i] += 1;
        dp[i] += (i - 1) / 2;
      } else {
        nums[i - 1] += 1;
        dp[i] += i / 2;
      }
    }
  }

  return dp[len - 1];
}

const line = "1 1 4 5 1 4";
const nums = line.split(" ").map(Number);

console.log(solution(nums));
console.log(solution([2, 1, 3, 2, 4]));
console.log(solution([2, 1, 4, 3, 3, 5, 6]));
console.log(solution([3, 3, 2, 3]));
