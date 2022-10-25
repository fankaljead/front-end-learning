/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-06 14:46:05
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-06 17:19:00
 * @FilePath: \test\test.js
 * @Description: 360 笔试
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// let s = gets(1000)

let canC = ["A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y"];

function Judge(s = "ABA") {
  let len = s.length;
  for (let i = 0; i < len / 2; ++i) {
    if (
      canC.indexOf(s[i]) >= 0 &&
      canC.indexOf(s[len - i - 1]) >= 0 &&
      s[i] === s[len - i - 1]
    ) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

let s = "AHA";
console.log(Judge("B") ? "YES" : "NO");
console.log(Judge("A") ? "YES" : "NO");
console.log(Judge("HHHH") ? "YES" : "NO");
console.log(Judge("IIHHII") ? "YES" : "NO");
console.log(Judge("AWAHAWA") ? "YES" : "NO");
console.log(Judge("AWABAWA") ? "YES" : "NO");
console.log(Judge("HHAHH") ? "YES" : "NO");
// let a = "1 2 3 4";
// console.log(a.split(" ").map((v) => Number(v)));
