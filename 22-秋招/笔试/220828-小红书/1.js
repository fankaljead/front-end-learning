function solution(
  n = 3,
  m = 3,
  id = 2,
  nums = [
    [90, 90, 90],
    [80, 100, 90],
    [80, 85, 85],
  ]
) {
  let sortNums = Array.from({ length: n }, () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < m; j++) {
      sum += nums[i][j];
    }
    sortNums[i][0] = sum;
    sortNums[i][1] = i + 1;
  }

  sortNums.sort((o1, o2) => {
    if (o1[0] !== o2[0]) {
      return o2[0] - o1[0];
    } else {
      return o1[1] - o2[1];
    }
  });

  let res = -1;
  for (let i = 0; i < n; i++) {
    if (sortNums[i][1] === id) {
      res = i + 1;
      break;
    }
  }

  return res;
}
const readArray = () => {
  const line = read_line();
  return line.split(" ").map(Number);
};

function main() {
  const [n, m, id] = readArray().map(Number);
  const nums = [];
  for (let i = 0; i < n; ++i) {
    nums.push(readArray());
  }
  console.log(solution(n, m, id, nums));
}

main();
