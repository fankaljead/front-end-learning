// util.promisify 方法
const fs = require("fs");
const util = require("util");

let mineReadFile = util.promisify(fs.readFile);

mineReadFile("./1-初体验.html").then(
    (value) => {
        console.log(value.toString());
    },
    (reason) => {
        console.log(reason);
    }
);
