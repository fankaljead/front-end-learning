function solution(n = 5, a = [2, 3, 4, 2, 3]) {
  let min = 0;
  for (let i = 0; i < n - 2; ++i) {
    if (a[i] >= 1 && a[i + 1] >= 2 && a[i + 2] >= 3) {
      min += 5;
      a[i] -= 1;
      a[i + 1] -= 2;
      a[i + 2] -= 3;
      i--;
    } else {
      min += a[i];
      a[i] = 0;
    }
  }

  min += a[n - 2];
  min += a[n - 1];
  console.log(min);
}
const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};
function main() {
  const n = parseInt(readline());
  const a = readLargeArray(n);
  solution();
}
// main();
solution();
solution(6, [1, 1, 2, 3, 2, 3]);
