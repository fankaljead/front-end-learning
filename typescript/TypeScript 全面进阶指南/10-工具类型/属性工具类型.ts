type Partiall<T> = {
  [P in keyof T]+?: T[P];
};
type PartiallRes1 = Partiall<{ name: string; age: number }>;

type Requiredd<T> = {
  [P in keyof T]-?: T[P];
};
type RequireddRes1 = Requiredd<{ name: string; age: number }>;

type Readonlyy<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyyRes1 = Readonlyy<{ name: string; age: number }>;

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
type MutableRes1 = Mutable<ReadonlyyRes1>;

interface Foo {
  optional: string | undefined;
  required: string;
}

const foo1: Foo = {
  required: "1",
};
const foo2: Foo = {
  optional: undefined,
  required: "1",
};

interface Fooo {
  optional: never;
  required: string;
}
const fooo: Fooo = {
  required: "1",
  optional: "",
};
