// interface Cat {
//   name: string;
//   run(): void;
// }
// interface Fish {
//   name: string;
//   swim(): void;
// }
// function getName(animal: Cat | Fish) {
//   return animal.name;
// }
// function isFish(animal: Cat | Fish) {
//   if (typeof (animal as Fish).swim === "function") return true;
//   return false;
// }
// interface ApiError extends Error {
//   code: number;
// }
// interface HttpError extends Error {
//   statusCode: number;
// }
// function isApiError(error: Error) {
//   // if (error instanceof ApiError) return true;
//   if (typeof (error as ApiError).code === "number") return true;
//   return false;
// }
// // window.foo = 1
// (window as any).foo = 1;
// function getCacheData(key: string): any {
//   return (window as any).cache[key];
// }
// // 将 any 断言为一个具体的类型
// const tom = getCacheData("tom") as Cat;
// tom.run();
// interface Animal {
//   name: string;
// }
// interface Cat extends Animal {
//   name: string;
//   run(): void;
// }
// let t: Cat = {
//   name: "Tom",
//   run: () => {
//     console.log("run");
//   },
// };
// let animal: Animal = t;
// function testAnimal(animal: Animal) {
//   return animal as Cat;
// }
// function testCat(cat: Cat) {
//   return cat as Animal;
// }
// let a: Animal = {
//   name: "Tom",
// };
// let tom1 = a as Cat;
// let tom2: Cat = a;
function toBoolean(something) {
    return something;
}
toBoolean(1);
// 返回值为 1
