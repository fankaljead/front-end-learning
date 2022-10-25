/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-26 14:37:23
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-26 14:38:28
 * @FilePath: \2022-03-26-网易雷火笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 判断字符串是否有效
function isValid(str) {
  if (str.length <= 0) {
    return true;
  }
  let stack = [];
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let c = str[i];
    if (c === "(" || c === "[" || c === "{") {
      stack.push(c);
    } else if (c === "*") {
      continue;
    } else {
      if (stack.length <= 0) {
        return false;
      }
      let top = stack.pop();
      if (c === ")" && top !== "(") {
        return false;
      }
      if (c === "]" && top !== "[") {
        return false;
      }
      if (c === "}" && top !== "{") {
        return false;
      }
    }
  }
  return stack.length <= 0;
}
