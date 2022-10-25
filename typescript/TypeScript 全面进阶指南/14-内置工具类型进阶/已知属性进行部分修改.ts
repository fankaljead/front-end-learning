import { expectType } from "tsd";

type TestStruct = {
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedFooBar: string;
    };
  };
  readonly bar: number;
};

type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Partial<Pick<T, K>> & Omit<T, K>>;

type MarkPropsAsOptionalRes1 = MarkPropsAsOptional<
  TestStruct,
  "foo" | "nested"
>;
type MarkPropsAsOptionalRes3 = MarkPropsAsOptional<
  TestStruct,
  "foo" | "nested"
>;
type MarkPropsAsOptionalRes2 = MarkPropsAsOptional<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  "bar"
>;

expectType<MarkPropsAsOptionalRes1>({
  nested: {
    nestedFoo: "dd",
    nestedBar: {
      nestedFooBar: "dd",
    },
  },
  bar: 1,
});

expectType<MarkPropsAsOptionalRes1>({
  foo: "zxh",
  bar: 1,
});

expectType<MarkPropsAsOptionalRes2>({
  foo: "zxh",
  baz: false,
});

type Flatten<T> = {
  [K in keyof T]: T[K];
};

type MarkPropsAsRequired<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Required<Pick<T, K>>>;

type MarkPropsAsRequiredRes1 = MarkPropsAsRequired<TestStruct, "foo">;

type MarkPropsAsReadonly<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>;

type MarkPropsAsReadonlyRes1 = MarkPropsAsReadonly<TestStruct, "foo">;

export type MarkPropsAsMutable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Mutable<Pick<T, K>>>;

export type MarkPropsAsNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Nullable<Pick<T, K>>>;

export type MarkPropsAsNonNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & NonNullable<Pick<T, K>>>;
