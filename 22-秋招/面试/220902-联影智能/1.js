class Store {
  // 补充代码
  obj = {};
  get(key) {
    // 补充代码
    return this.obj[key];
  }

  set(key, value) {
    // 补充代码
    this.obj[key] = value;
  }

  waitSet(key, value) {
    // 补充代码
    this.obj[key](value);
  }

  waitGet(key) {
    // 补充代码
    return new Promise((resolve, reject) => {
      if (this.obj[key]) {
        resolve(this.obj[key]);
      } else {
        this.obj[key] = resolve;
      }
    });
  }
}

const store = new Store();

(async () => {
  store.set("name", "UAI");

  store.get("name"); // UAI

  setTimeout(() => {
    store.waitSet("waitName", "UAI_WAIT");
  }, 5000);

  const waitName = await store.waitGet("waitName");
  console.log(waitName); // 约五秒后打印 UAI_WAIT
})();
