function solution(str = "baiduoxiaojiabankanjiaran") {
  const regex =
    /^[bcdfghjklmnqprstvwxyz][aeiou]{2,2}[bcdfghjklmnqprstvwxyz][aeiou]/g;
  let count = 0;

  for (let i = 0; i < str.length - 4; i++) {
    const s = str.substring(i, i + 5);
    if (regex.test(s) && new Set(s).size === 5) {
      count++;
    }
  }

  return count;
}

console.log(solution(readline()));
