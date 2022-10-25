type Foo = {
  readonly foo: number;
  ds: bigint;
  bar?: boolean;
  baz?: {
    readonly jes: RegExp;
    bas?: number;
  };
};

type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];
type MutableKeysRes1 = MutableKeys<Foo>;

type ImmutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];
type ImmutableKeysRes1 = ImmutableKeys<Foo>;
