const sum = (num1, num2) => {
  return num1 + num2;
};
const result = sum(3, 5);
console.log(result);

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const animal = new Animal("zxh", 23);
console.log("animal:", animal);
