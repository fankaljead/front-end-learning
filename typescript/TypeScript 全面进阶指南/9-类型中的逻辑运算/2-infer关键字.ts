type Func = (...args: any[]) => any;

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;
type FunctionReturnTypeRes1 = FunctionReturnType<() => number>;
type FunctionReturnTypeRes2 = FunctionReturnType<(a: null) => void>;

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>;
type SwapResult2 = Swap<[1, 2, 3]>;
type SwapResult3 = Swap<[string, number]>;

type ExtractStartEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;
type ExtractStartEndRes1 = ExtractStartEnd<[1, 2, 3, 4]>;

type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;
type SwapStartAndEndRes1 = SwapStartAndEnd<[1, 2, 3, 4]>;

type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;

type SwapFirstTwo1 = SwapFirstTwo<[1, 2, 3, 4]>;

type ArrayItemType<T> = T extends Array<infer ElementType>
  ? ElementType
  : never;
type ArrayItemTypeResult1 = ArrayItemType<[]>;
type ArrayItemTypeResult2 = ArrayItemType<string[]>;
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>;

type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string; age: number }, "age">;
type PropTypeResult2 = PropType<{ name: string; age: number }, "age" | "name">;
type PropTypeResult3 = PropType<
  { name: string; age: number },
  "age" | "name" | never
>;

type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never;

type ReverseKeyValueResult1 = ReverseKeyValue<{ key: "value" }>;

type PromiseValue<T> = T extends Promise<infer V> ? V : T;
type PromiseValueResult = PromiseValue<Promise<number>>;
type PromiseValueResult2 = PromiseValue<string>;
type PromiseValueResult3 = PromiseValue<Promise<Promise<number>>>;

type PromiseValuee<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;

type PromiseValueee<T> = T extends Promise<infer V> ? PromiseValueee<V> : T;
type PromiseValueeeResult1 = PromiseValueee<Promise<Promise<Promise<string>>>>;
