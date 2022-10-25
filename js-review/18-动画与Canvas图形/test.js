var x = 1;
function f(
  x,
  y = function () {
    x = 3;
    console.log(x);
  }
) {
  console.log(x);
  var x = 2;
  y();
  console.log(x);
}

f();
console.log(x);

// undefined
// 3
// 2
// 1
