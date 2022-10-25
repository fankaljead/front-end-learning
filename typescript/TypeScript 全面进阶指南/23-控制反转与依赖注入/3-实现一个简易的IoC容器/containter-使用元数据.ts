import "reflect-metadata";

type ClassStruct<T = any> = new (...args: any[]) => T;
type ServiceKey<T = any> = string | ClassStruct<T> | Function;

class Container {
  private static services: Map<ServiceKey, ClassStruct> = new Map();

  public static set(key: ServiceKey, value: ClassStruct): void {
    Container.services.set(key, value);
  }

  public static get<T = any>(key: ServiceKey): T | undefined {
    const Cons = Container.services.get(key);

    if (!Cons) {
      return undefined;
    }

    const ins = new Cons();

    for (const info of Container.propertyRegistry) {
      const [injectKey, serviceKey] = info;

      const [classKey, propKey] = injectKey.split(":");

      if (classKey !== Cons.name) {
        continue;
      }

      const target = Container.get(serviceKey);

      if (target) {
        ins[propKey] = target;
      }
    }

    return ins;
  }

  private constructor() {}

  public static propertyRegistry: Map<string, string> = new Map();
}

function Provide(key?: string): ClassDecorator {
  return (target) => {
    Container.set(key ?? target.name, target as unknown as ClassStruct);
    Container.set(target, target as unknown as ClassStruct);
  };
}

function Inject(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata("design:type", target, propertyKey)
    );
  };
}

@Provide("DriverService")
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}! === \n`);
  }
}

@Provide()
class Fuel {
  fill(consumer: string) {
    console.log(`\n === 燃料已填充完毕 ${consumer} === \n`);
  }
}

@Provide()
class Car {
  @Inject()
  driver!: Driver;

  @Inject()
  fule!: Fuel;

  run() {
    this.fule.fill("Car");
    this.driver.adapt("car");
  }
}

const car = Container.get<Car>("Car")!;

car.run();
