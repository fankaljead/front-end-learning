const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

const readLargeArray = (m = 100000) => {
  const arr = [];
  for (let i = 0; i < m; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function solution(n = 5, k = 2, arr = [3, 10, 5, 4, 2]) {
  arr.sort((a, b) => a - b);
  let max = 0;
  let sum = 0;
  for (let i = 0; i < n - 1; ++i) {
    sum += arr[i];
    if (i + 2 <= k * (1 + sum / arr[i + 1])) {
      max = i + 2;
    }
  }

  return max;
}

function main() {
  const [n, k] = readArray();
  const arr = readLargeArray(n);
  console.log(solution(n, k, arr));
}

main();

console.log(solution());
