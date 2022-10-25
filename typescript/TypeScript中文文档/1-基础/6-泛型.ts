// 泛型 Generics
function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>("myString");
let op = identity("myString");

// 使用泛型类型变量
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// 泛型类型
let myIdentity: <Type>(arg: Type) => Type = identity;

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

// 泛型约束
interface Lengthwise {
  length: number;
}
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity2("string");
loggingIdentity2([1, 2, 3]);

// 泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let xx = { a: 1, b: 2, c: 3 };
getProperty(xx, "a");
getProperty(xx, "b");

// 在泛型中使用类类型
function create<T>(ctor: { new (): T }): T {
  return new ctor();
}
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
