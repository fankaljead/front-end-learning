import "reflect-metadata";

const requiredMetadataKeys = Symbol("requiredKeys");

function Required(): PropertyDecorator {
  return (target, prop) => {
    // Reflect.defineMetadata("required", true, target, prop);

    const existRequiredKesy: string[] =
      Reflect.getMetadata(requiredMetadataKeys, target) ?? [];

    Reflect.defineMetadata(
      requiredMetadataKeys,
      [...existRequiredKesy, prop],
      target
    );
  };
}

enum TypeValidation {
  String = "string",
  Number = "number",
  Boolean = "boolean",
}

const validationMetadataKey = Symbol("expectedType");

function ValueType(type: TypeValidation): PropertyDecorator {
  return (target, prop) => {
    Reflect.defineMetadata(validationMetadataKey, type, target, prop);
  };
}

class User {
  @Required()
  name!: string;

  @ValueType(TypeValidation.Number)
  age!: number;
}

function validator(entity: any) {
  const clsName = entity.constructor.name;
  const messages: string[] = [];

  const requiredKeys: string[] = Reflect.getMetadata(
    requiredMetadataKeys,
    entity
  );

  const existKeys = Reflect.ownKeys(entity);

  for (const key of requiredKeys) {
    if (!existKeys.includes(key)) {
      messages.push(`${clsName}.${key} should by required.`);
    }
  }

  for (const key of existKeys) {
    const expectedType: string = Reflect.getMetadata(
      validationMetadataKey,
      entity,
      key
    );

    if (!expectedType) {
      continue;
    }

    // @ts-expect-error
    if (Object.values(TypeValidation).includes(expectedType)) {
      const actualType = typeof entity[key];

      if (actualType !== expectedType) {
        messages.push(
          `expect ${entity.constructor.name}.${String(
            key
          )} to be ${expectedType}, but got ${actualType}`
        );
      }
    }
  }

  return messages;
}

const user = new User();
// @ts-expect-error
user.age = "18";

console.log(validator(user));
