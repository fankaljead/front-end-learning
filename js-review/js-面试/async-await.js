/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-23 12:36:37
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-24 15:46:53
 * @FilePath: \js-review\js-面试\async-await.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

// 前言
// https://juejin.cn/post/6844904102053281806
const getData = () => {
  return new Promise((resolve) => setTimeout(() => resolve("data"), 1000));
};

async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}

// 这样的一个函数 应该再1秒后打印 data 再过一秒打印data2 最后打印success
test().then((res) => console.log(res));

(function () {
  function* testG() {
    // await被编译成了yield
    const data = yield getData();
    console.log("data: ", data);
    const data2 = yield getData();
    console.log("data2: ", data2);
    return "success";
  }

  const getData = () =>
    new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

  var test = asyncToGenerator(function* testG() {
    // await被编译成了 yield
    const data = yield getData();
    console.log("data: ", data);
    const data2 = yield getData();
    console.log("data2: ", data2);
    return "success";
  });

  test().then((res) => console.log(res));
})();

function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function () {
    // 先调用 generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments);

    // 返回一个 promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult;

        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val);
            },
            // 如果 promise被 reject了 就再次进入step函数
            // 不同的是，这次的 try catch中调用的是 gen.throw(err)
            // 那么自然就被 catch到 然后把 promise 给 reject掉啦
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }
      step("next");
    });
  };
}

(function () {
  function resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });
  }
  async function asyncCall() {
    console.log("calling");
    var result = await resolveAfter2Seconds();
    console.log(result);
    return result;
  }
  return asyncCall();
})();

(function () {
  function asyncToGenerator(generatorFunc = function () {}) {
    return function () {
      const gen = generatorFunc.apply(this, arguments);

      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let generatorResult;

          try {
            generatorResult = gen[key](arg);
          } catch (error) {
            reject(error);
          }

          const { value, done } = generatorResult;

          if (done) {
            return resolve(value);
          } else {
            return Promise.resolve(value).then(
              function onResolve(val) {
                step("next", val);
              },
              function onReject(err) {
                step("throw", err);
              }
            );
          }
        }
        step("next");
      });
    };
  }

  let gt = asyncToGenerator(() => {
    return 1;
  });
  
})();
