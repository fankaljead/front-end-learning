// 对象类型 Object types
// 对象可以是匿名的
function greet(person: { name: string; age: number }) {
  console.log("Hello, " + person.name);
}
// 可以使用接口进行定义
interface Person {
  name: string;
  age: number;
}
function greet2(person: Person) {
  console.log("Hello, " + person.name);
}
// 通过类型别名
type Person2 = { name: string; age: number };
function greet3(person: Person2) {
  console.log("Hello, " + person.name);
}

// 属性修饰符 Property modifiers
// 可选属性
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
interface Shape {
  color: string;
  description: string;
}
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at " + xPos);
  console.log("y coordinate at " + yPos);
}

// 只读属性
interface SomeType {
  readonly prop: string;
}
function doSomething(obj: SomeType) {
  // obj.prop = "new value"; // 只读属性 无法修改
}
// 不过使用 readonly 并不意味着一个值就完全是不变的，亦或者说，内部的内容是不能变的。readonly 仅仅表明属性本身是不能被重新写入的。
interface Home {
  readonly resident: { name: string; age: number };
}
function visitForBirthday(home: Home) {
  console.log(`Happy birthday, ${home.resident.name}!`);
  home.resident.age++;
}

// readonly 可以通过别名修改
interface IPerson {
  name: string;
  age: number;
}
interface ReadonlyPerseon {
  readonly name: string;
  readonly age: number;
}
let writablePerson: IPerson = {
  name: "John",
  age: 30,
};
let readonlyPerson: ReadonlyPerseon = writablePerson;
console.log(readonlyPerson.age);
// readonlyPerson.age = 31; // 现在不行了
console.log(readonlyPerson.age);

// 索引签名 Index signatures
// 索引签名的属性类型必须是 string 或者是 number
interface StringArray {
  [index: number]: string;
}

// 属性继承 Extending Types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
interface AddressWithUnit2 extends BasicAddress {
  unit: string;
}
// 接口也可以继承多个类型
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
interface ColorfulCircle extends Colorful, Circle {}
const cc: ColorfulCircle = {
  color: "red",
  radius: 10,
};

// 交叉类型 Intersection Types
// 合并已经存在的对象类型
type ColorfullCircle = Colorful & Circle;
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// 接口继承和交叉类型
// 使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会
// interface CololrfulSub extends Colorful {
//   color: number;
// }
type CololrfullSub = Colorful & {
  color: number;
};
let ccc: CololrfullSub;
// ccc.color = 1; // color 为 never 类型 是 string 和 number 的交集

// 泛型对象类型 Generic Object Types
interface Boxx {
  contents: any;
}
interface Box {
  contents: unknown;
}
let x: Box = {
  contents: "hello world",
};
interface TBox<T> {
  contents: T;
}
let box: TBox<string> = {
  contents: "hello world",
};

// 类型别名也可使用泛型
type Boxx2<T> = {
  contents: T;
};

// type OrNull<Type> = Type | null;
// type OneOrMany<Type> = Type | Type[];
// type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null;
// type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null;

// Array 类型
// number[] => Array<number>
// string[] => Array<string>
// Map<K, V> => Map<K, V>
// Set<T> => Set<T>
// T[] => Array<T>
// Promise<T> => Promise<T>

// ReadonlyArray 类型 是一个特殊类型，它可以描述数组不能被改变
function doStuff(values: ReadonlyArray<string>) {
  const copy = values.slice();
  // values.push("he!!!");
  return copy;
}
// ReadonlyArray 并不是一个我们可以用的构造器函数
// 直接把一个常规数组赋值给 ReadonlyArray
const roArray: ReadonlyArray<string> = ["a", "b", "c"];
const rA: readonly string[] = ["a", "b", "c"];
// rA.push("d"); // 报错

// 元组 Tuple
// 元组是一种特殊的数组，它允许定义一个数组，其中元素的类型是固定的。
type StringNumberPair = [string, number];
const sn: StringNumberPair = ["a", 1];
sn.push(1); // 报错
function dddo(stringHash: [string, number]) {
  const [s, n] = stringHash;
  console.log(s, n);
}
// 元组可选属性
type Either2dOr3d = [number, number, number?];
function setCoordinate(cood: Either2dOr3d) {
  const [x, y, z] = cood;
  console.log(x, y, z);
  console.log(`Provided coordinates had ${cood.length} dimensions.`);
}

// 剩余元素元组语法 但必须为 array/tuple 类型
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const a: StringNumberBooleans = ["a", 1];
const b: StringNumberBooleans = ["a", 1, true, false];
console.log(a.length, b.length);

// readonly 元素类型
function ddd(pair: readonly [string, number]) {
  // pair[0] = "b"; // 报错
}

// 尽可能的将元组设置为 readonly 是一个好习惯
// 如果我们给一个数组字面量 const 断言，也会被推断为 readonly 元组类型
let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
// distanceFromOrigin(point); // 报错
distanceFromOrigin([3, 4]); // 5
