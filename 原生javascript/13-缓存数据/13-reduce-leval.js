function Person() {
  this.name = "zxh";
  this.age = 23;
}
let p = new Person();
console.log(p.name);

function Person2() {
  this.name = "zxh";
  this.age = 23;
  this.getName = function () {
    return this.name;
  };
}
let p2 = new Person2();
console.log(p2.getName());
