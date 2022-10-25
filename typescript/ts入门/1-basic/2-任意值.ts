// let myFavoriteNumber: string = "seven";
// myFavoriteNumber = 7;

let myFavoriteNumber2: any = "seven";
myFavoriteNumber2 = 7;

interface IP {
  setName(name: string): void;
  getName(): string;
  name: string;
}

let something: string | number | IP;
something = 7;
something = "seven";
something = {
  setName(name: string): void {
    this.name = name;
  },
  getName() {
    return this.name;
  },
  name: "hello",
};

something.setName("Tom");
console.log(something.getName());
