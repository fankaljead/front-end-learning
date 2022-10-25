function solution(s1 = "", s2 = "") {
  let max = s1.length >= s2.length ? s1 : s2;
  let min = s1.length >= s2.length ? s2 : s1;
  let l = 0;
  let s = "";
  for (let i = 0; i < min.length; i++) {
    for (let j = i + 1; j <= min.length; j++) {
      if (max.includes(min.substring(i, j)) && j - i > l) {
        l = j - i;
        s = min.substring(i, j);
      }
    }
  }
  return s;
}

function main() {
  const str1 = readline();
  const str2 = readline();
  console.log(solution(str1, str2));
}

main();
