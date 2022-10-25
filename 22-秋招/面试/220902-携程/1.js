const PENDING = "pendeng";
const FULFILLED = "fuifilled";
const REJECTED = "rejected";

// new Promise((resolvem resject)=>{})
function Promise(executor) {
  this.promiseState = PENDING;
  this.promiseData;

  this.callbacks = [];

  const resolve = (v) => {
    if (this.promiseState === PENDING) {
      this.promiseState = FULFILLED;
      this.callbacks.forEach((callback) => {
        callback.onResolved();
      });
      this.promiseData = v;
    }
  };

  const reject = (r) => {
    if (this.promiseState === PENDING) {
      this.promiseState = REJECTED;
      this.callbacks.forEach((callback) => {
        callback.onRejected();
      });
      this.promiseData = r;
    }
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (typeof onResolved !== "function") {
    onResolved = (v) => v;
  }
  if (typeof onRejected !== "function") {
    onResolved = (e) => {
      throw new Error(e);
    };
  }

  const self = this;

  return new Promise((onResolved, onRejected) => {
    if (self.promiseState === PENDING) {
      self.callbacks.push({
        onResolved,
        onRejected,
      });
    }

    if (self.promiseState === FULFILLED) {
      const d = self.promiseData;

      if (d instanceof Promise) {
        d.then(
          (v) => {
            onResolved(v);
          },
          (r) => {
            onRejected(r);
          }
        );
      } else {
        self.callbacks({
          onResolved,
          onRejected,
        });
      }
    }

    if (self.promiseState === REJECTED) {
      const d = self.promiseData;

      if (d instanceof Promise) {
        d.then(
          (v) => {
            onResolved(v);
          },
          (r) => {
            onRejected(r);
          }
        );
      }
    }
  });
};
