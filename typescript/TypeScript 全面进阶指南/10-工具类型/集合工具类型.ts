// 交集
type Extractt<T, U> = T extends U ? T : never;
type ExtracttRes1 = Extractt<1 | 2 | 3, 1 | 2 | 4>;

// 差集
type Excludee<T, U> = T extends U ? never : T;

type SetA = 1 | 2 | 3 | 5;
type SetB = 0 | 1 | 2 | 4;

type AExcludeB = Exclude<SetA, SetB>;
type BExcludeA = Exclude<SetB, SetA>;

// 并集
type Concrrencee<A, B> = A | B;
type ConcrrenceeRes1 = Concrrencee<SetA, SetB>;

// 交集
type Intersectionn<A, B> = A extends B ? A : never;
type IntersectionnRes1 = Intersectionn<SetA, SetB>;

// 差集
type Differencee<A, B> = A extends B ? never : A;
type DifferenceeRes1 = Differencee<SetA, SetB>;

// 补集
type Complementt<A, B extends A> = Differencee<A, B>;
type ComplementtRes1 = Complementt<SetA, 1 | 2>;

type NonNullablee<T> = T extends null | undefined ? never : T;
type _NonNullablee<T> = Differencee<T, null | undefined>;
