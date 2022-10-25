// 自定义 log
function log() {
  console.log.apply(console, arguments); // 参数不确定
}
function log() {
  var args = Array.prototype.slice.call(arguments); // 类数组转换为标准数组
  args.unshift("(app)");

  console.log.apply(console, args);
}

// 1. 实现 bind
// bind 函数实现
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  // 获取参数 除去 this context 之外的参数
  // arguments 为类数组对象 用 [...arguments] 转换为数组
  var args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    // 根据调用方式，传入不同绑定值 函数调用 或者是 new 调用
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments) // 柯里化操作 是在函数调用时只传递一部分参数进行调用，函数会返回一个新函数去处理剩下的参数
    );
  };
};

// JavaScript Web Application 对于 bind() 的实现
Function.prototype.bind = function (context) {
  var args = Array.prototype.slice(arguments, 1),
    F = function () {},
    self = this,
    bound = function () {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return self.apply(this instanceof F ? this : context, finalArgs);
    };

  F.prototype = self.prototype;
  bound.prototype = new F();
  return bound;
};

// 2. 实现 call
// call 函数实现 ...args
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }

  // 获取参数
  let args = [...arguments].slice(1),
    result = null;

  // 判断 this context 是否传入，未传入则设置默认绑定为全局 window
  context = context || window;

  // 讲调用函数设置为对象的方法
  context.fn = this;

  // 调用函数
  result = context.fn(...args);

  // 将属性删除
  delete context.fn;

  return result;
};

// 3. 实现 apply 第二个参数为数组
// apply 函数实现 []
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  let result = null;

  // 判断 context 是否存在吗，如果未传入则为 window
  context = context || window;

  // 将函数设为对象的方法
  context.fn = this;

  // 调用方法
  if (arguments[1]) {
    result = context.fn(...[...this.arguments].slice(1));
  } else {
    result = context.fn();
  }

  // 将属性删除
  delete context.fn;

  return result;
};

const m = {
  x: 42,
  getX: function () {
    return this.x;
  },
};
const unboundGetX = m.getX;
console.log(unboundGetX());

const boundGetX = unboundGetX.bind(m);
console.log(boundGetX());

Function.prototype.myBind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  let args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    fn.apply(this instanceof Fn ? this : context, args.concat(...arguments));
  };
};

Function.prototype.myApply2 = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  context = context || window;

  context.fn = this;

  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;

  return result;
};

//模拟call方法
Function.prototype.apply_ = function (obj, arr) {
  obj = obj ? Object(obj) : window;
  obj.fn = this;
  if (!arr) {
    obj.fn();
  } else {
    var args = [];
    // 注意这里的i从0开始
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    obj.fn(args); // 执行fn
  }
  delete obj.fn; //删除fn
};

var name = "时间跳跃";
var obj = {
  name: "听风是风",
};

function fn(a, b, c) {
  console.log(a + b + c + this.name);
}

fn.apply_(obj, ["我的", "名字", "是"]); // 我的名字是听风是风
fn.apply_(null, ["我的", "名字", "是"]); // 我的名字是时间跳跃
fn.apply_(undefined, ["我的", "名字", "是"]); // 我的名字是时间跳跃
