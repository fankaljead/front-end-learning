// function sayHello(person: string) {
//   return "Hello, " + person;
// }

// let user = "Tom";
// console.log(sayHello(user));

function sayHello(person: string) {
  if (typeof person === "string") {
    return "Hello, " + person;
  } else {
    throw new Error("person is not a string");
  }
}

let user = "Tom";
console.log(sayHello(user));
