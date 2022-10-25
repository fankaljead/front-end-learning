class Emitter {
  constructor(max) {
    this.max = max;
    this.syncIdx = 0;
    this.asyncIdx = 0;
  }

  *[Symbol.iterator]() {
    while (this.syncIdx < this.max) {
      yield this.syncIdx++;
    }
  }

  async *[Symbol.asyncIterator]() {
    while (this.asyncIdx < this.max) {
      if (this.asyncIdx < 6) {
        yield new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.asyncIdx++);
          }, Math.random() * 1000);
        });
        // yield this.asyncIdx++;
      } else {
        throw "Exited loop";
      }
    }
  }
}

const emitter = new Emitter(5);

function syncCount() {
  const syncCounter = emitter[Symbol.iterator]();
  for (const x in syncCounter) {
    console.log(x);
  }
}

async function asyncCount() {
  const asyncCounter = emitter[Symbol.asyncIterator]();
  // const syncCounter = emitter[Symbol.iterator]();
  for await (const x of asyncCounter) {
    console.log(x);
  }

  // setTimeout(() => {
  //   console.log(asyncCounter.next());

  //   console.log(asyncCounter.next());
  // }, 10000);
}

// syncCount();
asyncCount();
