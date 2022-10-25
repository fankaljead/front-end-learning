const CONSONANTS = "qwkhj";
let n = 13;
let lines = [
  "hello",
  "are you ok?",
  "how are you",
  "how are you",
  "qwwwwwwaaa",
  "you so good",
  "nice",
  "wow",
  "owiq jjww",
  "are you ok?",
  "QWQ",
  "what's that???",
  "no....",
];
function solution(n = 0, lines = []) {
  let Lines = lines.map((line) => line.toLowerCase());
  let arr = [];
  let res = [];

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    // if (set.has(line)) {
    if (arr.findIndex((v) => v === line) > -1) {
      res.push("yes");
    } else {
      if (judge(Lines[i])) {
        res.push("yes");
      } else {
        res.push("no");
      }
    }
    arr.push(line);
    if (arr.length > 10) {
      arr.shift();
    }
  }

  return res;
}

function judge(line = "") {
  let count = Number(CONSONANTS.includes(line[0]));
  let res = 0;
  for (let i = 1; i < line.length; i++) {
    if (CONSONANTS.includes(line[i - 1]) & CONSONANTS.includes(line[i])) {
      count++;
    } else {
      res = Math.max(res, count);
      count = 0;
    }
  }

  return res > 5;
}

// console.log(judge("qwwwwwwaaa"));
// console.log(judge("owiq jjww"));
console.log(solution(n, lines));

function checkIsValid(line) {
  let count = 0;
  for (const c of line) {
    if (CONSONANTS.includes(c)) {
      count++;
      if (count > 5) {
        return false;
      }
    } else {
      count = 0;
    }
  }

  return true;
}
