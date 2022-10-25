// 删除区间后留下最长回文串长度
function solve(s = "abca") {
  let len = s.length;
  let sr = s.split("").reverse().join("");
  let dp = Array.from({ length: len + 1 }, () =>
    Array.from({ length: len + 1 }).fill(0)
  );
  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= len; j++) {
      if (s[i - 1] === sr[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return len - dp[len][len];
}

