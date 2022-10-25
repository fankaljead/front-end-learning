// 声明式
function sum(x: number, y: number): number {
  return x + y;
}
// 表达式
const mySum = function (x: number, y: number): number {
  return x + y;
};

const mySum2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};

// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  }
  return firstName;
}

// 默认参数
function buildName2(firstName: string, lastName: string = "Smith") {
  return firstName + " " + lastName;
}

// 剩余参数
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// 重载
function reverse2(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

// console.log(reverse(123));
// console.log(reverse("123"));

// 可索引的类型
interface StringArray {
  [index: number]: string;
  length: number;
}
const myArray: StringArray = ["Bob", "Fred"];
console.log(myArray);
