function isString(input: unknown): boolean {
  return typeof input === "string";
}

// 类型守卫
function isIsString(input: unknown): input is string {
  return typeof input === "string";
}

function typeGuard(input: string | number) {
  if (isString(input)) {
    (<string>input).replace(/\d/, "$");
    input.replace(/\d/, "$");
  }
  if (isIsString(input)) {
    input.replace(/\d/, "$");
  }
  if (typeof input === "number") {
  }
}

type Falsy = false | "" | 0 | null | undefined;

const isFalsy = (val: unknown): val is Falsy => !val;

type Primitive = string | number | boolean | undefined;

const isPrimitive = (val: unknown): val is Primitive =>
  ["string", "number", "boolean", "undefined"].includes(typeof val);

// 基于 in 和 instanceof 的类型保护
interface Fooj {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Barj {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Fooj | Barj) {
  if ("foo" in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }

  if ("shared" in input) {
    input.shared = 1;
  } else {
    input; // never
  }
}

function handle1(input: Fooj | Barj) {
  if (typeof input.diffType === "string") {
    input.fooOnly;
  }
}

class FooBase {}
class BarBase {}

class Fook extends FooBase {
  fooOnly() {}
}
class Bark extends BarBase {
  barOnly() {}
}

function handlek3(input: Fook | Bark) {
  if (input instanceof FooBase) {
    input.fooOnly();
  } else {
    input.barOnly();
  }
}

// 类型断言守卫
import assert from "assert";

let assertName: any = "zxh";

assert(typeof assertName === "number");
assertName.toFixed(2);

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("not a number");
  }
}

assertIsNumber(assertName);

assertName.toFixed(2);
