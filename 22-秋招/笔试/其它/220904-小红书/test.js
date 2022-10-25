// // 输入输出相关
// // 输入
// // 从一行中读取一列数组
const readArray = () => {
  const line = read_line();
  return line.split(" ").map(Number);
};

// // 读取一个长度很大的数组
const readLargeArray = (m = 100000) => {
  const arr = [];
  for (let i = 0; i < m; ++i) {
    arr.push(readInt());
  }
  return arr;
};

function solution(
  n = 5,
  m = 6,
  k = 3,
  u = [1, 1, 2, 3, 3, 4],
  v = [2, 5, 3, 4, 5, 5],
  costs = [1, 3, 1, 2, 1, 1]
) {
  let areas = Array.from({ length: n }, () =>
    new Array(n).fill(Number.MAX_SAFE_INTEGER)
  );
  let visited = new Array(n).fill(false);
  let scosts = [...new Set(costs)].sort((a, b) => a - b);

  for (let i = 0; i < n; ++i) {
    areas[i][i] = 0;
  }
  for (let i = 0; i < m; ++i) {
    const x = u[i] - 1,
      y = v[i] - 1;
    areas[x][y] = costs[i];
  }

  let flag = false,
    cost = 0,
    res = 0,
    rCost = Number.MAX_SAFE_INTEGER;
  function dfs(start, X, gap) {
    // console.log(cost);
    if (gap > k) {
      flag = false;
      return;
    }
    if (start === n - 1 && gap <= k) {
      flag = true;
      if (cost < rCost) {
        rCost = cost;
        res = X;
      }
      return;
    }

    let has = true;
    for (let i = start + 1; i < n; ++i) {
      if (!visited[i] && areas[start][i] !== Number.MAX_SAFE_INTEGER) {
        has = false;
        break;
      }
    }

    if (has) {
      return;
    }

    for (let i = start + 1; i < n; ++i) {
      if (areas[start][i] !== Number.MAX_SAFE_INTEGER && !visited[i]) {
        visited[i] = true;
        if (areas[start][i] <= X) {
          dfs(i, X, gap + 1);
        } else {
          cost += areas[start][i];
          dfs(i, X, gap + 1);
          cost -= areas[start][i];
        }
        visited[i] = false;
      }
    }
  }

  for (const x of scosts) {
    cost = x;
    flag = false;
    visited[0] = true;
    dfs(0, x, 0);
    // console.log(cost);
    // if (flag) {
    //   return x;
    // }
    visited.fill(false);
  }

  return res;
}

// function main() {
//   const [n, m, k] = readArray();
//   const u = readLargeArray(m);
//   const v = readLargeArray(m);
//   const costs = readLargeArray(m);

//   console.log(solution(n, m, k, u, v, costs));
// }

// main();

console.log(solution());
