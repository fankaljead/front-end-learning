const readInt = () => {
  return parseInt(readline());
};

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};
const readTwoArray = (T = 1) => {
  const arr = [];
  while (T--) {
    arr.push(readArray());
  }
  return arr;
};

function solution(
  n = 7,
  str = "rgbrgbg",
  edges = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
  ]
) {
  let count = 0;
  let area = Array.from({ length: n }, () => new Array(n).fill(0));
  let visited = new Array(n).fill(false);
  for (const [k, v] of edges) {
    area[k - 1][v - 1] = 1;
    area[v - 1][k - 1] = 1;
  }
  console.log(area);

  let flag = false;
  for (const [k, v] of edges) {
    dfs(k - 1, new Set());
    let kf = flag;

    flag = false;

    dfs(v - 1, new Set());
    let vf = flag;

    if (kf && vf) {
      count++;
    }

    visited.fill(false);
    flag = false;
  }

  function dfs(start, set) {
    if (set.size >= 3) {
      flag = true;
    }
    if (visited[start]) {
      return;
    }
    for (let i = 0; i < edges[start].length; ++i) {
      if (i !== start && edges[start][i] && !visited[i]) {
        set.add(str[i]);
        dfs(i, set);
      }
    }
  }

  return count;
}

// function main() {
//   let n = readInt();
//   let str = readline();
//   const edges = readTwoArray(n - 1);
//   console.log(solution(str, edges));
// }

// main();
console.log(solution());
