type Result = "zxh" extends string ? 1 : 2;

declare let source: string;
declare let anyType: any;
declare let neverType: never;
anyType = source;
neverType = source;

type Result2 = 1 extends number ? 1 : 2;
type Result3 = true extends boolean ? 1 : 2;
type Result4 = { name: string } extends object ? 1 : 2;
type Result5 = { name: "zxh" } extends object ? 1 : 2;
type Result6 = [] extends object ? 1 : 2;

type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2;
type Result8 = "zxh" extends "zxh" | "hh" ? 1 : 2;
type Result9 = true extends true | false ? 1 : 2;
type Result10 = string extends string | false | number ? 1 : 2;

type TypeChain = never extends "zxh"
  ? "zxh" extends "zxh" | "599"
    ? "zxh" | "599" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;

type VerboseTypeChain = never extends "zxh"
  ? "zxh" extends "zxh" | "budulin"
    ? "zxh" | "budulin" extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8;

type Result46 = any[] extends number[] ? 1 : 2;
type Result47 = any extends number[] ? 1 : 2;
