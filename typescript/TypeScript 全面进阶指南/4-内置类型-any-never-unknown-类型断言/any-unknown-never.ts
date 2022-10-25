let unknownVar: unknown = "zxh";
unknownVar = false;
unknownVar = "zxh";
unknownVar = {
  site: "juejin",
};

unknownVar = () => {};

const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();

type UnionWithNever = "zxh" | 599 | true | void | never;

declare let v1: never;
declare let v2: void;

// v1 = v2; // X 类型 void 不能赋值给类型 never

v2 = v1;

function justThrow(): never {
  throw new Error();
}

function foo(input: number) {
  if (input > 1) {
    justThrow();
    // 等同于 return 语句后的代码，即 Dead Code
    const name = "linbudu";
  }
}

let unknownVar: unknown = "zxh";
unknownVar = false;
unknownVar = {};
unknownVar = () => {};
let unknownVar2: unknown = unknownVar;
let unknownVar3: bigint = unknownVar;

(unknownVar as { foo: () => {} }).foo();

function justThrow(): never {
  throw new Error();
}

function foo(input: number) {
  if (input > 1) {
    justThrow();
    const name = "zxh";
  }
}

declare const strOrNumOrBool: string | number | boolean;
if (typeof strOrNumOrBool === "string") {
  console.log("str");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num");
} else if (typeof strOrNumOrBool === "boolean") {
  console.log("bool");
} else {
  throw new Error(`unknown input type ${strOrNumOrBool}`);
}

const arrj: string[] = [];
arrj.push("zxh");

const arrk = [];
arrk.push("zxh");
