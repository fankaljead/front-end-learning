function _new() {
  // 1. 创建一个空对象
  let obj = {};

  // 2. 将空对象的原型链链接到传入的对象
  let [Con, ...args] = arguments;
  obj.__proto__ = Con.prototype;

  // 3. 执行函数并绑定 this
  let res = Con.apply(obj, args);

  // 4. 如果函数有返回值并且为 object，则返回函数的返回值，否则返回 obj
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name;
};

let p = _new(Person, "sillywa", 23);
let p2 = new Person("zxh", 24);

console.log(p);
console.log(p2);
