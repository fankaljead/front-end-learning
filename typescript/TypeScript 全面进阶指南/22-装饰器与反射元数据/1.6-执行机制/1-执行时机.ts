function Cls(): ClassDecorator {
  return (target: any) => {};
}

function Method(): MethodDecorator {
  return (target) => {};
}

function Prop(): PropertyDecorator {
  return (target) => {};
}

function Param(): ParameterDecorator {
  return (target) => {};
}

@Cls()
class Fbb {
  constructor(@Param() init?: string) {}

  @Prop()
  prop: string = "zxh";

  @Prop()
  static staticProp: string = "static zxh";

  @Method()
  handler(@Param() input: string) {}

  @Method()
  static staticHandler(@Param() input: string) {}
}

function Deco(identifier: string): any {
  console.log(`${identifier} 执行`);
  return () => {
    console.log(`${identifier} 应用`);
  };
}

@Deco("类装饰器")
class Fxx {
  constructor(@Deco("构造函数参数装饰器") name: string) {}

  @Deco("实例属性装饰器")
  prop?: number;

  @Deco("实例方法装饰器")
  handler(@Deco("实例方法参数装饰器") arg: any) {}
}

const fxx = new Fxx("zxh");
