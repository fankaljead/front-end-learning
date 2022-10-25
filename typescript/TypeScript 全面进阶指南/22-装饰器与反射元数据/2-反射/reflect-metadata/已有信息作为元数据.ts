import "reflect-metadata";

function DefineType(type: Object) {
  return Reflect.metadata("design:type", type);
}

function DefineParamTypes(...types: Object[]) {
  return Reflect.metadata("desing:paramtypes", types);
}

function DefineReturnTypes(type: Object) {
  return Reflect.metadata("design:returntype", type);
}

@DefineParamTypes(String, Number)
class Foo {
  @DefineType(String)
  get name() {
    return "zxh";
  }

  @DefineType(Function)
  @DefineParamTypes(Number, Number)
  @DefineReturnTypes(Number)
  add(source: number, input: number): number {
    return source + input;
  }
}

const foo = new Foo();

const paramTypes = Reflect.getMetadata("desing:paramtypes", foo, "add");

const returnTypes = Reflect.getMetadata("design:returntype", foo, "add");

const type = Reflect.getMetadata("design:type", foo, "name");

console.log(paramTypes, returnTypes, type);

class Bar {
  @DefineType(Foo)
  prop!: Foo;
}

const bar = new Bar();

const type2 = Reflect.getMetadata("design:type", bar, "prop");

console.log(type2);

