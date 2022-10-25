const readInt = () => {
  return parseInt(readline());
};

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

function solution(x = "123") {
  if ((parseInt(x) & 1) === 0) {
    return parseInt(x);
  }
  const arr = x.split("").map(Number);

  for (let i = 0; i < arr.length; ++i) {
    if ((parseInt(arr[i]) & 1) === 0) {
      // 交换 arr[i] 与 arr[arr.length - 1]
      [arr[i], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i]];
      return parseInt(arr.join(""));
    }
  }

  return -1;
}

function main() {
  let q = readInt();
  while (q--) {
    const x = readline();
    console.log(solution(x));
  }
}

main();
