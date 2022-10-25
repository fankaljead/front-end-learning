class Animal {
  doAnimalThing(): void {
    console.log("i am a animal");
  }
}

class Dog extends Animal {
  doDogThing(): void {
    console.log("i am a dog");
  }
  bark(): void {
    console.log("Bark");
  }
}

class Cat extends Animal {
  doCatThing(): void {
    console.log("i am a cat");
  }
}

class Greyhound extends Dog {}

// type Covariant<T> = T;
// const acceptDogConvariance = (value: Covariant<Dog>) => {};

// acceptDogConvariance(new Animal());
// acceptDogConvariance(new Dog());
// acceptDogConvariance(new Greyhound());

// type Contravariance<T> = T;
// const acceptDogContravariance = (value: Contravariance<Dog>) => {};

// acceptDogContravariance(new Animal());
// acceptDogContravariance(new Dog());
// acceptDogContravariance(new Greyhound());

function makeAnimalAction(animalAction: (animal: Animal) => void): void {
  let cat: Cat = new Cat();
  animalAction(cat);
}

function dogAction(dog: Dog) {
  dog.doDogThing();
}

function animalAction(animal: Animal) {
  animal.doAnimalThing();
}

// makeAnimalAction(dogAction);
makeAnimalAction(animalAction);
