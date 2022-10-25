var ws = new WebSocket("ws://localhost:8080");
ws.onopen = function (e) {
  console.log("连接服务器成功");
  // 向服务器发送消息
  ws.send("what`s your name?");
};
ws.onclose = function (e) {
  console.log("服务器关闭");
};
ws.onerror = function () {
  console.log("连接出错");
};
// 接收服务器的消息
ws.onmessage = function (e) {
  let message = "message:" + e.data + "";
  console.log(message);
};
