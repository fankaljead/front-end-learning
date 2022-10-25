type Concurrence<A, B> = A | B;

type Intersection<A, B> = A extends B ? A : never;

type Difference<A, B> = A extends B ? never : A;

type Complement<A, B extends A> = Difference<A, B>;
type ComplementRes1 = Complement<Bar, Exclude<Bar, "foo">>;
type ComplementRes2 = Complement<"foo" | "bar", "bar">;

// 对应对象属性名的版本
type PlainObjectType = Record<string, any>;

type Foo = {
  foo: string;
  bar: number;
  baz: {
    bazFoo: boolean;
    bazBar: {
      jes: symbol;
    };
  };
};

type Bar = {
  shoe: string;
  bar: number;
  baz: {
    bazFoo: boolean;
    bar: string;
    bazBar: {
      nos: symbol;
    };
  };
};

// 属性名并集
type ObjectKeysConcurrence<
  T extends PlainObjectType,
  U extends PlainObjectType
> = keyof T | keyof U;
type ObjectKeysConcurrenceRes1 = ObjectKeysConcurrence<Foo, Bar>;

// 属性名交集
type ObjectKeysIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Intersection<keyof T, keyof U>;
type ObjectKeysIntersectionRes1 = ObjectKeysIntersection<Foo, Bar>;

// 属性名差集
type ObjectKeysDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Difference<keyof T, keyof U>;
type ObjectKeysDifferenceRes1 = ObjectKeysDifference<Foo, Bar>;

// 属性名补集
type ObjectKeysComplement<T extends U, U extends PlainObjectType> = Complement<
  keyof T,
  keyof U
>;
type ExcludeRes1 = Exclude<Bar, "bar">;
type ObjectKeysComplementRes1 = ObjectKeysComplement<Bar, Exclude<Bar, "bar">>;

type ObjectIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysIntersection<T, U>>;
type ObjectIntersectionRes1 = ObjectIntersection<Foo, Bar>;

type ObjectDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysDifference<T, U>>;
type ObjectDifferenceRes1 = ObjectDifference<Foo, Bar>;

type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysComplement<T, U>
>;
type ObjectComplementRes1 = ObjectComplement<Bar, Exclude<Bar, "bar">>;

type Merge<
  T extends PlainObjectType,
  U extends PlainObjectType
> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;

type Assign<
  T extends PlainObjectType,
  U extends PlainObjectType
> = ObjectDifference<T, U> & ObjectIntersection<T, U> & ObjectDifference<U, T>;

type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
> = ObjectDifference<T, U> & ObjectIntersection<U, T>;
