function allPathsSourceTarget(graph: number[][]): number[][] {
  let path: number[] = [],
    r: number[][] = [];
  function dfs(graph: number[][], index: number) {
    if (index === graph.length - 1) {
      r.push(path.slice(0));
    }
    for (let i = 0; i < graph[index].length; ++i) {
      path.push(graph[index][i]);
      arguments.callee(graph, graph[index][i]);
      path.pop();
    }
  }

  path.push(0);
  dfs(graph, 0);

  return r.length;
}
