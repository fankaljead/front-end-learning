/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-26 14:33:17
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-26 14:36:41
 * @FilePath: \2022-03-26-网易雷火笔试\3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 最长递增子序列
function lenofList(arr = [0, 3, 4, 17, 8, 6, 10]) {
  if (arr.length <= 0) {
    return 0;
  }

  let dp = [];
  let len = arr.length;
  dp[0] = 1;
  for (let i = 1; i < len; i++) {
    let max = 0;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && dp[j] > max) {
        max = dp[j];
      }
    }
    dp[i] = max + 1;
  }
  return dp[dp.length - 1];
}
console.log(lenofList());
