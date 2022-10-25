function solution(n = 4, s = "())") {
  if (n & 1) {
    return -1;
  }
  let stack = [];
  for (const c of s) {
    if (stack.length === 0) {
      stack.push(c);
    } else {
      if (c === stack[stack.length - 1]) {
        stack.push(c);
      } else if (c === ")" && stack[stack.length - 1] === "(") {
        stack.pop();
      } else if (c === "(" && stack[stack.length - 1] === ")") {
        stack.push(c);
      }
    }
  }

  let map = new Map([
    ["(", 0],
    [")", 0],
  ]);
  for (const c of stack) {
    map.set(c, map.get(c) + 1);
  }
  console.log(map);

  return (
    Math.abs(map.get("(") - map.get(")")) / 2 + Math.min(...map.values()) * 2
  );
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
  const n = readLineInt();
  const s = input();

  console.log(solution(n, s));
}

main();

const s = "))))()(())((";
const n = s.length;
console.log(solution(n, s));
