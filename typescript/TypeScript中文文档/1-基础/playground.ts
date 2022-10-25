// const xx = "1" as any as number;
// console.log(typeof xx);

// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     // return { length: minimum };
//   }
// }
// const arr = minimumLength([1, 2, 3], 6);
// console.log(arr.slice(0));

function combine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
const combined = combine<string|number>([1, 2, 3], ["hello"]);
console.log(combined);