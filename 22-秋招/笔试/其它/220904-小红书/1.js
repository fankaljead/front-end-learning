const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

function solution(a, b, c) {
  let sum = a + b;
  let a1 = 0;
  let b1 = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i < sum; i++) {
    let temp = Math.floor(i / c) + Math.floor((sum - i) / c);
    if (temp >= max) {
      max = temp;
      a1 = i;
      b1 = sum - i;
      min = Math.min(min, Math.abs(a1 - a) + Math.abs(b1 - b));
    }
  }

  return min;
}

function main() {
  const [a, b, c] = readArray();
  console.log(solution(a, b, c));
}

main();

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

const readLargeArray = (m = 100000) => {
  const arr = [];
  for (let i = 0; i < m; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function solution(n, q, our = [], ems = []) {
  our.sort((a, b) => b - a);
  ems.sort((a, b) => a - b);
  let res = new Array(q);
  let index = 0;
  for (let i = 0; i < q; i++) {
    let [base, them] = readArray();
    let sum = 0;
    for (let j = 0; j < n; j++) {
      let c = 1 * base * our[j] - 1 * them * ems[j];
      if (c > 0) {
        sum += c;
      } else {
        break;
      }
    }
    res[index++] = sum;
  }
  for (const r of res) {
    console.log(r);
  }
}

function main() {
  const [n, q] = readArray();
  const our = readLargeArray(n);
  const ems = readLargeArray(n);
  solution(n, q, our, ems);
}

main();
