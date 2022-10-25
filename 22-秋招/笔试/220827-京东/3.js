// function solution(arr = [1, 1, 4, 5, 1, 4]) {
//   let odd = Number.MIN_SAFE_INTEGER,
//     even = Number.MIN_SAFE_INTEGER;
//   function count(even, odd) {
//     let count = 0;
//     for (let i = 0; i < arr.length; ++i) {
//       if (i & 1) {
//         count += odd - arr[i];
//       } else {
//         count += even - arr[i];
//       }
//     }
//     return count;
//   }
//   for (let i = 0; i < arr.length; ++i) {
//     if (i & 1) {
//       odd = Math.max(odd, arr[i]);
//     } else {
//       even = Math.max(even, arr[i]);
//     }
//   }
//   let res = 0;
//   if (odd === even) {
//     res = count(even, odd);
//   } else {
//     let r1 = count(even + 1, odd);
//     let r2 = count(even, odd + 1);
//     res = Math.min(r1, r2);
//   }

//   return res;
// }

// const readArray = () => {
//   const line = readline();
//   return line.split(" ").map(Number);
// };
// const readInt = () => {
//   return parseInt(readline());
// };
// const n = readInt();
// const arr = readArray();
// console.log(solution(arr));
console.log(solution());

function solution(arr = [1, 1, 4, 5, 1, 4]) {
  let odd = new Map(),
    evens = new Map(),
    n = arr.length;
  for (let i = 0; i < n; ++i) {
    if (i & 1) {
      if (odd.has(arr[i])) {
        odd.set(arr[i], odd.get(arr[i]) + 1);
      } else {
        odd.set(arr[i], 1);
      }
    } else {
      if (evens.has(arr[i])) {
        evens.set(arr[i], evens.get(arr[i]) + 1);
      } else {
        evens.set(arr[i], 1);
      }
    }
  }
  function findMax(map) {
    let m = 0;
    for (const [k, v] of map) {
      if (v > (map.get(m) || 0)) {
        m = k;
      }
    }
    return m;
  }
  let maxO, maxE;
  let maxOS = [],
    maxES = [];
  function findMaxStack(map, stack) {
    while (map.size) {
      let max = findMax(map);
      stack.push(max);
      map.delete(max);
    }
  }
  // maxO = findMax(odd);
  // maxE = findMax(evens);

  findMaxStack(new Map(odd), maxOS);
  findMaxStack(new Map(evens), maxES);

  (maxO = maxOS.shift()), (maxE = maxES.shift());

  while (maxO === maxE) {
    if (odd.get(maxO) > evens.get(maxE)) {
      maxE = maxES.shift();
    } else {
      maxO = maxOS.shift();
    }
  }

  return arr.length - odd.get(maxO) - evens.get(maxE);
}
