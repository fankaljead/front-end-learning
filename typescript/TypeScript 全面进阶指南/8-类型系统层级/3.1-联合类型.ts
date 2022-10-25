type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2;
type Result8 = "zxh" extends "zxh" | "zzz" | "ddd" ? 1 : 2;
type Result9 = true extends true | false ? 1 : 2;

type Result10 = string extends string | false | number ? 1 : 2;

type Resutl11 = "r" | "g" | "b" extends string ? 1 : 2;
type Result12 = {} | (() => void) | [] extends object ? 1 : 2;

type Result13 = "rgb" extends "rgb" | "22"
  ? "rbg" | "22" extends string
    ? 2
    : 1
  : 0;
