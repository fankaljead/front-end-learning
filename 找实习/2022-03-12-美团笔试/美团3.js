/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-12 16:02:30
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-12 17:27:16
 * @FilePath: \test\美团3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function m3(inputs = [], n = 3, m = 4) {
  inputs.sort((a, b) => a[0] - b[0]);
  let set = new Set();

  let count = 0;
  for (let i = 0; i < inputs.length; i++) {
    let num1 = inputs[i][0];
    let num2 = inputs[i][1];
    if (!set.has(num1) && !set.has(num2)) {
      count++;
      set.add(num1);
      set.add(num2);
    }
  }
  return count;
}

// for (let i = 0; i < n; ++i) {
//   let num = [];
//   num.push(readInt());
//   num.push(readInt());
//   num.sort((a, (b) => a - b));
//   input.add(num);
// }

// while((line = read_line()) != ''){
//   let arr = line.split(' ');
//   let a = Number(arr[0]);
//   let b = Number(arr[1]);
// let num = [a,b]
//   num.sort((a,b)=>a-b)
//   inputs.push(num)
// }

let inputs = [
  [4, 3],
  [1, 2],
  [3, 2],
  [3, 4],
];
inputs.sort((a, b) => a[0] - b[0]);
console.log(inputs);
