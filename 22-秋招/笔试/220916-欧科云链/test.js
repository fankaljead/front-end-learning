// let a = 1;
// let obj = {
//   x: 1,
// };
// delete a;
// delete obj.x;
// delete 2;
// console.log(a);
// console.log(obj.x);
// console.log(2);

// function control(x) {
//   if (x == 3) throw new Error("break");
// }
// function foo(x = 6) {
//   return {
//     next: () => {
//       control(x);
//       return { done: !x, value: x && x-- };
//     },
//   };
// }
// let x = new Object();
// x[Symbol.iterator] = foo;
// for (let i of x) console.log(i);

// console.log();

// function A(x) {
//   this.x = x;
// }
// A.prototype.x = 1;
// function B(x) {
//   this.x = x;
// }
// B.prototype = new A();
// var a = new A(2),
//   b = new B(3);
// delete b.x;

// console.log(a.x, b.x);

// let obj = {
//   num1: 117,
// };
// let res = obj;
// obj.child = obj = { num2: 935 };
// var x = (y = res.child.num2);
// console.log(obj.child);
// console.log(res.num1);
// console.log(y);

// "use strict";
// function fn(a, a) {
//   console.log(a + a);
// }
// fn(1, 1);

// ("use strict");
// var uname = "window";
// (function () {
//   console.log(this.uname);
// })();

// ("use strict");
// var uname = "window";
// function Person() {
//   console.log(this.uname);
// }
// var p = new Person();
