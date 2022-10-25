function majorityElement(nums = [1, 2, 3, 2, 2, 2, 5, 4, 2]) {
  let count = 1,
    maj = nums[0],
    len = nums.length;
  for (let i = 1; i < len; ++i) {
    if (maj === nums[i]) {
      count++;
    } else {
      count--;
      if (count === 0) {
        maj = nums[i + 1];
      }
    }
  }

  return maj;
}

console.log(majorityElement());
