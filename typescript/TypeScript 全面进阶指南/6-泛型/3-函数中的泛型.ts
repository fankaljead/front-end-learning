declare function handle<T extends string | number | object>(input: T): T;

const shouldBeString = handle("zxh");
const shouldBeNumber = handle(24);
const shouldBeObject = handle({ name: "zxh" });

function swap<T extends number | string, U extends number>([start, end]: [
  T,
  U
]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["zxh", 24]);

declare function pick<T extends object, U extends keyof T>(
  objectj: T,
  ...props: Array<U>
): Pick<T, U>;

function handle2<T>(payload: T): Promise<T> {
  return new Promise<T>((res, rej) => {
    res(payload);
  });
}

const handle3 = <T>(input: T): T => input;
const handle4 = <T extends any>(input: T): T => input;

function handlee(input: string): string;
function handlee(input: number): number;
function handlee(input: {}): {};
function handlee(input: string | number | {}): string | number | {} {
  return input;
}
