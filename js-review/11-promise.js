// console.log("start");
// setTimeout(function () {
//   console.log("timeout");
// }, 5000);
// for (let i = 0; i <= 500000; i++) {
//   if (i % 10000 === 0) {
//     console.log("i:", i);
//   }
// }
// console.log("end");

// function* say() {
//   yield "开始";
//   yield "执行中";
//   yield "结束";
// }
// let it = say(); // 调用say方法，得到一个迭代器
// console.log(it.next()); // { value: '开始', done: false }
// console.log(it.next()); // { value: '执行中', done: false }
// console.log(it.next()); // { value: '结束', done: false }
// console.log(it.next()); // { value: undefined, done: true }

// async function foo() {
//   console.log(1);
//   return false;
// }

// console.log(foo());

// // foo().then(console.log);

// console.log(2);

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  // let prototype = object(superType.prototype); // 创建对象
  // prototype.constructor = subType; // 增强对象
  // subType.prototype = prototype; // 赋值对象
  subType.prototype = superType.prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

let sub1 = new SubType("zxh", 23);
let sub2 = new SubType("zxhdfsd", 232);
