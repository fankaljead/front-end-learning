function solution(walk) {
  if (walk.length !== 10) {
    return false;
  }
  const map = new Map([
    ["n", [0, 1]],
    ["s", [0, -1]],
    ["w", [-1, -0]],
    ["e", [1, 0]],
  ]);

  const now = [0, 0];
  for (const c of walk) {
    const [x, y] = map.get(c);
    now[0] += x;
    now[1] += y;
  }

  return now[0] === 0 && now[1] === 0;
}

console.log(solution("snwsn"));
