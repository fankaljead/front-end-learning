// var obj = {
//   name: "zxh",
// };
// Object.defineProperty(obj, "a", {
//   configurable: false,
//   enumerable: false,
//   value: 10,
//   writable: false,
// });

// var p = new Proxy(obj, {
//   get: function (target, prop) {
//     if (prop === "age") {
//       return 20;
//     } else if (prop === "a") {
//       return target[a];
//     }
//   },
// });

// // Object.defineProperty(obj, "a", {
// //   // configurable: false,F
// //   enumerable: true,
// //   value: 11,
// //   writable: true,
// // });

// // console.log(obj.a);
// // Object.defineProperty(obj, "a", {
// //   configurable: true,
// //   enumerable: true,
// //   value: 11,
// //   writable: true,
// // });
// console.log(obj.a);

// console.log(
//   Reflect.defineProperty(obj, "a", {
//     configurable: true,
//     enumerable: true,
//     value: 14,
//     writable: true,
//   })
// );
// console.log(obj.a);

var map = new Map();
map.set(undefined, { name: "zxh" });
console.log(map.get(undefined));
map.set(null, { test: null });
console.log(map.get(null));
map.set(map, "map");
console.log(map);
