type FunctionType = (...args: any[]) => any;

type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type LastParameter<T extends FunctionType> = T extends (args: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer Q]
    ? Q
    : never
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FuncBaz = (arg1: string, arg2: boolean) => void;
type FuncBas = (arg1: string[], arg2: boolean) => void;
type FuncBax = (arg1: string[], arg2: boolean[]) => void;

type FooLastParameter = LastParameter<FuncFoo>; // number
type BarLastParameter = LastParameter<FuncBar>; // string
type BazLastParameter = LastParameter<FuncBaz>; // boolean
type BasLastParameter = LastParameter<FuncBas>; // boolean
type BaxLastParameter = LastParameter<FuncBax>; // boolean[]

type LastParameterr<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends [...any, infer Q]
  ? Q
  : never;

type FooLastParameterr = LastParameterr<FuncFoo>; // number
type BarLastParameterr = LastParameterr<FuncBar>; // string
type BazLastParameterr = LastParameterr<FuncBaz>; // never
type BasLastParameterr = LastParameterr<FuncBas>; // never
type BaxLastParameterr = LastParameterr<FuncBax>; // never

type Awaitedd<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaitedd<V>
    : never
  : T;

type AwaiteddRes1 = Awaitedd<Promise<Promise<number>>>;
type AwaitedRes1 = Awaited<Promise<Promise<number>>>;
