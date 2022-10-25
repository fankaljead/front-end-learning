function solution(s = "1234", k = 23) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let temp = s.substring(i, j + 1);
      if (temp < k) {
        count++;
      } else {
        break;
      }
    }
  }

  return count;
}
const s = readline();
const k = parseInt(readline());

console.log(solution(s, k));

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
  const s = readline();
  const k = readLineInt();

  console.log(solution(s, k));
}

main();

console.log(solution());
