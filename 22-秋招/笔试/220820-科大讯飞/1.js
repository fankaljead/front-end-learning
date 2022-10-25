// let thenable = {
//   then: function (resolve, reject) {
//     reject(1);
//   },
// };

// let p = new Promise((resolve, reject) => {
//   resolve(thenable);
// });

// p.then(
//   (val) => {
//     console.log(val);
//   },
//   (err) => {
//     console.log(err + 1);
//   }
// );

function seqSum(n) {
  let a = 1,
    b = 2;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += a / b;
    [a, b] = [b, a + b];
  }
  return (Math.round((sum + Number.EPSILON) * 100) / 100).toFixed(2);
}

console.log(seqSum(3));
console.log(seqSum(1));
console.log(seqSum(12));
