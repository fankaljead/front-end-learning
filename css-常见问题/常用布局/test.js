/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-18 11:21:33
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-18 12:03:43
 * @FilePath: \css-常见问题\常用布局\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
parseFloat("12.3");
parseInt("12", 23);
Array.prototype.myFlat = function () {
  return this.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? b.myFlat() : b);
  });
};

Array.prototype.mySort=function(fn){
  return this.sort(fn);
}
// 螺旋矩阵
function spiralOrder(matrix) {
  let res = [];
  if (matrix.length === 0) return res;
  let rowBegin = 0,
    rowEnd = matrix.length - 1,
    colBegin = 0,
    colEnd = matrix[0].length - 1;
  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    for (let i = colBegin; i <= colEnd; i++) {
      res.push(matrix[rowBegin][i]);
    }
    rowBegin++;
    for (let i = rowBegin; i <= rowEnd; i++) {
      res.push(matrix[i][colEnd]);
    }
    colEnd--;
    if (rowBegin <= rowEnd) {
      for (let i = colEnd; i >= colBegin; i--) {
        res.push(matrix[rowEnd][i]);
      }
    }
    rowEnd--;
    if (colBegin <= colEnd) {
      for (let i = rowEnd; i >= rowBegin; i--) {
        res.push(matrix[i][colBegin]);
      }
    }
    colBegin++;
  }
  return res;
}