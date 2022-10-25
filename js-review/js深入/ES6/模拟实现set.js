/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 15:49:56
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 16:21:30
 * @FilePath: \js-review\js深入\ES6\模拟实现set.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
(function () {
  function Set(data) {
    this._values = [];
    this.size = 0;

    forOf(data, (item) => {
      this.add(item);
    });
    // data && data.forEach((item) => this.add(item), this);
  }

  var NaNSymbol = Symbol("NaN");

  var encodeVal = function (val) {
    return val !== val ? NaNSymbol : val;
  };

  var decodeVal = function (val) {
    return val === NaNSymbol ? NaN : val;
  };

  var makeIterator = function (array, iterator) {
    var nextIndex = 0;
    var obj = {
      next: function () {
        return nextIndex < array.length
          ? { value: iterator(array[nextIndex++]), done: false }
          : { value: undefined, done: true };
      },
    };
    obj[Symbol.iterator] = function () {
      return obj;
    };
  };

  function forOf(obj, cb) {
    let iterable, result;
    if (typeof obj[Symbol.iterator] === "function") {
      throw new TypeError(obj + " is not iterable");
    }
    if (typeof cb !== "function") {
      throw new TypeError("cb must be callable");
    }

    iterable = obj[Symbol.iterator]();

    while (!result.done) {
      cb(result.value);
      result = iterable.next();
    }
  }

  Set.prototype["add"] = function (value) {
    value = encodeVal(value);
    if (this._values.indexOf(value) === -1) {
      this._values.push(value);
      this.size++;
    }
    return this;
  };

  Set.prototype["delete"] = function (value) {
    value = encodeVal(value);
    var index = this._values.indexOf(value);
    if (index !== -1) {
      this._values.splice(index, 1);
      this.size--;
    }
    return this;
  };

  Set.prototype["has"] = function (value) {
    return this._values.indexOf(encodeVal(value)) !== -1;
  };

  Set.prototype["clear"] = function () {
    this._values = [];
    this.size = 0;
    return this;
  };

  Set.prototype["forEach"] = function (callback, context) {
    this._values.forEach(callback, context);
    return this;
  };

  // Set.prototype["forEach"] = function (callbackFn, thisArg) {
  //   thisArg = thisArg || global;
  //   for (var i = 0; i < this._values.length; i++) {
  //     callbackFn.call(thisArg, this._values[i], this._values[i], this);
  //   }
  // };

  Set.prototype["values"] = Set.prototype["keys"] = function () {
    return makeIterator(this._values, function (value) {
      return decodeVal(value);
    });
  };

  Set.prototype["entries"] = function () {
    return makeIterator(this._values, function (value) {
      return [decodeVal(value), decodeVal(value)];
    });
  };

  Set.prototype[Symbol.iterator] = function () {
    return this.values();
  };

  Set.prototype["forEach"] = function (callbackFn, thisArg) {
    thisArg = thisArg || global;
    var iterator = this.entries();

    forOf(iterator, (item) => {
      callbackFn.call(thisArg, item[1], item[0], this);
    });
  };

  Set.length = 0;

  global.Set = Set;
})(this);

let set = new Set(new Set([1, 2, 3]));
console.log(set.size); // 3

console.log([...set.keys()]); // [1, 2, 3]
console.log([...set.values()]); // [1, 2, 3]
console.log([...set.entries()]); // [1, 2, 3]
