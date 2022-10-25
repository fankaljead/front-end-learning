/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-06 20:25:36
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-06 20:46:50
 * @FilePath: \2022-04-07-华为笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t2(N = 4, M = 2, services = ["0", "1,0", "1,1", "2,0,1"]) {
  let res = [],
    temp = [];

  let edges = new Map();
  for (let i = 0; i < N; ++i) {
    let list = services[i]
      .split(",")
      .map((v) => parseInt(v))
      .slice(1);
    edges.set(i, list);
  }

  isRing(M, N);

  function isRing(start, N) {
    let visited = new Array(N).fill(false);
    dfs(start, visited);
  }

  function dfs(cur, visited) {
    let list = edges.get(cur);
    if (list.length === 0) {
      res = Array.from(temp);
      return;
    }
    visited[cur] = true;
    for (const next of list) {
      if (visited[next]) {
        flag = true;
        return;
      }
      temp.push(next);
      dfs(next, visited);
      temp.pop();
    }
  }
  let flag = false;

  if (flag) {
    console.log(-1);
  } else if (res.length === 0) {
    console.log(null);
  } else {
    res.sort((a, b) => a - b);
    console.log(res.join(","));
  }
}

t2();
let N = parseInt(inputArray[0]);
let M = parseInt(inputArray[1]);
let services = [];
for (let i = 0; i < N; ++i) {
  services.push(inputArray[i]);
}
