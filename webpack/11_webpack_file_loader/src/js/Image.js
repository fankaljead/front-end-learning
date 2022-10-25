import oImgSrc from "../img/cartoon-girl-2018-7.jpg";
import "../css/image.css";

function packImg() {
  // 两种场景
  // 1. img src
  // 2. background url

  // 01 创建一个容器元素
  const oEle = document.createElement("div");

  // 02 创建 img 标签，设置 src 属性
  const oImg = document.createElement("img");
  // oImg.src = require("../img/cartoon-girl-2018-7.jpg").default; // 01
  // oImg.src = require("../img/cartoon-girl-2018-7.jpg"); // 02
  oImg.src = oImgSrc; // 03
  // oImg.style.width = "400px";
  oEle.appendChild(oImg);

  // 03 设置背景图片
  const oBgImg = document.createElement("div");
  oBgImg.className = "bgBox";
  oEle.appendChild(oBgImg);

  return oEle;
}

document.body.appendChild(packImg());
