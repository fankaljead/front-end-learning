function* g() {
  yield "a";
  yield "b";
  yield "c";

  return "d";
}

// for (const c of g()) {
//   console.log(c);
// }

// const gen = g();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

function* g2() {
  let o = 1;
  yield o++;
  yield o++;
  yield;
  yield o++;

  return o;
}

// const gen2 = g2();
// console.log(gen2.next());
// console.log(gen2.next());
// console.log(gen2.next());
// console.log(gen2.next());
// console.log(gen2.next());

function* g3() {
  let o = 1;
  let a = yield o++;
  console.log("a = " + a);
  var b = yield o++;

  return b + o;
}
// const gen3 = g3();
// console.log(gen3.next());
// console.log(gen3.next(11));
// console.log(gen3.next(22));

for (const v of g3()) {
  console.log(v);
}

function* fibonacci() {
  let [pre, cur] = [0, 1];
  while (true) {
    [pre, cur] = [cur, cur + pre];
    yield cur;
  }
}

for (let n of fibonacci()) {
  if (n > 10000) {
    break;
  }
  console.log(n);
}

// 手写 generator 核心原理

const context = {
  pre: 0,
  next: 0,
  done: false,
  stop: function () {
    this.done = true;
  },
};

let foo = function () {
  return {
    next: function () {
      return {
        value: gen$(context),
        done: context.done,
      };
    },
  };
};

function gen$() {
  const context = new Context();
  let xxx;
  return function () {
    while (1) {
      switch ((context.next = context.pre)) {
        case 0:
          context.next = 2;
          return "result1";
        case 2:
          xxx = context._send;
          context.next = 4;
          return "result2";
        case 4:
          context.next = 4;
          return "result3";
        case 6:
          context.stop();
          return undefined;
      }
    }
  };
}

("use strict");
var _marked = regeneratorRuntime.mark(foo);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "result1";

        case 2:
          _context.next = 4;
          return "result2";

        case 4:
          _context.next = 6;
          return "result3";

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}

class Context {
  constructor() {
    this.next = 0;
    this.prev = 0;
    this.done = false;
  }
  top() {
    this.done = true;
  }
}
