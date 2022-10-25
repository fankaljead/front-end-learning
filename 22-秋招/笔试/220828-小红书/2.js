function solution(n = 3, K = 3, a = [3, 2, 1]) {
  let count = 0n;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (a[i] * a[j] >= K) {
        count++;
      }
    }
  }
  console.log(count * 2);
}

const readArray = () => {
  const line = read_line();
  return line.split(" ").map(BigInt);
};

function main() {
  const [n, K] = readArray();
  const a = readArray();

  console.log(solution(n, K, a));
}

main();
