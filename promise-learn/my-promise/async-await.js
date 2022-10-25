// 读取 index.html async.html await.html 内容

const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);

// 使用回调函数
// fs.readFile("./index.html", (err, data1) => {
//     if (err) throw err;
//     fs.readFile("./async.html", (err, data2) => {
//         if (err) throw err;
//         fs.readFile("./await.html", (err, data3) => {
//             if (err) throw err;
//             console.log(data1 + data2 + data3);
//         });
//     });
// });

// async 与 await
async function main() {
    try {
        let data1 = await mineReadFile("./index.html");
        let data2 = await mineReadFile("./async.html");
        let data3 = await mineReadFile("./awaddit.html");

        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e);
    }
}
main();
