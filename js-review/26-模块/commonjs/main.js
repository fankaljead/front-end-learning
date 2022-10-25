// console.log("main.js ", require("./a.js").x);
// console.log("main.js ", require("./b.js").x);

// console.log('main.js ', require('./a.js').x);
// console.log('main.js ', require('./b.js').x);

var counter = require("./lib").counter;
var incCounter = require("./lib").incCounter;

console.log(counter); // 3
incCounter();
console.log(counter); // 3

var o = require("./lib").o;
var changeO = require("./lib").changeO;

console.log(o); // 3
changeO();
console.log(o); // 3
