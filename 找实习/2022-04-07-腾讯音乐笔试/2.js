/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-07 19:17:44
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-07 19:26:25
 * @FilePath: \2022-04-07\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t2(nums = [7, 2, 1], x = 3, k = 2) {
  nums.sort((a, b) => a - b);
  let len = nums.length;
  for (let i = 0; i < k; ++i) {
    nums[len - 1] -= x;
    let index = len - 2,
      temp = nums[len - 1];
    for (; index >= 0 && temp < nums[index]; --index) {
      nums[index + 1] = nums[index];
    }
    nums[index + 1] = temp;
  }

  return nums[len - 1];
}
console.log(t2());
