function maxProfit(prices) {
  if (prices.length <= 1) return 0;
  let len = prices.length,
    dp = new Array(5).fill(0);

  dp[1] = dp[3] = -prices[0];
  for (let i = 1; i < len; ++i) {
    dp[0] = dp[0];
    dp[1] = Math.max(dp[0] - prices[i], dp[1]);
    dp[2] = Math.max(dp[1] + prices[i], dp[2]);
    dp[3] = Math.max(dp[2] - prices[i], dp[3]);
    dp[4] = Math.max(dp[3] + prices[i], dp[4]);
  }

  return dp[4];
}

function main() {
  const str = "[3,3,5,0,0,3,1,4]";
  const prices = JSON.parse(str);
  console.log(maxProfit(prices));
}
main();
