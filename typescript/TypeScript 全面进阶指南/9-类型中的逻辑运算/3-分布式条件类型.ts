type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 通过泛型参数传入
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;
// 直接传入
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// 无包裹
type Res3 = Naked<number | boolean>;
// 包裹泛型参数
type Res4 = Wrapped<number | boolean>;

type NoDistribute<T> = T & {};
type NoDistributeWrapped<T> = NoDistribute<T> extends [boolean] ? "Y" : "N";
type NoDistributeWrappedResult = NoDistributeWrapped<number | boolean>;

type CompareUnion<T, U> = [T] extends [U] ? true : false;
type CompareUnionResult1 = CompareUnion<1 | 2, 1 | 2 | 3>;
type CompareUnionResult2 = CompareUnion<1 | 2, 1>;
type CompareUnionResult3 = 1 | 2 extends 2 ? true : false;

type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverRes1 = IsNever<never>;
type IsNeverRes2 = IsNever<"zxh">;

type IsNeverr<T> = T extends never ? true : false;
type IsNeverrRes1 = IsNeverr<never>;
type IsNeverrRes2 = IsNeverr<"zxh">;

type Tmp1 = any extends string ? 1 : 2;

type Tmp2<T> = T extends string ? 1 : 2;
type Tmp2Res = Tmp2<any>;

type Special1 = any extends any ? 1 : 2;
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>;

type Tmp3 = never extends string ? 1 : 2;
type Tmp4<T> = T extends string ? 1 : 2;
type Tmp4Res = Tmp4<never>;

type Special3 = never extends never ? 1 : 2;
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>;

type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>;
