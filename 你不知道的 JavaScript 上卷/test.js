// function foo(obj) {
//     with(obj) {

//         a = 2;
//     }
// }

// var o1 = {
//     a: 3
// };

// var o2 = {
//     b: 3
// };

// foo(o1);
// console.log(o1.a);

// foo(o2);
// console.log(o2.a);
// console.log(a);


// function foo() {
//     console.log('foo1');

//     return function foo() {
//         console.log('foo2');
//     }
// }

// foo()();

// a = 2;

// var a;

// console.log(a);

// foo();

// function foo() {
//     console.log(a);
//     var a = 2;
// }

// 函数优先
// foo();

// var foo;


// foo = function () {
//     console.log(2);
// }

// function foo() {
//     console.log(1);
// }

// for (let i = 1; i <= 5; ++i) {
//     setTimeout(function timer() {
//         console.log(i);
//     }, i * 1000);
// }

// function test() {
//     getName = function () {
//         Promise.resolve().then(() => console.log(0));
//         console.log(1);
//     };
//     return this;
// }

// test.getName = function () {
//     setTimeout(() => console.log(2), 0);
//     console.log(3);
// };

// test.prototype.getName = function () {
//     console.log(4);
// }

// var getName = function () {
//     console.log(5);
// };

// function getName() {
//     console.log(6);
// }

// test.getName(); // 3 2
// getName(); // 5
// test().getName(); // 1 0 
// getName(); // 5
// new test.getName(); // 1 0 
// new test().getName(); // 1 0
// new new test().getName(); // 1 0


// console.log(sum);
// var sum = function (a, b) {
//     return a + b;
// };


function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}

console.log(factorial(10));