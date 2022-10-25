// 原始值
var a = 10;
var b = "hello";
var c = false;
var d = null;
var e = undefined;

console.log(typeof a); // number
console.log(typeof b); // string
console.log(typeof c); // boolean
console.log(typeof d); // object
console.log(typeof e); // undefined

// 引用值
var o = {
  name: "zxh",
  age: 24,
};
console.log(o.name); // zxh