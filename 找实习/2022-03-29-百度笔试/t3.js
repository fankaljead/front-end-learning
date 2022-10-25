/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-29 20:21:42
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-30 12:31:26
 * @FilePath: \2022-03-29-百度笔试\t3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function perfectNum(N = 100) {
  let chars = N.toString().split("");
  let res = "";
  let hasZero = false;
  for (let i = chars.length - 1; i >= 0; i--) {
    if (chars[i] === "0") {
      chars[i] = "9";
      hasZero = true;
    }
  }

  if (hasZero) {
    chars[0] = String(Number(chars[0]) - 1);
    for (let i = 1; i < chars.length; i++) {
      chars[i] = "3";
    }
  }

  let cleanChars = [];
  chars.forEach((item) => {
    if (item !== "0") {
      cleanChars.push(item);
    }
  });

  cleanChars.forEach((char, i) => {
    if (char === "1" || char === "2" || char === "3") {
      cleanChars[i] = char;
    } else {
      cleanChars[i] = "3";
    }
    res += cleanChars[i];
  });
  return res;
}

// console.log(perfectNum(213));
// console.log(perfectNum(100));
// console.log(perfectNum(33));
// console.log(perfectNum(3244));
// console.log(perfectNum(23456));
// console.log("987654321012345678".length);
// console.log(perfectNum(987654321012345678));
// console.log(perfectNum(10000));
// console.log(perfectNum(987654321012345678).length);
// console.log(perfectNum(String(1e18)));

// console.log(String(Number(String(1e18))).length);

function perfectNum2(num) {
  let str = String(num);
  let len;
  if (str.includes("0")) {
    len = str.length - 1;
  }
  let res = "";
  for (let i = 0; i < len; i++) {
    res += "3";
  }
  return Number(res);
}

function findMaxPerfectNumber(N = "432101234") {
  let chars = N.split("").map((v) => Number(v));
  let i = 0;
  for (; i < chars.length; ++i) {
    if (chars[i] >= 1 && chars[i] <= 3) {
      continue;
    }

    if (chars[i] >= 4 && chars[i] <= 9) {
      chars[i] = 3;
      continue;
    }

    if (chars[i] === 0) {
      chars[i] = 1;
      chars.fill(3, i + 1);
      break;
    }
  }
  // console.log(chars.join(""));

  for (; chars[i] === 1 && i >= 0 && i < chars.length; --i) {
    if (i !== 0) {
      chars[i] = 3;
    } else {
      chars[i] = "";
    }
  }
  if (i >= 0 && i < chars.length) {
    chars[i] -= 1;
  }

  return chars.join("");

  // console.log(chars);
}

function findMaxPerfectNumber2(N = "432101234") {
  let nums = N.split("").map((v) => Number(v));

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] >= 1 && nums[i] <= 3) {
      continue;
    }
    if (nums[i] >= 4 && nums[i] <= 9) {
      nums[i] = 3;
      continue;
    }
    if (nums[i] === 0) {
      nums[i] = 3;
      if (i >= 1) {
        if (nums[i - 1] !== 0) {
          nums[i - 1] -= 1;
        } else {
          nums[i - 1] = 3;
        }
      } else {
        nums[i] = "";
      }
    }
  }
  return nums.join("");
}

console.log(findMaxPerfectNumber());
console.log(findMaxPerfectNumber("3"));
console.log(findMaxPerfectNumber(String(1e18)));
console.log(findMaxPerfectNumber("213"));
console.log(findMaxPerfectNumber("100"));
console.log(findMaxPerfectNumber("33"));
console.log(findMaxPerfectNumber("3244"));
console.log(findMaxPerfectNumber("23456"));
console.log(findMaxPerfectNumber("4321111100001211"));
console.log(findMaxPerfectNumber("11110"));

// console.log(findMaxPerfectNumber2());
// console.log(findMaxPerfectNumber2("3"));
// console.log(findMaxPerfectNumber2(String(1e18)));
// console.log(findMaxPerfectNumber2("213"));
// console.log(findMaxPerfectNumber2("100"));
// console.log(findMaxPerfectNumber2("33"));
// console.log(findMaxPerfectNumber2("3244"));
// console.log(findMaxPerfectNumber2("23456"));
// console.log(findMaxPerfectNumber2("4321111100001211"));
// console.log(findMaxPerfectNumber2("11110"));
