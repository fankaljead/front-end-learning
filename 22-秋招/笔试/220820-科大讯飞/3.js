function winMazeGift(
  maze = [
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 8, 1],
    [1, 0, 1, 1],
  ]
) {
  let r = [],
    p = [];

  function dfs(maze, row, col) {
    if (
      row < 0 ||
      row > maze.length - 1 ||
      col < 0 ||
      col > maze[0].length - 1
    ) {
      return;
    }
    if (maze[row][col] === 1) {
      return;
    } else if (maze[row][col] === 0) {
      p.push(row, col);
      r.push(p);
      p = [];
    } else {
      p.push(row, col);
      maze[row][col] = 1;
      dfs(maze, row + 1, col);
      dfs(maze, row - 1, col);
      dfs(maze, row, col + 1);
      dfs(maze, row, col - 1);
      p = [];
      maze[row][col] = 0;
    }
  }

  let len = maze.length;
  for (let i = 0; i < len; ++i) {
    if (i === 0 || i === len - 1) {
      for (let j = 0; j < maze[0].length; ++j) {
        if (maze[i][j] === 0) {
          dfs(maze, i, j);
        }
      }
    } else {
      for (let j = 0; j < maze[0].length; ++j) {
        if (maze[i][j] === 0 && (j == 0 || j == maze[0].length - 1)) {
          dfs(maze, i, j);
        }
      }
    }
  }

  return r;
}

console.log(winMazeGift());
