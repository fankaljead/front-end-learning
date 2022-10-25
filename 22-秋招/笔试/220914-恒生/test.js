function A(cName) {
  if (cName) {
    this.name = cName;
  }
}
A.prototype.name = "Hundsun";
var a = new A();
console.log("A", a.name);
function B(cName) {
  this.name = cName;
}
B.prototype.name = "600570";
var b = new B();
console.log("B", b.name);

const set = new Set();
set.add(1);
set.add("Hundsun");
set.add({
  name: " Hundsun",
});
for (let item of set) {
  console.log(item + 2);
}

parseFloat("60.570");
parseFloat("60.570hundsun");
Number("50.66h");
"60.57" - 0;

function foo() {
  console.log("first");
  setTimeout(function () {
    console.log("second");
  }, 5);
}
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
foo();

for (const c of { a: 1, b: 2 }) {
  console.log(c);
}
