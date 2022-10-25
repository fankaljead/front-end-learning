# 第12章 BOM

浏览器对象模型 BOM, Browser Object Model



BOM 是使用 JavaScript 开发 Web 应用程序的核心

## 12.1 window 对象

**BOM 的核心是 `window` 对象，表示浏览器的实例**。 `window` 对象在浏览器中有两重身份，意思 ECMAScript中的 `Global` 对象，另一个就是浏览器窗口中的 JavaScript 接口。网页中定义的所有对象、变量和函数都以 `window` 作为其 `Global` 对象，都可以访问其上定义的 `parseInt()` 等全局方法

![image-20211212204102950](C:\Users\72867\AppData\Roaming\Typora\typora-user-images\image-20211212204102950.png)

- Global 作用域

  - 通过 **`var`** 声明的所有全局变量和函数都会变成 `window` 对象的属性和方法，如果使用 `const` 或者 `let` 代替 `var` ，则不会把变量添加给全局对象

  - 窗口关系

    - `top` 对象始终指向最上层（最外层）窗口，即浏览器本身
    - `parent` 对象始终指向当前窗口的父窗口，如果当前窗口是最上层窗口，则 `parent` 等于 `top` 都等于 `window`
    - 最上层的 `window` 如果不是通过 `window.open()` 打开的，那么其 `name` 属性就不会包含值
    - `self` 对象始终指向 `window`

  - 窗口位置与像素比

    - `screenLeft` 窗口相对于屏幕左侧
    - `screenTop` 窗口相对于屏幕顶部，返回值得单位为 CSS 像素
    - `moveTo(x, y)` `moveBy(x, y)` 移动窗口
    - DPI 表示单位像素密度
    - `window.devicePixelRatio` 表示物理像素与逻辑像素之间的缩放系数

  - 窗口大小

    - `outerWidth, outerHeight` 返回浏览器窗口自身的大小
    - `innerWidth, innerHeight` 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）
    - `document.documentElement.clientWidth, Height` 返回页面视口的宽度和高度

  - 视口位置

    - `scroll(x, y)` 滚动页面

    - `scrollTo(x, y)`

    - `scrollBy(x, y)`

      ```javascript
      // 正常滚动
      window.scrollTo({
          left: 100,
          top: 100,
          behavior: 'auto'
      });
      
      // 平滑滚动
      window.scrollTo({
          left: 100,
          top: 100,
          behavior: 'smooth'
      });
      ```

  - 导航映射打开新窗口

    - `window.open()` 用于导航至指定 URL，也可以打开新的浏览器窗口，接收四个参数
      - 要加载的 URL
      - 目标窗口
          - `_self`
          - `_parent`
          - `_top`
          - `_blank`
      - 特性字符串
          - `fullscreen`
          - `height`
          - `left`
          - `location`
      - 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值
  
  - 定时器
  
    JavaScript 维护了一个任务队列。其中的任务会按照添加到队列的先后顺序执行，setTimeout()的第二个参数只是告诉 JavaScript 引擎在指定的毫秒数过后把任务添加到这个队列。如果队列是空的，则会立即执行该代码。如果队列不是空的，则代码必须等待前面的任务执行完才能执行  
  
    - `setTimeout()` 用于指定在一定时间后执行的代码，
      - 参数：
        - 包含JavaScript代码的字符串，或者一个函数
        - 等待的毫秒数，向等待队列中添加任务
      
      - 返回值： 表示该超时排期的数值 ID，可以调用 `clearTimeout()`方法传入超时ID，取消等待中的排期任务
      
          ```html
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>12.1.7 定时器</title>
            </head>
            <body>
              <script>
                let start = new Date();
                console.log("000");
                console.log(new Date().getTime());
          
                setTimeout(() => {
                  console.log("111");
                  console.log(new Date().getTime());
                  setTimeout(() => {
                    console.log("222");
                    console.log(new Date().getTime());
                  }, 1000);
                }, 1000);
          
                setTimeout(() => {
                  console.log("333");
                  console.log(new Date().getTime());
                }, 2000);
          
                let end = new Date();
              </script>
            </body>
          </html>
          ```
      
          ![image-20211213161954059](https://s2.loli.net/2021/12/13/Yir6327pDnwRy5h.png)
      
      - `setTimeout`  中的 `this`
      
          - 非严格模式下始终指向 `window`
          - 严格模式下为 `undefined`
          - 如果是箭头函数，那么 `this` 会保留为定义它时所在的词法作用域
      
    - `setInterval()` 用于指定每隔一段时间执行的代码
  
  - 系统对话框
  
    - `alert()` 
    - `confirm()`
    - `prompt()`
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>12.1.8 系统对话框</title>
      </head>
      <body>
        <input type="button" value="确认框" id="confirmBtn" />
        <input type="button" value="提示框" id="promptBtn" />
        <script>
          let confirmBtn = document.getElementById("confirmBtn");
          confirmBtn.addEventListener("click", function (e) {
            if (confirm("Are you sure?")) {
              console.log("I'm so glad you're sure!");
            } else {
              console.log("I'm sorry to hear you're not sure");
            }
          });
          let promptBtn = document.getElementById("promptBtn");
          promptBtn.addEventListener("click", function (e) {
            let result = prompt("What is your name?", "zxh");
            if (result) {
              console.log("welcome:", result);
            }
          });
        </script>
      </body>
    </html>
    ```
    
    

## 12.2 location

**`location`** **对象是最有用的BOM对象之一**，提供了当前窗口中加载文档的信息，以及通常的导航功能，这个对象既是 `window` 的属性，也是 `document` 的属性，

- `location` 对象不仅保存着当前加载文档的信息，也保存在把 URL 解析为离散片段后能够通过属性访问的信息
  - `location.hash`
  - `location.host`
  - `location.hostname`
  - `location.href`
  - `location.pathname`
  - `location.port`
  - `location.protocol`
  - `location.search`
  - `location.username`
  - `locatiion.passwd`
  - `location.origin`

- `location.search` 查询字符串返回了从问号开始直到URL末尾的所有内容

  ```javascript
  // location.search
  let getQueryStringQrgs = function() {
      let gs = (location.search.length > 0 ? location.search.substring(1) : ""),
      args = {};
      for (const item of qs.split("&").map(kv => kv.split("="))) {
          let name = decodeURIComponent(item[0]);
          let value = decodeURIComponent(item[1]);
          if (name.length) {
              args[name] = value
          }
      }
  
      return args;
  }
  ```

  - `URLSearchParams` 提供了一组标准的API方法，可以检查和修改查询字符串

    ```javascript
    // URLSearchParams
    let qs = "?q=javascript&num=10";
    
    let searchParams = new URLSearchParams(qs);
    
    console.log(searchParams.toString());
    console.log(searchParams.has("num"));
    console.log(searchParams.get("num"));
    
    searchParams.set("page", 3);
    console.log(searchParams.toString());
    
    searchParams.delete("q");
    console.log(searchParams.toString());
    ```

    ![image-20210826154315411](https://i.loli.net/2021/08/26/r1lZMsufYyAcJON.png)

- **操作地址**

    - `locaiton.assign` 会立即启动导航到新 URL ，同时在浏览器历史记录中增加一条记录

        ```js
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>12.2.2 操作地址</title>
          </head>
          <body>
            <button id="btn">操作地址</button>
            <script>
              let btn = document.querySelector("#btn");
              btn.addEventListener("click", function (e) {
                location.assign("https://zhouxianghui.xyz");
              });
            </script>
          </body>
        </html>
        ```

        

    - `location.href` 最常见

    - `window.location`

    - 修改 `location` 对象的属性也会修改当前加载的页面，包括 `hash, search, hostname, pathname, port`

        - 除了 `hash` 之外，只要修改 `location` 的一个属性，就会导致页面重新加载新 URL

    - 使用 `location.replace()` 导航到一个新页面，但是不增加历史记录，但是不能回到前一页

    - `location.reload()` 重新加载当前显示的页面，调用 `reload()` 而不传参数，页面会以最有效的方式重新加载

        - 给 `reload(true)` 可以强制从服务器上重新加载，最好作为最后一行代码


## 12.3 navigator

`navigator` 是有 Netscape Navigator 2 最早引入浏览器，现在已经成为客户端标识浏览器的标准。只要浏览器启用 JavaScript，`navigator` 对象就一定存在。每个浏览器都支持自己的属性。

`navigator` **对象的属性通常用于确定浏览器的类型**

![image-20211213172147779](https://s2.loli.net/2021/12/13/QzBLJY6hjVOFgIS.png)

![image-20211213172210392](https://s2.loli.net/2021/12/13/qDxgNiQ1z7CVYZO.png)

### 13.3.1 检测插件

检测浏览器是否安装某个插件时开发中常见的需求。除了 IE10 及更低版本的浏览器，都可以通过 `plugins` 数组确定，数组的每一项都包含：

- `name` : 插件名称
- `description`: 插件介绍
- `filename`: 插件的文件名
- `length`: 由当前插件处理的 MIME 类型数量

通常 `name` 属性包含识别插件所需的必要信息，检测插件就是遍历浏览器中可用的插件，并逐个比较插件的名称：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>12.3.1 检测插件</title>
  </head>
  <body>
    <script>
      let hasPlugin = function (name = "") {
        name = name.toLocaleLowerCase();
        for (const plugin of window.navigator.plugins) {
          if (plugin.name.toLocaleLowerCase().indexOf(name) > -1) {
            return true;
          }
        }
        return false;
      };
      console.log(hasPlugin("Flash"));
      console.log(hasPlugin("QuickTime"));
    </script>
  </body>
</html>
```

- 旧版本IE中的插件检测

```js
function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (e) {
        return false;
    }
}
```

### 12.3.2 注册处理程序

现代浏览器支持 `navigator` 上的 `registerProtocalHandler()` 方法，这个方法可以把一个网站注册为特定类型的应用程序。参数包括：

1. 要处理的协议 例如 `mailto` 或 `ftp`
2. 处理该协议的URL
3. 应用名称

例如，把一个 Web 程序注册为默认邮件客户端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>13.3.2 注册处理程序</title>
  </head>
  <body>
    <script>
      navigator.registerProtocolHandler(
        "mailto",
        "http://www.somemailclient.com?cmd=%s",
        "some mail client"
      );
    </script>
  </body>
</html>
```

其中第二个参数时负责处理请求的 URL， `%s` 表示原始的请求

## 12.4 screen

window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用到的 JavaScript 对象。保存的是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，例如像素宽度和像素高度。

![image-20211214102705732](https://s2.loli.net/2021/12/14/9iB4G15znYwXbgL.png)

![image-20211214102840000](https://s2.loli.net/2021/12/14/PLdmV2E6iIfyGlF.png)

## 12.5 history

history 对象表示当前窗口首次使用以来的用户导航记录。每个 window 都有自己的 history 对象。这个对象不会暴露用户访问过的 URL，当可以通过他在不知道URL的情况下前进和后退。

### 12.5.1 导航

- `go()` 方法可以在用户历史记录中沿任何方向导航，可以前进也可以后退。接收一个参数，表示前进或后退多少步。
- `forward()` 前进一页
- `back()` 后退一页
- `history.length` 表示历史记录中由多个条目，反映历史记录的数量，包括可以前进和后退的页面。

### 12.5.2 历史状态管理

`history.pushState()` 可以改变浏览器 URL 而不会加载新页面，接收三个参数：

1. 一个 state 对象
2. 一个新状态的标题
3. 一个可选的相对 URL

- `pushState()` 方法执行后，状态信息就会被推到历史记录里，浏览器地址栏也会改变以反映新的相对 URL。除了这些变化之外，即使 `location.href` 返回的是地址栏的内容，浏览器也不会向服务器发送请求。

- `pushState()` 会创建新的历史记录，所以后相应地启用后退按钮，此时，单击后退按钮，就会触发 window 对象上的 `popstate` 事件。popstate 事件的事件对象有一个 state 属性，就是通过 pushState() 第一个参数传入的 state 对象：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>12.5.2 历史状态管理</title>
  </head>
  <body>
    <input type="button" value="push state" id="btn" />
    <script>
      let btn = document.querySelector("#btn");
      btn.addEventListener("click", (e) => {
        let stateObject = { foo: "bar" };
        history.pushState(
          stateObject,
          "my title",
          "13.3.2-注册处理程序.html"
        );
      });

      window.addEventListener("popstate", (e) => {
        let { state } = e;
        console.log("state:", state);
      });
    </script>
  </body>
</html>
```

![image-20211214144152468](https://s2.loli.net/2021/12/14/dGZVsWN3yrgYCcE.png)
