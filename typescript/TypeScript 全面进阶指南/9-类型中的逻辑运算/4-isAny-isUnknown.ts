type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverRes1 = IsNever<never>;
type IsNeverRes2 = IsNever<boolean>;

type IsAny<T> = 0 extends 1 & T ? true : false;

type IsAnyRes1 = IsAny<boolean>;
type IsAnyRes2 = IsAny<{}>;
type IsAnyRes3 = IsAny<any>;
type IsAnyRes4 = IsAny<1>;

type Tmp1 = 1 & (0 | 1);
type Tmp2 = 1 & number;
type Tmp3 = 1 & 1;

type Tmp4 = 1 & any;

type Tmp5 = 1 & unknown;

type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;

type IsUnknownn<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;

type IsUnknownnRes1 = IsUnknownn<boolean>;
type IsUnknownnRes2 = IsUnknownn<unknown>;
type IsUnknownnRes3 = IsUnknownn<any>;
type IsUnknownnRes4 = IsUnknownn<Fun<string>>;
type c = unknown;
type IsUnknownnRes5 = IsUnknownn<c>;
type Fun<T> = <T>(t: T) => unknown;

type TT<T> = 1 & T extends 1 & T ? true : false;
type TTRes1 = TT<1>;
type TTRes2 = TT<never>;
