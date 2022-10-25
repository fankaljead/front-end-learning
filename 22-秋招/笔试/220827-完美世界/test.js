var boss = "bill";
var working = {
  boss: "bob",
  ask() {
    console.log(this.boss);
  },
  askAgain() {
    setTimeout(function () {
      console.log(this);
    }, 100);
  },
  askKeep() {
    setTimeout(() => {
      console.log(this);
    }, 100);
  },
};

working.ask();
working.askAgain();
working.askKeep();

var { foo: F, bar: B = "123" } = { foo: "aaa", bar: "bbb" };
console.log(F, B, foo);

var boss = "bob";
function a() {
  if (typeof boss === "undefined") {
    console.log(teacher);
    let teacher = "bill";
  } else {
    console.log(teacher);
  }
}
a();

var a = [];
for (var i = 0; i < 3; ++i) {
  a[i] = function () {
    console.log(i);
  };
}
a[0]();
a[1]();
a[2]();

var boss = "bob";
function ask(q) {
  console.log(boss, q);
}
function o() {
  var boss = "bill";
  ask("are you ok");
}

o();

var str = "12px";
var s = str.indexOf("2");
alert(s);
