function fx(n = 1) {
  let cnt = 0;
  while (n != 0) {
    cnt++;
    n &= n - 1;
  }
  return cnt;
}

function solution(y = 54054) {
  if (y === 0) {
    console.log(1);
    console.log(0);
  } else {
    let res = [];

    for (let i = 1; i <= 60; i++) {
      if (y % i === 0) {
        const x = y / i;
        if (fx(x) === i) {
          res.push(x);
        }
      }
    }

    console.log(res.length);
    console.log(res.sort((a, b) => a - b).join(" "));
  }
}

// const y = parseInt(read_line());
// solution(y);

// console.log(fx(1e18));
// console.log((1e18).toString(2).length);
// console.log((1e18).toString(2));
solution(10110010);
