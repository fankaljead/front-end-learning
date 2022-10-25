function sortArray(nums = [1, 2, 3, 5, 4]) {
  let len = nums.length;
  let arr = nums.slice(0);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
