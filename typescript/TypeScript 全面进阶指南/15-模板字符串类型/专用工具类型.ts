type Job = "Docor" | "Joker";
interface Foo {
  name: string;
  age: number;
  job: Job;
}

type Heavy<T extends string> = `${Uppercase<T>}`;
type Respect<T extends string> = `${Capitalize<T>}`;

type HeavyName = Heavy<"zxh">;
type RespectName = Respect<"zxh">;

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified${Capitalize<string & K>}`]: T[K];
};
type CopyWithRenameFoo = CopyWithRename<Foo>;
