// let obj = { a: 1 };
// var proxy = new Proxy(obj, {
//   get(target, property, p) {
//     return target[property] + 1;
//   },
//   set(target, property, value) {
//     target[property] = value + 1;
//   },
// });
// proxy.a = 2;
// console.log(obj.a);

var arr = [];
for (var i = 0; i < 3; i++) {
  arr.push(function () {
    return i;
  });
  console.log(arr[i]());
}
arr.forEach(function (arr) {
  console.info(arr());
});
