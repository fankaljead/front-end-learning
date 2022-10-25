var maxProfit = function (initialBonus = 2, prices = []) {
  let result = initialBonus;
  let max = initialBonus;
  for (let i = 1; i < prices.length; ++i) {
    if (prices[i] > prices[i - 1]) {
      result += prices[i] - prices[i - 1];
    } else {
      result = initialBonus;
    }
    max = Math.max(result, max);
  }
  return max;
};
console.log(maxProfit(2, [2, 3, 1, 1, 1, 2]));

function maxProfit(n = 6, m = 2, prices = []) {
  let count = 0;
  for (let i = 0; i < n; ++i) {
    if (i === n - 1) {
      m += count * prices[i];
      break;
    }
    if (i != n - 1 && prices[i] <= prices[i + 1]) {
      m -= prices[i];
      ++count;
      if (m < 0) {
        m += prices[i];
        --count;
      }
    } else {
      if (count > 0) {
        m += prices[i];
        --count;
      }
    }
  }
  return m;
}
