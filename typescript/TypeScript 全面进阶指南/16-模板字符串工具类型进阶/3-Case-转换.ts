type SnakeCase2CamelCase<S extends string> =
  S extends `${infer Head}${"_"}${infer Rest}`
    ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
    : S;
type SnakeCase2CamelCaseRes1 = SnakeCase2CamelCase<"foo_bar_baz">;

type Delimeter2CamelCase<
  S extends string,
  Delimeter extends string
> = S extends `${infer Head}${Delimeter}${infer Rest}`
  ? `${Head}${Delimeter2CamelCase<Capitalize<Rest>, Delimeter>}`
  : S;
type Delimeter2CamelCaseRes1 = Delimeter2CamelCase<"foo_bar_baz", "_">;
type Delimeter2CamelCaseRes2 = Delimeter2CamelCase<"foo+bar+baz", "+">;
type Delimeter2CamelCaseRes3 = Delimeter2CamelCase<"foo~bar~baz", "~">;

type WordDelimeter = "-" | "_" | " ";
type DelimeterCase2CamelCaseAuto<S extends string> =
  S extends `${infer Head}${infer Delimeter}${infer Rest}`
    ? Delimeter extends WordDelimeter
      ? `${Head}${DelimeterCase2CamelCaseAuto<Capitalize<Rest>>}`
      : S
    : S;

export type PlainObjectType = Record<string, any>;

export type WordSeparators = "-" | "_" | " ";

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

type CapitalizeStringArray<Words extends readonly any[], Prev> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? First extends undefined
    ? ""
    : First extends ""
    ? CapitalizeStringArray<Rest, Prev>
    : `${Prev extends "" ? First : Capitalize<First>}${CapitalizeStringArray<
        Rest,
        First
      >}`
  : "";

type CamelCaseStringArray<Words extends readonly string[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? Uncapitalize<`${First}${CapitalizeStringArray<Rest, First>}`>
  : never;

export type CamelCase<K extends string> = CamelCaseStringArray<
  Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
>;
