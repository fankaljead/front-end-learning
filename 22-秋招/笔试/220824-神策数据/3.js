function findWhetherExistsPath(n, graph, start, end) {
  let borad = Array.from({ length: n }, () => new Array());
  let visited = new Array(n).fill(false);
  let flag = false;
  for (const g of graph) {
    borad[g[0]].push(g[1]);
  }
  // console.log(borad);
  function dfs(n, borad, current) {
    if (current >= n) {
      return;
    }
    if (borad[current].includes(end)) {
      flag = true;
      return;
    } else {
      for (const s of borad[current]) {
        if (!visited[s]) {
          dfs(n, borad, s); 
          visited[s] = true;
        }
      }
    }
  }
  dfs(n, borad, start);
  return flag;
}

let n = 3,
  graph = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 2],
  ],
  start = 0,
  end = 2;

console.log(findWhetherExistsPath(n, graph, start, end));
