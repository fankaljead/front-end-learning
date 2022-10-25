function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

interface PromiseConstructor {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

const arrrrr: Array<number> = [1, 2, 3];

arrrrr.push("zxh");
arrrrr.includes("zxh");

arrrrr.find(() => false);

arrrrr.reduce((a, b) => a + b);

arrrrr.reduce((pre, cur) => [...pre, cur], new Array<number>());

arrrrr.reduce<number[]>((a, b) => [...a, b], []);
