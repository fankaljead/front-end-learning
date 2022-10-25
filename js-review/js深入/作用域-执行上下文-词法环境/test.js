/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 20:27:18
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 21:45:33
 * @FilePath: \js-review\js深入\作用域-执行上下文-词法环境\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
var value = 1;

function foo(value = 4) {
  value = 2;
  console.log(value);
  var value = 3
  // let value = 3;
}

foo();
