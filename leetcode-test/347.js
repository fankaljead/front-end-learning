let nums = [1, 1, 1, 2, 2, 3];
let k = 2;
let map = new Map();
for (const num of nums) {
  if (map.has(num)) {
    map.set(num, map.get(num) + 1);
  } else {
    map.set(num, 1);
  }
}
console.log(map);

let arr = [];
let keys = Array.from(map.keys());

for (let i = 0; i < keys.length; i++) {
  let temp = keys[i];
  let j = i;
  for (; j > 0; j--) {
    if (map.get(temp) < map.get(keys[j - 1])) {
      break;
    }
    keys[j] = keys[j - 1];
  }
  keys[j] = temp;
}

console.log(keys.splice(0, k));

// for (const key of map.keys()) {
//   console.log("key:", key);

//   if (0 === arr.length) {
//     arr.push(key);
//   } else if (arr.length === 1) {
//     if (map.get(key) <= map.get(arr[0])) {
//       console.log("push:", key);
//       arr.push(key);
//     } else {
//       arr.splice(0, 0, key);
//     }
//   }

//   let index = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (i === 0 && map.get(key) >= map.get(arr[i])) {
//       index = 0;
//       break;
//     }
//     if (map.get(key) < map.get(arr[i])) {
//       if (map.get(key < map.get(arr[i + 1]))) {
//         if (i === arr.length - 2) {
//           index = arr.length - 2;
//           break;
//         }
//         continue;
//       } else {
//         index = i;
//         break;
//       }
//     }
//   }
// }

// console.log(arr);
// console.log(arr.splice(0, 2));
