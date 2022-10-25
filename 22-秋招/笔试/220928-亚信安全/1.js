function solution(a = 5, b = 100, c = 500) {
  return Math.floor(c / a);
}
const input = readline || read_line;

const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

const readLineInt = () => {
  return parseInt(input());
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const [a, b, c] = readArray;

  console.log(solution(a, b, c));
}

main();
