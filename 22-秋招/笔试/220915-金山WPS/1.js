function generateRandomArray(l = 1, r = 20, n = 10) {
  let nums = Array.from({ length: r - l + 1 }, (_, index) => l + index);
  let arr = [];
  for (let i = 0; i < n; ++i) {
    let len = nums.length;
    const index = Math.floor(len * Math.random());
    arr.push(nums[index]);
    nums.splice(index, 1);
  }

  return arr;
}

console.log(generateRandomArray());
