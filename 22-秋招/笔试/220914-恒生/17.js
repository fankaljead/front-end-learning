function solution(s = "HELLo") {
  const aeiou = new Set("aeiou".split(""));
  const ais = [];
  for (let i = 0; i < s.length; i++) {
    if (aeiou.has(s[i].toLowerCase())) {
      ais.push(i);
    }
  }
  const r = s.split("");
  for (let i = 0, j = ais.length - 1; i < j; i++, j--) {
    [r[ais[i]], r[ais[j]]] = [r[ais[j]], r[ais[i]]];
  }

  return r.join("");
}

console.log(solution());
console.log(solution('welcome hundsun'));
