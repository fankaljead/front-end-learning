/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-30 19:08:46
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-05-01 18:38:38
 * @FilePath: \JavaScript权威指南\第8章 函数\8.6-闭包.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
let scope = "global scope";
function checkscope() {
  let scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}

let scope = "global scope";
function checkscope() {
  let scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
let f = checkscope();
