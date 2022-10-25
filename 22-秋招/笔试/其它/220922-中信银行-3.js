function solution(
  n = 3,
  nums = [
    [3, 5, 1],
    [2, 2, 4],
    [3, 2, 6],
  ]
) {
  function swap(nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  for (let i = 0, j = n - 1; i < j; i++, j--) {
    swap(nums, i, j);
  }

  for (let i = 0, j = n - 1; i < j; i++, j--) {
    nums.forEach((num) => {
      swap(num, i, j);
    });
  }

  nums.forEach((num) => {
    console.log(num.join(" "));
  });
}
const input = readline || read_line;

const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

const readLineInt = () => {
  return parseInt(input());
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const n = readLineInt();
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(readArray());
  }

  solution(n, nums);
}

main();

solution();
solution(
  4,
  Array.from({ length: 4 }, (_, index) =>
    Array.from({ length: 4 }, (_, i) => index * 4 + i)
  )
);
