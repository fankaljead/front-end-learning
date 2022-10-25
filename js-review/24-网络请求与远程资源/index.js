let socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", function (event) {
  socket.send("hello server");
});

socket.addEventListener("message", function (event) {
  console.log("Message from server:", event.data);
});
