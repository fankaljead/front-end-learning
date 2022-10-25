function solution(
  n = 3,
  m = 4,
  x = [2, 3, 2],
  orders = [
    [1, 2],
    [2, 4],
    [3, 1],
    [1, 1],
  ]
) {
  for (const order of orders) {
    const [k, v] = order;
    if (x[k - 1] >= v) {
      console.log(`item #${k}:Success!`);
      x[k - 1] -= v;
    } else {
      console.log(`item #${k}:Sorry!`);
    }
  }
}
const input = readline || read_line;

const readArray = () => {
  const line = input();
  return line.split(" ").map(Number);
};

const readLargeArray = (n = 1e7) => {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function main() {
  const [n, m] = readArray();
  const x = readLargeArray(n);
  const orders = [];
  for (let i = 0; i < m; i++) {
    orders.push(readArray());
  }

  solution(n, m, x, orders);
}

main();

solution();
