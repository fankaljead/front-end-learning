let fibonacci: number[] = [0, 1, 1, 2, 3, 5, 8];
let fib2: Array<number> = [0, 1, 1, 2, 3, 5, 8];

interface NumberArray {
  [index: number]: number;
}
let fib3: NumberArray = [0, 1, 1, 2, 3, 5, 8];

function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
  let args2: IArguments = arguments;
}

let list: any[] = ["hh", 11, undefined, null, {}, [], () => {}];
