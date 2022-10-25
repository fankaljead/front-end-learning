type Recordd<K extends keyof any, T> = {
  [P in K]: T;
};
type RecorddRes1 = Recordd<string, any>;
type RecorddRes2 = Recordd<string, string>;
type RecorddRes3 = Recordd<string | number, string>;
// 使用下面两种来代替 object
type RecorddRes4 = Recordd<string, unknown>;
type RecorddRes5 = Recordd<string, any>;

type Dictionaryy<T> = {
  [index: string]: T;
};
type DictionaryyRes1 = Dictionaryy<string>;

type NumericDictionaryy<T> = {
  [index: number]: T;
};
type NumericDictionaryyRes1 = NumericDictionaryy<string>;

type Pickk<T, K extends keyof T> = {
  [P in K]: T[P];
};

type JobUnionType = "doctor" | "teacher" | "student";
interface Foo {
  name: string;
  age: number;
  job: JobUnionType;
}

type PickkRes1 = Pickk<Foo, "age">;
type PickkRes2 = Pickk<Foo, "age" | "job">;

type Omitt<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Tmp1 = Exclude<1, 2>;
type Tmp2 = Exclude<1 | 2, 2>;
type Tmp3 = Exclude<1 | 2 | 3, 2 | 3>;
type Tmp4 = Exclude<1 | 2 | 3, 2 | 4>;

type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>;
type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare function combineSpread<T1, T2>(
  obj: T1,
  otherObj: T2,
  rest: Omit1<T1, keyof T2>
): void;

type Point3d = {
  x: number;
  y: number;
  z: number;
};

declare const p1: Point3d;

combineSpread(p1, { x: 1 }, { z: 2 });
