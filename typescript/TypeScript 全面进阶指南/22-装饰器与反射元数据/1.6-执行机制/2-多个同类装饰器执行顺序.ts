function Fco(): MethodDecorator {
  console.log("foo in");
  return (target, propertyKey, descriptor) => {
    console.log("foo out");
  };
}

function Bcx(): MethodDecorator {
  console.log("bar in");
  return (target, propertyKey, descriptor) => {
    console.log("bar out");
  };
}

const Bcz: MethodDecorator = () => {
  console.log("baz apply");
};

class User {
  @Fco()
  @Bcx()
  @Bcz
  method() {}
}
