// 最小偏移量
function getMaxOffset(arr = [1, 2, 3, 4]) {
  return arr[arr.length - 1] - arr[0];
}
function minArrOffset(arr = [1, 2, 3, 4]) {
  let r = Number.MAX_VALUE,
    path = [];
  function backtracking(arr, start) {
    if (start === arr.length - 1) {
      path.sort((a, b) => a - b);
      r = Math.min(r, path[path.length - 1] - path[0]);
      console.log(path[path.length - 1] - path[0]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] & 1) {
        path.push(arr[i] * 2);
        backtracking(arr, i + 1);
        path.pop();
      } else {
        path.push(arr[i] / 2);
        backtracking(arr, i + 1);
        path.pop();
      }
      path.push(arr[i]);
      backtracking(arr, i + 1);
      path.pop();
    }
  }

  backtracking(arr, 0);

  return r;
}

console.log(minArrOffset());

function minOffset(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}
