function test(nums = [1, 0, 0, 1, 1, 1, 1, 0, 0]) {
  let n = nums.length,
    maxIndex = 0,
    maxLen = 0,
    rM = 0,
    res = new Map();
  let sum = new Array(n + 10).fill(0);
  for (let i = 1; i <= n; ++i) {
    sum[i] = sum[i - 1] + (nums[i - 1] === 0 ? -1 : 1);
  }
  let map = new Map();
  map.set(0, 0);
  for (let i = 1; i <= n; ++i) {
    let t = sum[i];
    if (map.has(t)) {
      maxIndex = i;
      maxLen = Math.max(maxLen, i - map.get(t));
      if (nums[i - maxLen] === 1) {
        if (!res.has(maxLen)) {
          res.set(maxLen, [maxIndex]);
          rM = Math.max(rM, maxLen);
        } else {
          res.get(maxLen).push(maxIndex);
        }
      }
    }
    if (!map.has(t)) {
      map.set(t, i);
    }
  }
  console.log(rM);
  console.log(res);

  function cal(nums = [], len, start) {
    let result = 0;
    for (let i = start; i > start - len; i--) {
      result += (nums[i] === 1 ? 2 ** (start - i) : 0);
    }
    return result;
  }

  console.log(cal(nums, 4, 8));
  console.log(cal(nums, 4, 4));
}

test();
