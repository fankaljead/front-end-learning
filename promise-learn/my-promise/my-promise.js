// 自定义 Promise

// (function (window) {
//     function Promise(excutor) {}
// });




function Promise(executor) {
    // add attribute
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.callbacks = [];

    // save this
    const self = this;

    function resolve(data) {
        if (self.PromiseState !== "pending") {
            return;
        }
        // 1. update status promiseState
        self.PromiseState = "fulfilled";

        // 2. set result value promiseResult
        self.PromiseResult = data;

        setTimeout(() => {
            self.callbacks.forEach((callback) => {
                callback.onResolved(data);
            });
        });

        // if (self.callback.onResolved) {
        //     self.callback.onResolved(data);
        // }
    }

    function reject(data) {
        if (self.PromiseState !== "pending") {
            return;
        }
        // 1. update status promiseState
        self.PromiseState = "rejected";

        // 2. set result value promiseResult
        self.PromiseResult = data;

        setTimeout(() => {
            self.callbacks.forEach((callback) => {
                callback.onRejected(data);
            });
        });

        // if (self.callback.onRejected) {
        //     self.callback.onRejected(data);
        // }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;

    // 判断回调函数参数
    if (typeof onRejected !== "function") {
        onRejected = (reason) => {
            throw reason;
        };
    }

    if (typeof onResolved !== "function") {
        onResolved = (value) => value;
    }

    return new Promise((resolve, reject) => {
        function callback(type) {
            try {
                let result = type(self.PromiseResult);
                if (result instanceof Promise) {
                    result.then(
                        (v) => {
                            resolve(v);
                        },
                        (r) => {
                            reject(r);
                        }
                    );
                } else {
                    // 结果的对象状态为成功
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        if (this.PromiseState === "fulfilled") {
            setTimeout(() => {
                callback(onResolved);
            });
        }

        if (this.PromiseState === "rejected") {
            setTimeout(() => {
                callback(onRejected);
            });
        }

        if (this.PromiseState === "pending") {
            // 保存回调函数
            this.callbacks.push({
                // onResolved: function () {
                //     console.log("success");
                //     // 执行成功的回调函数

                // },
                // onRejected: function () {
                //     console.log("error");
                // },
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                },
            });
        }
    });
};

Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

// https://www.bilibili.com/video/BV1GA411x7z1?p=34

// 添加 resolve 方法
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(
                (v) => {
                    resolve(v);
                },
                (r) => {
                    reject(r);
                }
            );
        } else {
            resolve(value);
        }
    });
};

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
};

Promise.all = function (promises = []) {
    return new Promise((resolve, reject) => {
        // 声明变量
        let count = 0;
        let arr = [];

        for (let i = 0; i < promises.length; i++) {
            promises[i].then(
                (v) => {
                    // 得知对象状态成功
                    // 每个 Promise 对象都成功
                    count++;

                    arr[i] = v;

                    if (count === promises.length) {
                        resolve(arr);
                    }
                },
                (r) => {
                    reject(r);
                }
            );
        }
    });
};

Promise.race = function (promises = []) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(
                (v) => {
                    resolve(v);
                },
                (r) => {
                    reject(r);
                }
            );
        }
    });
};
