function solution(s = "ABBCD") {
  let len = s.length;
  let l = 0,
    r = 0,
    set = new Set(),
    max = 0;
  let res = [];

  for (; r < len; r++) {
    const c = s[r];
    if (!set.has(c) && set.size < 3) {
      set.add(c);
    } else if (set.size === 3) {
      if (set.has(c)) {
        max = Math.max(max, r - l + 1);
      } else if (!set.has(c)) {
        set.delete(s[l]);
        const deleteC = s[l];
        while (s[++l] === deleteC);
        set.add(c);
        max = Math.max(max, r - l + 1);
      }
      if (res.length === 0) {
        res = [s.substring(l, l + max)];
      } else if (max > res[res.length - 1].length) {
        res = [s.substring(l, l + max)];
      } else {
        res.push(s.substring(l, max + l));
      }
    }
  }

  return res[0];
}
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.on("line", function (line) {
//   console.log(solution(line));
// });

console.log(solution("AABBCCCCDDEEEE"), "AABBCCCCDDEEEE".length);
console.log(solution("ABBCD"));
console.log(solution("ACCDEBBBBBB55ZC"));
