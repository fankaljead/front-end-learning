type FunctionType = (...args: any) => any;

type Parameterss<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;
type ParameterssRes1 = Parameters<(a: number, b: string) => number>;
type ParameterssRes2 = Parameters<(a: number, b: string, c: boolean) => number>;

type ReturnTypee<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;
type ReturnTypeRes1 = ReturnType<(a: number, b: string) => boolean>;
type ReturnTypeRes2 = ReturnType<(a: number, b: string) => [string, boolean]>;

type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;
type FirstParameterRes1 = FirstParameter<
  (a: number, b: string, c: boolean) => number
>;
type FuncFoo = (arg: number) => void;
type FirstParameterRes2 = FirstParameter<FuncFoo>;

type ClassType = abstract new (...args: any) => any;

type ConstructorParameterss<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;
type ConstructorParameterssRes1 = ConstructorParameters<Promise<number>>;

type InstanceTypee<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

interface ClassTypee<TInstanceTYpe = any> {
  new (...args: any[]): TInstanceTYpe;
}
