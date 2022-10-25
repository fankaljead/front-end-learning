function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

const f0 = (x) => {
  console.log(x);
  return x;
};
const f1 = (x) => {
  console.log(1 + x);
  return x;
};
const f2 = (x) => {
  console.log(2 + x);
};
let fArr = [f2, f1, f0];
console.log(compose(...fArr)(100));
