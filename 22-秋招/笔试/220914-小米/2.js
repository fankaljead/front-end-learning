// https://leetcode.cn/problems/strange-printer/solution/qi-guai-de-da-yin-ji-by-leetcode-solutio-ogbu/
function solution(s = "aaabbb") {
  const n = s.length;
  const f = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    f[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] == s[j]) {
        f[i][j] = f[i][j - 1];
      } else {
        let minn = Number.MAX_SAFE_INTEGER;
        for (let k = i; k < j; k++) {
          minn = Math.min(minn, f[i][k] + f[k + 1][j]);
        }
        f[i][j] = minn;
      }
    }
  }
  return f[0][n - 1];
}

// const s = readline();
// console.log(solution(s));
console.log(solution());
console.log(solution("aabbcca"));
