const arr: number[] = [];
const list: number[] = [1, 2, 3];

list.forEach((item) => arr.push(item));

list.forEach(() => arr.push(1));

function handler(arg: string) {
  console.log(arg);
}

function useHandler(callback: (arg1: string, arg2: number) => void) {
  callback("zxh", 24);
}

useHandler(handler);
