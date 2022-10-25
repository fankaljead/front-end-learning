type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<"zxh">;
type B = IsEqual<true>;
type C = IsEqual<null>;
