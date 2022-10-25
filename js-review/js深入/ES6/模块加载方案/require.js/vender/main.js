/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:02:04
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:07:02
 * @FilePath: \js-review\js深入\ES6\模块加载方案\require.js\vender\main.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

require(["./add", "./square"], function (addModule, squareModule) {
  console.log(addModule.add(1, 2));
  console.log(squareModule.square(3));
});
