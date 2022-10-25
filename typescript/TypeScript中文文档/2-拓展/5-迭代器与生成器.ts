// 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 一些内置的类型如Array，Map，Set，String，Int32Array，Uint32Array等都已经实现了各自的Symbol.iterator。 对象上的Symbol.iterator函数负责返回供迭代的值

// for..of
let someArray = [1, "string", false];

for (let entry of someArray) {
  console.log(entry); // 1, "string", false
}

// for..of vs for..in
// for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
let list = [4, 5, 6];
let map = new Map([
  ["4", 40],
  ["5", 50],
  ["6", 60],
]);
for (let i in map) {
  console.log(i); // 4, 5, 6
}
for (let i of map) {
  console.log(i); // [4, 40], [5, 50], [6, 60]
}
