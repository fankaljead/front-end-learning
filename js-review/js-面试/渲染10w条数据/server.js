const http = require("http");
const port = 8000;

const SRC = "https://avatars.githubusercontent.com/u/30434925?s=40&v=4";

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    let list = [],
      num = 0;

    for (let i = 0; i < 1e5; ++i) {
      num++;
      list.push({
        src: SRC,
        text: `我是 zxh ${num}`,
        tid: num,
      });
    }

    res.end(JSON.stringify(list));
  })
  .listen(port, function () {
    console.log("server is listening on port ", port);
  });
