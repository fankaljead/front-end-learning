function solution(S = "aabbcc", C = [1, 2, 1, 2, 1, 2]) {
  let cost = 0;
  let s = [],
    c = [];
  for (let i = 0; i < S.length; ++i) {
    if (c.length) {
      if (s[c.length - 1] === S[i]) {
        c.push(C[i]);
        s.push(S[i]);
      } else {
        if (c.length >= 2) {
          cost += c.reduce((a, b) => a + b) - Math.max(...c);
        }
        c = [C[i]];
        s = [S[i]];
      }
    } else {
      c = [C[i]];
      s = [S[i]];
    }
  }
  if (c.length >= 2) {
    cost += c.reduce((a, b) => a + b) - Math.max(...c);
  }

  return cost;
}

console.log(solution());
console.log(solution("aaaa", [3, 4, 5, 6]));
console.log(solution("abccbd", [0, 1, 2, 3, 4, 5]));
