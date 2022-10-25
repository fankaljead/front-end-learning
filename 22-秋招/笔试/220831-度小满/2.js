function solve(n = 3, p = [1, 1], v = [1, -1, 1]) {
  let area = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; ++i) {
    area[i][i] = v[i];
  }
  for (let i = 0; i < p.length; ++i) {
    area[i + 1][p[i] - 1] = 1;
    area[p[i] - 1][i + 1] = 1;
  }
  let s = v.slice(0);

  const zeros = (arr = []) => arr.every((num) => num === 0);
  let min = Number.MAX_SAFE_INTEGER,
    times = 0;

  function dfs(current) {
    console.log(s);
    if (zeros(s)) {
      min = Math.min(min, times);
    }
    if (current >= n) {
      return;
    }
    for (let i = current + 1; i < n; ++i) {
      if (area[current][i] === 1) {
        s[i] += 1;
        times++;
        dfs(i);
        times--;
        s[i] -= 1;

        s[i] -= 1;
        times++;
        dfs(i);
        times--;
        s[i] += 1;
      }
    }
  }
  dfs(0);

  console.log(area);
  console.log(min);
}

solve();
