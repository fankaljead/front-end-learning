function solution(str = "Agdgjskg") {
  const AEIOU = new Set([..."aeiou".split("")]);
  const chars = str.split("");

  for (let i = 0; i < chars.length; i++) {
    if (AEIOU.has(chars[i].toLowerCase())) {
      chars[i] = chars[i].toLowerCase();
    } else {
      chars[i] = chars[i].toUpperCase();
    }
  }

  return chars.join("");
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
