function solution(n = 5, a = [2, 3, 2, 3, 2]) {
  let count = 0;
  if (n <= 1) {
    return count;
  }
  for (let i = 1; i < n; i++) {
    while (a[i - 1] >= a[i]) {
      a[i] *= 2;
      count++;
    }
  }

  return count;
}

const n = parseInt(readline());
const a = readline().split(" ").map(Number);

console.log(solution(n, a));
console.log(solution());
