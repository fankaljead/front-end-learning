type PickByValueType<T extends object, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K];
};

type Foo = {
  foo: number;
  readonly bar: string;
  basz:number
};
type PickByValueTypeRes1 = PickByValueType<Foo, number>;
