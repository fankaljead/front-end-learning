class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(value: string) {
    this.prop = `${value}+A`;
  }
}

class Foo2 {
  constructor(public arg1: string, private arg2: boolean) {}
}
const foo22 = new Foo2("zxh", true);

class Base {
  printWithLove() {}
}

class Derived extends Base {
  override printWithLove(): void {}
}

// 抽象类
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}

const absFoo: AbsFoo = new AbsFoo();
declare const absFoo2: AbsFoo;
absFoo2.absGetter;

class FOOOOO implements AbsFoo {
  absProp: string = "zxh";
  get absGetter(): string {
    return "zxh";
  }
  absMethod(name: string): string {
    return name;
  }
}

class Utils {
  private constructor() {
    this.foo = "zxh";
  }
  static getInfo() {
    return {
      name: "zxh",
    };
  }
  foo: string;
}
declare const u: Utils;
