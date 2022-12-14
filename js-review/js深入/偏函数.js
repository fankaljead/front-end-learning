// 偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。
// 例如
const partial =
  (fn, ...args) =>
  (...arg) =>
    fn(...args, ...arg);
    
function add(a, b, c) {
  return a + b + c;
}
let partialAdd = partial(add, 1);

console.log(partialAdd(2, 3));
