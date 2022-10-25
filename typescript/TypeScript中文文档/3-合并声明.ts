// 合并声明 delaration merging
// “声明合并”是指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并；不局限于两个声明
// 合并接口
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 2 };

// 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。 同时需要注意，当接口A与后来的接口A合并时，后面的接口具有更高的优先级。
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
interface Animal {
  name: string;
}
interface Sheep extends Animal {
  mee(): void;
}
interface Dog extends Animal {
  bark(): void;
}
interface Cat extends Animal {
  meow(): void;
}

let c: Cloner;
c.clone({ name: "Tommy" }); // ok

interface Documentt {
  createElement(tagName: any): Element;
}
interface Documentt {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Documentt {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}
let dod: Documentt;
dod.createElement("div");

// 合并命名空间
namespace Animalss {
  export class Zebra {}
}

namespace Animalss {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}
// 等同于
namespace Animalsss {
  export interface Legged {
    numberOfLegs: number;
  }

  export class Zebra {}
  export class Dog {}
}

// 合并命名空间和类
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {}
  export function count(): number {
    return 1;
  }
}
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));

// 命名空间可以用来扩展枚举型
enum Color {
  red = 1,
  green = 2,
  blue = 4,
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    } else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName == "magenta") {
      return Color.red + Color.blue;
    } else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}