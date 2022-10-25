type CustomHandler = (name: string, age: number) => void;

const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => "zxh";
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;

const result1 = handler1("zx", 23);
const result2 = handler2("zx", 23);
const result3 = handler3("zx", 23);
const result4 = handler4("zx", 23);
console.log(result1, result2, result3, result4);

const arr: number[] = [];
const list: number[] = [1, 2, 3];
list.forEach((item) => arr.push(item));
