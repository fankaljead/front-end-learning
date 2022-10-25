// 1. postMessage

// self.onmessage = ({ data }) => {
//   console.log("worker");
//   self.postMessage(`${data}!=${factorial(data)}`);
// };

// 2 MessageChannel
// function factorial(n) {
//   let result = 1;
//   while (n) {
//     result *= n--;
//   }
//   return result;
// }

// // 在监听器中存储全局 messagePort
// let messagePort = null;

// // 在全局对象上添加消息处理程序
// self.onmessage = ({ ports }) => {
//   // 只设置一次端口
//   if (!messagePort) {
//     // 初始化消息发送端口
//     // 给变量赋值并重置监听器
//     messagePort = ports[0];
//     self.onmessage = null;

//     // 在全局对象上设置消息处理程序
//     messagePort.onmessage = ({ data }) => {
//       // 收到消息后发送数据
//       messagePort.postMessage(`${data}!=${factorial(data)}`);
//     };
//     console.log("worker ports: ", messagePort);
//   }
// };

// 2. MessageChannel 两个工作者线程之间直接通信
// console.log("worker");
let messagePort = null;
let contextIdentifier = null;

function addContextAndSend(data, destination) {
  // 添加标识符以表示当前工作者线程
  // console.log(`Destination: ${destination.name}, data: ${data}`);
  // console.log(destination);
  // console.log(data);
  data.push(contextIdentifier);

  // 把数据发送到下一个目标
  destination.postMessage(data);
}

self.onmessage = ({ data, ports }) => {
  if (ports.length) {
    contextIdentifier = data;

    messagePort = ports[0];

    // 添加处理程序
    // 发回到父页面
    messagePort.onmessage = ({ data }) => {
      addContextAndSend(data, self);
    };
  } else {
    addContextAndSend(data, messagePort);
  }
};

// 3. 使用 BroadcastChannel
// const channel = new BroadcastChannel("worker_channel");

// channel.onmessage = ({ data }) => {
//   console.log(`heard ${data} in worker`);
//   channel.postMessage("bar");
// };
