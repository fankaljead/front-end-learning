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

if (module.hot) {
  module.hot.accept(["./title.js"], () => {
    console.log("title.js update dasdfasdf");
  });
}

ReactDOM.render(<App />, document.getElementById("app"));
