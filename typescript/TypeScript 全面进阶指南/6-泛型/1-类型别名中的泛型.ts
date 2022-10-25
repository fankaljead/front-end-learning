type PPartial<T> = {
  [K in keyof T]?: T[K];
};
interface IFoo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type PartialFoo = PPartial<IFoo>;
type PartiallFoo = Partial<IFoo>;

type IsEqual<T> = T extends true ? 1 : 2;
type A = IsEqual<true>;

type Factory<T = boolean> = T | number | string;
const foo: Factory = false;

type ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 20001
  | 10001
  ? "success"
  : "failure";

type Res1 = ResStatus<10001>;
type Res2 = ResStatus<10201>;
type Res3 = ResStatus;

type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;
type Result1 = Conditional<"zxh", string, "passed", "rejected">;
type Result2 = Conditional<"zxh", boolean, "passed", "rejected">;

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;
