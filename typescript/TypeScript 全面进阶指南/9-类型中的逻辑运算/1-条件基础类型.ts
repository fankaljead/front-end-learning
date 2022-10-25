type LiteralType<T> = T extends string ? "string" : "other";
type Res1 = LiteralType<"zxh">;
type Res2 = LiteralType<33>;

type LiteralTypee<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends null
  ? "null"
  : T extends undefined
  ? "undefined"
  : never;
type LiteralTypeeRes1 = LiteralTypee<1>;
type LiteralTypeeRes2 = LiteralTypee<false>;
type LiteralTypeeRes3 = LiteralTypee<"zxh">;
type LiteralTypeeRes4 = LiteralTypee<null>;
type LiteralTypeeRes5 = LiteralTypee<undefined>;
type LiteralTypeeRes6 = LiteralTypee<bigint>;

type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

function universalAdd<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
  // return x + y;
}

universalAdd(599, 1);
universalAdd("zxh", "dd");
universalAdd(1n, 1n);

type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? "A string return function"
  : "a non-string return function";

type StringResult = FunctionConditionType<(a: string) => string>;
type NonStringResult = FunctionConditionType<() => boolean>;
type NonStringResult2 = FunctionConditionType<() => number>;

function add(num1: number, num2: number): number {
  return num1 + num2;
}
