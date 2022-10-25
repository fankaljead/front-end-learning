let p0 = new Promise((resolve, reject) => {
  reject(1);
});

const thenable = {
  then: (resolve, reject) => {
    return p0.then(resolve, reject).catch((error) => {
      console.log("err1:" + error);
    });
  },
};

Promise.resolve(thenable).catch((error) => {
  console.log("err2:" + error);
});
