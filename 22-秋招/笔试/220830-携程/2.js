const readInt = () => {
  return parseInt(readline());
};

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

function solution(a = 1, b = 1, c = 1) {
  let min = Math.min(a, b, c);
  a -= min;
  b -= min;
  c -= min;
  if (b === 0) {
    return min * 2;
  } else {
    return min * 2 + b - 1;
  }
}

function main() {
  let q = readInt();
  while (q--) {
    const [a, b, c] = readArray();
    console.log(solution(a, b, c));
  }
}

main();
