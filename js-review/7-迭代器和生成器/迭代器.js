// 实现了 Iterator 接口，但是每个实例只能被迭代一次
class SingleCounter {
  constructor(limit) {
    this.count = 1;
    this.limit = limit;
  }
  next() {
    if (this.count <= this.limit) {
      return { done: false, value: this.count++ };
    } else {
      return { done: true, value: undefined };
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}

class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}

// let sc = new SingleCounter(3);
let sc = new Counter(3);
for (const i of sc) {
  console.log(i);
}
for (const i of sc) {
  console.log(i);
}

let iter1 = sc[Symbol.iterator]();
let iter2 = sc[Symbol.iterator]();
console.log(iter1 === iter2);
