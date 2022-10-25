// class Emitter {
//   constructor(max) {
//     this.max = max;
//     this.syncIdx = 0;
//     this.asyncIdx = 0;
//   }
//   *[Symbol.iterator]() {
//     while (this.syncIdx < this.max) {
//       yield this.syncIdx++;
//     }
//   }
//   async *[Symbol.asyncIterator]() {
//     while (this.asyncIdx < this.max) {
//       yield this.asyncIdx++;
//     }
//   }
// }

// const emitter = new Emitter(5);

// function syncCount() {
//   const syncCounter = emitter[Symbol.iterator]();
//   for (const x of syncCounter) {
//     console.log(x);
//   }
// }

// async function asyncCount() {
//   const asyncCounter = emitter[Symbol.asyncIterator]();
//   for await (const x of asyncCounter) {
//     console.log(x);
//   }
// }

// // syncCount();
// asyncCount();

const person = { name: "Matt", age: 27, job: "joker" };
const { name, ...addition } = person;
const p2 = { name, ...addition };
console.log(name);
console.log(addition);
console.log(p2);
