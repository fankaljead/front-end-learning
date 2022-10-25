/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 15:16:31
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 15:26:47
 * @FilePath: \2022-03-27-网易笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function t2(str = "abdbb") {
  let len = str.length;
  let dp = new Array(len + 1);
  dp.fill(0);

  for (let i = 1; i < len; ++i) {
    let ca = str.charCodeAt(i) - 97 + 1;
    let cb = str.charCodeAt(i - 1) - 97 + 1;
    if (cb === ca || ca === cb + 1 || ca === cb - 1) {
      dp[i + 1] = Math.max(dp[i], dp[i - 1] + ca + cb);
    } else {
      dp[i + 1] = dp[i];
    }
  }
  return dp[len];
}
console.log(t2("abdbb"));
console.log("a".charCodeAt(0));
console.log("abdbb".charCodeAt(0));
