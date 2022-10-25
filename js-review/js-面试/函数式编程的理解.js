/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 09:20:41
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 09:21:44
 * @FilePath: \js-review\js-面试\函数式编程的理解.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

// 柯里化
// f(a,b,c) => f(a)(b)(c)
const add = function (x) {
  return function (y) {
    x + y;
  };
};
const increment = add(1);
increment(10);
