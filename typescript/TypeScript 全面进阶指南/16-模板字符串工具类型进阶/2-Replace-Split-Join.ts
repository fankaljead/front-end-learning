type Replace<
  Str extends string,
  S1 extends string,
  S2 extends string
> = Str extends `${infer Head}${S1}${infer Tail}`
  ? `${Head}${S2}${Replace<Tail, S1, S2>}`
  : Str;

type ReplaceRes1 = Replace<"aa bb cc aaa dd", "aa", "$">;
type ReplaceRes2 = Replace<"aa bb cc aaa dd", "a", "@$">;
type ReplaceRes3 = Replace<"aa bb cc aaa dd", "a", "">;

type Split<
  Str extends string,
  Pat extends string
> = Str extends `${infer Head}${Pat}${infer Tail}`
  ? [Head, ...Split<Tail, Pat>]
  : Str extends Pat
  ? []
  : [Str];

type SplitRes1 = Split<"hello-world-color", "-">;
type SplitRes2 = Split<"hello-world-color", "-">;
type SplitRes3 = Split<"hello-world-color", "-">;
type SplitRes4 = Split<"hello-world|color", "-" | "|">;

type TrimLeft<Str extends string> = Str extends ` ${infer R}`
  ? TrimLeft<R>
  : Str;
type TrimRight<Str extends string> = Str extends `${infer L} `
  ? TrimRight<L>
  : Str;
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>;

type StrLength<T extends string> = Split<Trim<T>, "">["length"];
type StrLengthRes1 = StrLength<"hello world">;

type Join<
  List extends Array<number | string>,
  Delimeter extends string
> = List extends []
  ? ""
  : List extends [number | string]
  ? `${List[0]}`
  : List extends [number | string, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimeter}${Join<Rest, Delimeter>}`
  : string;

type JoinRes1 = Join<[1, 2, 3], "+">;
