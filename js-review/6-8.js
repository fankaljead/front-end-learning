console.log(Array.from("zxh"));

var map = new Map().set(1, 2).set(3, 4);
var set = new Set().add(1).add(2).add(3);
console.log(Array.from(map));
console.log(Array.from(set));

var iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};
console.log(Array.from(iter, (x) => x ** 2));

var arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};
console.log(Array.from(arrayLikeObject));

console.log(Array.of(1, 2, 3, 4));

var options = [0, , , , , 1];
for (const option of options) {
  console.log(option);
}

console.log(options.length);
options.length = 10;
console.log(options);
options.length = 5;
console.log(options);

console.log(options instanceof Array);
console.log(Array.isArray(options));

var a = ["foo", "bar", "baz", "qux"];
var aKeys = a.keys();
console.log(Array.from(aKeys));
console.log(Array.from(a.values()));
console.log(Array.from(a.entries()));

var zeroes = [0, 0, 0, 0];
zeroes.fill(5);
console.log(zeroes);
zeroes.fill(6, 2);
console.log(zeroes);

zeroes.copyWithin(0, 3);
console.log(zeroes);

zeroes.unshift(0, 1, 2, 3, 4);
console.log(zeroes);

console.log(zeroes.reverse());
console.log(zeroes.sort((a, b) => a - b));

console.log([].concat(1, 2, 3, 4));

var colors = ["r", "g", "b"];
var ncolors = ["black", "brown"];
var moreColors = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: "pink",
  1: "cyan",
};

ncolors[Symbol.isConcatSpreadable] = false;
console.log(colors.concat("yellow", ncolors));

console.log(zeroes.filter((v) => v > 3));
console.log(zeroes.every((v) => v > 3));
console.log(
  zeroes.forEach((v) => {
    v += 3;
  })
);
console.log(zeroes);

var map = new Map();
map.set(undefined, { name: "zxh" });
console.log(map.get(undefined));
map.set(null, { test: null });
console.log(map.get(null));


console.log(map);

var wm = new WeakMap();
var x = new String("zxh");
wm.set(x, "zxh");
console.log(wm.get(x));

var ws = new WeakSet();
ws.add({});
ws.add(map);
ws.add(colors);
console.log(map);
console.log(Array.from(ws));

console.log(colors[Symbol.iterator]);

var iter = colors[Symbol.iterator]();
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

function* gfn() {
  yield 1;
  yield 2;
  yield 3;

  return "bar";
}
var g = gfn();
console.log(g);
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

function* gfn() {
  return yield "foo";
}

var g = gfn();
console.log(g);
console.log(g.next());
console.log(g.next("bar"));
console.log(g.next());

function* nTimes(n) {
  if (n > 0) {
    yield nTimes(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}

var person = {
  age_: 23,
};
Object.defineProperty(person, "name", {
  writable: false,
  value: "zxh",
  enumerable: false,
  configurable: false,
});

Object.defineProperty(person, "age", {
  get() {
    return this.age_;
  },
  set(newAge) {
    this.age_ = newAge;
  },
});

delete person.name;

console.log(person.name);
person.age = 222;
console.log(person.age);

var dest, src, result;
dest = {};
src = { id: "src" };

result = Object.assign(dest, src);
console.log(result);
console.log(dest);
console.log(result == src);
console.log(result == dest);
console.log(src.id == dest.id);

console.log(Math.max(0.1 + 0.2, 0.3));

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.colors = ["red", "green", "blue"];
  }
  sayName() {
    console.log(this.name);
  }
  sayColors() {
    console.log(this.colors);
  }
}

var p1 = new Person("zxh", 23);
var p2 = new Person("fankaljead", 23);
p1.colors.push("pink");
p1.sayColors();
p2.sayColors();
console.log(p1.sayName === p2.sayName);

console.log(test);

function test() {
  console.log(typeof arguments);
}

test();
globalThis.color = "red";

var o = {
  color: "blue",
};
function sayColor() {
  console.log(this.color);
}
sayColor();
o.sayColor = sayColor;
o.sayColor();
