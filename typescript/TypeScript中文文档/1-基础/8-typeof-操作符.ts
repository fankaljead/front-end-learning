let s = "hhhh";
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
function sum(x: number, y: number): number {
  return x + y;
}
type sumK = ReturnType<typeof sum>;

// 限制
function msgbox(s: string): string {
  return s;
}
// let shouldContinue: typeof msgbox("Are you sure you want to continue?");
let shouldContinue: ReturnType<typeof msgbox>;

// 对对象使用 typeof
const person = { name: "John", age: 30 };
type John = typeof person;

// 对函数使用 typeof
function identity<T>(arg: T): T {
  return arg;
}
type Identity = typeof identity;

// 对 enum 使用 typeof
enum Status {
  OK,
  ERROR,
}
type StatusType = typeof Status;
const a: StatusType = { OK: 1, ERROR: 2 };
type r = keyof typeof Status; // "OK" | "ERROR"
