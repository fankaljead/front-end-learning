let num: number[][][] = [[[1]]];
type nt = string | number;

type Fn = (n1: number, n2: number) => number;
const add: Fn = (a, b) => a + b;
add(1, 2);

type Person = {
  name: string;
  age: number;
};

const p1: Person = {
  name: "John",
  age: 30,
};
console.log("p1: ", p1);

const s1 = "s1";
let s2 = "l2";

type gender = "girl" | "boy";
const stu: gender = "girl";
const a = "1";

