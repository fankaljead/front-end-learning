// 1. typeof
var a = null;
var b = /a/g;

console.log(typeof a); // object
console.log(typeof b); // object

// 2. instanceof
function instance(target, cons) {
  return cons.prototype.isPrototypeOf(target);
}

// 3. Object.prototype.toString.call()
var c = "hello"
var d = {}
console.log(Object.prototype.toString.call(b)); // [object RegExp]
console.log(Object.prototype.toString.call(c)); // [object String]
console.log(Object.prototype.toString.call(d)); // [object Object]
