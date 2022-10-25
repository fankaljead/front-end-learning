// async function foo() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("休息5s 后");
//     }, 5000);
//   });
// }

// async function bar() {
//   const a = await foo();
//   console.log(1111);
//   console.log(a);
// }
// async function wait(delay = 2000, params) {
//   async function wait(delay = 1000, params) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(params);
//       }, delay);
//     });
//   }
//   const a = await wait(delay);
//   return a;
// }

// bar();

// wait(5000);
// console.log(2222);

// for (var i = 0; i < 4; ++i) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   })(i);
// }

async function wwait(time = 1000) {
  let count = 0;
  const c = await new Promise((resolve) => {
    setTimeout(() => {
      count += time;
      resolve(count);
    }, 1000);
  });
  // console.log(c);
  while (c < time) {}
}

wwait(2000);
console.log(1000);
