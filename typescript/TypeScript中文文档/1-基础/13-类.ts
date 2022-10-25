class Thing {
  _size = 0;

  // 注意这里返回的是 number 类型
  get size(): number {
    return this._size;
  }

  // 注意这里允许传入的是 string | number | boolean 类型
  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}
let thing: Thing;

// 索引签名
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
  check(s: string) {
    return this[s] as boolean;
  }
}

// 类继承
// implements
interface Pingable {
  ping(): void;
}
class Sonar implements Pingable {
  ping(): void {
    console.log("ping");
  }
}

interface Checkable {
  check(name: string): boolean;
}
class NameChecker implements Checkable {
  // check(name: string): boolean {
  //   return name.toLowerCase() === "ok";
  // }

  check(s) {
    // Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowercse() === "ok";
    // any
  }
}

interface A {
  x: number;
  y?: number;
}
class C implements A {
  x: number;
  y: number;
}
const c = new C();
c.y = 10;

// 覆写属性 Overriding Methods
class Base {
  name = "base";
  constructor() {
    console.log("my name is " + this.name);
  }
  greet() {
    console.log("hello");
  }
}
class Derived extends Base {
  name = "derived";
  greet(name?: string): void {
    if (name === undefined) {
      super.greet();
    } else {
      console.log("hello", name);
    }
  }
}
const d = new Derived();

// 成员可见性
// public - 公有 默认的可见性修饰符 可以在任何地方被获取
// protected - 受保护 可以在类内部和子类中被获取
// private - 私有 只能在类内部被获取
class Greeter {
  protected m = 10;
  public greet() {
    console.log("hi");
  }
  protected getName() {
    return "hi";
  }
  protected x: number = 1;
  private y: number = 10;
  static job = "student";
  // static name = "greeter";
}
class SpecialGreeter extends Greeter {
  protected x: number = 5;
  m = 15;
  public howdy() {
    console.log("Howdy ", this.getName());
  }
}
class Derived2 extends Greeter {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Greeter) {
    // other.x = 10;
  }
}
const g = new SpecialGreeter();
g.greet();
console.log(g.m);

class A {
  private x = 10;
  public sameAs(other: A) {
    return this.x === other.x;
  }
}

// 警告
// private和 protected 仅仅在类型检查的时候才会强制生效
// 意味着在 JavaScript 运行时，像 in 或者简单的属性查找，依然可以获取 private 或者 protected 成员
class MySafe {
  private age: number = 10;
  private male: boolean = true;
  #name: string = "zxh";
}
const ms = new MySafe();
console.log(ms["age"]);
for (const key in ms) {
  if (Object.prototype.hasOwnProperty.call(ms, key)) {
    const element = ms[key];
    console.log(element);
  }
}

// 类静态块
class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }
  static {
    try {
      // const lastInstance = loadLastInstances();
      // Foo.#count += lastInstance.length;
    } catch (e) {
      console.log(e);
    }
  }
}

// 泛型类
class Box<Type> {
  contents: Type;
  text: string;
  constructor(contents: Type) {
    this.contents = contents;
  }
  set(value: string) {
    this.text = value;
    return this;
  }
  sameAs(other: this) {
    return other.text === this.text;
  }
}
const box = new Box<number>(10);
console.log(box.contents);

// this 的类型
class ClearableBox extends Box<string> {
  clear() {
    this.text = "";
  }
}
const bb = new ClearableBox("hello");
const bbb = bb.set("world");

// 参数属性
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {}
}
const params = new Params(1, 2, 3);

// 类表达式 Class Expressions
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

// 抽象类和成员
abstract class ABase {
  abstract getName(): string;
  printName() {
    console.log("hello, ", this.getName());
  }
}
// const ab = new ABase();
class DBase extends ABase {
  getName(): string {
    return "world";
  }
}
const dd = new DBase();
dd.printName();

// 抽象构造签名
function lgreet(ctor: new () => ABase) {
  const instance = new ctor();
  instance.printName();
}

// 类之间的关系
class Point1 {
  x = 0;
  y = 0;
}
class Point2 {
  x = 0;
  y = 0;
}
const p: Point1 = new Point2();

class Person {
  name: string;
  age: number;
}
class Employee {
  name: string;
  age: number;
  salary: number;
}
const person: Person = new Employee();
