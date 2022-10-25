const getIce = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ice-cream!");
    }, 2000);
  });
};

async function iceCreater() {
  const ice1 = await getIce();
  console.log("this is " + ice1);
}

iceCreater();

function* await_generator() {
  yield getIce();
}
const ice = await_generator();
const ice1 = ice.next().value;
ice1.then((r) => {
  console.log("this iss " + r);
});

function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);

    return new Promise((resolve, reject) => {
      function getNext(key, arg) {
        let ice;
        try {
          ice = gen[key](arg);
        } catch (e) {
          return reject(e);
        }

        if (ice.done) {
          return resolve(ice.value);
        } else {
          return Promise.resolve(ice.value).then(
            (v) => {
              getNext("next", v);
            },
            (err) => {
              getNext("throw", err);
            }
          );
        }
      }

      getNext("next");
    });
  };
}

const iceMaker = asyncToGenerator(function* ice() {
  yield new Promise((resolve) => {
    setTimeout(() => {
      resolve("ice");
    }, 2000);
  });
  const ice2 = yield Promise.resolve("ice-cream!!");
  return ice2;
});

iceMaker().then((res) => {
  console.log("thiss isss " + res);
});
