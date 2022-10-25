function solution(n = 6, arr = [1, 2, 2, 3, 3]) {
  let visited = new Array(n).fill(false);
  let degrees = new Map();
  arr.forEach((num, index) => {
    if (degrees.has(num)) {
      degrees.set(num, degrees.get(num) + 1);
    } else {
      degrees.set(num, 1);
    }
    const target = index + 2;
    if (degrees.has(target)) {
      degrees.set(target, degrees.get(target) + 1);
    } else {
      degrees.set(target, 1);
    }
  });

  let board = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [index, value] of arr.entries()) {
    board[index + 2][value - 1] = 1;
    board[value - 1][index + 2] = 1;
  }

  console.log(board);
}

solution();
