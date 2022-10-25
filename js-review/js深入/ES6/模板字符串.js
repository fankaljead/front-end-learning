/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 14:57:19
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 15:09:57
 * @FilePath: \js-review\js深入\ES6\模板字符串.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function message(literals, value1, value2) {
  console.log(literals);
  console.log(value1);
  console.log(value2);
}

let x = "Hi",
  y = "There";
var res = message`${x} I'm ${y}`;
console.log(res);

function message(literals, ...values) {
  let result = "";
  for (let i = 0; i < values.length; ++i) {
    result += literals[i];
    result += values[i];
  }

  result += literals[literals.length - 1];
  return result;
}

function message(literals, ...values) {
  let result = literals.reduce((prev, next, i) => {
    let value = values[i - 1];
    return prev + value + next;
  });
  return result;
}
(function () {
  let message = oneLine`
    Hi,
    Daisy!,
    I am
    Kevin.
  `;

  function oneLine(template, ...expressions) {
    let result = template.reduce((prev, next, i) => {
      let value = expressions[i - 1];
      return prev + value + next;
    });
    return result.replace(/(\s+)/g, " ").trim(); // \s 匹配 空白符 \t \n \r \f \v
  }

  console.log(message);
  console.log(
    oneLine`
  Preserve eg sentences.  Double
  spaces within input lines.
`
  );
})();
