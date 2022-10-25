function solution(arr = [1, 1, 4, 5, 1, 4]) {
  let n = arr.length,
    ans = 0,
    val = [0, 0];
  for (let i = 0; i < n; ++i) {
    if (i & 1) {
      val[1] = Math.max(val[1], arr[i]);
    } else {
      val[0] = Math.max(val[0], arr[i]);
    }
  }
  for (let i = 0; i < n; ++i) {
    if (i & 1) {
      ans += val[1] - arr[i];
    } else {
      ans += val[0] - arr[i];
    }
  }
  if (val[0] === val[1]) {
    ans += n >> 1;
  }
  return ans;
}

console.log(solution());
