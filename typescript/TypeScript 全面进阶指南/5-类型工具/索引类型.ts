// 索引签名类型
interface AllStringTypes {
  [key: string]: string;
}

type AllStringTypess = {
  [key: string]: string;
};

type PropType1 = AllStringTypess["zxh"];
type PropType2 = AllStringTypess["23"];

const foo: AllStringTypess = {
  name: "zxh",
  age: "24",
  24: "age",
  [Symbol.for("zxh")]: "symbol",
};

type AllStringTypes2 = {
  propA: number;
  [key: string]: boolean;
};

type StringOrBooleanTypes = {
  propA: number;
  propB: boolean;
  [key: string]: string | number | boolean;
};

type AnyTypeHere = {
  [key: string]: any;
};
const fooo: AnyTypeHere["zxh"] = "ss";

// 索引类型查询
type Foo = {
  zxh: "zxh";
  age: 24;
  fooo: 12;
};

type FooKeysk = keyof Foo;
declare const fooKeysK: FooKeysk;
type FooKeyskk = typeof fooKeysK;

type NumberRecord = {
  [key: string]: number;
};

type PropType3 = NumberRecord[string];

type Foo3 = {
  propA: number;
  propB: boolean;
  propC: string;
};
type PropTypeUnion = Foo3[keyof Foo3];
