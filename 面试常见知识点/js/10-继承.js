// 1. 原型继承
function SuperType() {
  this.name = "super";
}
function SubType() {}

// 利用原型链实现继承
SubType.prototype = new SuperType();

var instance1 = new SubType();
console.log(instance1.name); // super

// 2. 借用构造函数继承
function SuperType(age, name) {
  this.colors = ["blue", "red"];
  this.age = age;
  this.name = name;
}
function SubType() {
  SuperType.call(this, ...arguments);
}

var instance1 = new SubType(23, "sillywa");
instance1.colors.push("yellow");
console.log(instance1.colors, instance1.name);

var instance2 = new SubType(12, "xinda");
console.log(instance2.colors, instance2.name);

// 3. 组合继承
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "yellow"];
}
// 方法写在原型上
SuperType.prototype.sayName = function () {
  return this.name;
};
function SubType(name, age) {
  // 通过 构造函数继承属性
  SuperType.call(this, name);
  this.age = age;
}
// 通过原型继承方法
SubType.prototype = new SuperType();

// 重写了 SubType 的 prototype 属性，因此其 constructor 也被重写了，需要手动修正
SubType.prototype.constructor = SubType;

// 定义子类自己的方法
SubType.prototype.sayAge = function () {
  return this.age;
};

// 4. 原型式继承
function create(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var person = {
  name: "sillywa",
  firends: ["Johe"],
};

var person1 = create(person);
person1.name = "coder";
person1.firends.push("Kobe");

var person2 = create(person);
person2.firends.push("Cury");
console.log(person2.firends); // ["Johe", "Kobe", "Cury"]

// 5. 寄生式继承
function createAnother(original) {
  var clone = Object.create(original);
  clone.sayHi = function () {
    console.log("Hi");
  };
  return clone;
}

// 6. 寄生式组合继承
function SuperType(name) {
  this.name = name;
  this.colors = [];
}
SuperType.prototype.sayName = function () {
  return this.name;
};

function SubType(name, age) {
  // 第一次调用父类的构造函数
  SuperType.call(this, name);
  this.age = age;
}
// 关键代码
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  return this.age;
};
