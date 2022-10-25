function ComputeProfiler(): MethodDecorator {
  const start = new Date();
  return (
    _target,
    methodIdentifier,
    decriptor: TypedPropertyDescriptor<any>
  ) => {
    const originalMethodImpl = decriptor.value!;

    decriptor.value = async function (...args: unknown[]) {
      const res = await originalMethodImpl(this, args);

      const end = new Date();

      console.log(
        `${String(methodIdentifier)} Time:`,
        end.getTime() - start.getTime()
      );

      return res;
    };
  };
}

class Foooo {
  @ComputeProfiler()
  async fetch() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("res");
      }, 3000);
    });
  }
}

(async () => {
  console.log(await new Foooo().fetch());
})();
