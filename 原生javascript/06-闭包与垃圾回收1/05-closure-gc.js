let a = 1;
function foo(a) {
  return function (b) {
    console.log(b + ++a);
  };
}

var f = foo(10);
f(5);
foo(6)(7);
f(20);
console.log(a);
