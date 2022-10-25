class A {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class B extends A {
  #width = 50;
  #height = 100;
  state = {
    tel: 11,
    color: ["r", "g", "b"],
  };

  get square() {
    return this.#height * this.#width;
  }
}

let a = new B();
let b = new B();
a.state.tel = 911;
a.state.color.push("a");
