// let lists = [
//     [1, 4, 5],
//     [1, 3, 4],
//     [2, 6]
// ];

// let arr = [5, 6];
// let i = 0;
// arr.splice(0, 1);
// console.log(arr);

// 组件名大小写
// 使用 kebab-case
// Vue.component('my-component-name', {/**... */})

// let boxUsed = new Array(3).fill(new Array(3).fill(new Array(10)));;


// console.table(boxUsed);
// console.log("9"-'0');

// console.log(10/3);

// var data = []
// for (var i = 0; i < 3; i++) {
//     data[i] = function () {
//         console.log(i)
//     }
// }
// data[0]() // 3
// data[1]() // 3
// data[2]()

// async function sumT(a, b) {
//     return await new Promise((resolve, reject) => {
//         asyncAdd(a, b, (err, res) => {
//             if (!err) {
//                 resolve(res)
//             }
//             reject(err)
//         })
//     })
// }
// // 测试
// const test = await sumT(1, 2)
// console.log(test)
// // 3

//map.js
// global.gc(); // 0 每次查询内存都先执⾏gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使⽤ 状态准确

// function usedSize() {
//     const used = process.memoryUsage().heapUsed;
//     return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
// }
// console.log(usedSize()); // 1 初始状态，执⾏gc()和memoryUsage()以后， heapUsed值为 1.64 M
// var map = new Map();
// var b = new Array(5 * 1024 * 1024);
// map.set(b, 1);
// global.gc();
// console.log(usedSize()); // 2 在 Map 中加⼊元素b，为⼀个 5*1024*1024 的数组后，heapUsed为41 .82 M左右

// b = null;
// global.gc();
// console.log(usedSize()); // 3 将b置为空以后， heapUsed 仍为41.82M，说明Map中的那个⻓度为5*1024*1024的数组依然存在

console.log('23'-'0');