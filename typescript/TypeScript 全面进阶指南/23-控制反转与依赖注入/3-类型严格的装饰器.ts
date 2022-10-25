type ClassStruct<T = any> = new (...args: any[]) => T;

type RestrictedClassDecorator<TClass extends object> = (
  target: ClassStruct<TClass>
) => ClassStruct<TClass> | void;

function OnlyFoo(): RestrictedClassDecorator<Foo> {
  return (target: ClassStruct<Foo>) => {};
}

function OnlyBar(): RestrictedClassDecorator<Bar> {
  return (target: ClassStruct<Bar>) => {};
}

type AsyncFunc = (...args: any[]) => Promise<any>;

type OnlyAsyncMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncFunc>
) => void;

function OnlyAsyncFunc(): OnlyAsyncMethodDecorator {
  return (target, propKey, descriptor) => {};
}

class Foo {
  // 类型“TypedPropertyDescriptor<() => void>”的参数不能赋给类型“TypedPropertyDescriptor<AsyncFunc>”的参数。
  @OnlyAsyncFunc()
  handler() {}

  @OnlyAsyncFunc()
  async asyncHandler() {}
}
