let unknownVar: unknown;
(unknownVar as { foo: () => {} }).foo();

const str: string = "zxh";
(str as any).func().foo().prop;
// @ts-expect-error
(<number>str).toFixed(2);

function foo(union: string | number) {
  if ((union as string).includes("zxh")) {
  }
  if ((union as number).toFixed() === "22") {
  }
}

interface IFoo {
  name: string;
}

declare const obj: {
  fooo: IFoo;
};

const { fooo = {} as IFoo } = obj;

// 双重断言
const strr: string = "zxh";
(strr as { handler: () => {} }).handler();
(strr as unknown as { handler: () => {} }).handler();
(<{ handler: () => {} }>(<unknown>str)).handler();

declare const fooooo: {
  func?: () => {
    prop?: number | null;
  };
};
fooooo.func().prop?.toExponential(2);

// 非空断言
fooooo.func!().prop!.toFixed();

interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
const objj: IStruct = {};
const objjj = <IStruct>{
  bar: {
    baz: {},
  },
};
