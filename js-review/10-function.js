// console.log(Math.max.name);

// function Person() {
//   this.age = 12;
//   this.name = "zxh";
//   console.log(new.target);
//   console.log(this);
// }

// var a = new Person();
// // var b = Person();
// console.log(b.name);

// function outer() {
//   inner();
// }
// function inner() {
//   console.log(arguments.callee.caller);
// }

// outer();

// function sum(num1, num2) {
//   return num1 + num2;
// }
// function callSum1(num1, num2) {
//   return sum.apply(this, arguments);
// }
// function callSum2(num1, num2) {
//   return sum.apply(this, [num1, num2]);
// }
// console.log(callSum1(10, 12));
// console.log(callSum2(10, 12));

// function factorial(num) {
//   if (num <= 1) {
//     return 1;
//   } else {
//     return num * factorial(num - 1);
//   }
// }

// let anotherFactorial = factorial;
// factorial = null;
// console.log(anotherFactorial(10));

const factorial = (function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
});
let anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(10));
