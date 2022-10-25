/**
 * 自定义实现 forEach
 * @param {回调函数} callback
 * @param {*} self
 */
Array.prototype.myForEach = function (callback, self) {
  let _arr = [...this];
  for (let i = 0; i < _arr.length; ++i) {
    callback.call(self, _arr[i], i, _arr);
  }
};

// 实现跳出 使用 try catch 不够优雅
// 实际上使用 forEach 不用考虑跳出
// 跳出情况直接使用 for 循环
let arr = [...new Array(10).keys()];
try {
  arr.forEach((item) => {
    console.log(`item: ${item}`);
    if (item > 5) {
      throw new Error("break");
    }
  });
} catch (err) {
  if (err.message === "break") {
    console.log("break success");
  } else {
    console.error(err.errType);
  }
}
