function AddMethod(): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceMethod = () => {
      console.log("lets add a new instance method");
    };
    target.newStaticMethod = () => {
      console.log("lets add a new static method");
    };
  };
}

function AddProperty(value: string): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceProperty = value;
    target.newStaticProperty = `static ${value}`;
  };
}

@AddProperty("zxh")
@AddMethod()
class Foo {
  a = 1;
}

const foo: any = new Foo();
foo.newInstanceMethod();
(<any>Foo).newStaticMethod();

console.log(foo.newInstanceProperty);
console.log((<any>Foo).newStaticProperty);

const OverrideBar = (target: any) => {
  return class extends target {
    num = 1;
    print() {}
    overridedPrint() {
      console.log("this is overrided bar");
    }
  };
};

@OverrideBar
class Bar {
  print() {
    console.log("this is bar");
  }
}

const bar = new Bar();
bar.print();
(<any>new Bar()).overridedPrint();
console.log((<any>new Bar()).num);
