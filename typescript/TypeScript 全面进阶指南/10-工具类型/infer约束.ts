type FirstArrayType<T extends any[]> = T extends [infer P, ...any[]]
  ? P
  : never;

type Arr = [number, boolean, string];
type FirstArrayTypeRes1 = FirstArrayType<Arr>;

type FirstArrayTypee<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string
    ? P
    : never
  : never;
type FirstArrayTypeeRes2 = FirstArrayTypee<Arr>;
type FirstArrayTypeeRes3 = FirstArrayTypee<[string, ...Arr]>;

type FirstArrayTypeee<T extends any[]> = T extends [
  infer P extends string,
  ...any[]
]
  ? P
  : never;

type FirstArrayTypeeeRes2 = FirstArrayTypeee<Arr>;
type FirstArrayTypeeeRes3 = FirstArrayTypeee<[string, ...Arr]>;
