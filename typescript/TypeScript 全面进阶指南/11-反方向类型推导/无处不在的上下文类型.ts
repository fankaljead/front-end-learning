window.onerror = (event, source, line, col, err) => {};

type CustomHandler = (name: string, age: number) => boolean;

const handler: CustomHandler = (args, arg2) => true;

declare const struct: {
  handler: CustomHandler;
};
struct.handler = (name, age) => {};

declare let func: (raw: number) => (input: string) => any;

func = (row) => {
  return (input) => {};
};

class Foo {
  foo!: number;
}
class Bar extends Foo {
  bar!: number;
}

let f1: { (input: Foo): void } | { (input: Bar): void };
f1 = (input) => {};

let f2: { (input: Foo | Bar): void };
f2 = (input) => {};

let f3:
  | { (raw: number): (input: Foo) => void }
  | { (raw: number): (input: Bar) => void };
f3 = (row) => (input) => {};
