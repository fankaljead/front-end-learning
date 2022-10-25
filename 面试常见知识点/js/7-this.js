// function foo(num) {
//   console.log("foo: " + num);
//   // 记录 foo 被调用的次数
//   this.count++;
// }
// foo.count = 0;

// for (var i = 0; i < 5; i++) {
//   // foo(i);
//   foo.call(foo, i);
// }
// // foo被调用了多少次？
// console.log(foo.count); // 0 -- 为什么？

// function foo() {
//   console.log(this.a);
// }
// var obj = {
//   a: 2,
//   foo: foo,
// };
// var bar = obj.foo; // 函数别名！

// a = "oops,global";

// bar(); // "oops,global"

// var obj = {
//   z: 1,
// };
// var obj1 = {
//   z: 2,
// };

// function fn(x, y) {
//   console.log(x + y + this.z);
// }
// // call与apply
// fn.call(obj, 2, 3); //6
// fn.apply(obj, [2, 3]); //6

// var bound = fn.bind(obj, 2);
// bound(3); //6
// //尝试修改bind返回函数的this
// bound.call(obj1, 3); //6

// Function.prototype.bind_ = function (obj) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   var fn = this;
//   return function () {
//     var params = Array.prototype.slice.call(arguments);
//     fn.apply(obj, args.concat(params));
//   };
// };

// var obj = { z: 1 };
// function fn(x, y) {
//   console.log(x + y + this.z);
// }

// var bound = fn.bind_(obj, 1);
// bound(2);

var z = 0;
var obj = {
  z: 1,
};

function fn(x, y) {
  this.name = "听风是风";
  console.log(this.z);
  console.log(x);
  console.log(y);
}
fn.prototype.age = 26;

var bound = fn.bind(obj, 2);
var person = new bound(3); //undefined 2 3

console.log(person.name); //听风是风
console.log(person.age); //26
