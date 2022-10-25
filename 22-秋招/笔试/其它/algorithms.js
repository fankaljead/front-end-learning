function zeroOnePack(n = 3, w = 4, weight = [1, 3, 4], values = [15, 20, 30]) {
  let dp = Array.from({ length: n }, () => new Array(w + 1).fill(0));
  dp[0].fill(values[0], weight[0]);

  for (let i = 1; i < n; ++i) {
    for (let j = 0; j <= w; ++j) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + values[i]);
      }
    }
  }

  return dp[n - 1][w];
}

function zeroOnePack2(n = 3, w = 4, weight = [1, 3, 4], values = [15, 20, 30]) {
  let dp = new Array(w + 1).fill(0);

  for (let i = 0; i < n; ++i) {
    for (let j = w; j >= weight[i]; --j) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + values[i]);
    }
  }

  return dp[w];
}
