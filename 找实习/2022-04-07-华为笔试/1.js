/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-06 16:51:15
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-06 20:58:40
 * @FilePath: \2022-04-07-华为笔试\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function findTopN(head = "", content = "", topN = 3, headI = 3, contentI = 1) {
  let res = [];
  let headArr = head.split(" "),
    contentArr = content.split(" ");
  // console.log(headArr);
  // console.log(contentArr);
  let map = new Map();

  for (const word of headArr) {
    if (!map.get(word)) {
      let index = headArr.indexOf(word);
      map.set(word, { hI: index, hC: 1, cC: 0 });
    } else {
      map.get(word).hC++;
    }
  }

  for (const word of contentArr) {
    let index = contentArr.indexOf(word);
    if (!map.get(word)) {
      // let index = contentArr.indexOf(word);
      map.set(word, { cI: index, cC: 1, cI: 100000 });
    } else {
      if (map.get(word).cI) {
        map.get(word).cC++;
      } else {
        map.get(word).cC = 1;
        map.get(word).cI = index;
      }
    }
  }
  console.log(map);
  let arr = Array.from(map.entries());
  console.log(arr);

  arr.sort((a, b) => {
    let r = a[1].hC * 3 + a[1].cC - b[1].hC * 3 - b[1].cC;
    if (r !== 0) {
      return -r;
    } else {
      // if (a[1].hC < b[1].hC) {
      //   return -1;
      // } else if (a[1].hI < b[1].hI) {
      //   return -1;
      // } else if (a[1].cI < b[1].cI) {
      //   return -1;
      // } else {
      //   return 1;
      // }
      return a[1].hC - b[1].hC || a[1].hI - b[1].hI || a[1].cI - b[1].cI || -1;
    }
  });

  console.log(arr);
  return arr.slice(0, topN).map(([key, value]) => key);
}

function t1(inputArr = []) {
  let headA = [],
    contentA = [];
  let firstLine = inputArr[0].split(" ");
  let topN = parseInt(firstLine[0]),
    M = parseInt(firstLine[1]);
  for (let i = 1, len = inputArr.length; i < len; ++i) {
    if (i & 2) {
      contentA.push(inputArr[i]);
    } else {
      headA.push(inputArr[i]);
    }
  }

  let arr = findTopN(headA.join(" "), contentA.join(" "), topN);

  console.log(arr.join(" "));
}

// let map = new Map();
// map.set("a", { age: 23 });
// map.get("a").name = "zxh";
// console.log(Array.from(map.entries()));
// console.log(map.get("a"));
// let inputArr = [
//   "3 2",
//   "xinguan feiyan xinzeng quezhen anli",
//   "ju baodao chengdu xinzeng xinguan feiyan bendi quezhen anli yili shenzhen xinzeng bendi quezhen anli liangli yiqing zhengti kongzhi lianghao",
//   "xinguan yimiao linchuang shiyan",
//   "wuzhong xianghua yimiao tongguo sanqi linchaung shiyan xiaoguo lianghao",
// ];

let inputArr = [
  "3 2",
  "xinguan xinguan",
  "ju baodao lianghao",
  "xinguan yimiao linchuang shiyan",
  "wuzhong xianghua lianghao",
];
// console.log(1 & 2);
t1(inputArr);
// console.log(-1 || 1);

// console.log([3, 1, 1].sort((a, b) => b - a));
