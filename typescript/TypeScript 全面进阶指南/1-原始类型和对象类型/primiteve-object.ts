// 原始类型的类型标注
const mname: string = "zxh";
const age: number = 24;
const male: boolean = true;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { mname, age, male };
const bgi1: bigint = 111n;
const bgi2: bigint = BigInt(111);
const symb1: symbol = Symbol("foo");

// null 和 undefined
const tmp1: null = null;
const tmp2: undefined = undefined;
// 仅在关闭 strictNullChecks 时成立
const tmp3: string = null;
const tmp4: string = undefined;

// void
function func1() {}
function func2() {
  return;
}
function func3() {
  return undefined;
}

// 数组的类型标注
const arr1: string[] = [];
const arr2: Array<string> = [];

const arr3: string[] = ["z", "x", "h"];
console.log(arr3[33]);

// 元组 Tuple
const arr4: [string, string, string] = ["z", "x", "h"];
console.log(arr4[5]);

const arr5: [string, number, boolean] = ["zxh", 24, true];

// 可选元组
const arr6: [string, number?, boolean?] = ["zxh"];
type TupleLength = typeof arr6.length;

// 具名元组 Labeled Tuple Elements
const arr7: [name: string, age: number, male: boolean] = ["zxh", 24, true];

const [ele1, ele2, ...rest] = arr2;
const [namee, agee, malee] = arr7;

// 对象的类型标注
interface IDescription {
  readonly name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const zxh: IDescription = {
  name: "zxh",
  age: 24,
  male: true,
};

zxh.male = false;
zxh.func = () => {};
console.log(zxh.name);
zxh.func();

const zzzzzxj = {
  name: "zxh",
};