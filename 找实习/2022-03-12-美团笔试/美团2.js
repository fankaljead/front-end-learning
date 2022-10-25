/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-12 16:52:40
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-12 16:56:05
 * @FilePath: \test\美团2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function m2(n = 4, nums = [1, 1, -1, -1]) {
  let sum = 0;
  for (let j = 0; j < n; ++j) {
    let temp = 1;
    for (let k = j; k < n; k++) {
      temp = temp * nums[k];
      if (temp > 0) {
        sum++;
      }
    }
  }
  return sum;
}
console.log(m2());
