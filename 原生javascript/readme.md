# 原生 JavaScript

[原生javascript b 站视频](https://www.bilibili.com/video/BV1vo4y1y7tD?spm_id_from=333.999.0.0)

## 1. V8 引擎工作流程

![image-20211115184850657](https://i.loli.net/2021/11/15/2Gwkd1EZgYT5hBM.png)

- Scanner 是一个扫描器，词法分析

    ```js
    const username = 'alishi';
    ```

    ![image-20211115184954238](https://i.loli.net/2021/11/15/UowdWJMQihrmgGV.png)

- Parser 是一个解析器

    ![image-20211115185128545](https://i.loli.net/2021/11/15/DqtQ3pfASu9n61z.png)

    - 预解析优点

        - 跳过未使用的代码
        - 不生成AST,创建无变量引用和声明的 scopes
        - 依据规范跑出特定错误
        - 解析速度更快

        ```js
        function func1() {
            console.log('fonc1');
        }
        function func2() {
            console.log('func2');
        }
        
        func2();
        ```

        这里对于 `func1` 生成 AST 没有意义

    - 全量解析

        - 解析被使用的代码
        - 生成 AST
        - 构建具体 scopes 信息，变量引用、声明等
        - 抛出所有语法错误

        ```js
        // 声明时未调用，因此会被认为是不被执行的代码，进行预解析
        function foo() {
            console.log('foo')
        }
        
        // 声明时未调用，因此会被认为是不被执行的代码，进行预解析
        function fn() {}
        
        // 函数立即执行，只进行一次全量解析
        (function bar() {
           
        })()
        
        // 执行 foo 那么需要重新对 foo 函数进行全量解析，此时 foo 函数被解析了两次
        foo()
        ```

- Ignition 是 V8 提供的一个 **解释器**

- TurboFan 是 V8 提供的 **编译器模块**

![image-20211115184850657](https://i.loli.net/2021/11/15/2Gwkd1EZgYT5hBM.png)



## 2. 堆栈操作

浏览器在内存层面的处理

从本质分析一段代码的执行过程，性能问题

- 堆栈准备

    - JS 执行环境

    - 执行环境栈 (ECStack, Execution Context Stack)

    - 执行上下文

        - 全局
        - 局部

    - VO(G)， 全局变量对象

    - `01-stack-init.js`

        ```js
        var x = 100;
        var y = x;
        console.log(x);
        ```

        ![image-20211115215601613](https://i.loli.net/2021/11/15/7vekiEGpxP5NQrj.png)

    1. 基本数据类型是按值进行操作
    2. 基本数据类型的值是存放在 栈区 的
    3. 无论我们看到的栈内存，还是后续引用类型会使用的堆内存都属于计算机内存
    4. GO() 全局对象
        1. 并不是 VO(G)
        2. 但也是一个对象
        3. 会有一个内存的空间地址
        4. 因为有地址就可以对其进行访问
        5. JS 会在 VO(G) 当中准备一个变量 `window`

    ![image-20211115220254834](https://i.loli.net/2021/11/15/oZntKaiFPAHIcf9.png)

## 3. 引用类型堆栈处理

```js
var obj1 = { x: 100 };
var obj2 = obj1;
obj2["x"] = 200;
console.log(obj1.x);
```

![image-20211115221146756](https://i.loli.net/2021/11/15/D8eAF1t5w2IHYVK.png)

```js
var obj1 = { x: 100 };
var obj2 = obj1;

// 1
// obj2["x"] = 200;

// 2
obj2 = {
  name: "alishi",
};

console.log(obj1.x);
```

![image-20211115221451598](https://i.loli.net/2021/11/15/bamYZksP2CLpT9M.png)

```js
var obj1 = { x: 100 };
var obj2 = obj1;
obj1.y = obj1 = { x: 200 };
console.log(obj1.y);
console.log(obj2);
```

![image-20211115221723012](https://i.loli.net/2021/11/15/27VHEfDnQFXKZeP.png)

![image-20211115222528204](https://i.loli.net/2021/11/15/n8y9dIWvt4Fc2xY.png)

- 这里 `obj1.y = obj1 = {x: 200}` 首先执行的是 `obj1.y` 
    - 会在堆内存中新开辟一块内存存放 `obj1.y` 如上图的 `0x001` 并赋值 为 `{x:200}`
    - 然后进行第二个等号赋值操作 `obj1 = {x: 200}`
    - 此时 `obj1` 就指向了 `0x001` ，此时无 `y` 属性
    - 所以最终的 `obj1.y` 的值为 `undefined` , `obj2` 的值为 `{x:100, y: {x: 200}}`

## 4. 函数堆栈处理

```js
var arr = ["zce", "alishi"];

function foo(obj) {
  obj[0] = "zoe";
  obj = ["拉勾教育"];
  obj[1] = "大前端";
  console.log(obj);
}

foo(arr);
console.log(arr);
```

![image-20211116104710257](https://i.loli.net/2021/11/16/JpiNL1b4VfcOo2C.png)

1. 函数创建
    1. 可以将函数名称看做变量，存放在 VO 中
    2. 同时值就是函数对应的内存地址
    3. 函数本身也是一个对象
    4. 创建时会有一个内存地址，空间内存放的就是函数体带代码 (字符串形式)

2. 函数执行
    1. 函数执行时会形成一个全新私有上下文，里面有一个 AO ，用于管理这个上下文的变量
    2. 步骤
        1. 作用域链 <当前执行上下文，上级作用域链所在上下文>
        2. 确定 `this`
        3. 初始化 `arguments` (对象)
        4. 形參复制：相当于变量生命，然后将声明的变量放于 AO
        5. 变量提升
        6. 代码执行

![image-20211116111510966](https://i.loli.net/2021/11/16/1e3CS9KNcruQjG8.png)

## 5. 闭包堆栈处理

```js
var a = 1;
function foo() {
  var b = 2;
  return function (c) {
    console.log(c + b++);
  };
}

var f = foo();
f(5);
f(10);
```

![image-20211116111817180](https://i.loli.net/2021/11/16/ByNoApKGnzmVFik.png)

![image-20211116115609618](https://i.loli.net/2021/11/16/CsnfdLtjXI5Mqap.png)

1. 闭包
    1. 一种机制：保护当前上下文中的变量于其他上下文中的变量互不干扰
    2. 当前上下文中的数据（堆内存）被当前上下文以外的上下文中的变量所引用，这个数据就保存下来
2. 函数调用形成了一个全新的私有上下文，在函数调用后当前上下文不被释放就是闭包（临时）

## 6. 闭包与垃圾回收 1

```js
let a = 1;
function foo(a) {
  return function (b) {
    console.log(b + ++a);
  };
}

var f = foo(10);
f(5);
foo(6)(7);
f(20);
console.log(a);
```

![image-20211116120713600](https://i.loli.net/2021/11/16/KWotSDAaX3kjlfZ.png)

1. 每一个函数执行时都有一个单独的执行上下文

## 7. 闭包与垃圾回收 2

```js
let a = 1;
function foo(a) {
  return function (b) {
    console.log(b + ++a);
  };
}

var f = foo(10);
f(5);
foo(6)(7);
f(20);
console.log(a);
```

1. 浏览器都有垃圾回收（内存管理）
2. 栈空间、堆空间
3. 堆：当前对内存如果被占用，就能被释放掉，但是我们如果确认后续不再使用这个内存的数据，也可以自己主动置空，然后浏览器就会对其进行回收
4. 栈：当前上下文中是否有内容，被其他上下文所占用的变量，如果有，则无法释放（闭包）



## 8. 循环添加事件实现

- `index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>08 循环添加事件</title>
        
      </head>
      <body>
        <button>按钮1</button>
        <button>按钮2</button>
        <button>按钮3</button>
          
        <script src="./07-add-event-loop.js"></script>
      </body>
    </html>
    ```

    

- `07-add-event-loop.js`

    ```js
    var aButtons = document.querySelectorAll("button");
    
    for (var i = 0; i < aButtons.length; i++) {
      aButtons[i].onclick = function () {
        console.log(`当前索引为 ${i}`);
      };
    }
    ```

    - 这里点击每个按钮的输出都是 3

        ![image-20211116160240046](https://i.loli.net/2021/11/16/Wlt7Ocqpx2wCsnZ.png)

    - 闭包

        ```js
        for (var i = 0; i < aButtons.length; i++) {
          (function (i) {
            aButtons[i].onclick = function () {
              console.log(`当前索引为 ${i}`);
            };
          })(i);
        }
        ```

        ```js
        for (var i = 0; i < aButtons.length; i++) {
          aButtons[i].onclick = (function (i) {
            return function () {
              console.log(`当前索引为 ${i}`);
            };
          })(i);
        }
        ```

        - es6 `let` 关键字

        ```js
        for (let i = 0; i < aButtons.length; i++) {
          aButtons[i].onclick = function () {
            console.log(`当前索引为 ${i}`);
          };
        }
        ```

    - 添加自定义属性

        ```js
        for (var i = 0; i < aButtons.length; i++) {
          aButtons[i].myIndex = i;
          aButtons[i].onclick = function () {
            console.log(`当前索引为 ${this.myIndex}`);
          };
        }
        ```

    

## 9. 底层执行分析

1. 基础

    ```js
    var aButtons = document.querySelectorAll("button");
    
    for (var i = 0; i < aButtons.length; i++) {
      aButtons[i].onclick = function () {
        console.log(`当前索引为 ${i}`);
      };
    }
    ```

    ![image-20211116162541157](https://i.loli.net/2021/11/16/Zch75KwjgzJ3mpS.png)

2. 闭包
    ```js
    var aButtons = document.querySelectorAll("button");
    
    for (var i = 0; i < aButtons.length; i++) {
      (function (i) {
        aButtons[i].onclick = function () {
          console.log(`当前索引为 ${i}`);
        };
      })(i);
    }
    ```
    
    ![image-20211116163744839](https://i.loli.net/2021/11/16/eJU8Br395A2vkld.png)

3. 添加属性（这个性能上更好）

    ```js
    var aButtons = document.querySelectorAll("button");
    
    for (var i = 0; i < aButtons.length; i++) {
      aButtons[i].myIndex = i;
      aButtons[i].onclick = function () {
        console.log(`当前索引为 ${this.myIndex}`);
      };
    }
    ```



## 10. 事件委托实现

- `index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>10 事件委托实现</title>
      </head>
      <body>
        <button index="1">按钮1</button>
        <button index="2">按钮2</button>
        <button index="3">按钮3</button>
        <script src="./07-add-event-loop.js"></script>
      </body>
    </html>
    
    ```

- `js`

    ```js
    document.body.onclick = function (ev) {
      var target = ev.target,
        targetDom = target.tagName;
      if (targetDom === "BUTTON") {
        var index = target.getAttribute("index");
        console.log(`当前点击的是 ${index}`);
      }
    };
    ```

    **采用事件委托方法是最优的**

​	

## 11. JSBench 使用

[JSBench](https://jsbench.me/)

## 12. 变量局部化

全局 --> 局部 这样可以提高代码的执行效率

减少了数据访问时需要查找的路径

- before 放在全局作用域

    - 循环次数越多，往上作用域查找次数越多
    
    ```js
    var i,
      str = "";
    
    function packageDom() {
      for (i = 0; i < 1000; i++) {
        str += i;
      }
    }
    
    packageDom();
    ```

- after 放在局部作用域

    ```js
    function packageDom() {
      let str = "";
      for (let i = 0; i < 1000; i++) {
        str += i;
      }
    }
    
    packageDom();
    ```

- 测试结果如下

​	![image-20211116175435110](https://i.loli.net/2021/11/16/dRnmA9p1gQDHjZN.png)

- 数据的存储和读取



## 13. 缓存数据

对于多次使用的数据进行提前保持，后续进行使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>13 缓存数据</title>
  </head>
  <body>
    <div class="skip" id="skip"></div>
    <script>
      var oBox = document.getElementById("skip");

      function hasClassName(ele, cls) {
        // 假设需要在当前函数中对 className 的值进行多次使用，可以提前缓存起来
        return ele.className == cls;
      }

      console.log(hasClassName(oBox, "skip"));

      function hasClassName(ele, cls) {
        var clsName = ele.className;
        return clsName == cls;
      }

      console.log(hasClassName(oBox, "skip"));
    </script>
  </body>
</html>
```

![image-20211116184047826](https://i.loli.net/2021/11/16/tRwvpeoHgX3yCSl.png)

1. 减少声明和语句数（词法 语法）
2. 缓存数据 （作用链查找变快）

- 减少访问层级

![image-20211116184725170](https://i.loli.net/2021/11/16/dUvJqxPMRuoWre9.png)

```js
function Person() {
  this.name = "zxh";
  this.age = 23;
}
let p = new Person();
console.log(p.name);

function Person2() {
  this.name = "zxh";
  this.age = 23;
  this.getName = function () {
    return this.name;
  };
}
let p2 = new Person2();
console.log(p2.getName());
```

![image-20211116185405110](https://i.loli.net/2021/11/16/9w1Uo8BmRW56HVL.png)

​	

## 14. 防抖与节流

1. 为什么：在一些高频率事件触发下，我们不希望对应的事件处理函数多次执行
2. 场景：
    1. 滚动事件
    2. 输入模糊匹配
    3. 轮播图切换
    4. 点击操作
    5. ...
3. 浏览器默认情况下都有自己的监听事件间隔 (4~6ms)，如果检测到多次事件的监听执行，那么就会造成不必要的资源浪费

- 前置场景：界面上有一个按钮，可以连续多次点击
- **防抖**：对于这个高频率操作来说，我们只希望识别一次，可以是第一次或最后一次
- **节流：** 对于高频操作，我们可以自己设定频率，让本来可以执行很多次的事件出发，按我们定义的频率减少触发的次数

## 15. 防抖函数实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>15 防抖函数实现</title>
  </head>
  <body>
    <button id="btn">点击</button>
    <script>
      var oBtn = document.getElementById("btn");

      // oBtn.onclick = function () {
      //   console.log("点击了");
      // };

      /**
       * handle 最终要执行的事件监听
       * wait 事件触发之后多久开始执行
       * immediate 控制执行是第一次还是最后一次，false 执行最后一次
       */
      function myDebounce(handle, wait = 300, immediate = false) {
        // 参数类型判断
        if (typeof handle !== "function")
          throw new Error("handle must be a function");
        if (typeof wait === "undefined") wait = 300;
        if (typeof wait === "boolean") {
          immediate = wait;
          wait = 300;
        }
        if (typeof immediate !== "boolean") {
          immediate = false;
        }

        let timer = null;
        return function proxy(...args) {
          let selft = this,
            init = immediate && !timer;
          clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            !immediate && handle.call(self, ...args);
          }, wait);
          init && handle.call(self, ...args);
        };
      }

      function btnClick(ev) {
        console.log("点击了", this, ev);
      }

      oBtn.onclick = myDebounce(btnClick, 200, false);
    </script>
  </body>
</html>

```

## 16. 节流函数实现

**节流** 在自定义的一段事件内让事件进行触发

![image-20211117114755570](https://i.loli.net/2021/11/17/fKos7YdRCV1mJyW.png)

![image-20211117115512514](https://i.loli.net/2021/11/17/BItsDrMn4cflRdh.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>16 节流函数实现</title>
    <style>
      body {
        height: 5000px;
      }
    </style>
  </head>
  <body>
    <script>
      function myThrottle(handle, wait) {
        if (typeof handle !== "function") {
          throw new Error("handle must be a function");
        }
        if (typeof wait === "undefined") {
          wait = 400;
        }

        let previous = 0; // 记录上一次执行时间
        let timer = null;

        return function proxy(...args) {
          let self = this;
          let now = new Date(); //记录
          let interval = wait - (now - previous);
          if (interval <= 0) {
            clearTimeout(timer); // 这个操作只是将操作系统中的定时器清除，但是 timer 值还在
            timer = null;
            //非高频操作
            handle.call(self, ...args);
            previous = new Date();
          } else if (!timer) {
            // 此时说明操作在频率时间范围内
            // 这个时候可以定义一个定时器，让 handle 在 interval 之后执行
            timer = setTimeout(() => {
              clearTimeout(timer); // 这个操作只是将操作系统中的定时器清除，但是 timer 值还在
              timer = null;
              handle.call(self, ...args);
              previous = new Date();
            }, interval);
          }
        };
      }

      function scrollFn() {
        console.log("滚动了");
      }
      // window.onscroll = scrollFn;
      window.onscroll = myThrottle(scrollFn, 600);
    </script>
  </body>
</html>
```

