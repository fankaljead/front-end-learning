async function getResult() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
      console.log(222);
    }, 2000);
  });
  console.log(111);
}

// getResult();
// console.log(333);

function* getResult2(params) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
      console.log(1);
    }, 1000);
  });
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
      console.log(2);
    }, 500);
  });
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
      console.log(3);
    }, 100);
  });
}

const gen = getResult2();
gen.next();
gen.next();
gen.next();
