let floatNum = 10.0;
console.log(floatNum);
console.log(+0 === -0);
console.log(023);
console.log(0.15 + 0.25 == 0.4);
console.log(0.1 + 0.2 == 0.3);
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
console.log(Number.MAX_VALUE + Number.MIN_VALUE == Number.MAX_VALUE);

let a = {
  i: 1,
  valueOf: function () {
    return this.i++;
  },
};

console.log(a == 1 && a == 2 && a == 3);

console.log(`\u00A9`);
console.log(String.raw`\u00A9`);

let genericSymbol = Symbol("foot");
let otherGenericSymbol = Symbol("foot");
console.log(genericSymbol == otherGenericSymbol);
console.log(genericSymbol == genericSymbol);
let aa = () => {};
let aaa = function () {};
console.log(aa.prototype);
console.log(aaa.prototype);

let bb = {
  i: 1,
  [Symbol.iterator]: function () {
    if (this.i <= 5) {
      return this.i++;
    }
  },
};

console.log(bb);
// for (const iterator of bb) {
//   console.log(iterator);
// }

console.log([][[]]);
console.log(+[![]]);
console.log(Infinity - Infinity);
console.log(Infinity - -Infinity);
console.log(5 - true);
console.log({} + []);
console.log([] + {});
console.log({} + [] == [] + {});
console.log((false + "")[1]);
console.log(parseInt(123, 16));
console.log(null == undefined);
console.log("A".charCodeAt());
console.log("a".charCodeAt());
console.log("A" > 1);
console.log(NaN > 1);
console.log(NaN <= 1);
console.log(NaN != 1);

console.log({}.valueOf());
console.log([].valueOf());
console.log(typeof null);
console.log(typeof undefined);

function change(...a) {
  [a[0], a[1]] = [a[1], a[0]];
  console.log(a);
}

a = 1;
change(a, a + 1);
console.log(a);
console.log(typeof a);
console.log(a instanceof Number);
a = new Number(1);
console.log(a instanceof Number);
let reg = /al/;
console.log(typeof reg);

console.log(new Date());
console.log(new Date(Date.parse("5/21/1998")));

let pattern1 = /at/g;
let pattern2 = /[bc]at/i;
let pattern3 = /.at/gi;

let s = "hellaT werd at the be";

console.log(s.match(pattern1));
console.log(s.match(pattern3));
console.log(pattern1);
console.log(pattern1.exec(s));
console.log(pattern3.exec(s));

let matches = pattern3.exec(s);
console.log(matches[0]);
console.log(matches);

let p1 = /^a/;
console.log("aa".match(p1));

console.log("abc".match(/c$/));
console.log("Aooooc".match(/Ao*c/));
console.log("Aooooc".match(/Ao{0,}c/));
console.log("Aooooc".match(/Ao+c/));
console.log("Aooooc".match(/Ao{1,}/));
console.log("023".match(/[0-9]*3/));

console.log(typeof s);
s.name = "h";
console.log(s);

let num = 10;
console.log(num.toString(2));
console.log(num.toString(7));
console.log(num.toString(8));
console.log(num.toFixed(3));
num = 0.1 + 0.2;
console.log(num + 0.1 + 0.2);

s = "a";
let s2 = new String("a");
console.log(s === s2);
console.log("你好".charCodeAt());
console.log(String.fromCharCode(1111111111));
console.log(s.concat(s2, "dd"));

console.log([, , , ,]);
console.log(Array.isArray([[[[[[[[[[[[[[]]]]]]]]]]]]]]));

let arr = [1, 2, 3, 4, 5, 6];
console.log(arr.splice(0, 1));
console.log(arr.splice(0, 0, ...[1, 2, 3]));
console.log(arr);

console.log(arr.map((v) => v ** 2));

const buf = new ArrayBuffer(2);
const view = new DataView(buf);

console.log(buf);
console.log(view);

view.setUint8(0, 255);
console.log(buf);
console.log(view);
console.log(view.getUint8(0));

function test(a, b) {
  return a > b ?? a;
}

console.log(test(100, 1));

console.log(test?.name);

let map = new Map();
console.log(map);
