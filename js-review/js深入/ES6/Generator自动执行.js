/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 15:32:55
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 15:39:11
 * @FilePath: \js-review\js深入\ES6\Generator自动执行.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
import fetch from "node-fetch";
// const fetch = require('fetch');

function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then((data) => data.json()).then((data) => g.next(data));
