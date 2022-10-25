import { A } from "./modA";
import { B } from "./modB";

class C {
  a: A;
  b: B;
  constructor() {
    this.a = new A();
    this.b = new B();
  }
}

class Factory {
  static produce(key: string) {}
}

class F {
  constructor() {
    // @ts-expect-error
    // this.d = Container.get(D);
    this.d = Factory.produce("D");
  }
}
