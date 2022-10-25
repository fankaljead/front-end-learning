/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-25 17:01:40
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-25 17:15:51
 * @FilePath: \JavaScript权威指南\第4章 表达式与操作符\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function foo(a) {
  return a || "||";
}
function foo2(a) {
  return a ?? "||";
}
console.log(foo());
let options = { timeout: 0, title: "", verbose: false, n: null };

function bar() {
  try {
    throw new Error("error");
    return 2;
  } catch (e) {
    console.log(e.message);
    return 3;
  } finally {
    return 4;
  }
  return 5;
}

let o = { x: 1, y: 2, z: 3 };
let a = [],
  i = 0;
for (a[i++] in o);
