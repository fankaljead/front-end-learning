// let a = "11" * 3;
// let b = "a8" * 3;
// let c = "8a" * 3;
// let d = parseFloat("8a");
// console.log(a, b, c, d);

var a = 1;
setTimeout(() => {
  console.log(a++);
}, 0);
new Promise((resolve) => {
  console.log(a++);
  for (var i = 0; i < 1000; i++) resolve(a++);
  console.log(a++);
}).then((a) => {
  console.log(a++);
});
console.log(a++);
