class Status {
  constructor(cur, t, l, src) {
    this.cur = cur;
    this.x1 = t;
    this.l = l;
    this.src = src;
  }
}

function solution(n, start, target, maxTtl, map) {
  let pq = new PriorityQueen();

  let startNode = new Status(start, maxTtl, 0, 0);
  pq.push(startNode);

  while (!pq.empty()) {
    const currentNode = pq.pop();
    const [cur, t, l, src] = currentNode;

    if (cur === target) {
      console.log(`${l} ${t}`);
      return;
    }

    if (t !== 0) {
      for (const it of map.get(cur)) {
        if (it.first !== src) {
          pq.push(new Status(it.first, t - 1, it.second + l, cur));
        }
      }
    }
  }

  console.log(-1);
}

function toArray(str = "") {
  return str.split(" ").map(Number);
}

function main(inputArray) {
  const [n, start, target, maxTtl] = toArray(inputArray[0]);
  let map = new Map();

  for (let i = 1; i <= n; ++i) {
    const [p, q, v] = toArray(inputArray[i]);
  }

  solution(n, start, target, maxTtl, map);
}
