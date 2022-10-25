// (() => {
//   let x, y;
//   try {
//     throw new Error();
//   } catch (x) {
//     (x = 2), (y = 1);
//     console.log(x);
//   }
//   console.log(x);
//   console.log(y);
// })();

// var arr = [1, 2, 3, 4];
// Array.prototype.reduceFilter = function (callback) {
//   return this.reduce((acc, cur, index, array) => {
//     if (callback(cur, index, array)) {
//       acc.push(cur);
//     }
//     return acc;
//   }, []);
// };
// console.log(arr.reduceFilter((item) => item % 2 == 0));

// function test() {
//   console.log(a);
//   console.log(foo());
//   var a = 1;
//   function foo() {
//     return 2;
//   }
// }
// test();

// function fun(n, o) {
//   console.log(o);
//   return {
//     fun: function (m) {
//       return fun(m, n);
//     },
//   };
// }
// fun(0).fun(1).fun(2).fun(3);

var a = {},
  b = { key: "123" },
  c = { key: 123 };
a[b] = "b";
a[c] = "c";
console.log(a[b]);
