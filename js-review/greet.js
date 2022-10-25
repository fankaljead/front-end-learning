class Greeter {
    constructor(greeting) {
        this.greeting = greeting;
    }
    greet() {
        console.log(this.greeting);
    }

}


let g = new Greeter("zxh");
g.greet();
