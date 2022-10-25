// forEach
// O.length >>> 0 是什么操作？就是无符号右移 0 位，那有什么意义嘛？就是为了保证转换后的值为正整数。其实底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型。
Array.prototype.forEach2 = function (callback, thisArg) {
  if (!this) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(thisArg || this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    ++k;
  }
};

Array.prototype.map2 = function (callback, thisArg) {
  if (!this) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(thisArg || this);
  const len = O.length >>> 0;
  let k = 0,
    res = [];
  while (k < len) {
    if (k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);
    }
    ++k;
  }

  return res;
};

Array.prototype.filter2 = function (callback, thisArg) {
  if (!this) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(thisArg || this);
  const len = O.length >>> 0;
  let k = 0,
    res = [];
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        res.push(O[k]);
      }
    }
    ++k;
  }

  return res;
};

Array.prototype.some2 = function (callback, thisArg) {
  if (!this) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(thisArg || this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return true;
      }
    }
    ++k;
  }

  return false;
};

Array.prototype.reduce2 = function (callback, initialValue) {
  if (!this) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(thisArg || this);
  const len = O.length >>> 0;
  let k = 0,
    acc;

  if (arguments.length > 1) {
    acc = initialValue;
  } else {
    while (k < len && !(k in O)) {
      k++;
    }
    if (k > len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = O[k++];
  }

  while (k < len) {
    if (k in O) {
      acc = callback(acc, O[k], k, O);
    }
    k++;
  }

  return acc;
};

const arr = [1, 2, 3];
console.log(arr.map2((num) => num ** 2));
