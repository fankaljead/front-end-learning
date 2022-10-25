// 对一个 对象类型 使用 keyof 操作符，
// 会返回该对象属性名组成的一个字符串或者数字字面量的联合
type Point = { x: number; y: number };
type P = keyof Point; // 'x' | 'y'

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: unknown };
type M = keyof Mapish;

// 数字字面量联合类型
const NumericObj = {
  [1]: "one",
  [2]: "two",
  [3]: "three",
};
type result = keyof typeof NumericObj; // '1' | '2' | '3'

// Symbol
const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");
const sym3 = Symbol("sym3");
const symToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
};
type KS = keyof typeof symToNumberMap; // typeof sym1 | typeof sym2 | typeof sym3

// 类和接口
class Person {
  name: string;
}
type resultt = keyof Person; // 'name'

interface IPerson {
  name: string;
}
type res = keyof IPerson; // 'name'

// 实战
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
// getProperty(x, "m");
