// 1. 类数组对象
var arrLike = {
  0: "my",
  1: "name",
  2: "is",
  3: "zxh",
  length: 4,
};

// 对应的数组对象为
var arr = ["my", "name", "is", "zxh"];

// 转换
console.log(
  Object.prototype.toString.call(Array.prototype.slice.call(arrLike, 0))
);
console.log(Object.prototype.toString.call(Array.from(arrLike)));
var newArr = [...arrLike]
console.log(Object.prototype.toString.call(newArr));
