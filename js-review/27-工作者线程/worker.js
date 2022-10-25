// const globalToken = "bar";

// // console.log("importing scripts");
// console.log(`importing scripts in ${self.name} with ${globalToken}`);

// importScripts("./scriptA.js");
// importScripts("./scriptB.js");

// console.log("scripts imported");

// 27.2.8
// onmessage = function (event) {
//   console.log(event.data);
// };

// throw Error("foo");

// 27.2.10
// 2. 可转移对象
// self.onmessage = (event) => {
//   console.log(`worker's buffer size: ${event.data.foo.bar.byteLength}`);
// };

// 27.2.10
// 3. SharedArrayBuffer
// self.onmessage = ({ data }) => {
//   const view = new Uint8Array(data);
//   console.log(`buffer value before worker modification: ${view[0]}`);
//   view[0] += 1;
//   self.postMessage(null);
// };

// onerror

console.log("worker");
// throw Error("this is a error from worker");
self.postMessage("zxh");
self.onmessage = (event) => {
  console.log("message from worker: ", event.data);
  self.postMessage(event.data + " bi");
};
