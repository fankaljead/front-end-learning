// 1
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve();
//     console.log(2);
// });
// promise.then(() => {
//     console.log(3);
// });
// console.log(4);

// 1 2 4 3

// 2
// 同步代码 > 微任务 > 宏任务
// const first = () =>
//     new Promise((resolve, reject) => {
//         console.log(3);
//         let p = new Promise((resolve, reject) => {
//             console.log(7);

//             setTimeout(() => {
//                 // 宏任务
//                 console.log(5);
//                 resolve(6);
//             }, 0);
//             resolve(1);
//         });
//         resolve(2);
//         p.then((arg) => {
//             console.log(arg);
//         });
//     });

// first().then((arg) => {
//     console.log(arg);
// });
// console.log(4);
// 3 7 4 1 5 2

// 3
// test = async () => {
//     await console.log(1);
//     await console.log(3);
//     await console.log(4);
// };
// console.log(2);
// new Promise((reslove) => {
//     reslove();
// })
//     .then(() => console.log(5))
//     .then(() => console.log(6));
// test();
// setTimeout(() => console.log(7));
// 2 1 5 3 6 4 7

// 4
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("success");
//     }, 1000);
// });
// const promise2 = promise1.then(() => {
//     throw new Error("error!!!");
// });

// console.log("promise1", promise1);
// console.log("promise2", promise2);

// setTimeout(() => {
//     console.log("promise1", promise1);
//     console.log("promise2", promise2);
// }, 2000);

// 5
// const promise = new Promise((resolve, reject) => {
//     resolve("success1");
//     reject("error");
//     resolve("success2");
// });

// promise
//     .then((res) => {
//         console.log("then: ", res);
//     })
//     .catch((err) => {
//         console.log("catch: ", err);
//     });
// then: success1

// 6
// Promise.resolve(1)
//     .then((res) => {
//         console.log(res);
//         return 2;
//     })
//     .catch((err) => {
//         return 3;
//     })
//     .then((res) => {
//         console.log(res);
//     });
// 1 2

// 7
// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("once");
//         resolve("success");
//     }, 1000);
// });

// const start = Date.now();
// promise.then((res) => {
//     console.log(res, Date.now() - start);
// });
// promise.then((res) => {
//     console.log(res, Date.now() - start);
// });
// once
// success 1012
// success 1012

// 8
// Promise.resolve()
//     .then(() => {
//         return new Error("error!!!");
//     })
//     .then((res) => {
//         console.log("then: ", res);
//     })
//     .catch((err) => {
//         console.log("catch: ", err);
//     });

// 9
// const promise = Promise.resolve().then(() => {
//     return promise;
// });
// promise.catch(console.error);

// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// class Test {
//     static #greeting = "hello";
//     #name = "james";

//     test() {
//         console.log(`${Test.#greeting} ${this.#name}`);
//     }
// }

// (() => {
//     const t = new Test();
//     t.test();
//     console.log(t.#name);
// })();

let arr1 = [1, 2, 3];
let arr2 = JSON.parse(JSON.stringify(arr1));
console.log(arr1 == arr2);
console.log(arr1 === arr2);
