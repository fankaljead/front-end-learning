function solution(arr = [4, 2, 1, 7]) {
  const n = arr.length;
  let l = 0,
    r = n - 1,
    res = 0;
  while (l < r) {
    res = Math.max((r - l) * Math.min(arr[l], arr[r]), res);
    if (arr[l] < arr[r]) {
      l++;
    } else {
      r--;
    }
  }
  return res;
}

console.log(solution());
