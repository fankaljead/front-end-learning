declare var f1: () => void;

declare interface Foo {
  prop: string;
}

declare function foo(input: Foo): Foo;

declare class Foo {}

declare let otherProp: Foo["prop"];

// × 不允许在环境上下文中使用初始值
declare let result1 = foo();

// √ Foo
declare let result: ReturnType<typeof foo>;

// 源代码
const handler = (input: string): boolean => {
  return input.length > 5;
};

interface Foo {
  name: string;
  age: number;
}

const foof: Foo = {
  name: "zxh",
  age: 18,
  prop: "",
};

class FooCls {
  prop!: string;
}
