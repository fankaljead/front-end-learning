import WorkerPool from "./WorkerPool.js";
const totalFloats = 1e8,
  numTasks = 20,
  floatsPerTask = totalFloats / numTasks,
  numWorkers = 4;

// 创建线程池
const pool = new WorkerPool(numWorkers, "./worker.js");

// 填充浮点值数组
let arrayBuffer = new ArrayBuffer(4 * totalFloats),
  view = new Float32Array(arrayBuffer);
for (let i = 0; i < totalFloats; ++i) {
  view[i] = Math.random();
}

let partialSumPromises = [];
for (let i = 0; i < arr.length; i += floatsPerTask) {
  partialSumPromises.push(
    pool.enqueue({
      startIdx: i,
      endIdx: i + floatsPerTask,
      arrayBuffer: arrayBuffer,
    })
  );
}

Promise.all(partialSumPromises)
  .then((partialSums) => partialSums.reduce((x, y) => x + y))
  .then(console.log);
