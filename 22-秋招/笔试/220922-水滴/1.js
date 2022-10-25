function wrap(name) {
  console.log(`hello ${name}`);
}

const mutationMethods = ["push", "pop", "shift"];

// const arrayProto = Array.prototype;

// mutationMethods.forEach((method) => {
//   const original = arrayProto[method];
//   let flag = true;
//   Reflect.defineProperty(arrayProto, method, {
//     value: function (...args) {
//       //劫持数组的方法
//       if (flag) {
//         flag = false;
//         console.log("hello ", method);
//         return original.apply(this, [...args]);
//       }
//       // return original.apply(this, [...args]);
//     },
//   });
// });

// const deepClone = (obj) => {
//   if (obj === null) return null;
//   let clone = Object.assign({}, obj);
//   Object.keys(clone).forEach(
//     (key) =>
//       (clone[key] =
//         typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
//   );
//   if (Array.isArray(obj)) {
//     clone.length = obj.length;
//     return Array.from(clone);
//   }
//   return clone;
// };

// const arrayAugmentations = deepClone(Array.prototype);

// mutationMethods.forEach((method) => {
//   let original = arrayAugmentations[method];

//   Array.prototype[method] = function () {
//     console.log("hello ", method);

//     return original.apply(this, arguments);
//   };
// });

// Array.prototype = arrayAugmentations;

const arrMethods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

const arrExtend = Object.create(Array.prototype);

mutationMethods.forEach((method) => {
  const oldMethod = Array.prototype[method];
  const newMethod = function (...args) {
    oldMethod.apply(this, args);
    console.log(`hello ${method}`);
  };
  arrExtend[method] = newMethod;
});

const arr = [1, 2, 3];
arr.__proto__ = arrExtend;
arr.push(4);
console.log(arr);
arr.pop();
console.log(arr);
arr.shift();
console.log(arr);
