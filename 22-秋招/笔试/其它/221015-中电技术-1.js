var l = 1;
var n = (m = 0);

function myFun(x) {
  x = x++ + 5;
}
n = myFun(l);

function anotherFun(x) {
  x = --x + 5;
}

m = anotherFun(n);

console.log(n);
console.log(m);
