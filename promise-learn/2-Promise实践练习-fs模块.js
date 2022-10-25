const fs = require("fs");

//
// fs.readFile("./1-初体验.html", (err, data) => {
//     if (err) {
//         throw err;
//     }

//     console.log(data.toString());
// });

// Promise 形式
const p = new Promise((resolve, reject) => {
    fs.readFile("./1-初体1验.html", (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

p.then(
    (v) => {
        console.log(v.toString());
    },
    (reason) => {
        console.log(reason);
    }
);
