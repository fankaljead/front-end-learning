// 8. 闭包及其作用
function fib() {
  let n1 = 1,
    n2 = 1;
  return function () {
    let result = n1 + n2;
    n1 = n2;
    n2 = result;
    return result;
  };
}

const f = fib();

f(); // 2
f(); // 3
f(); // 5
f(); // 8
f(); // 13

// 闭包应用
// 1. 模仿块级作用域
for (var i = 0; i < 5; ++i) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i);
}

// 2. 私有变量
function MyObject() {
  // 私有变量和私有函数
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 特权方法
  this.publicMethod = function () {
    privateVariable++;
    return privateFunction;
  };
}

// 3. 静态私有变量
(function () {
  var name = "";
  //
  Person = function (value) {
    name = value;
  };
  Person.prototype.getName = function () {
    return name;
  };
  Person.prototype.setName = function (value) {
    name = value;
  };
})();

var person1 = new Person("xiaoming");
console.log(person1.getName()); // xiaoming
person1.setName("xiaohong");
console.log(person1.getName()); // xiaohong

var person2 = new Person("luckyStar");
console.log(person1.getName()); // luckyStar
console.log(person2.getName()); // luckyStar

// 4. 模块模式
var singleton = function () {
  var privateVarible = 10;
  function privateFunction() {
    return false;
  }

  return {
    publicProperty: true,
    publicMethod: function () {
      privateVarible++;
      return privateFunction();
    },
  };
};
