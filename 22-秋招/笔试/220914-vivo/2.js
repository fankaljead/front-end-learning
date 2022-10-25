function leftSeconds(signal = [82, 119, 111, 123, 111, 127]) {
  const map = new Map([
    [0b1110111, 0],
    [0b0010010, 1],
    [0b1011101, 2],
    [0b1011011, 3],
    [0b0111010, 4],
    [0b1101011, 5],
    [0b1101111, 6],
    [0b1010010, 7],
    [0b1111111, 8],
    [0b1111011, 9],
    [0b1111110, 10],
    [0b0101111, 11],
    [0b1100101, 12],
    [0b0011111, 13],
    [0b1101101, 14],
    [0b1101100, 15],
  ]);
  const path = new Map();

  function getPath(num) {
    let r = new Set(),
      q = [num];

    while (q.length) {
      let len = q.length;
      for (let i = 0; i < len; ++i) {
        const n = parseInt(q.shift(), 2);
        let level = new Set();
        for (let j = 6; j >= 0; --j) {
          let ts = n.toString(2).split("").map(Number);
          ts[i] = (ts[i] + 1) % 2;

          const t = parseInt(ts.join(""), 2);
          console.log(t);
          if (!r.has(t)) {
            level.add(t);
            r.add(t);
          }
          ts[i] = (ts[i] + 1) % 2;
        }
        console.log(level);
        q.push(...level);
      }
    }

    return [...r];
  }

  console.log(getPath(1111111));
}

leftSeconds();
