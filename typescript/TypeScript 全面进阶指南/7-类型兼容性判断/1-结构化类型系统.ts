class Cat {
  eat(): boolean {
    console.log("cat");
    return true;
  }
}
class Dog {
  bark() {}
  eat(): number {
    console.log("dog");
    return 1;
  }
}
function feedCat(cat: Cat) {
  cat.eat();
}
feedCat(new Dog());
