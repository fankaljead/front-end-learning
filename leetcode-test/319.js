let n = 99999999;
let bulbSwitch = (n = 5) => {
  if (n <= 0) {
    return 0;
  }

  let res = new Array(n).fill(0);
  let gap = 1;

  for (let i = 0; i < n; i++) {
    let j = -1 + gap;
    while (j < n) {
      res[j] = !res[j];
      j += gap;
    }
    gap++;
  }

  return res.reduce((pre, cur) => pre + cur);
};

console.log(bulbSwitch(n));
