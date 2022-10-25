function* generatorFn() {
  console.log("foo");
  // yield this;
  yield 1;
  yield 2;
  yield 3;
  return "bar";
}

let gfn = generatorFn();
console.log(gfn);
console.log(gfn === gfn[Symbol.iterator]());
// console.log(gfn.next());
// console.log(gfn.next());
// console.log(gfn.next());
// console.log(gfn.next());
for (const x of gfn) {
  console.log(x);
}

function* nTimes(n) {
  while (n--) {
    yield;
  }
}
for (const x of nTimes(3)) {
  console.log("foo: ", x);
}

function* generatorFn2(initial) {
  console.log(initial);
  console.log("1:", yield);
  console.log("2:", yield);
  return yield;
}

let gfn2 = generatorFn2("1");
gfn2.next(2);
gfn2.next(3);
gfn2.next(4);
console.log(gfn2.next(5));

function* generatorFn3() {
  return (yield "foo") + "ddd";
}

let gfn3 = generatorFn3();
console.log(gfn3.next(1));
console.log(gfn3.next("bar"));
console.log(gfn3.next("baz"));

console.log("=======gfn4============");
function* generatorFn4() {
  // yield* [yield, 1, 2, 3];
  yield* [1, yield, 2, 3, yield];
}

let gfn4 = generatorFn4();
console.log(gfn4.next("11"));
console.log(gfn4.next("22"));
console.log(gfn4.next("33"));
console.log(gfn4.next("44"));
// console.log(gfn4.next("55"));
// console.log(gfn4.next("66"));
