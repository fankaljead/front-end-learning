type _Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;

type Include<Str extends string, Search extends string> = Str extends ""
  ? Search extends ""
    ? true
    : false
  : _Include<Str, Search>;

type IncludeRes1 = Include<"hell world", "hell">;
type IncludeRes2 = Include<"", "">;
type IncludeRes3 = Include<"", "zxh">;
type IncludeRes4 = Include<"zxh", "">;

type TrimLeft<Str extends string> = Str extends ` ${infer R}`
  ? TrimLeft<R>
  : Str;
type TrimLeftRes1 = TrimLeft<"  hello">;

type TrimRight<Str extends string> = Str extends `${infer L} `
  ? TrimRight<L>
  : Str;
type TrimRightRes1 = TrimRight<"hello  ">;

type Trim<Str extends string> = TrimRight<TrimLeft<Str>>;
type TrimRes = Trim<"  he hell  ">;

type StartWith<
  Str extends string,
  Search extends string
> = Str extends `${Search}${infer R}` ? true : false;

type StartWithRes1 = StartWith<"hello world", "he">;
type StartWithRes2 = StartWith<"hello world", "hhe">;
type StartWithRes3 = StartWith<"hello world", "">;
type StartWithRes4 = StartWith<"", "">;


type EndWith<
  Str extends string,
  Search extends string
> = Str extends `${infer R}${Search}` ? true : false;

type EndWithRes1 = EndWith<"hello world", "rld">;
type EndWithRes2 = EndWith<"hello world", "hhe">;
type EndWithRes3 = EndWith<"hello world", "">;
type EndWithRes4 = EndWith<"", "">;

