function solution(repeatArr = []) {
  let map = new Map();
  repeatArr.forEach((num) => {
    if (!map.has(num)) {
      map.set(num, 1);
    } else {
      map.set(num, map.get(num) + 1);
    }
  });
  let max = repeatArr[0];
  for (const [key, value] of map) {
    if (value > map.get(max)) {
      max = key;
    }
  }

  return max;
}
const N = 20;

function generateArr() {
  const arr = new Array(N);
  for (let i = 0; i < N; ++i) {
    arr[i] = Math.floor(N * Math.random());
  }
  return arr;
}

const repeatArr = generateArr();
console.log(solution(repeatArr));
