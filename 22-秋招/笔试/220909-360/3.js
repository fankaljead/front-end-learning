function solution(n, m, edge = [[]]) {
  let mp = new Map(),
    vt = [];

  mp.set(0, 1);
  vt.push(0);

  let ans = 0;
  let minLen = 0,
    node = 0;
  for (let i = 0; i < n - 1; ++i) {
    minLen = Number.MAX_VALUE;
    node = -1;
    for (const el of vt) {
      for (let k = 0; k < n; ++k) {
        if (mp.get(k)) {
          continue;
        } else if (edge[el][k] === 0) {
          continue;
        } else {
          if (edge[el][k] < minLen) {
            node = k;
            minLen = edge[el][k];
          }
        }
      }
    }
    ans += minLen;
    mp.set(node, 1);
    vt.push(node);
  }

  console.log(ans);
}

// 输入输出相关
const input = readline || read_line;
// 输入
// 从一行中读取一列数组
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
  const u = readLargeArray(m);
  const v = readLargeArray(m);
  const w = readLargeArray(m);
  // const [n, m] = [3, 3];
  // const u = [1, 1, 2];
  // const v = [2, 2, 3];
  // const w = [885, 513, 817];
  const edges = Array.from({ length: n }, () => new Array(n).fill(0));
  // console.log(edges);

  for (let i = 0; i < m; i++) {
    const x = u[i] - 1;
    const y = v[i] - 1;
    edges[x][y] = edges[y][x] = w[i];
  }

  solution(n, m, edges);
}

main();
