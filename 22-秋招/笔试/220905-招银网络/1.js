const START = 100;

function upNumber(n = 100) {
  let s = String(n);
  for (let i = 1; i < s.length; ++i) {
    if (s[i] < s[i - 1]) {
      return false;
    }
  }

  return true;
}

function downNumber(n = 100) {
  let s = String(n);
  for (let i = 1; i < s.length; ++i) {
    if (s[i] > s[i - 1]) {
      return false;
    }
  }

  return true;
}

function calNum(num = 1) {
  let start = START;
  for (let i = 0; i < num; ++start) {
    if (!upNumber(start) && !downNumber(start)) {
      i++;
    }
  }
  return start - 1;
}

function main(n) {
  console.log(calNum(n));
}

// console.log(upNumber(12334));
// console.log(upNumber(123343));
// console.log(downNumber(4332));
// console.log(downNumber(123343));
// console.log(calNum(10000));
