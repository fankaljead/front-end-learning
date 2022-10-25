// 原始类型 string number boolean
// 数组 number[] T<U>
interface Person {
  name: string;
  age: number;
  isMale: boolean;
  skills: string[];
}

const zxh: Person = {
  name: "zxh",
  age: 24,
  isMale: true,
  skills: ["playing", "joking"],
};

// 任意值类型 any
let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

// 函数参数注解
function add(x: number, y: number): number {
  return x + y;
}
add(1, 2);

// 匿名函数
zxh.skills.forEach((skill) => console.log(skill.toLowerCase()));

// 可选属性
function printName(obj: { first: string; last?: string }) {
  console.log(obj.first.toUpperCase());
  obj.last && console.log(obj.last?.toUpperCase());
}

printName({ first: "zxh" });

// 可选参数
function addd(x: number, y: number, z?: number) {
  return x + y;
}

// 联合类型
// 收窄联合类型
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log("Your ID is: ", id);
  }
}
function welcomePeople(s: string[] | string) {
  if (Array.isArray(s)) {
    console.log("hello, ", s.join(" and "));
  } else {
    console.log("hello, ", s);
  }
}
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// 类型别名
type Point = {
  x: number;
  y: number;
};

function printCoordinate(p: Point) {
  console.log("The coordinate's x value is ", p.x);
  console.log("The coordinate's y value is ", p.y);
}

printCoordinate({ x: 1, y: 2 });

type ID = number | string;

type UserInputSanitizedString = string;
function sanitizeInput(str: string): UserInputSanitizedString {
  return str.trim();
}

// 接口
interface IPoint {
  x: number;
  y: number;
}
function printCoordinate2(p: IPoint) {
  console.log("The coordinate's x value is ", p.x);
  console.log("The coordinate's y value is ", p.y);
}

// interface 与  type 区别
// interface 可扩展
// type 不可扩展
interface IAnimal {
  name: string;
}
interface IBear extends IAnimal {
  honey: boolean;
}
const ibear: IBear = { name: "bear", honey: true };

type Animal = { name: string };
type Bear = Animal & { honey: boolean };
const bear: Bear = { name: "bear", honey: true };

// interface 对一个以及存在的接口添加新字段
interface IWindow {
  title: string;
}
interface IWindow {
  width: number;
}

const mw: IWindow = { title: "hello", width: 100 };

// 类型断言
// 类型断言是一种特殊的类型转换，它允许你在运行时将一种类型转换为另一种类型。
const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const mc = <HTMLCanvasElement>document.getElementById("myCanvas");
const x = "1" as any as number;

// 字面量
function printText(s: string, alignment: "left" | "right" | "center") {}
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
const f: boolean = true;

// 字面量推断
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "http://www.google.com", method: "GET" };
const req2 = { url: "http://www.google.com", method: "GET" } as const;
handleRequest(req.url, req.method as "GET");
handleRequest(req.url, req2.method);

// 非空断言操作符 !
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed());
}

// bigInt
const oneHundren: bigint = BigInt(100);
// symbol
const firstName = Symbol("name");

// never
// 异常
function err(msg: string): never {
  throw new Error(msg);
}
// 死循环
function loop(): never {
  while (true) {}
}
let a: never;
let nev: never;
let aaa = 1;
aaa = a;
a = nev;
// a = unknown

// unknown
let unk: unknown;
unk = 1;
let aaaa: any = unk;

// object 类型 代表所有非原始类型 不能把 number, string, boolean, symbol, null, undefined, never 类型赋值给 object
let ooooo: object;
// ooooo = 1;
// ooooo = never;
// ooooo = null;
// ooooo = undefined;
// ooooo = "sss";
// ooooo = true;
// ooooo = Symbol("sss");
// ooooo = {};

// Object 类型 表示所有非原始类型和原始类型的集合
let oooooo: Object;
oooooo = 1;
// oooooo = never;
oooooo = null;
oooooo = undefined;
oooooo = "sss";
oooooo = true;
oooooo = Symbol("sss");
oooooo = {};
oooooo = [];

const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)
