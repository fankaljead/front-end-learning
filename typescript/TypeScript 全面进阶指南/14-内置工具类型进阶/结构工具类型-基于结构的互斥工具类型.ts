import { expectType } from "tsd";
interface VIP {
  vipExpires: number;
}

interface CommonUser {
  promotionUsed: boolean;
}

interface Visitor<RefererType> {
  refererType: RefererType;
}

type User = VIP | CommonUser;

type Flatten<T> = {
  // [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K];
  [K in keyof T]: T[K];
};

type FlattenRes1 = Flatten<{
  foo: string;
  age: number;
  baz: { fooo: string; baz: { age: number } };
}>;

const user: User = {
  vipExpires: 599,
  promotionUsed: false,
};

type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

type WithoutRes1 = Without<VIP, CommonUser>;
type WithoutRes2 = Without<CommonUser, VIP>;
type WithoutRes3 = Without<
  { foo: string; bar: number; baz: boolean },
  { foo: string; bar: boolean }
>;

type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type XORRes1 = Flatten<XOR<VIP, CommonUser>>;

type XORUser = XOR<VIP, CommonUser>;

type Tmp1 = Flatten<Without<VIP, CommonUser>>;
type Tmp2 = Flatten<Tmp1 & CommonUser>;
type Tmp3 = Flatten<Tmp1 | CommonUser>;

expectType<XORUser>({
  promotionUsed: false,
});
expectType<XORUser>({
  vipExpires: 0,
});
expectType<XORUser>({
  promotionUsed: false,
  vipExpires: 0,
});

type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;

expectType<XORStruct>({});
expectType<XORStruct>({
  foo: "s",
});
expectType<XORStruct>({
  bar: 1,
});
expectType<XORStruct>({
  foo: "s",
  bar: 1,
});

type TEET = { foo: string } extends { foo: number } ? true : false;
