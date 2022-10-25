/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 22:01:01
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 22:03:04
 * @FilePath: \js-review\js-面试\获取url参数.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// URLSearchParams 方法
(function () {
  // 创建一个URLSearchParams实例
  const urlSearchParams = new URLSearchParams(window.location.search);
  // 把键值对列表转换为一个对象
  const params = Object.fromEntries(urlSearchParams.entries());
})();

// split 方法
(function () {
  function getParams(url = "") {
    const res = {};
    if (url.includes("?")) {
      const str = url.split("?")[1];
      const arr = str.split("&");
      arr.forEach((item) => {
        const key = item.split("=")[0];
        const value = item.split("=")[1];
        res[key] = decodeURIComponent(value);
      });
    }
    return res;
  }
})();
