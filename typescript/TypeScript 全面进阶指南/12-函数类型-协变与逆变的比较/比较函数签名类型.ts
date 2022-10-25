class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

type DogFatory = (args: Dog) => Dog;

function transformDogAndBark(dogFactory: DogFatory) {
  const corgi = dogFactory(new Corgi());
  corgi.bark();
}
const aa = (an: Animal) => new Animal();
const da = (an: Dog) => new Animal();
const ca = (an: Corgi) => new Animal();

const cc = (an: Corgi) => new Corgi();
const cd = (an: Corgi) => new Dog();

const dc = (an: Dog) => new Corgi();
const ac = (an: Animal) => new Corgi();
const ad = (an: Animal) => new Dog();

transformDogAndBark(aa);
transformDogAndBark(da);
transformDogAndBark(ca);

transformDogAndBark(cc);
transformDogAndBark(cd);

transformDogAndBark(dc);
transformDogAndBark(ac);
transformDogAndBark(ad);

function makeDogBark(dog: Dog) {
  dog.bark();
}
makeDogBark(new Corgi());
makeDogBark(new Animal());
