function solve(
  n = 3,
  m = 3,
  doors = [
    [1, 3],
    [2, 1],
    [2, 3],
  ]
) {
  let min = Number.MAX_SAFE_INTEGER;
  function dfs(next, current, h, value) {
    if (h - 1 === n) {
      min = Math.min(min, value);
      return;
    }
    if (doors[h][current] !== doors[h + 1][next]) {
      value += doors[h][current] * doors[h + 1][next];
      dfs(current, 0, h + 1, value);
      dfs(current, 1, h + 1, value);
    }
  }
  if (n <= 1) {
    return 0;
  }
  dfs(0, 0, 1, 0);
  dfs(1, 1, 1, 0);


  console.log(min);
  return min;
}

solve();
