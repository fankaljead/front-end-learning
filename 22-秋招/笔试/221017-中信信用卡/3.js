function solution(n = 3, nums = [1, 1, 1]) {
  let dp = new Array(n + 1);
  dp[2] = (nums[0] * nums[1]) % 2 === 0 ? 0 : 1;

  for (let i = 3; i < n; i++) {
    if ((nums[i] & 1) === 0) {
      dp[i] = dp[i - 1];
    } else {
      if ((nums[i - 1] & 1) === 0) {
        dp[i] = dp[i - 1];
      } else {
        dp[i] = dp[i - 1] + 1;
        nums[i]++;
      }
    }
  }

  return dp[n];
}
const input = readline || read_line;

const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

const readLineInt = () => {
  return parseInt(input());
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const [n, ...nums] = readArray();

  console.log(solution(n, nums));
}

main();
