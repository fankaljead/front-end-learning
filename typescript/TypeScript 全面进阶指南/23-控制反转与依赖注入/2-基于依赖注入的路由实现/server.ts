import http from "http";
import { Controller, GET, POST, routerFactory } from "./implementation";

@Controller("/user")
class UserController {
  @GET("list")
  async userList() {
    return {
      success: true,
      code: 10000,
      data: [
        { name: "zxh", age: 24 },
        { name: "embiid", age: "28" },
      ],
    };
  }

  @POST("/add")
  async addUser() {
    return {
      success: true,
      code: 200,
    };
  }
}

const collected = routerFactory(new UserController());

console.log(collected);

http
  .createServer((req, res) => {
    for (const info of collected) {
      if (
        req.url === info.path &&
        req.method === info.requestMethod.toLocaleLowerCase()
      ) {
        info.requestHandler().then((data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        });
      }
    }
  })
  .listen(3000)
  .on("listening", () => {
    console.log("Server ready at http://localhost:3000 \n");
    console.log("GET /user/list at http://localhost:3000/user/list \n");
    console.log("POST /user/add at http://localhost:3000/user/add \n");
  });
