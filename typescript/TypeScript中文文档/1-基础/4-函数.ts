// 函数表达式
function greeter(fn: (a: string) => void) {
  fn("Hello, world!");
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);
// declare function foo((string)=>void):void;
type GreeterFunction = (s: string) => void;
function greeter2(fn: GreeterFunction) {
  fn("Hello, world!");
}

// 调用签名
type DescribableFunction = {
  description: string;
  (someArs: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// 构造签名
type SomeContrutor = {
  new (s: string): SomeObject;
};
class SomeObject {
  constructor(public s: string) {}
}
function fn(ctor: SomeContrutor) {
  return new ctor("hello");
}
interface CallOrContruct {
  new (s: string): Date;
  (n?: number): number;
}

// 泛型函数
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
const n = firstElement([1, 2, 3]);
const s = firstElement(["a", "b", "c"]);
const d = firstElement([new Date()]);
const o = firstElement([{ a: 1, b: 2 }]);
const u = firstElement([undefined]);

// 推断 Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}
const parsed = map([1, 2, 3], (n: number) => n * 2);

// 约束
function longest<Type extends { length: number }>(a: Type, b: Type): Type {
  if (a.length > b.length) {
    return a;
  } else {
    return b;
  }
}
const longerString = longest("hellod", "world");
const longerArray = longest([1, 2, 3], [4, 5, 6, 7]);
const notOk = longest({ name: "hellod", length: 11 }, { length: 10 });

// 泛型约束
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // return { length: minimum };
  }
}
const arr = minimumLength([1, 2, 3], 6);
console.log(arr.slice(0));

// 声明类型参数
function combine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
const combined = combine<string | number>([1, 2, 3], ["hello"]);

// 类型参数下移
function firstElement1<T>(arr: T[]) {
  return arr[0];
}
function firstElement2<T extends any[]>(arr: T) {
  return arr[0];
}
const a = firstElement1([1, 2, 3]);
const b = firstElement2([1, 2, 3]);

// 使用更少类型参数
function filter1<T>(arr: T[], func: (arg: T) => boolean): T[] {
  return arr.filter(func);
}
function filter2<T, Func extends (arg: T) => boolean>(
  arr: T[],
  func: Func
): T[] {
  return arr.filter(func);
}

// 函数参数应该出现两次
function greet<Str extends string>(s: Str) {
  return "Hello, " + s;
}
// 更好的方式
function greet2(s: string) {
  return "Hello, " + s;
}

// 可选参数
function f(x?: number) {
  console.log(n.toFixed());
  console.log(n.toFixed(3));
}
f();
f(10);

// 回调函数中的可选参数
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (n) => console.log(n));
myForEach([1, 2, 3], (n, i) => console.log(n, i));

// 函数重载
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  // 实现签名
  if (d !== undefined && y !== undefined) {
    return new Date(mOrTimestamp, d, y);
  }
  return new Date(mOrTimestamp);
}
const d1 = makeDate(1234567890);
const d2 = makeDate(1, 2, 3);
// const d3 = makeDate(1, 3);

// 重载签名和实现签名
// function fnn(x: string): string;
// function fnn(x: number): number;
// function fnn(x: number | string) {
//   return "oops";
// }
// fnn("hello");

// 尽可能使用联合类型代替重载
function len(s: string): number;
function len(s: number[]): number;
function len(s: string | number[]): number {
  return s.length;
}
// 使用联合类型
function lenen(x: number[]): number {
  return x.length;
}

// 在函数中声明 this
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
class User {
  id: number;
  admin: boolean;
  constructor(id: number, admin: boolean) {
    this.id = id;
    this.admin = admin;
  }
}
const db = getDB();
function getDB(): DB {
  return {
    filterUsers(filter) {
      return this.users.filter(filter);
    },
  };
}
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

// void 表示一个函数不会返回任何值 当函数并没有任何返回值，或者返回不了明确的值的时候，就应该用这种类型
// 在 JavaScript 中，一个函数并不会返回任何值，会隐式返回 undefined，但是 void 和 undefined 在 TypeScript 中并不一样
function noop() {
  return;
}

// object
let aa: object = new Date();
aa = {};
aa = document.getElementById("jj");

// unknown 类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的
function f1(a: any) {
  a.b();
}
function f2(a: unknown) {
  // a.b();
}
// 有的时候用来描述函数类型，还是蛮有用的。
// 你可以描述一个函数可以接受传入任何值，但是在函数体内又不用到 any 类型的值。
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// never 型表示一个值不会再被观察到 (observed)。
// never 类型表示的是那些永不存在的值的类型。
// 作为一个返回类型时，它表示这个函数会丢一个异常，或者会结束程序的执行。
// 当 TypeScript 确定在联合类型中已经没有可能是其中的类型的时候，never 类型也会出现
function fnnnn(x: string | number) {
  if (typeof x === "string") {
  } else if (typeof x === "number") {
  } else {
  }
}

// Function
function doSomethingg(f: Function) {
  let r = f(1, 2, 3);
  return r;
}

// 剩余参数
// 剩余参数是一个数组，它的类型是任意参数的类型的集合。
// parameters 表示我们定义函数时设置的名字即形参
// arguments 表示我们实际传入的参数即实参
// rest parameters
// 剩余参数的类型会被隐式设置为 any[] 而不是 any，如果你要设置具体的类型，
// 必须是 Array<T> 或者 T[]的形式，再或者就是元组类型（tuple type）
function multiply(n: number, ...m: number[]): number[] {
  return m.map((x) => x * n);
}
const am = multiply(2, 1, 2, 3);
// rest arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 2, 3];
arr1.push(...arr2);
// const args = [8, 5]; // 一般情况下，TypeScript 并不会假定数组是不变的(immutable)
const args = [8, 5] as const;
const angle = Math.atan2(...args);

// 参数结构
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  return a + b + c;
}

// 函数的可赋值性
// 返回 void
type voidFunc = () => void;
const ff1: voidFunc = () => {
  return true;
};
const ff2: voidFunc = () => true;
const ff3: voidFunc = function () {
  return true;
};
const v1 = ff1();
const v2 = ff2();
const v3 = ff3();
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));

const ff4 = function (): void {
  return;
};
