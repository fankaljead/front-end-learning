class Greeter {
  constructor(public greeting: string) {}
  greet() {
    console.log(this.greeting);
  }
}

let g = new Greeter("zxh");

g.greet();
