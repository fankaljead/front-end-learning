function foo(name: string): number {
  return name.length;
}

const foo2 = (name: string): number => {
  return name.length;
};

const foo3: (name: string) => number = function (name) {
  return name.length;
};

const foo4: (name: string) => number = (name) => {
  return name.length;
};

type FuncFoo = (name: string) => number;
const foo5: FuncFoo = (name) => {
  return name.length;
};

interface FuncFooStruct {
  (name: string): number;
}

const foo6: FuncFooStruct = (name) => {
  return name.length;
};

function bar(): undefined {
  return;
}

// 可选参数与 rest 参数
function fooo1(name: string, age?: number): number {
  const inputAge = age || 18;
  return name.length + inputAge;
}

function fooo2(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

function foooo(name: string, ...res: [number, boolean]) {}

// 重载
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 200;
  }
}

const res1 = func(599);
const res2 = func(599, true);
const res3 = func(599, false);

// 异步函数、Generator 函数等类型签名
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asynccGenFunc(): AsyncGenerator<void> {}
