// for emptyWorker
// console.log("this is from main.js");
// console.log(location.href);
// const worker = new Worker(location.href + "emptyWorker.js");
// const worker = new Worker("./emptyWorker.js");

// for initializingWorker
// const worker = new Worker("./initializingWorker.js");
// console.log(worker);

// Worker 可能还处于初始化状态
// 但 postMessage() 数据可以正常处理
// worker.postMessage("foo");
// worker.postMessage("bar");
// worker.postMessage("baz");
// console.log("this is from main");

// for closeWorker
// const worker = new Worker("./closeWorker.js");
// worker.onmessage = ({ data }) => console.log(data);

// for terminateWorker
// const worker = new Worker("./terminateWorker.js");

// // 给 1000 毫秒让工作者线程初始化
// setTimeout(() => {
//   worker.postMessage("foo");
//   worker.postMessage("foo1");
//   worker.postMessage("foo2");

//   // worker.terminate();
//   setTimeout(() => {
//     setTimeout(() => {
//       worker.terminate();
//     }, 1000);
//   }, 200);

//   worker.terminate();
//   worker.postMessage("bar");
//   setTimeout(() => worker.postMessage("baz"), 0);
// }, 1000);

// 在 JavaScript 行内创建工作者线程
// 创建要执行的 JavaScript 代码字符串
const workerScript = `
self.onmessage = (event)=>console.log(event.data)
`;

// 基于脚本字符串生成 Blob 对象
const workerScriptBlob = new Blob([workerScript]);

// 基于 Blob 示例创建对象 URL
const workerScriptBlobUrl = URL.createObjectURL(workerScriptBlob);

// // 基于对象 URL 创建专用工作者线程
// const worker = new Worker(workerScriptBlobUrl);

// worker.postMessage("blob worker script");

// function fibonacci(n) {
//   return n < 1
//     ? 0
//     : n < 2
//     ? 1
//     : arguments.callee(n - 1) + arguments.callee(n - 2);
// }

// const worker2Script = `
// self.postMessage(
//   (${fibonacci.toString()})(9)
// )
// `;

// const worker2 = new Worker(URL.createObjectURL(new Blob([worker2Script])));

// worker2.onmessage = function (event) {
//   console.log(event.data);
// };

// 在工作者线程中动态执行脚本
// const worker = new Worker("./worker.js");

// 委托任务到子工作者线程
// const worker=new Worker('./js/worker.js')

// 27.2.8 处理工作者线程错误
// try {
//   const worker = new Worker("./worker.js");
//   console.log("no error");
//   worker.postMessage("hello my servant");
// } catch (err) {
//   console.log("caught error:", err);
// }

// 27.2.9 与专用工作者线程通信
// 1. postMessage
// const factorialWorker = new Worker("./factorialWorker.js");

// factorialWorker.onmessage = ({ data }) => {
//   console.log("main");
//   console.log(data);
// };

// factorialWorker.postMessage(5);
// factorialWorker.postMessage(7);
// factorialWorker.postMessage(10);

// 2. MessageChannel
// const channel = new MessageChannel();
// const factorialWorker = new Worker("./factorialWorker.js");

// // 把 MessagePort 对象发送到工作者线程
// // 工作者线程负责处理初始化信道
// factorialWorker.postMessage(null, [channel.port1]);

// // 通过信道实际发送数据
// channel.port2.onmessage = ({ data }) => console.log(data);

// // 工作者线程通过信道响应
// channel.port2.postMessage(5);

// console.log("main ports: ", channel);

// 2. MessageChannel 两个工作者线程之间直接通信
// const channel = new MessageChannel();

// const workerA = new Worker("./factorialWorker.js", { name: "workerA" });
// workerA.postMessage("workerA", [channel.port1]);
// workerA.onmessage = ({ data }) => console.log("workerA: ", data);
// workerA.postMessage(["pageA"]);

// const workerB = new Worker("./factorialWorker.js", { name: "workerB" });
// workerB.postMessage("workerB", [channel.port2]);
// workerB.onmessage = ({ data }) => console.log("workerB:", data);
// workerB.postMessage(["pageB"]);

// 3. 使用 BroadcastChannel
// const channel = new BroadcastChannel("worker_channel");
// const worker = new Worker("./factorialWorker.js");

// channel.onmessage = ({ data }) => {
//   console.log(`heard ${data} on page`);
// };

// setTimeout(() => {
//   channel.postMessage("foo");
// }, 1000);

// 27.2.10
// 2. 可转移对象
// const worker = new Worker("./worker.js");

// // 创建 32 位缓冲区
// const arrayBuffer = new ArrayBuffer(32);

// console.log(`page's buffer size: ${arrayBuffer.byteLength}`);

// // worker.postMessage(arrayBuffer, [arrayBuffer]);
// worker.postMessage({ foo: { bar: arrayBuffer } }, [arrayBuffer]);

// console.log(`page's buffer size: ${arrayBuffer.byteLength}`);

// 27.2.10
// 3. SharedArrayBuffer
// const worker = new Worker("./worker.js");

// // 创建 1 字节缓冲区
// const sharedArrayBuffer = new ArrayBuffer(1);

// // 创建 1 字节缓冲区视图
// const view = new Uint8Array(sharedArrayBuffer);

// // 父上下文赋值为 1
// view[0] = 1;

// worker.onmessage = () => {
//   console.log(`buffer value after worker modification: ${view[0]}`);
// };

// // 发送对 sharedArrayBuffer 的引用
// worker.postMessage(sharedArrayBuffer);

// Worker onerror
// const worker = new Worker("./worker.js");
// worker.onerror = (e) => {
//   console.warn("Error: ", e);
// };

// worker.onmessage = (event) => {
//   console.log("message from main: ", event.data);
// };
// worker.postMessage("hello");

// 27.3.1 共享工作者线程
// 1. 创建共享工作者线程
// console.log(location.href);
// // const sharedWorker = new SharedWorker(location.href + "emptySharedWorker.js");
// const sharedWorker = new SharedWorker("./emptySharedWorker.js");
// console.log(sharedWorker);

// 27.3.3 连接c的共享工作者线程
// for (let i = 0; i < 5; ++i) {
//   new SharedWorker("./sharedWorker.js");
// }

// 27.4.1 服务工作者线程基础
// 2. 创建服务工作者线程
// 注册成功，成功回调（解决）
// navigator.serviceWorker
//   .register("./emptyServiceWorker.js")
//   .then(console.log, console.err);

// 使用不存在的文件注册，失败回调 （拒绝）
// navigator.serviceWorker
//   .register("./emptyServiceWorker?.js")
//   .then(console.log, console.err);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./serviceWorker.js")
//       .then((registrationA) => {
//         console.log(registrationA);
//         navigator.serviceWorker
//           .register("./serviceWorker2.js")
//           .then((registrationB) => {
//             console.log(registrationB === registrationA);
//           });
//       });
//   });
// }

// 8. 服务工作者线程作用域限制
navigator.serviceWorker
  .register("./serviceWorker.js", { scope: "./" })
  .then((serviceWorkerRegistration) => {
    console.log(serviceWorkerRegistration);
    console.log(decodeURI(serviceWorkerRegistration.scope));
  });

fetch("./foo.js");
