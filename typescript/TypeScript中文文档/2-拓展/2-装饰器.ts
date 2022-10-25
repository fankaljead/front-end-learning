// 装饰器 decorator
// function sealed(target) {}

// 装饰器工厂
// 这是一个装饰器工厂
function color(value: string) {
  return function (target) {}; // 这是一个装饰器
}

// 装饰器组合
function f() {
  console.log("f(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("f(): called");
  };
}
function g() {
  console.log("g(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("g(): called");
  };
}
function h() {
  console.log("h(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("h(): called");
  };
}

class CC {
  @f()
  @g()
  @h()
  method() {
    console.log("cc");
  }
}
let cc = new CC();
cc.method();

// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}
// 方法装饰器
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
@sealed
@classDecorator
class Greeter {
  greeting: string;
  property = "property";
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
let gg = new Greeter("world");
console.log(gg);

// 访问器装饰器
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() {
    return this._x;
  }
  @configurable(false)
  get y() {
    return this._y;
  }
}
let point = new Point(1, 2);
point._x = 1;
console.log(point);

// 属性装饰器
import "reflect-metadata";
class Greeterr {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      let formatString = getFormat(this, "greeting");
      return formatString.replace("%s", this.greeting);
  }
}


const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
