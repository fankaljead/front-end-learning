const PENDING = "pending";
const FUIFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.promiseState = PENDING;
    this.promiseData = null;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.promiseState !== PENDING) {
        return;
      }

      this.promiseState = FUIFILLED;
      this.promiseData = value;

      this.callbacks((callback) => {
        setTimeout(() => {
          callback.onResolved(value);
        });
      });
    };

    const reject = (value) => {
      if (this.promiseState !== PENDING) {
        return;
      }

      this.promiseState = REJECTED;
      this.promiseData = value;

      this.callbacks((callback) => {
        setTimeout(() => {
          callback.onRejected(value);
        });
      });
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolved, onRejected) {
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }

    let self = this;

    return new Promise((resolve, reject) => {
      function callback(type) {
        try {
          let result = type(self.promiseData);
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

      if (this.promiseState === FUIFILLED) {
        setTimeout(() => {
          callback(onResolved);
        });
      }

      if (this.promiseState === REJECTED) {
        setTimeout(() => {
          callback(onRejected);
        });
      }

      if (this.promiseState === PENDING) {
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

  finally(fn) {
    return this.then(
      (value) => {
        return Promise.resolve(fn()).then(() => value);
      },
      (error) => {
        return Promise.resolve(fn()).then(() => {
          throw error;
        });
      }
    );
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

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; ++i) {
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

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; ++i) {
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

  static any(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      for (let i = 0; i < promises.length; ++i) {
        promises[i].then(
          (r) => {
            resolve(v);
          },
          (r) => {
            count++;
            if (count === promises.length) {
              reject(
                new AggregateError("No promise in Promise.any was resolved", r)
              );
            }
          }
        );
      }
    });
  }
}

const p = new Promise((resolve, reject) => {
  throw 111;
  return 1;
});

p.then((v) => {
  console.log(v);
});
