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

// test.getName();
// let t = new test();
// t.getName();


// {
//     function FunctionDeclaration() {}
//     class ClassDeclaration {}
// }
// console.log(FunctionDeclaration); // FunctionDeclaration() {}
// console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined


// 
// class Person {
//     constructor(name) {
//         this.name = name;
//         this.locate = function () {
//             console.log('inner');
//         }
//     }
//     locate() {
//         console.log('outer');
//     }
//     static num = 3;
//     static color = '';
//     static caculate() {
//         console.log('Your num is ', this.num);
//     }
// }

// let p = new Person('Tom');
// p.locate();
// console.log(p);
// Person.prototype.locate();

// Person.caculate();

// class YellowPerson extends Person {
//     constructor(name) {
//         super(name);
//     }

//     static color = super.color + 'yellow';
// }

// let y = new YellowPerson('zxh')
// console.log(y);
// console.log(YellowPerson.color);


// var a = {
//     n: 1
// };
// var b = a;
// a.x = a = {
//     n: 2
// };
// console.log(a.x);
// console.log(b.x);


// 23
// function changeObjProperty(o) {
//     o.x = 1;
//     o = new Object();
//     o.x = 2;
// }

// let o = new Object();
// changeObjProperty(o);
// console.log(o.x);

// function Foo() {
//     Foo.a = function () {
//         console.log(1);
//     }
//     this.a = function () {
//         console.log(2);
//     }
// }

// Foo.prototype.a = function () {
//     console.log(3);
// }

// Foo.a = function () {
//     console.log(4);
// }

// Foo.a(); // 4
// let obj = new Foo();
// obj.a(); // 2
// Foo.a(); //1


// 25
// console.log(String('11') == new String('11')); // true
// console.log(String('11') === new String('11')); // false
// console.log(typeof String('11')); // String
// console.log(typeof new String('11')); // Object

// 26
// var name = 'Tom';
// (function () {
//     if (typeof name == 'undefined') {
//         var name = 'Jack';
//         console.log('Goodbye ' + name);
//     } else {
//         console.log('Hello ' + name);
//     }
// })(); // Goodbey Jack


// //27 
// var name = 'Tom';
// (function () {
//     if (typeof name == 'undefined') {
//         name = 'Jack';
//         console.log('Goodbye ' + name);
//     } else {
//         console.log('Hello ' + name);
//     }
// })(); //  Hello Tom

// 28
// console.log(1 + '1');
// console.log(2 * '2');
// console.log([1, 2] + [2, 1]);
// console.log('a' + +'b'); //aNaN

//29
// var t1 = new Date().getTime();
// for (let i = 0; i < 100; i++) {
//     for (let j = 0; j < 1000; j++) {
//         for (let k = 0; k < 10000; k++) {

//         }
//     }
// }
// var t2 = new Date().getTime();
// console.log('first time is ', t2 - t1);

// var t3 = new Date().getTime()
// for (let i = 0; i < 10000; i++) {
//     for (let j = 0; j < 1000; j++) {
//         for (let k = 0; k < 100; k++) {

//         }
//     }
// }
// var t4 = new Date().getTime();
// console.log('second time is ', t4 - t3);


// 30
// function wait() {
//     return new Promise(resolve =>
//         setTimeout(resolve, 10 * 1000)
//     );
// }

// async function main() {
//     console.time();
//     const x = wait();
//     const y = wait();
//     const z = wait();
//     await x;
//     await y;
//     await z;
//     console.timeEnd();
// }
// main();


// 31
// function wait() {
//     return new Promise(resolve =>
//         setTimeout(resolve, 10 * 1000)
//     );
// }
// async function main() {
//     console.time();
//     await wait();
//     await wait();
//     await wait();
//     console.timeEnd();
// }
// main();

// 32
// 常见异步
// 1
async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 3
}
async function async2() {
    console.log('async2'); // 7
}
console.log('script start'); // 1
setTimeout(function () {
    console.log('setTimeout'); // 6
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1'); // 4
    resolve();
}).then(function () {
    console.log('promise2'); // 8
});
console.log('script end'); // 5 