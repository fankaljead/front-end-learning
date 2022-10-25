const STEP = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};
const STEPS = "RLUD";

function solution(
  n = 5,
  m = 5,
  grid = [".U...", ".RRD.", ".U.DR", ".ULL.", "....O"]
) {
  grid = grid.map((line) => line.split(""));
  const gridArea = Array.from({ length: n }, () => new Array(m).fill(0));

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (STEPS.includes(grid[i][j])) {
        dfs(grid, i, j, gridArea);
      }
    }
  }

  function caculate(gridArea, targetX, targetY, n, m) {
    ddfs(gridArea, targetX, targetY, n, m);

    function ddfs(gridArea, r, c) {
      if (!isArea(gridArea, r, c)) {
        return;
      }
      if (gridArea[r][c] === 0) {
        if (gridArea[r][c] === 2) {
          return;
        }
        gridArea[r][c] = 2;
        for (const step of STEPS) {
          const [x, y] = STEP[step];
          ddfs(gridArea, r + x, c + y);
        }
      }
    }
  }
  let targetX = 0,
    targetY = 0;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (grid[i][j] === "O") {
        targetX = i;
        targetY = j;
      }
    }
  }
  console.log(gridArea);
  caculate(gridArea, targetX, targetY, n, m);
  console.log(gridArea);
  gridArea[targetX][targetY] = -1;

  let res = 0;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (gridArea[i][j] === 2) {
        ++res;
      }
    }
  }

  res = n * m - res - 1;

  return res;
}

function dfs(grid, r, c, gridArea) {
  if (!isArea(grid, r, c)) {
    return;
  }
  if (gridArea[r][c] === 1) {
    return;
  }
  gridArea[r][c] = 1;
  const step = STEP[grid[r][c]];
  dfs(grid, r + step[0], c + step[1], gridArea);
}

function isArea(grid, r, c) {
  return c >= 0 && c < grid[0].length && r >= 0 && r < grid.length;
}

console.log(solution());

// let [n, m] = readline().split(" ").map(Number);
// let grid = [],
//   line;
// while ((line = readline())) {
//   grid.push(line);
// }

// print(solution(n, m, lines));
