function B() {
  this.n = "J";
  this.a = 21;
}
B.prototype.n = "L";
B.prototype.a = 0;
B.prototype.r = function () {
  return this.n + this.a + "running";
};

var b1 = new B();
console.log(b1.r());

function gm(g) {
  function add(name) {
    g = g.split(" ").reserves().join("-");
    return g + " " + name;
  }

  return add;
}

var d = gm("Good day to you");
console.log(d(name));
