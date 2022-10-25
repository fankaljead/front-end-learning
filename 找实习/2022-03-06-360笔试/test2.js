/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-06 16:38:02
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-06 16:48:47
 * @FilePath: \test\test2.js
 * @Description: 组队吃鸡（Web）
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// let T = readInt();
let s = "1 2 3 4";

function find(s = "1 2 3 4") {
  let arr = s.split(" ");

  let A = parseInt(arr[0]);
  let B = parseInt(arr[1]);
  let C = parseInt(arr[2]);
  let D = parseInt(arr[3]);
  // console.log(A, B, C, D);
  //let ps = Math.floor(A*1 + B*2 + C*3)/4 + D
  let ps = D;
  let halfB = Math.floor(B / 2);
  ps += halfB;
  if (A <= C) {
    ps += A;
  } else {
    ps += C;
    let resB = B - halfB * 2;
    resA = A - C;
    ps += Math.floor(resA / 4);
    resA = resA % 4;
    if (resB && resA >= 2) {
      ps += 1;
    }
  }
  return ps;
}

console.log(find("1 2 3 4"));
console.log(find("4 3 2 1"));
