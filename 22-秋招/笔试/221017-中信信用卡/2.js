function solution(str = "Agdgjskg") {
  let map = new Map();
  let res = new Set();
  for (const c of str) {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1);
    } else {
      map.set(c, 1);
    }
    if (map.get(c) >= 2) {
      res.add(c);
    }
  }

  return [...res].join("");
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
  const str = input();

  console.log(solution(str));
}

main();
