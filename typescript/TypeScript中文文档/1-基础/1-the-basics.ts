function greet(person: string, date: Date) {
  console.log(`Hello, ${person}! Today is ${date}.`);
}

greet("Brendan", new Date());
const max: (x: number, y: number) => number = (x: number, y: number): number =>
  x > y ? x : y;
