function solution(n = 1, m = 10) {
  const N = 10;
  const ns = [6, 8];
  const r = [],
    p = [];
  function backtracking(current) {
    if (current < N && p.length) {
      r.push(Number(p.join("")));
    }
    if (current === N) {
      return;
    }
    for (const n of ns) {
      p.push(n);
      backtracking(current + 1);
      p.pop();
    }
  }

  backtracking(1);
  r.sort((a, b) => a - b);
  console.log(r);

  function find(num, nums) {
    let index;
    for (let i = 0; i < nums.length - 1; ++i) {
      if (num < nums[i]) {
        index = i;
        break;
      }
    }
    return index;
  }

  let start = find(n, r),
    end = find(m, r);

  console.log(start, end);

  return m - n + 1 - (start - end);
}

// console.log(solution());
// console.log(solution(10, 20));
// console.log(solution(10, 100));

let dest, src, result;
dest = { id: "dest" };
result = Object.assign(
  dest,
  { id: "src1", a: "foo" },
  { id: "src2", b: "bar" }
);

console.log(result);
