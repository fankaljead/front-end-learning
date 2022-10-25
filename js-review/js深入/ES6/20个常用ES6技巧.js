/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-25 17:26:13
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-25 21:51:40
 * @FilePath: \js-review\js深入\ES6\20个常用ES6技巧.js
 * @Description: https://mp.weixin.qq.com/s/Nive-Z4n3nTJJ9w2qk616w
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 1. 打乱数组顺序
function shuffle(arr = []) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

// 2. 去除数字之外的所有字符
function removeNonNumbers(str = "") {
  return str.replace(/\D/g, "");
}

// 3. 反转字符串或者单词
function reverseString(str = "", separator = "") {
  return str.split(separator).reverse().join(separator);
}

// 4. 将十进制转换为 base 进制
function convertToBinary(num = 0, base = 2) {
  return num.toString(base);
}

// 5. 合并多个对象
function mergeObjects(...objects) {
  return objects.reduce((acc, cur) => {
    for (const key in cur) {
      acc[key] = cur[key];
    }
    return acc;
  }, {});
}

// 9.1 判断回文字符串
function isPalindrome(str = "") {
  return str === str.split("").reverse().join("");
}

// 9.2 判断两个字符串是否互为排列
function isPermutation(str1 = "", str2 = "") {
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

// 17. RGB 转换 HEX
function rgbToHex(r = 0, g = 0, b = 0) {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// 18. 求 C_m^n 的值
function C(m, n) {
  if (n === 0) return 1;
  n = Math.min(m - n, n);
  let mul = m,
    div = 1;
  for (let i = 2; i <= n; ++i) {
    mul *= m - i + 1;
    if (mul % i === 0) {
      mul /= i;
    } else {
      div *= i;
    }
  }
  return mul / div;
}
