import "reflect-metadata";

class Foo {
  handler() {}
}

Reflect.defineMetadata("class:key", "class metadata", Foo);
Reflect.defineMetadata("method:key", "handler metadata", Foo, "handler");
Reflect.defineMetadata(
  "proto:method:key",
  "proto handler metadata",
  Foo.prototype,
  "handler"
);

console.log(Reflect.getMetadataKeys(Foo));
console.log(Reflect.getMetadataKeys(Foo, "handler"));
console.log(Reflect.getMetadataKeys(Foo.prototype, "handler"));

console.log(Reflect.getMetadata("class:key", Foo));
console.log(Reflect.getMetadata("method:key", Foo, "handler"));
console.log(Reflect.getMetadata("proto:method:key", Foo.prototype, "handler"));

@Reflect.metadata("class:key", "METADATA_IN_CLASS")
class Bar {
  @Reflect.metadata("prop:key", "METADATA_IN_PROPERTY")
  public prop: string = "zxh";

  @Reflect.metadata("method:key", "METADATA_IN_METHOD")
  public handler() {}
}

const bar = new Bar();
console.log(Reflect.getMetadata("class:key", Bar));
console.log(Reflect.getMetadata("class:key", Bar.prototype));

console.log(Reflect.getMetadata("method:key", Bar.prototype, "handler"));
console.log(Reflect.getMetadata("method:key", bar, "handler"));

console.log(Reflect.getMetadata("prop:key", Bar.prototype, "prop"));
console.log(Reflect.getMetadata("prop:key", bar, "prop"));
