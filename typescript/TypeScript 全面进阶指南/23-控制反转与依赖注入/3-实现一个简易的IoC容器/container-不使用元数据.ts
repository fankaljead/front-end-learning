type ClassStructt<T = any> = new (...args: any[]) => T;

class Containerr {
  private static services: Map<string, ClassStructt> = new Map();

  public static set(key: string, value: ClassStructt): void {
    Containerr.services.set(key, value);
  }

  public static get<T = any>(key: string): T | undefined {
    const Cons = Containerr.services.get(key);

    if (!Cons) {
      return undefined;
    }

    const ins = new Cons();

    for (const info of Containerr.propertyRegistry) {
      const [injectKey, serviceKey] = info;

      const [classKey, propKey] = injectKey.split(":");

      if (classKey !== Cons.name) {
        continue;
      }

      const target = Containerr.get(serviceKey);

      if (target) {
        ins[propKey] = target;
      }
    }

    return ins;
  }

  private constructor() {}

  public static propertyRegistry: Map<string, string> = new Map();
}

function Providee(key: string): ClassDecorator {
  return (target) => {
    Containerr.set(key, target as unknown as ClassStructt);
  };
}

function Injectt(key: string): PropertyDecorator {
  return (target, propertyKey) => {
    Containerr.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key
    );
  };
}

@Providee("DriverService")
class Driverr {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}! === \n`);
  }
}

@Providee("Carr")
class Carr {
  @Injectt("DriverService")
  driver!: Driverr;

  run() {
    this.driver.adapt("car");
  }
}

const carr = Containerr.get<Carr>("Carr")!;

carr.run();
