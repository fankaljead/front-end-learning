const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("once");
    resolve("success");
  }, 1000);
});

promise.then((res) => {
  console.log(res, 1);
});
promise.then((res) => {
  console.log(res, 2);
});
