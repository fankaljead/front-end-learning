/*
 * @Author: Zhou Xianghui
 * @Date: 2022-08-07 18:53:54
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-08-07 19:37:46
 * @FilePath: \大疆创新-220807\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 找到任意两个24小时时间的最小分钟差
const TOTAL_TIME = 24 * 60;
function getTime(time = "23:22") {
  let [hour, minute] = time.split(":");
  return [
    parseInt(hour) * 60 + parseInt(minute),
    TOTAL_TIME - parseInt(hour) * 60 + parseInt(minute),
  ];
}
function findMinDifference(timePoints = ["23:22", "00:03", "23:59", "00:01"]) {
  let forMatTime = [];
  timePoints.forEach((item) => forMatTime.push(...getTime(item)));
  forMatTime.sort((a, b) => a - b);
  console.log(forMatTime);
  let min = forMatTime[1] - forMatTime[0];
  for (let i = 1; i < forMatTime.length; i++) {
    let temp = forMatTime[i] - forMatTime[i - 1];
    if (temp < min) {
      min = temp;
    }
  }
  return min;
}
console.log(findMinDifference());

// function findMinDifference(timePoints = ["23:59", "00:00"]) {
//   let start = timePoints[0];
//   let end = timePoints[timePoints.length - 1];
//   let startTime = new Date("2020-01-01 " + start);
//   let endTime = new Date("2020-01-01 " + end);
//   let endTime2 = new Date("2020-01-02 " + end);
//   let diff1 = Math.abs(endTime.getTime() - startTime.getTime());
//   let diff2 = Math.abs(endTime2.getTime() - startTime.getTime());
//   let minDiff = Math.min(diff1 / (1000 * 60), diff2 / (1000 * 60));
//   return minDiff;
// }
// console.log(findMinDifference(["23:59", "00:00"]));
