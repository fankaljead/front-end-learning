// async function foo() {
//     const r1 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("1");
//         });
//     });
//     const r2 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("2");
//         }, 1000);
//     });

//     // return [r1, r2];
//     return r1, r2;
// }

// let r = foo();
// console.log(r);

// // , 表达式
// // function bar() {
// //     // return 1, 2;
// //     return [1, 2];
// // }

// // let s = bar();
// // console.log(s);
// // console.log((1,2));

// mdn 简单例子
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
var resolveAfter2Seconds = () => {
    console.log("starting slow promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = () => {
    console.log("starting fast promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async () => {
    console.log("==SQUENTIAL START==");

    const slow = await resolveAfter2Seconds();
    console.log(slow);

    const fast = await resolveAfter1Second();
    console.log(fast);
};

var concurrentStart = async () => {
    console.log("==CONCURRENT START with await==");
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();

    console.log(await slow);
    console.log(await fast);
};

var parallel = async () => {
    console.log("==PARALLEL with await Promise.all==");

    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))(),
    ]);
};

var parallelPromise = () => {
    console.log("==PARALLEL with Promise.then==");
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
};

function timeout(ms) {
    return new Promise((resolve) => {
        let s = setTimeout(resolve, ms);
        return s;
    });
}

async function asyncPrint(value, ms) {
    let m = await timeout(ms);
    console.log(value);
    return m;
}

var calculate = async (m, n) => {
    let sum = 0;
    for (i = m; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var testCaculate = async () => {
    let start = new Date().getMilliseconds();
    let n1 = await calculate(1, 10000000);
    let n2 = await calculate(10000001, 20000000);
    let end = new Date().getMilliseconds();
    console.log(n1);
    console.log(n2);
    console.log(n1 + n2);
    console.log("time1 is:", end - start);

    start = new Date().getMilliseconds();
    let sum = 0;
    for (i = 1; i <= 20000000; i++) {
        sum += i;
    }
    console.log(sum);
    end = new Date().getMilliseconds();
    console.log("time2 is:", end - start);
};

//  同步代码 > 微任务 > 宏任务
var marcoQuene = () => {
    setTimeout(() => {
        // 立即放入宏队列
        console.log("timeout callback1()");
        Promise.resolve(3).then((v) => {
            // 会立即放入微队列
            console.log("Promise onResolved3()", v);
        });
    }, 0);

    setTimeout(() => {
        // 立即放入宏队列
        console.log("timeout callback2()");
    }, 0);

    Promise.resolve(1).then((v) => {
        // 会立即放入微队列
        console.log("Promise onResolved1()", v);
    });

    Promise.resolve(2).then((v) => {
        // 会立即放入微队列
        console.log("Promise onResolved2()", v);
    });
};
