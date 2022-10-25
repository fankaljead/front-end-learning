    temp = [0],
    rest = b - p[0];
  function getR(start, rest) {
    if (rest < p[start] || start >= n) {
      r.push(temp.slice(0));
      return;
    }

    for (let i = start; i < n; ++i) {
      temp.push(i);
      getR(i + 1, rest - p[i]);
      temp.pop();
    }
  }

  getR(1, rest);

  let res = Number.MAX_VALUE;

  function cal() {
    for (const x of r) {
      let sum = [];
      for (let i = 0; i < x.length - 1; ++i) {
        sum.push(t[i] * (x[i + 1] - x[i]));
      }
      sum.push(t[x.length - 1] * (n - x[x.length - 1]));
      res = Math.min(res, Math.max(...sum));
    }
  }
  cal();
  console.log(r);
  console.log(res);

  return res;
}

solution();
