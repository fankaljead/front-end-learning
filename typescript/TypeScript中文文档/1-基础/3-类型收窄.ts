function padLeft(padding: number | string, input: string): string {
  // 类型保护
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}

function printAll(strs: string | string[] | null) {
  // 真值收窄
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
  }
}

// 真值收窄
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((value) => value * factor);
  }
}

// 等值收窄
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    x.toLowerCase();
  } else {
    console.log(x, y);
  }
}

interface Container {
  value: number | null | undefined;
}
function multiplyValue(container: Container, factor: number) {
  // 将 null 和 undefined 收窄
  if (container.value != null) {
    console.log(container.value);
    container.value *= factor;
  }
}

// in 操作符收窄
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

// instanceof 收窄
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// 赋值语句收窄
let x = Math.random() < 0.5 ? 10 : "hello world";
x = 1;
console.log(x);
x = "goodbye";
console.log(x);
// x = false;
// console.log(x);

// 控制流分析 control flow analysis

// 类型判断式 type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet: Fish = { swim: () => {} };
if (isFish(pet)) {
  pet.swim();
}

// 可辩别联合
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  sideLength: number;
}
type Shapee = Circle | Square;
function getArea2(shape: Shapee): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
function getArea3(shape: Shapee): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// never 类型
// 穷尽检查
interface Triangle {
  kind: "triangle";
  sideLength: number;
  height: number;
}
type Shapeee = Circle | Square | Triangle;

function getArea4(shape: Shapeee): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return (shape.sideLength * shape.height) / 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
