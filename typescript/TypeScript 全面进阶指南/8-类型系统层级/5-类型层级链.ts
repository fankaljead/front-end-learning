type TypeChain = never extends "zxh"
  ? "zxh" extends "zxh" | "24"
    ? "zxh" | "24" extends string
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
  ? "zxh" extends "zxh" | 24
    ? "zxh" | "24" extends string
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
