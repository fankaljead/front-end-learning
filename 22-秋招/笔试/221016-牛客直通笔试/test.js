// const name = "nowcoder";
// url = "www.nowcoder.com";
// console.log(delete name);
// console.log(delete url);

// let p1 = new Promise((resolve, reject) => {
//   resolve(1);
// });
// let p2 = [];
// Promise.all([p1, p2])
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function Test() {}
Test.prototype.n = 0;
Test.prototype.add = function () {
  this.n += 1;
  return this.n;
};
t1 = new Test();
t2 = new Test();
console.log(t1.add());
console.log(t2.add());
