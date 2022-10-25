function HajackSetter(val: string): MethodDecorator {
  return (target, methodIdentifier, descriptor: any) => {
    const originalSetter = descriptor.set;
    descriptor.set = function (newValue: string) {
      const composed = `Raw: ${newValue}, Actual: ${val}-${newValue}`;
      originalSetter.call(this, composed);
      console.log(`HijackSetter: ${composed}`);
    };

    descriptor.get = function () {
      return val;
    };
  };
}

class Baz {
  _value!: string;

  get value() {
    return this._value;
  }

  @HajackSetter("Z_X_H")
  set value(input: string) {
    this._value = input;
  }
}

const baz = new Baz();
baz.value = "zxh";
console.log(baz.value);
