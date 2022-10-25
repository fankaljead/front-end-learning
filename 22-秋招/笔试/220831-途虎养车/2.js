// [2,1,2,1,4,4],5
function accessoryPlan(priceNums = [2, 1, 2, 1, 4, 4], budget = 5) {
  // write code here
  let count = 0,
    len = priceNums.length;
  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (priceNums[i] + priceNums[j] <= budget) {
        count++;
      }
    }
  }
  return count;
}

console.log(accessoryPlan());
