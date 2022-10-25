// 最接近三数之和
function threeSumClosest(nums, target) {
  // 升序排列
  nums.sort((a, b) => a - b);

  let n = nums.length;
  let best = 1000000;

  for (let i = 0; i < n; ++i) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = n - 1;

    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === target) {
        return target;
      }

      if (Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum;
      }

      // a + b + c > target
      // c 向左移动
      if (sum > target) {
        let k0 = k - 1;
        while (j < k0 && nums[k0] == nums[k]) {
          --k0;
        }
        k = k0;
      }
      // a + b + c <= target
      // b 向右移动
      else {
        let j0 = j + 1;
        while (j0 < k && nums[j0] == nums[j]) {
          ++j0;
        }
        j = j0;
      }
    }
  }

  return best;
}
