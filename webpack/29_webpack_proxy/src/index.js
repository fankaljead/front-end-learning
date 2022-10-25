// import "core-js/stable";
// import "regenerator-runtime/runtime";

// const title = "前端";

// const foo = () => {
//   console.log(title);
// };

// const p1 = new Promise((resolve, reject) => {
//   console.log(111);
// });

// console.log(p1);

// foo();

// console.log("HMR bbb");
import "./title";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import Vue from "vue";
import Bad from "./Bad.vue";
import axios from "axios";

if (module.hot) {
  module.hot.accept(["./title.js"], () => {
    console.log("title.js update dasdfasdf");
  });
}

ReactDOM.render(<App />, document.getElementById("app"));

new Vue({
  render: (h) => h(Bad),
}).$mount("#root");

// axios.get("https://api.github.com/users").then((res) => {
// axios.get("https://localhost:9000/api/users").then((res) => {
axios.get("/api/users").then((res) => {
  console.log(res.data);
});
