function getLinkNodeIdList(nodeList = []) {
  let n = nodeList.length;
  let board = Array.from({ length: n }, () => new Array());
  for (const n of nodeList) {
    for (let i = 0; i < n.length; ++i) {
      if (i !== 0) {
        board[n[0] - 1].push(n[i]);
      }
    }
  }

  let r = [1],
    path = [1];

  function dfs(board, current, n, path) {
    if (current >= n) {
      return;
    }
    for (const g of board[current]) {
      path.push(g);
      if (path.length > r.length) {
        r = path.slice(0);
      }
      dfs(board, g - 1, n, path);
      path.pop();
    }
  }
  dfs(board, 0, n, path);
  return r;
}

let nodeList = [[1, 2, 3], [2, 4], [3], [4]];

console.log(getLinkNodeIdList(nodeList));
