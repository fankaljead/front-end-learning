type Factory<T = boolean> = T | number | string;

const foo: Factory = false;

type ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? "success"
  : "failure";

type Res1 = ResStatus<10000>;
type Res2 = ResStatus<20002>;
type Res3 = ResStatus<"zxh">;
type Res4 = ResStatus;
