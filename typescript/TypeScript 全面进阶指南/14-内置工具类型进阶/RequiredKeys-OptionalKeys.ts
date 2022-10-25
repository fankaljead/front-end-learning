type Tmp1 = {} extends { prop: number } ? "Y" : "N";
type Tmp2 = {} extends { prop?: number } ? "Y" : "N";

type Foo = {
  readonly foo: number;
  ds: bigint;
  bar?: boolean;
  baz?: {
    readonly jes: RegExp;
    bas?: number;
  };
};

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
type RequiredKeysRes = RequiredKeys<Foo>;

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
type OptionalKeysRes = OptionalKeys<Foo>;
