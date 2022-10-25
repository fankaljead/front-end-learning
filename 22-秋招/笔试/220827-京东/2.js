const readInt = () => {
  return parseInt(readline());
};

function solution(n = 3) {
  let r = Array.from({ length: n }, () => new Array(n).fill(1));
  let evens = [],
    odds = [],
    nn = n * n;
  for (let i = 1; i <= nn; ++i) {
    if (i & 1) {
      odds.push(i);
    } else {
      evens.push(i);
    }
  }
  if (n & 1) {
    r[0][0] = odds.pop();
  } else {
    r[0][0] = evens.pop();
  }
  for (let i = 1; i < n; ++i) {
    if (r[0][i - 1] & 1) {
      r[0][i] = evens.pop();
    } else {
      r[0][i] = odds.pop();
    }
  }
  for (let j = 1; j < n; ++j) {
    if (r[j - 1][0] & 1) {
      r[j][0] = evens.pop();
    } else {
      r[j][0] = odds.pop();
    }
  }
  for (let i = 1; i < n; ++i) {
    for (let j = 1; j < n; ++j) {
      if (r[i - 1][j - 1] & 1) {
        r[i][j] = odds.pop();
      } else {
        r[i][j] = evens.pop();
      }
    }
  }

  return r;
}
// const n = readInt();
const n = 3;
const printArrToLines = (arr = []) => arr.forEach((item) => console.log(item));
printArrToLines(solution(n));
