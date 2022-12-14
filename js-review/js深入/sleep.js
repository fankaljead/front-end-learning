var ms = require("ms");

var sleep = function (time) {
  // time = isNaN(time) ? ms(time) : time;

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
};

// module.exports = exports = sleep;

console.log(1000);
sleep(2000);
console.log(2000);
