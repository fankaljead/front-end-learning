function solution(nums = [3, 1, 3, 4, 3, 4], n = 6) {
  let count = 0;
  let map = new Map();
  nums.forEach((num, index) => {
    if (map.has(num)) {
      map.get(num).push(index);
    } else {
      map.set(num, [index]);
    }
  });
  let nns = new Array(...new Set(nums)).sort((a, b) => b - a),
    nnlen = nns.length;

  for (let i = 0; i < nnlen - 1; ++i) {
    for (let j = i + 1; j < nnlen; ++j) {
      for (let k = 0; k < map.get(nns[j]).length; ++k) {
        let index = map.get(nns[i]).findIndex((x) => x < map.get(nns[j])[k]);
        if (index < 0) {
          continue;
        } else {
          count += map.get(nns[i]).length - 1 - index;
        }
      }
    }
  }


  return count;
}

console.log(solution());
