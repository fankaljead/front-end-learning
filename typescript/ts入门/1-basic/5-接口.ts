interface Person {
  name: string;
  age: number;
}
let zxh: Person = {
  name: "zxh",
  age: 18,
};

let p2: Person = {
  name: "Tom",
  age: 18,
};

interface Person2 {
  name: string;
  age?: number;
  [propName: string]: string | number | (() => void);
  readonly id: number;
}

let p3: Person2 = {
  name: "Tom",
  age: 18,
  id: 1,
  say: function () {
    console.log(this.name);
  },
};
console.log(p3);
