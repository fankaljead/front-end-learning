import { expectType } from "tsd";

type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type TestStruct = {
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedFooBar: string;
    };
  };
  nll: null;
  readonly bar: number;
};

type ExcludeRes1 = Exclude<TestStruct, "foo">;
type ExcludeRes2 = Exclude<"foo" | "bar", "foo">;
type OmitRes1 = Omit<TestStruct, "name" | "foo">;
type OmitRes2 = Omit<"foo" | "bar" | "baz", "name" | "foo">;
type NonNullableRes1 = NonNullable<TestStruct>;
type NonNullableRes2 = NonNullable<string | null | undefined | number>;
type LowerCaseRes1 = Lowercase<"Foo">;
type UpperCaseRes1 = Uppercase<"Foo">;

type DeepPartialStruct = DeepPartial<TestStruct>;

expectType<DeepPartialStruct>({
  foo: "bar",
  nested: {},
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {},
  },
});

expectType<DeepPartialStruct>({
  foo: "zxh",
  nested: {
    nestedFoo: "foo",
    nestedBar: {
      nestedFooBar: "zxh",
    },
  },
});

type PartialRes1 = Partial<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedFooBar: string;
    };
  };
}>;

type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
type DeepRequiredRes1 = DeepRequired<TestStruct>;

type DeepImmutable<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepImmutable<T[K]> : T[K];
};
type DeepImmutableRes1 = DeepImmutable<TestStruct>;

type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};
type DeepMutableRes1 = DeepMutable<TestStruct>;

type NonNullable<T> = T extends null | undefined ? never : T;
type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};
type DeepNonNullableRes1 = DeepNonNullable<TestStruct>;

type Nullable<T> = T | null;
type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};
type DeepNullableRes = DeepNullable<TestStruct>;
