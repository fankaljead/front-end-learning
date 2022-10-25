var a = 1;
function foo() {
  var b = 2;
  return function (c) {
    console.log(c + b++);
  };
}

var f = foo();
f(5);
f(10);
