function solve(line = "A1 B1 3|B1 A1 1|B1 C1 4|A1 C1 5|C1 B1 9") {
  const vs = line.split("|").map((l) => l.split(" "));
  const map = new Map(),
    set = new Set();
  let n = 0;
  for (const [u, v, d] of vs) {
    if (!map.has(u)) {
      map.set(u, n++);
    }
    if (!map.has(v)) {
      map.set(v, n++);
    }
  }

  const area = Array.from({ length: n }, () =>
    new Array(n).fill(Number.MAX_SAFE_INTEGER)
  );
  for (let i = 0; i < area.length; ++i) {
    area[i][i] = 0;
  }

  for (const [u, v, d] of vs) {
    area[map.get(u)][map.get(v)] = Number(d);
  }
  console.log(map);
  console.log(area);

  let min = Number.MAX_SAFE_INTEGER;
  let r = 0;
  let path = [];
  let visited = new Array(n).fill(false);

  function dfs(start, size, currentMin) {
    let flag = false;

    for (let i = 0; i < area[start].length; ++i) {
      if (i !== start && !visited[i]) {
        if (area[start][i] !== Number.MAX_SAFE_INTEGER) {
          flag = true;
        }
      }
    }
    if (flag) {
      return;
    }
    if (!flag && size === n) {
      console.log(`currentMin: ${currentMin}`);
      if (currentMin < min) {
        min = currentMin;
        r = path[0];
      }
      return;
    }
    for (let i = 0; i < area[start].length; ++i) {
      if (
        i !== start &&
        area[start][i] !== Number.MAX_SAFE_INTEGER &&
        !visited[i]
      ) {
        currentMin += area[start][i];
        path.push(i);
        visited[i] = true;
        dfs(i, size + 1, currentMin);
        visited[i] = false;
        path.pop();
        currentMin -= area[start][i];
      }
    }
  }

  for (let i = 0; i < n; ++i) {
    path = [i];
    visited[i] = true;
    dfs(i, 0, 0);
    visited[i] = false;
    path = [];
  }

  let res;
  for (const [k, v] of map.entries()) {
    if (v === r) {
      res = k;
    }
  }

  console.log(min);
  console.log(res);
  return res;
}

solve();
solve("A B 1|B A 2");
// console.log(solve(readline()));
