/*
 * @Author: Zhou Xianghui
 * @Date: 2022-08-24 18:55:18
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-08-24 20:59:58
 * @FilePath: \220824-神策数据\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function getTime(timeStamp) {
  var date = new Date(timeStamp);
  var year1 = date.getFullYear();
  var month1 =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day1 = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hour1 = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute1 =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second1 =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var time1 =
    year1 +
    "." +
    month1 +
    "." +
    day1 +
    " " +
    hour1 +
    ":" +
    minute1 +
    ":" +
    second1;
  return time1;
}

console.log(getTime(new Date()));
