function canReach(x1 = 1, y1 = 4, x2 = 5, y2 = 9) {
  let r = false;
  function dfs(x1, y1) {
    if (x1 > x2) {
      return;
    }
    if (y1 > y2) {
      return;
    }
    if (x1 === x2 && y1 === y2) {
      r = true;
      return;
    }
    if (x1 < x2) {
      dfs(x1 + y1, y1);
    }
    if (y1 < y2) {
      dfs(x1, y1 + x1);
    }
  }

  dfs(x1, y1);

  return r;
}

console.log(canReach());
