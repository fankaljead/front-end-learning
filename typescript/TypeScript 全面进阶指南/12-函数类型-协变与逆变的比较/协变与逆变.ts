type AsFuncArgType<T> = (arg: T) => void;
type AsFuncReturnType<T> = (arg: unknown) => T;

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

type CheckArgType = AsFuncArgType<Corgi> extends AsFuncArgType<Dog> ? 1 : 2;

function fn(dog: Dog) {
  dog.bark();
}

type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;

const func1: CorgiFunc = fn;
const func2: AnimalFunc = fn;

// method 声明
interface T1 {
  func(arg: string): number;
}

// property 声明
interface T2 {
  func: (arg: string) => string;
}

declare let dogs: Dog[];
declare let animals: Animal[];
dogs = animals;
animals = dogs;

// 2
type TTT = Animal[] extends Dog[] ? 1 : 2;
// 1
type TTTT = Dog[] extends Animal[] ? 1 : 2;
function t(dogs: Dog[]): Animal[] {
  return dogs;
}
function tt(animals: Animal[]): Dog[] {
  return animals;
}
