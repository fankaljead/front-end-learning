// 行内 loader
// import "css-loader!../css/login.css"; // 将 css 语法解析为 js

import "../css/login.css";

function login() {
  const oH2 = document.createElement("h2");
  oH2.innerHTML = "zxh front";
  oH2.className = "title";
  return oH2;
}

document.body.appendChild(login());

// #
// 安装 css-loader
// npm i -D css-loader
