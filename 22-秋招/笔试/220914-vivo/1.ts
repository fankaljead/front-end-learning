function countPartitions(grid: number[][], m: number, n: number): number {
  let res = 0;

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j] === 1) {
        res++;
        dfs(grid, i, j);
      }
    }
  }

  return res;
}

function dfs(grid: number[][], r: number, c: number) {
  if (!isArea(grid, r, c)) {
    return;
  }

  if (grid[r][c] !== 1) {
    return;
  }

  grid[r][c] = 2;

  let dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const [x, y] of dir) {
    dfs(grid, r + x, c + y);
  }
}

function isArea(grid: number[][], r: number, c: number) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid?.[0].length;
}
