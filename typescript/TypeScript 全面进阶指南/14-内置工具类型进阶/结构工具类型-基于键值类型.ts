import { expectType } from "tsd";
type FuncStruct = (...args: any[]) => any;

type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];

type Tmp<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
};

type FuncTypeFoo = {
  foo: () => void;
  bar: () => number;
  baz: number;
};

type Res = Tmp<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;

type ResEqual = {
  foo: "foo";
  bar: "bar";
  baz: never;
};

type WhatWillWeGet = Res[keyof Res];
type WhatWillWeGet2 = ResEqual[keyof ResEqual];

type WhatWillWeGetEqual1 = Res["foo" | "bar" | "baz"];
type WhatWillWeGetEqual2 = Res["foo"] | Res["bar"] | Res["baz"];
type WhatWillWeGetEqual3 = "foo" | "bar" | never;

type FunctionKeysRes1 = FunctionKeys<FuncTypeFoo>;

type ExpectedPropKeys<T extends object, ValuezType> = {
  [Key in keyof T]-?: T[Key] extends ValuezType ? Key : never;
}[keyof T];

type FunctionKeyss<T extends object> = ExpectedPropKeys<T, FuncStruct>;

expectType<FunctionKeyss<FuncTypeFoo>>("bar");
expectType<FunctionKeyss<FuncTypeFoo>>("foo");
expectType<FunctionKeyss<FuncTypeFoo>>("baz");

type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;

expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: "zxh",
});

expectType<
  PickByValueType<
    { foo: string; bar: number; baz: boolean; fooo: string },
    string | number
  >
>({
  fooo: "foo",
  foo: "zxh",
  bar: 12,
});

type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

type OmitByValueTypeStruct = {
  foo: () => void;
  bar: string;
  baz: (a: number) => boolean;
  foz: number;
};

type OmitByValueTypeRes1 = OmitByValueType<OmitByValueTypeStruct, string>;
type OmitByValueTypeRes2 = OmitByValueType<
  OmitByValueTypeStruct,
  string | number | boolean
>;

type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
  ? Resolved
  : Rejected;

type StrictConditional<Value, Condition, Resolved, Rejected> = [Value] extends [
  Condition
]
  ? Resolved
  : Rejected;

type ValueTypeFilter<T extends object, ValueType, Positive extends boolean> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

type PickByValueTypee<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, true>
>;

type OmitByValueTypee<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, false>
>;

type Wrappedz<T> = [T] extends [boolean] ? "Y" : "N";

type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false>;

type StrictConditionall<A, B, Resolved, Rejected, Fallback = never> = [
  A
] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback;

type Res2 = StrictConditionall<1 | 2, 1 | 2 | 3, true, false>;
type Res3 = StrictConditionall<1 | 2 | 3, 1 | 2, true, false>;
type Res4 = StrictConditionall<1 | 2 | 3, 1 | 2, true, false, false>;

type StrictValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean = true
> = {
  [Key in keyof T]-?: StrictConditionall<
    ValueType,
    T[Key],
    Positive extends true ? Key : never,
    Positive extends true ? never : Key,
    Positive extends true ? never : Key
  >;
}[keyof T];

type StrictPickByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType>
>;

type StrictPickByValueTypeRes1 = StrictPickByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1 | 2
>;
type StrictPickByValueTypeRes2 = StrictPickByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1
>;
type StrictPickByValueTypeRes3 = StrictPickByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1 | 2 | 3
>;

type StrictOmitByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType, false>
>;
type StrictOmitByValueTypeRes1 = StrictOmitByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1 | 2
>;
type StrictOmitByValueTypeRes2 = StrictOmitByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1
>;
type StrictOmitByValueTypeRes3 = StrictOmitByValueType<
  { foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 },
  1 | 2 | 3
>;

type StrictOmitByValueTypeRes4 = StrictOmitByValueType<FuncTypeFoo, () => void>;
type StrictOmitByValueTypeRes5 = StrictOmitByValueType<FuncTypeFoo, number>;
