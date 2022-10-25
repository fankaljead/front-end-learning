const MOD = 1000000007;
function solution(n = 100) {
  let f = new Array(n + 1).fill(1);
  for (let i = 4; i <= n; i++) {
    f[i] += (f[i - 1] + f[i - 2] + f[i - 3]) % MOD;
  }

  return f[n];
}

function main() {
  const n = parseInt(readline());
  console.log(solution(n));
}
main();

console.log(solution());
console.log(solution(4));
console.log(solution(5));
