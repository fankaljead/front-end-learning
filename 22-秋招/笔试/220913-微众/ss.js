function solution(root) {
  const res = [];
  const q = [root];

  while (q.length) {
    const len = q.length;
    const level = [];
    for (let i = 0; i < len; ++i) {
      const node = q.shift();

      level.push(node.value);

      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }

    res.push(...level);
  }

  return res;
}
