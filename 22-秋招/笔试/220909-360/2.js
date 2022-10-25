function solution(formula = "16=1+2*3") {
  let s = formula.replace("=", "==");
  if (eval(s)) {
    return true;
  }

  const [left, right] = formula.split("=").map((v) => v.split(""));
  let flag = false;

  function dfs(chars = [], n, index, target) {
    if (index > n) {
      return;
    }
    for (let i = 0; i <= 9; i++) {
      if (i === 0 && index === 0) {
        continue;
      }
      chars.splice(index, 0, i);
      if (eval(chars.join("")) === target) {
        flag = true;
        return;
      }
      chars.splice(index, 1);
    }
    dfs(chars, n, index + 1, target);
  }

  dfs(left, left.length, 0, eval(right.join("")));
  if (flag) {
    return true;
  }
  dfs(right, right.length, 0, eval(left.join("")));

  return flag;
}

// function main() {
//   const T = parseInt(readline());
//   for (let i = 0; i < T; ++i) {
//     let foa = readline();
//     let flag = solution(foa);
//     console.log(flag ? "Yes" : "No");
//   }
// }

// main();

console.log(solution("7*8*9=54"));
console.log(solution("1=1"));
// console.log(solution("1+1=1+22"));
// console.log(solution("4*6=22+2"));
// console.log(solution("15+7=1+2"));
