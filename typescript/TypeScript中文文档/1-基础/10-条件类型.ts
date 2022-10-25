interface Animal {
  live(): void;
}
interface Dog extends Animal {
  bark(): void;
}

type E1 = Dog extends Animal ? number : string; // number
type E2 = RegExp extends Animal ? number : string; // string

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
type NameOrId<T extends number | string> = T extends number ? number : string;
function ccreateLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
  // return nameOrId;
}
ccreateLabel(Number(12));
ccreateLabel("12");

// 条件类型约束
// type MessageOf<T> = T["message"];
type MessageOf<T extends { message: string }> = T["message"];
interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}
type EmailMessageContents = MessageOf<Email>;
type MemssageOF<T> = T extends { message: string } ? T["message"] : never;
type DogMessageContents = MemssageOF<Dog>;

type Flatten<T> = T extends any[] ? T[number] : T;
type str = Flatten<string[]>;
type Num = Flatten<number | string[]>;

// 在条件类型里推断
type Flatteen<Type> = Type extends Array<infer Item> ? Item : Type;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
type Numm = GetReturnType<() => number>;
type Strr = GetReturnType<() => string>;
type Bools = GetReturnType<() => boolean[]>;
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
type T1 = ReturnType<typeof stringOrNum>;
type T2 = GetReturnType<typeof stringOrNum>;
type Sum = (x: number, y: number) => number;
type T3 = GetReturnType<Sum>;

// 分发条件类型
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumber = ToArray<string | number>;

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StrArrOrNumberNonDist = ToArrayNonDist<string | number>;
