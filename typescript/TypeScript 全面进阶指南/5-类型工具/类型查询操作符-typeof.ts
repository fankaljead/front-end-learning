const str = "zxh";

const obj = { name: "zxh" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
};

type Str = typeof str; // "zxh"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean

const func2: typeof func = (name: string) => {
  return name === "zxh";
};

type FuncReturnType = ReturnType<typeof func>;

function isString(input: unknown): input is string {
  return typeof input === "string";
}
function foo(input: string | number) {
  if (isString(input)) {
    input.replace("zxh", "zxh24");
  }
  if (typeof input === "number") {
    return input;
  }
}

type Falsy = false | "" | 0 | null | undefined;
const isFalsy = (val: unknown): val is Falsy => !val;

type Primitive = string | number | boolean | undefined;
const isPrimitive = (val: unknown): val is Primitive =>
  ["string", "number", "boolean", "undefined"].includes(typeof val);

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number");
  }
}

let nname: any = "zxh";
assertIsNumber(nname);
nname.toFixed(2);
