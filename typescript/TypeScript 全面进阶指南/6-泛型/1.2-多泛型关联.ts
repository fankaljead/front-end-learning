type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

type Result1 = Conditional<"zxh", string, "passed", "rejected">;
type Result2 = Conditional<"zxh", boolean, "passed", "rejected">;

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

type PI1 = ProcessInput<string>;
