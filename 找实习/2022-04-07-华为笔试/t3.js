/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-06 20:11:06
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-06 20:23:23
 * @FilePath: \2022-04-07-华为笔试\t3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t3(N = 2, M = 3, array = [0, -1, -2, 0]) {
  let res = 0,
    trap = new Array(M).fill(0);
  getTrap(array, trap);

  for (let i = 0; i < M; i++) {
    res += Math.floor(trap[i] / N);
  }
  console.log(res);
}

function getTrap(height = [], trap = []) {
  let len = height.length;
  let leftMax = new Array(len),
    rightMax = new Array(len);
  leftMax[0] = height[0];

  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }
  rightMax[len - 1] = height[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }

  for (let i = 0; i < len; i++) {
    trap[i] = Math.min(leftMax[i], rightMax[i]) - height[i];
  }
}

t3();
