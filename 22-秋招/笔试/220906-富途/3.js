function solution(n = 4, str = "1101") {
  let res = [];
  let i0 = -1,
    i1 = -1;
  for (let i = 0; i < n; ++i) {
    if (str[i] === "0") {
      res.push(i1);
      i0 = i;
    } else {
      res.push(i0);
      i1 = i;
    }
  }

  console.log(res.join(' '));
}


