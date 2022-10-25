function solution(s = "ddsdlk  fjdksjf dsfjsdlf  ", LEN = 1000) {
  s = s.trim();
  let r = [],
    wid = 0;
  let max = Math.floor(LEN / 16);
  let spaces = [];
  s.split("").forEach((c, i) => {
    if (c === " ") {
      if (!(spaces.length >= 1 && spaces[spaces.length - 1] === i - 1)) {
        spaces.push(i);
      }
    }
  });
  let p = 0;
  for (let i = 0; i < spaces.length; i++) {
    
    if (spa) r.push(s.substring(wid, spaces[i]));
  }
  console.log(spaces);
}

console.log(solution());
