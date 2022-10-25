const target = {
  foo: "bar",
};
const proxy = new Proxy(target, {
  set: function (target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log(
        "property " + name.toString() + " on " + target + " set to " + value
      );
    }

    return success;
  },
});

proxy.foo = "bar";
console.log(proxy.foo);

class Des {
  hello() {
    console.log("Des hello");
  }
}
const des = new Des();
des.hello();

const desF = Reflect.construct(Des, [], Des);
const hello = Reflect.get(desF, "hello");
Reflect.apply(hello, desF, []);
