/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 19:29:34
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 19:43:49
 * @FilePath: \js-review\js深入\数组去重.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
var array = [1, 1, 2, "1", "2", "1"];

function unique(array = []) {
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; ++i) {
    for (var j = 0, resLen = res.length; j < resLen; ++j) {
      if (array[i] === res[j]) {
        break;
      }
    }
    if (j === resLen) {
      res.push(array[i]);
    }
  }

  return res;
}

// 使用 indexOf 简化内层循环
function unique(array = []) {
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; ++i) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}

// 排序后去重
function unique(array = []) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; ++i) {
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

// unique API
// 根据一个参数 isSorted 判断传入的数组是否是已排序的，如果为 true，我们就判断相邻元素是否相同，如果为 false，我们就使用 indexOf 进行判断

function unique(array = [], isSorted = false) {
  var res = [],
    seen;

  for (var i = 0, len = array.length; i < len; i++) {
    var item = array[i];
    if (isSorted) {
      if (!i || seen !== item) {
        res.push(item);
      }
      seen = item;
    } else if (res.indexOf(item) === -1) {
      res.push(item);
    }
  }
  return res;
}

// 大小写是为一致
function unique(array = [], isSorted = false, iteratee) {
  var res = [],
    seen = [];

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value);
      }
      seen = computed;
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        res.push(value);
        seen.push(computed);
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}

console.log(unique(array.sort(), true));
console.log(unique(array));
