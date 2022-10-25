/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-19 17:07:13
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-19 17:10:43
 * @FilePath: \京东-2022-03-19\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function isPrime(n) {
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function PrimeFactorizer(n) {
  //用来存储结果的hash
  let list = [];
  var hash = {};
  while (n > 1) {
    //从最小的质数开始除
    for (var i = 2; i <= n; i++) {
      if (isPrime(i) && n % i == 0) {
        //如果hash中有这个质数，则存储的数目+1
        // if (hash[i]) {
        //   hash[i] = hash[i] + 1;
        // } //否则把该质数作为key，value为1
        // else {
        //   hash[i] = 1;
        // }
        list.push(i);
        //除掉这个最小的质数因子
        n /= i;
      }
    }
  }
  //给实例上加个factor属性
  // this.factor = hash;
  // hash = null;
  return list.sort((a, b) => a - b);
}

console.log(PrimeFactorizer(100));
