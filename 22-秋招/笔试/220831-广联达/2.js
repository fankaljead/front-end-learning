function solution(n = 10, m = 3, nums = []) {
  nums.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let ans = 0;
  let flag = new Array(n).fill(1);

  for (const [left, right, x] of nums) {
    let temp = 0;
    for (let i = left - 1; i <= right - 1; ++i) {
      if (temp === x) {
        flag[i] = 0;
        continue;
      }
      if (flag[i] && temp < x) {
        temp += 1;
      }
    }
  }

  flag.forEach((f) => {
    ans += f;
  });

  return ans;
}

function main() {
  const n = readInt(),
    m = readInt();
  const nums = [];
  for (let i = 0; i < m; ++i) {
    const arr = [];
    arr.push(readInt());
    arr.push(readInt());
    arr.push(readInt());
    nums.push(arr);
  }

  console.log(solution(n, m, nums));
}

main();
