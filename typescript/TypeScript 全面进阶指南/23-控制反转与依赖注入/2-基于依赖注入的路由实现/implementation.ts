import "reflect-metadata";

export enum METADATA_KEY {
  METHOD = "ioc:method",
  PATH = "ioc:path",
  MIDDLEWARE = "ioc:middleware",
}

export enum REQUEST_METHOD {
  GET = "ioc:get",
  POST = "ioc:post",
}

export const methodDecoratorFactory = (method: string) => {
  return (path: string): MethodDecorator => {
    return (_target, _key, decriptor) => {
      Reflect.defineMetadata(METADATA_KEY.METHOD, method, decriptor.value!);
      Reflect.defineMetadata(METADATA_KEY.PATH, path, decriptor.value!);
    };
  };
};

export const GET = methodDecoratorFactory(REQUEST_METHOD.GET);
export const POST = methodDecoratorFactory(REQUEST_METHOD.POST);

export const Controller = (path?: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY.PATH, path ?? "", target);
  };
};

type AsyncFunc = (...args: any[]) => Promise<any>;

interface ICollected {
  path: string;
  requestMethod: string;
  requestHandler: AsyncFunc;
}

export const routerFactory = <T extends object>(ins: T): ICollected[] => {
  const prototype = Reflect.getPrototypeOf(ins) as any;

  const rootPath = <string>(
    Reflect.getMetadata(METADATA_KEY.PATH, prototype.constructor)
  );

  const methods = <string[]>(
    Reflect.ownKeys(prototype).filter((item) => item !== "constructor")
  );

  const collected = methods.map((m) => {
    const requestHandler = prototype[m];
    const path = <string>Reflect.getMetadata(METADATA_KEY.PATH, requestHandler);

    const requestMethod = <string>(
      Reflect.getMetadata(METADATA_KEY.METHOD, requestHandler).replace(
        "ioc:",
        ""
      )
    );

    return {
      path: `${rootPath}${path}`,
      requestMethod,
      requestHandler,
    };
  });

  return collected;
};
