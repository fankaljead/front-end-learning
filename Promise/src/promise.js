const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
    constructor(executor) {
        this.PromiseState = PENDING;
        this.PromiseResult = null;
        this.callbacks = [];

        const self = this;

        function resolve(data) {
            if (self.PromiseState !== PENDING) {
                return;
            }

            self.PromiseState = FULFILLED;

            self.PromiseResult = data;

            setTimeout(() => {
                self.callbacks.forEach((callback) => {
                    callback.onResolved(data);
                });
            });
        }

        function reject(data) {
            if (self.PromiseResult !== PENDING) {
                return;
            }

            self.PromiseState = REJECTED;

            self.PromiseResult = data;

            setTimeout(() => {
                self.callbacks.forEach((callback) => {
                    callback.onRejected(data);
                });
            });
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        const self = this;

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
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            }

            if (this.PromiseState === FULFILLED) {
                setTimeout(() => {
                    callback(onResolved);
                });
            }

            if (this.PromiseState === REJECTED) {
                setTimeout(() => {
                    callback(onRejected);
                });
            }

            if (this.PromiseState === PENDING) {
                this.callbacks.push({
                    onResolved: function () {
                        callback(onResolved);
                    },
                    onRejected: function () {
                        callback(onRejected);
                    },
                });
            }
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
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
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }

    static all(promises = []) {
        return new Promise((resolve, reject) => {
            let count = 0;
            let arr = [];

            for (let i = 0; i < promises.length; i++) {
                promises[i].then(
                    (v) => {
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
    }

    static race(promises = []) {
        return new Promsie((resolve, reject) => {
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
    }

    static any(promises=[]){
        return new Promise((resolve, reject)=>{
            
        })
    }
}
