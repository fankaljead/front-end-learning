# 第20章 JavaScript API

## 20.1 Atomics and SharedArrayBuffer

多个上下文访问 SharedArrayBuffer 时，如果同时对缓冲区执行操作，就可能出现资源争用问题。 Atomics API 通过强制同一时刻只能对缓冲区执行一个操作，可以让多个上下文安全地读写一个SharedArrayBuffer。 Atomics API 是 ES2017 中定义的。  



原子操作的本质会排斥操作系统或计算机硬件通常会自动执行的优化（比如指令重新排序）。原子操作也让并发访问内存变得不可能，如果应用不当就可能导致程序执行变慢。

**为此， Atomics API 的设计初衷是在最少但很稳定的原子行为基础之上，构建复杂的多线程 JavaScript 程序。**  

### 20.1.1 SharedBufferArray

SharedArrayBuffer 与 ArrayBuffer 具有同样的 API。二者的主要区别是 ArrayBuffer 必须在不同执行上下文间切换， **SharedArrayBuffer 则可以被任意多个执行上下文同时使用。**  



在多个执行上下文间共享内存意味着并发线程操作成为了可能。传统 JavaScript 操作对于并发内存访 问 导 致 的 资 源 争 用 没 有 提 供 保 护 。 下 面 的 例 子 演 示 了 4 个 专 用 工 作 线 程 访 问 同 一 个SharedArrayBuffer(等同于 ArrayBuffer) 导致的资源争用问题：  

```javascript
// SharedBufferArray
const wokerScript = `
self.onmessage = ({data}) => {
    const view = new Uint32Array(data);

    // 执行 1 000 000 次 加操作
    for (let i = 0; i < 1e6; ++i) {
        // 线程不安全操作会导致资源争用
        view[0] += 1;
    }

    self.postMessage(null);
}
`;

const workerScriptBlobUrl = URL.createObjectURL(new Blob([wokerScript]));

// 创建容量为 4 的工作线程池
const workers = [];
for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl));
}

// 在最后一个线程完成后打印最终值
let responseCount = 0;
for (const worker of workers) {
    worker.onmessage = () => {
        if (++responseCount == workers.length) {
            console.log(`Final buffer value: ${view[0]}`);
        }
    }
}

// 初始化 SharedBufferArray
const sharedArrayBuffer = new SharedArrayBuffer(4);
const view = new Uint32Array(sharedArrayBuffer);

// 把 SharedArrayBuffer 发送到每个工作线程
for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer);
}

// 期待结果为 4000001
```

为解决这个问题， Atomics API 应运而生。 Atomics API 可以保证 SharedArrayBuffer 上的JavaScript 操作是线程安全的。  



**注意 SharedArrayBuffer API 等同于 ArrayBuffer API，**  

### 20.1.2 原子操作基础

任何全局上下文中都有 Atomics 对象，这个对象上暴露了用于执行线程安全操作的一套静态方法，其中多数方法以一个 TypedArray 实例（一个 SharedArrayBuffer 的引用）作为第一个参数，以相关操作数作为后续参数。  



1. **算数及位操作方法**

   Atomics API 提供了一套简单的方法用以执行就地修改操作。在 ECMA 规范中，这些方法被定义为AtomicReadModifyWrite 操作。在底层，这些方法都会从 SharedArrayBuffer 中某个位置读取值，然后执行算术或位操作，最后再把计算结果写回相同的位置。这些操作的原子本质意味着上述读取、修改、写回操作会按照顺序执行，不会被其他线程中断。  

   以下代码演示了所有算数方法：

   ```javascript
   // 创建大小为 1 的缓冲区
   let sharedArrayBuffer = new SharedArrayBuffer(1);
   
   // 基于缓冲创建 Uinit8Array
   let typedArray = new Uint8Array(sharedArrayBuffer);
   
   // 所有 ArrayBuffer 全部初始化为 0
   console.log(typedArray);
   
   const index = 0;
   const increment = 5;
   
   // 对索引 0 处的值执行原子加 5
   Atomics.add(typedArray, index, increment);
   
   console.log(typedArray);
   
   // 对索引 0 处的值执行原子减 5
   Atomics.sub(typedArray, index, increment);
   
   console.log(typedArray);
   ```

   ![image-20210901110409918](https://i.loli.net/2021/09/01/xbrwZL7gK369hWN.png)

2. **原子读和写**

   浏览器的 JavaScript 编译器和 CPU 架构本身都有权限重排指令以提升程序执行效率。正常情况下，JavaScript 的单线程环境是可以随时进行这种优化的。但多线程下的指令重排可能导致资源争用，而且极难排错 。

   Atomics API 通过两种主要方式解决了这个问题。  

   - 所有原子指令相互之间的顺序永远不会重排  
   - 使用原子读或原子写保证所有指令（包括原子和非原子指令）都不会相对原子读/写重新排序。这意味着位于原子读/写之前的所有指令会在原子读/写发生前完成，而位于原子读/写之后的所有指令会在原子读/写完成后才会开始  

   除了读写缓冲区的值， Atomics.load()和 Atomics.store()还可以构建“代码围栏”。 JavaScript引擎保证非原子指令可以相对于 load()或 store()本地重排，但这个重排不会侵犯原子读/写的边界。以下代码演示了这种行为：  

   ```javascript
   // 原子读和写
   const sharedArrayBuffer = new SharedArrayBuffer(4);
   const view = new Uint32Array(sharedArrayBuffer);
   
   // 执行非原子写
   view[0] = 1;
   
   // 非原子写可以保证在这个读操作之前完成，因此这里一定会读到 1
   console.log(Atomics.load(view, 0));; // 1
   
   // 执行原子写
   Atomics.store(view, 0, 2);
   
   // 非原子读可以保证在原子写完成后发生，因此这里一定会读到 2
   console.log(view[2]); // 2
   ```

   ![image-20210901151550578](https://i.loli.net/2021/09/01/1KqMYtiyWT2LV3G.png)

3. **原子交换**

   为 了 保 证 连 续 、 不 间 断 的 先 读 后 写 ， Atomics API 提 供 了 两 种 方 法 ： `exchange() `和 `compareExchange()`。` Atomics.exchange()` 执行简单的交换，以保证其他线程不会中断值的交换：  

   ```javascript
   // 原子交换
   const sharedArrayBuffer = new SharedArrayBuffer(4);
   const view = new Uint32Array(sharedArrayBuffer);
   
   // 在索引 0 处写入 3
   Atomics.store(view, 0, 3);
   
   // 从索引 0 处读取值，然后在索引 0 处写入4
   console.log(Atomics.exchange(view, 0, 4));
   
   // 从索引 0 处读取值
   console.log(Atomics.load(view, 0));
   ```

   ![image-20210901152146520](https://i.loli.net/2021/09/01/WCdfhqxujlcEJak.png)

   在多线程程序中，一个线程可能只希望在上次读取某个值之后没有其他线程修改该值的情况下才对共享缓冲区执行写操作。如果这个值没有被修改，这个线程就可以安全地写入更新后的值；如果这个值 被修改了，那么执行写操作将会破坏其他线程计算的值。对于这种任务， Atomics API 提供了 ompareExchange()方法。这个方法只在目标索引处的值与预期值匹配时才会执行写操作   

   ```javascript
   const sharedArrayBuffer = new SharedArrayBuffer(4);
   const view = new Uint32Array(sharedArrayBuffer);
   
   // 在索引 0 处写入 5
   Atomics.store(view, 0, 5);
   // 从缓冲区读值
   let initial = Atomics.load(view, 0);
   
   // 对这个值执行非原子操作
   let result = initial**2;
   
   // 只在缓冲区未被修改是才会想缓冲区写入新值
   Atomics.compareExchange(view, 0, initial, result);
   
   // 检查写入成功
   console.log(Atomics.load(view, 0));
   ```

   ![image-20210901153447429](https://i.loli.net/2021/09/01/4w5K6dht2e7TgxL.png)

4. **原子 Futex 操作与加锁**

   如果没有某种锁机制，多线程程序就无法支持复杂需求。为此， Atomics API 提供了模仿 Linux Futex（ **快速用户空间互斥量**， fast user-space mutex）的方法。这些方法本身虽然非常简单，但可以作为更复杂锁机制的基本组件  

   **注意 所有原子 Futex 操作只能用于 Int32Array 视图。而且，也只能用在工作线程内部。  **

   Atomics.wait()和 Atomics.notify()通过示例很容易理解。下面这个简单的例子创建了 4 个工作线程，用于对长度为 1 的 Int32Array 进行操作。这些工作线程会依次取得锁并执行自己的加操作：  

   ```javascript
   // 原子 Futex 操作与加锁
   const workerScript = `
   self.onmessage = ({data}) => {
       const view = new Int32Array(data);
   
       console.log('Waiting to obtain lock');
   
       // 遇到初始值则停止 10000 毫秒超时
       Atomics.wait(view, 0, 0, 1e5);
   
       console.log('Obtained lock');
   
       // 在索引 0 处加1
       Atomics.add(view, 0, 1);
   
       console.log('Releasing lock');
   
       // 只允许 1 个工作线程继续执行
       Atomics.notify(view, 0, 1);
   
       self.postMessage(null);
   };
   `;
   
   const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
   
   const workers = [];
   for (let i = 0; i < 4; ++i) {
       workers.push(new Worker(workerScriptBlobUrl));
   }
   
   // 在最后一个工作线程完成后打印最终值
   let responseCount = 0;
   for (const worker of workers) {
       worker.onmessage = () => {
           if (++responseCount == workers.length) {
               console.log(`Final buffer value: ${view[0]}`);
           }
       };
   }
   
   // 初始化 SharedArrayBuffer
   const sharedArrayBuffer = new SharedArrayBuffer(8);
   const view = new Int32Array(sharedArrayBuffer);
   
   // 把 SharedArrayBuffer 发送到每个工作线程
   for (const worker of workers) {
       worker.postMessage(sharedArrayBuffer);
   }
   
   // 1000 毫秒后释放第一个值
   setTimeout(() => {
       Atomics.notify(view, 0, 1);
   }, 1000);
   ```

   因为是使用 0 来初始化 SharedArrayBuffer，所以每个工作线程都会到达 Atomics.wait()并停止执行。在停止状态下，执行线程存在于一个等待队列中，在经过指定时间或在相应索引上调用Atomics.notify() 之 前 ， 一 直 保 持 暂 停 状 态 。 1000 毫 秒 之 后 ， 顶 部 执 行 上 下 文 会 调 用Atomics.notify()释放其中一个等待的线程。这个线程执行完毕后会再次调用 Atomics.notify()释放另一个线程。这个过程会持续到所有线程都执行完毕并通过 postMessage()传出最终的值。  

   

## 20.2 跨上下文消息

**跨文档消息**，有时候也简称为 XDM（ cross-document messaging），是一种在不同执行上下文（如不同工作线程或不同源的页面）间传递信息的能力。例如， www.wrox.com 上的页面想要与包含在内嵌窗格中的 p2p.wrox.com 上面的页面通信。在 XDM 之前，要以安全方式实现这种通信需要很多工作。 XDM以安全易用的方式规范化了这个功能。  



**注意 跨上下文消息用于窗口之间通信或工作线程之间通信。**



XDM 的核心是 **postMessage()方法。除**了 XDM，这个方法名还在 HTML5 中很多地方用到过，但目的都一样，都是**把数据传送到另一个位置**。  



`postMessage()` 方法接收 3 个参数：**消息、表示目标接收源的字符串和可选的可传输对象的数组**（只与工作线程相关）。第二个参数对于安全非常重要，其可以限制浏览器交付数据的目标。  

```javascript
// 跨文档消息
let iframeWindow = document.getElementById('myframe').contentWindow;
iframeWindow.postMessage('A secret', 'http://www.wrox.com');
```

最后一行代码尝试向内嵌窗格中发送一条消息，而且指定了源必须是"http://www.wrox.com"。如果源匹配，那么消息将会交付到内嵌窗格；否则， postMessage()什么也不做。这个限制可以保护信息不会因地址改变而泄露。如果不想限制接收目标，则可以给 postMessage()的第二个参数传"*"，但不推荐这么做。  



接收到 XDM 消息后， window 对象上会触发 message 事件。这个事件是异步触发的，因此从消息发出到接收到消息（接收窗口触发 message 事件）可能有延迟。传给 onmessage 事件处理程序的 event  对象包含以下 3 方面重要信息  

- `data ` 作为第一个参数传递给 postMessage()的字符串数据  
- `origin` 发送消息的文档源，例如"http://www.wrox.com"  
- `source` 发送消息的文档中 window 对象的代理。这个代理对象主要用于在发送上一条消息的窗口中执行 postMessage()方法。如果发送窗口有相同的源，那么这个对象应该就是 window对象  

接收消息之后验证发送窗口的源是非常重要的。与 postMessage()的第二个参数可以保证数据不会意外传给未知页面一样，在 onmessage 事件处理程序中检查发送窗口的源可以保证数据来自正确的地方。基本的使用方式如下所示：  

```javascript
window.addEventListener('message', (event) => {
    // 确保来自预期发送者
    if (event.origin == 'http://www.wrox.com') {
        // 对数据进行一些处理
        processMessage(event.data);
        // 可选 想来源窗口发送一条消息
        event.source.postMessage("Recieved!", 'httpL//p2p.wrox.com');
    }
})
```

大多数情况下， **event.source 是某个 window 对象的代理**，而非实际的 window 对象。因此不能通过它访问所有窗口下的信息。最好只使用 postMessage()，这个方法永远存在而且可以调用。  



XDM 有一些怪异之处。首先， postMessage()的第一个参数的最初实现始终是一个字符串。后来，第一个参数改为允许任何结构的数据传入，不过并非所有浏览器都实现了这个改变。为此，最好就是只通 过 postMessage() 发 送 字 符 串 。 如 果 需 要 传 递 结 构 化 数 据 ， 那 么 最 好 先 对 该 数 据 调 用
JSON.stringify()，通过 postMessage()传过去之后，再在 onmessage 事件处理程序中调用JSON.parse()。  



在通过内嵌窗格加载不同域时，使用 XDM 是非常方便的。这种方法在混搭（ mashup）和社交应用中非常常用。通过使用 XDM 与内嵌窗格中的网页通信，可以保证包含页面的安全。 XDM 也可以用于同源页面之间通信。  

## 20.3 Encoding API

Encoding API 主要用于实现**字符串与定型数组**之间的转换。规范新增了 4 个用于执行转换的全局类：`TextEncoder、 TextEncoderStream、 TextDecoder` 和 `TextDecoderStream  `



**注意** 相比于**批量（ bulk）**的编解码，对**流（ stream**）编解码的支持很有限  

### 20.3.1 文本编码

Encoding API 提供了两种将字符串转换为定型数组二进制格式的方法：**批量编码和流编码**。把字符串转换为定型数组时，编码器始终使用 UTF-8。  1

1. **批量编码**

   所谓批量，指的是 JavaScript 引擎会同步编码整个字符串。对于非常长的字符串，可能会花较长时间。批量编码是通过 TextEncoder 的实例完成的： 

   ```javascript
   const textEncoder = new TextEncoder();
   ```

   这个实例上有一个 encode()方法，该方法接收一个字符串参数，并以 Uint8Array 格式返回每个字符的 UTF-8 编码：  

    ```javascript
   // 批量编码
   const textEncoder = new TextEncoder();
   const decodedText = 'foo';
   const encodedText = textEncoder.encode(decodedText);
   
   // f 的 UTF-8 编码是 0x66 (十进制 102)
   // o 的 UTF-8 编码是 0x6F (十进制 111)
   console.log(encodedText);
    ```

   ![image-20210901163459531](https://i.loli.net/2021/09/01/XHwg25de3tOR4yh.png)

   编码器是用于处理字符的，有些字符（如表情符号）在最终返回的数组中可能会占多个索引  

   ```javascript
   // 批量编码
   const textEncoder = new TextEncoder();
   const decodedText = '☺';
   const encodedText = textEncoder.encode(decodedText);
   
   console.log(encodedText);
   ```

   ![image-20210901163743161](https://i.loli.net/2021/09/01/1hsW9LukyYBVtoU.png)

   编码器实例还有一个 encodeInto()方法，该方法接收一个字符串和目标 Unit8Array，返回一个字典，该字典包含 read 和 written 属性，分别表示成功从源字符串读取了多少字符和向目标数组写入了多少字符。如果定型数组的空间不够，编码就会提前终止，返回的字典会体现这个结果：  

   ```javascript
   const textEncoder = new TextEncoder();
   const fooArr = new Uint8Array(3);
   const barArr = new Uint8Array(2);
   const fooResult = textEncoder.encodeInto('foo', fooArr);
   const barResult = textEncoder.encodeInto('bar', barArr);
   
   console.log(fooArr);
   console.log(fooResult);
   
   console.log(barArr);
   console.log(barResult);
   ```

   ![image-20210901164253747](https://i.loli.net/2021/09/01/NlordAQpSiem6a5.png)

   encode()要求分配一个新的 Unit8Array， encodeInto()则不需要。对于追求性能的应用，这个差别可能会带来显著不同。  

2. **流编码**

   TextEncoderStream 其实就是 TransformStream 形式的 TextEncoder。将解码后的文本流通过管道输入流编码器会得到编码后文本块的流：

   ```javascript
   // 流编码
   async function* chars() {
       const decodedText = 'foo';
       for (let char of decodedText) {
           yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
       }
   }
   
   const decodedTextStream = new ReadableStream({
       async start(controller) {
           for await (let chunk of chars()) {
               controller.enqueue(chunk);
           }
   
           controller.close();
       }
   })
   
   const encodedTextStream = decodedTextStream.pipeThrough(new TextEncoderStream());
   
   const readableStreamDefaultReader = encodedTextStream.getReader();
   
   (async function() {
       while (true) {
           const {done, value} = await readableStreamDefaultReader.read();
   
           if (done) {
               break;
           } else {
               console.log(value);
           }
       }
   })();
   ```

### 20.3.2 文本解码

Encoding API 提供了两种将定型数组转换为字符串的方式：批量解码和流解码。与编码器类不同，在将定型数组转换为字符串时，解码器支持非常多的字符串编码，可以参考 Encoding Standard 规范的“Names and labels”一节。  



1. **批量解码**

   所谓批量，指的是 JavaScript 引擎会同步解码整个字符串。对于非常长的字符串，可能会花较长时间。批量解码是通过 TextDecoder 的实例完成的：  

   ```javascript
   const textDecoder = new TextDecoder();
   ```

   这个实例上有一个 decode()方法，该方法接收一个定型数组参数，返回解码后的字符串：  

   ```javascript
   const textDecoder = new TextDecoder();
   
   const encodedText = Uint8Array.of(102, 111, 111);
   const decodedText = textDecoder.decode(encodedText);
   
   console.log(decodedText); // foo
   ```

   ![image-20210901204130790](https://i.loli.net/2021/09/01/QEugBClWwZbxe5D.png)

   

2. **流编码**

   TextDecoderStream 其实就是 TransformStream 形式的 TextDecoder。将编码后的文本流通过管道输入流解码器会得到解码后文本块的流：  

   ```javascript
   // 流编码
   async function* chars() {
       // 每个块必须是一个定型数组
       const encodedText = [102, 111, 111].map((x) => Uint8Array.of(x));
   
       for (let char of encodedText) {
           yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
       }
   }
   
   const encodedTextStream = new ReadableStream({
       async start(controller) {
           for await (let chunk of chars()) {
               controller.enqueue(chunk);
           }
   
           controller.close();
       }
   });
   
   const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream());
   
   const readableStreamDefaultReader = decodedTextStream.getReader();
   
   (async function() {
       while (true) {
           const {done, value} = await readableStreamDefaultReader.read();
   
           if (done) {
               break;
           } else {
               console.log(value);
           }
       }
   })();
   ```

## 20.4 File API 与 Blob API

Web 应用程序的一个主要的痛点是无法操作用户计算机上的文件。 2000 年之前，处理文件的唯一方式是把 `<input type="file">` 放到一个表单里，仅此而已。 File API 与 Blob API 是为了让 Web 开发者能以安全的方式访问客户端机器上的文件，从而更好地与这些文件交互而设计的。  

### 20.4.1 File 类型

File API 仍然以表单中的文件输入字段为基础，但是增加了直接访问文件信息的能力。 HTML5 在DOM 上为文件输入元素添加了 files 集合。当用户在文件字段中选择一个或多个文件时，这个 files集合中会包含一组 File 对象，表示被选中的文件。每个 File 对象都有一些只读属性。  

- `name` 本地系统中的文件名  
- `size` 以字节计的文件大小  
- `type` 包含文件 MIME 类型的字符串  
- `lastModifiedDate` 表示文件最后修改时间的字符串。这个属性只有 Chome 实现了  

例如，通过监听 change 事件然后遍历 files 集合可以取得每个选中文件的信息：  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <input type="file" name="files-list" id="files-list" multiple>
    </form>

    <script>
        let filesList = document.getElementById('files-list');
        filesList.addEventListener('change', (event) => {
            let files = event.target.files;
            let i = 0;
            let len = files.length;

            while (i < len) {
                const f = files[i];
                console.log(`${f.name} (${f.type}), ${f.size} bytes`);
                ++i;
            }
        });
    </script>
</body>
</html>
```

![image-20210902105523586](C:\Users\72867\AppData\Roaming\Typora\typora-user-images\image-20210902105523586.png)

### 20.4.2 FileReader 类型

FileReader 类型表示一种异步文件读取机制。可以把 FileReader 想象成类似于 XMLHttpRequest，只不过是用于从文件系统读取文件，而不是从服务器读取数据。 FileReader 类型提供了几个读取文件数据的方法。  

- `readAsText(file, encoding)` 从文件中读取纯文本内容并保存在 result 属性中。第二个参数表示编码，是可选的。  
- `readAsDataURL(file)` 读取文件并将内容的数据 URI 保存在 result 属性中  
- `readAsBinaryString(file)` 读取文件并将每个字符的二进制数据保存在 result 属性中  
- `readAsArrayBuffer(file)` 读取文件并将文件内容以 ArrayBuffer 形式保存在 result 属性  

这些读取数据的方法为处理文件数据提供了极大的灵活性。例如，为了向用户显示图片，可以将图片读取为数据 URI，而为了解析文件内容，可以将文件读取为文本  



因为这些读取方法是异步的，所以每个 FileReader 会发布几个事件，其中 3 个最有用的事件是 `progress、 error` 和 `load`，分别表示还有更多数据、发生了错误和读取完成。  



**progress 事件每 50 毫秒就会触发一次**，其与 XHR 的 progress 事件具有相同的信息：lengthComputable、 loaded 和 total。此外，在 progress 事件中可以读取 FileReader 的 result属性，即使其中尚未包含全部数据。  



**error 事件会在由于某种原因无法读取文件时触发**。触发 error 事件时， FileReader 的 error属性会包含错误信息。这个属性是一个对象，只包含一个属性： code。这个错误码的值可能是 1（未找到文件）、 2（安全错误）、 3（读取被中断）、 4（文件不可读）或 5（编码错误）。  



**load 事件会在文件成功加载后触发**。如果 error 事件被触发，则不会再触发 load 事件。下面的例子演示了所有这 3 个事件：  

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <input type="file" name="files-list" id="files-list" multiple>
    </form>

    <div id="output"></div>
    <div id="progress"></div>


    <!-- FileReader -->
    <script>
        let filesList = document.getElementById('files-list');
        filesList.addEventListener('change', (event) => {
            let info = '',
                output = document.getElementById('output'),
                progress = document.getElementById('progress'),
                files = event.target.files,
                type = 'default',
                reader = new FileReader();
            
            if (/image/.test(files[0].type)) {
                reader.readAsDataURL(files[0]);
                type = 'image';
            } else {
                reader.readAsText(files[0]);
                type = 'text';
            }

            reader.onerror = function() {
                output.innerHTML = 'Could not read file, error code is ' + reader.error.code;
            };

            reader.onprogress = function(event) {
                if (event.lengthComputable) {
                    progress.innerHTML = `${event.loaded}/${event.total}`;
                }
            };
            
            reader.onload = function() {
                let html = '';
                switch(type) {
                    case 'image':
                        html = `<img src="${reader.result}" >`;
                        break;
                    case 'text':
                        html = reader.result;
                        break;
                }
                output.innerHTML = html;
            };
        });
    </script>
</body>
</html>
```

![image-20210902132254146](https://i.loli.net/2021/09/02/ZucCb4FWOliS2an.png)

![image-20210902132325902](https://i.loli.net/2021/09/02/uNxvjDTzLacXCAg.png)

以上代码从表单字段中读取一个文件，并将其内容显示在了网页上。如果文件的 MIME 类型表示它是一个图片，那么就将其读取后保存为数据 URI，在 load 事件触发时将数据 URI 作为图片插入页面中。如果文件不是图片，则读取后将其保存为文本并原样输出到网页上。 progress 事件用于跟踪和显示读取文件的进度，而 error 事件用于监控错误。  



如果想**提前结束文件读取，则可以在过程中调用 abort()方法**，从而触发 abort 事件。在 load、error 和 abort 事件触发后，还会触发 loadend 事件。 **loadend 事件表示在上述 3 种情况下，所有读取操作都已经结束**。 readAsText()和 readAsDataURL()方法已经得到了所有主流浏览器支持。  

### 20.4.3 FileReaderSync 类型

顾名思义， FileReaderSync 类型就是 FileReader 的同步版本。这个类型拥有与 FileReader相同的方法，**只有在整个文件都加载到内存之后才会继续执行**。**FileReaderSync 只在工作线程中可用，因为如果读取整个文件耗时太长则会影响全局。**  



假设通过 postMessage()向工作线程发送了一个 File 对象。以下代码会让工作线程同步将文件读取到内存中，然后将文件的数据 URL 发回来：  

```javascript
// worker.js
self.onmessage (messageEvent) => {
    const syncReader = new FileReaderSync();
    console.log(syncReader);

    const result = syncReader.readAsDataUrl(messageEvent.data);

    console.log(result);

    self.postMessage(result);
}
```

### 20.4.4 Blob 与部分读取

某些情况下，可能**需要读取部分文件而不是整个文件**。为此， File 对象提供了一个名为 **`slice()`** 的方法。 `slice()` 方法接收**两个参数：起始字节和要读取的字节数**。这个方法返回一个 Blob 的实例，而 Blob 实际上是 File 的超类。  



**blob 表示二进制大对象（ binary larget object）**，是 JavaScript 对不可修改二进制数据的封装类型。包含字符串的数组、 ArrayBuffers、 ArrayBufferViews，甚至其他 Blob 都可以用来创建 blob。 Blob构造函数可以接收一个 options 参数，并在其中指定 MIME 类型：  

```javascript
// Blob 与 部分读取
console.log(new Blob(['foo']));
// Blob {size: 3, type: ""}

console.log(new Blob(['{"a": "b"}'], {type: 'application/json'}));
// {size: 10, type: 'application/json'}

console.log(new Blob(['<p>Foo</p>', '<p>Bar</p>'], {type: 'text/html'}));
// {size: 20, type: 'text/html'}
```

Blob 对象有一个 size 属性和一个 type 属性，还有一个 slice()方法用于进一步切分数据。另外也可以使用 FileReader 从 Blob 中读取数据。下面的例子只会读取文件的前 32 字节：  

```javascript

```

### 20.4.5 对象URL 与 Blob

对象 URL 有时候也称作 Blob URL，是指引用存储在 File 或 Blob 中数据的 URL。对象 URL 的优点是不用把文件内容读取到 JavaScript 也可以使用文件。只要在适当位置提供对象 URL 即可。要创建对象 URL，可以使用 window.URL.createObjectURL()方法并传入 File 或 Blob 对象。这个函数返回的值是一个指向内存中地址的字符串。因为这个字符串是 URL，所以可以在 DOM 中直接使用。例如，以下代码使用对象 URL 在页面中显示了一张图片：  

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="">
        <input type="file" name="files-list" id="files-list" multiple>
    </form>

    <div id="output"></div>
    <div id="progress"></div>


    <!-- 对象URL 与 Blob -->
    <script>
        let filesList = document.getElementById('files-list');
        filesList.addEventListener('change', (event) => {
            let info = '',
                output = document.getElementById('output'),
                progress = document.getElementById('progress'),
                files = event.target.files,
                reader = new FileReader();
            
            if (url) {
                if (/image/.test(files[0].type)) {
                    output.innerHTML = `<img src="${url}" >`;
                } else {
                    output.innerHTML = 'Not an image.';
                }
            } else {
                output.innerHTML = 'Your browser does not support object URLs.'
            }
        })
    </script>
</body>

</html>
```

![image-20210902134812997](https://i.loli.net/2021/09/02/j8Nf6id5eUFDV3X.png)

如果把对象 URL 直接放到 `<img>` 标签，就不需要把数据先读到 JavaScript 中了。 `<img>` 标签可以直接从相应的内存位置把数据读取到页面上。  



使用完数据之后，最好能释放与之关联的内存。只要对象 URL 在使用中，就不能释放内存。如果想表明不再使用某个对象 URL，则可以把它传给 window.URL.revokeObjectURL()。页面卸载时，所有对象 URL 占用的内存都会被释放。不过，最好在不使用时就立即释放内存，以便尽可能保持页面
占用最少资源。  

### 20.4.6 读取拖放文件

组合使用 HTML5 拖放 API 与 File API 可以创建读取文件信息的有趣功能。在页面上创建放置目标后，可以从桌面上把文件拖动并放到放置目标。这样会像拖放图片或链接一样触发 drop 事件。被放置的文件可以通过事件的 event.dataTransfer.files 属性读到，这个属性保存着一组 File 对象，就像文本输入字段一样。  

```javascript
let droptarget = document.getElementById('droptarget');
function handleEvent(event) {
    let info = "";
    let output = document.getElementById('output'),
        files, i, len;
    event.preventDefault();

    if (event.type == 'drop') {
        files = event.dataTransfer.files;
        i = 0;
        lent = files.length;

        while (i < len) {
            info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`;
            i++;
        }

        output.innerHTML = info;
    }
}

droptarget.addEventListener('dragenter', handleEvent);
droptarget.addEventListener('dragover', handleEvent);
droptarget.addEventListener('drop', handleEvent);
```

## 20.5 媒体元素

随着嵌入音频和视频元素在 Web 应用上的流行，大多数内容提供商会强迫使用 Flash 以便达到最佳的跨浏览器兼容性。 HTML5 新增了两个与媒体相关的元素，即<audio>和<video>，从而为浏览器提供了嵌入音频和视频的统一解决方案。  



这两个元素既支持 Web 开发者在页面中嵌入媒体文件，也支持 JavaScript 实现对媒体的自定义控制。以下是它们的用法：  

```html
<video src="conference">Video player not available.</video>
<audio src="song.mp3">Audio player not available.</audio>
```

## 20.6 原生拖放

### 20.6 拖放事件

拖放事件几乎可以让开发者控制拖放操作的方方面面。关键的部分是确定每个事件是在哪里触发的。有的事件在被拖放元素上触发，有的事件则在放置目标上触发。在某个元素被拖动时，会（按顺序）触发以下事件：  

1. `dragstart`
2. `drag`
3. `dragend`

在按住鼠标键不放并开始移动鼠标的那一刻，被拖动元素上会触发 dragstart 事件。此时光标会变成非放置符号（圆环中间一条斜杠），表示元素不能放到自身上。拖动开始时，可以在 `ondragstart`事件处理程序中通过 JavaScript 执行某些操作。  



dragstart 事件触发后，只要目标还被拖动就会持续触发 drag 事件。这个事件类似于 `mousemove`，即随着鼠标移动而不断触发。当拖动停止时（把元素放到有效或无效的放置目标上），会触发 `dragend` 事件。  



所有这 3 个事件的目标都是被拖动的元素。默认情况下，浏览器在拖动开始后不会改变被拖动元素的外观，因此是否改变外观由你来决定。不过，大多数浏览器此时会创建元素的一个半透明副本，始终跟随在光标下方。  



在把元素拖动到一个有效的放置目标上时，会依次触发以下事件：  

1. `dragenter`
2. `dragover`
3. `dragleave`  或 `drop`

只要一把元素拖动到放置目标上， dragenter 事件（类似于 mouseover 事件）就会触发。 dragenter事件触发之后，会立即触发 dragover 事件，并且元素在放置目标范围内被拖动期间此事件会持续触发。当元素被拖动到放置目标之外， dragover 事件停止触发， dragleave 事件触发（类似于 mouseout事件）。如果被拖动元素被放到了目标上，则会触发 drop 事件而不是 dragleave 事件。这些事件的目标是放置目标元素。  

### 20.6.2 自定义放置目标

在把某个元素拖动到无效放置目标上时，会看到一个特殊光标（圆环中间一条斜杠）表示不能放下。即使所有元素都支持放置目标事件，这些元素默认也是不允许放置的。如果把元素拖动到不允许放置的目标上，无论用户动作是什么都不会触发 drop 事件。不过，通过覆盖 dragenter 和 dragover 事件的默认行为，可以把任何元素转换为有效的放置目标。例如，如果有一个 ID 为"droptarget"的<div>元素，那么可以使用以下代码把它转换成一个放置目标：  

```javascript
// 自定义放置目标
let droptarget = document.getElementById('droptarget');

droptarget.addEventListener('dragover', (event) => {
    event.preventDefault();
});

droptarget.addEventListener('dragenter', (event) => {
    event.preventDefault();
});
```

执行上面的代码之后，把元素拖动到这个<div>上应该可以看到光标变成了允许放置的样子。 另外，drop 事件也会触发。  

在 Firefox 中，放置事件的默认行为是导航到放在放置目标上的 URL。这意味着把图片拖动到放置目标上会导致页面导航到图片文件，把文本拖动到放置目标上会导致无效 URL 错误。为阻止这个行为，在 Firefox 中必须取消 drop 事件的默认行为：  

```javascript
droptarget.addEventListener('drag', (event) => {
    event.preventDefault();
});
```

### 20.6.3 dataTransfer 对象

除非数据受影响，否则简单的拖放并没有实际意义。为实现拖动操作中的数据传输， IE5 在 event对象上暴露了 dataTransfer 对象，用于从被拖动元素向放置目标传递字符串数据。因为这个对象是event 的属性，所以在拖放事件的事件处理程序外部无法访问 dataTransfer。在事件处理程序内部，  可以使用这个对象的属性和方法实现拖放功能。dataTransfer 对象现在已经纳入了 HTML5 工作草案。  



dataTransfer 对象有两个主要方法： getData()和 setData()。顾名思义， getData()用于获取 setData()存储的值。 setData()的第一个参数以及 getData()的唯一参数是一个字符串，表示要设置的数据类型： "text"或"URL"，如下所示：  

```javascript
// dataTransfer 对象
droptarget.addEventListener('drag', (event) => {
    event.preventDefault();
    // 传递文本
    event.dataTransfer.setData('text', 'some text');
    let text = event.dataTransfer.getData('text');

    // 传递 URL
    event.dataTransfer.setData('URL', 'https://zhouxianghui.xyz');
    let url = event.dataTransfer.getData('URL');
});
```

虽然这两种数据类型是 IE 最初引入的，但 HTML5 已经将其扩展为允许任何 MIME 类型。为向后兼容， HTML5 还会继续支持"text"和"URL"，但它们会分别被映射到"text/plain"和"text/uri-list"  



dataTransfer 对象实际上可以包含每种 MIME 类型的一个值，也就是说可以同时保存文本和URL，两者不会相互覆盖。存储在 dataTransfer 对象中的数据只能在放置事件中读取。如果没有在ondrop 事件处理程序中取得这些数据， dataTransfer 对象就会被销毁，数据也会丢失。  



在从文本框拖动文本时，浏览器会调用 setData()并将拖动的文本以"text"格式存储起来。类似地，在拖动链接或图片时，浏览器会调用 setData()并把 URL 存储起来。当数据被放置在目标上时，可以使用 getData()获取这些数据。当然，可以在 dragstart 事件中手动调用 setData()存储自定义数据，以便将来使用。  



作为文本的数据和作为 URL 的数据有一个区别。当把数据作为文本存储时，数据不会被特殊对待。而当把数据作为 URL 存储时，数据会被作为网页中的一个链接，意味着如果把它放到另一个浏览器窗口，浏览器会导航到该 URL。  



直到版本 5， Firefox 都不能正确地把"url"映射为"text/uri-list"或把"text"映射为"text/plain"。不过，它可以把"Text"（第一个字母大写）正确映射为"text/plain"。在通过 dataTransfer 获取数据时，为保持最大兼容性，需要对 URL 检测两个值并对文本使用"Text"：  

## 20.7 Notification API

Notifications API 用于向用户显示通知。  

### 20.7.1 通知权限

Notifications API 有被滥用的可能，因此默认会开启两项安全措施：  

- 通知只能在运行在安全上下文的代码中被触发  
-  通知必须按照每个源的原则明确得到用户允许  

用户授权显示通知是通过浏览器内部的一个对话框完成的。除非用户没有明确给出允许或拒绝的答复，否则这个权限请求对每个域只会出现一次。浏览器会记住用户的选择，如果被拒绝则无法重来。  



页面可以使用全局对象 Notification 向用户请求通知权限。这个对象有一个 requestPemission()方法，该方法返回一个期约，用户在授权对话框上执行操作后这个期约会解决。  

```javascript
// 通知权限
Notification.requestPermission()
    .then((permisson) => {
        console.log('User responded to permission request', permisson);
    });
```

"granted"值意味着用户明确授权了显示通知的权限。除此之外的其他值意味着显示通知会静默失败。如果用户拒绝授权，这个值就是"denied"。一旦拒绝，就无法通过编程方式挽回，因为不可能再触发授权提示。  

### 20.7.2 显示和隐藏通知

Notification 构造函数用于创建和显示通知。最简单的通知形式是只显示一个标题，这个标题内容可以作为第一个参数传给 Notification 构造函数。以下面这种方式调用 Notification，应该会立即显示通知：  

```javascript
new Notification('Title text!');
```

可以通过 options 参数对通知进行自定义，包括设置通知的主体、图片和振动等：  

```javascript
new Notification('Title text!', {
    body: 'Body text!',
    image: 'path/to/image.png',
    vibrate: true
});
```

调用这个构造函数返回的 Notification 对象的 close()方法可以关闭显示的通知。下面的例子展示了显示通知后 1000 毫秒再关闭它：  

```javascript
const n = new Notification('I will close in 1000ms');
setTimeout(() => n.close(), 1000);
```

### 20.7.3 通知生命周期回调

通知并非只用于显示文本字符串，也可用于实现交互。 Notifications API 提供了 4 个用于添加回调的生命周期方法：  

- `onshow`
- `onclick`
- `onclose`
- `onerror`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>20.7 Notifications API</title>
  </head>
  <body>
    <input type="button" value="Notification" id="btn" />
    <!-- <img src="img/naza.png" alt="naza" /> -->
    <script>
      let btn = document.getElementById("btn");
      Notification.requestPermission().then((permission) => {
        console.log("user responsed to permission request:", permission);
      });
      btn.addEventListener("click", (event) => {
        const n = new Notification("古力娜扎", {
          body: `谁不喜欢娜扎呢?`,
          icon: "./img/naza.png",
          dir: "ltr",
          vibrate: true,
        });
        n.onshow = () => console.log("Notification was shown!");
        n.onclick = () => console.log("Notification was clicked!");
        n.onclose = () => console.log("Notification was closed!");
        n.onerror = () => console.log("Notification experienced an error!");
        setTimeout(() => {
          n.close();
        }, 4000);
      });
    </script>
  </body>
</html>
```

![image-20220104153710060](https://s2.loli.net/2022/01/04/6RLiEzOI3AtBTby.png)

## 20.8 Page Visibility API

Web 开发中一个常见的问题是开发者不知道用户什么时候真正在使用页面。如果页面被最小化或隐藏在其他标签页后面，那么轮询服务器或更新动画等功能可能就没有必要了。 Page Visibility API 旨在为开发者**提供页面对用户是否可见的信息**。  

这个 API 本身非常简单，由 3 部分构成。  

- `document.visibilityState` 表示下面四种状态
  - 页面在后台标签页或浏览器中最小化了  
  - 页面在前台标签页中  
  - 实际页面隐藏了，但对页面的预览是可见的  
  - 页面在屏外预渲染  
- `visibilitychange` 事件 该事件会在文档从隐藏变可见（或反之）时触发  
- `document.hidden` 布尔值，表示页面是否隐藏。这可能意味着页面在后台标签页或浏览器中被最小化了。这个值是为了向后兼容才继续被浏览器支持的，应该优先使用 `document.visibilityState` 检测页面可见性  



要想在页面从可见变为隐藏或从隐藏变为可见时得到通知，需要监听 visibilitychange 事件。  

document.visibilityState 的值是以下三个字符串之一：  

- `hidden`
- `visible`
- `prerender`

## 20.9 Streams API

Streams API 是为了解决一个简单但又基础的问题而生的： Web 应用如何消费有序的小信息块而不是大块信息？这种能力主要有两种应用场景。  

- 大块数据可能不会一次性都可用。网络请求的响应就是一个典型的例子。网络负载是以连续信息包形式交付的，而流式处理可以让应用在数据一到达就能使用，而不必等到所有数据都加载完毕。  
- 大块数据可能需要分小部分处理。视频处理、数据压缩、图像编码和 JSON 解析都是可以分成小部分进行处理，而不必等到所有数据都在内存中时再处理的例子  

### 20.9.1 理解流

提到流，可以把数据想像成某种通过管道输送的液体。 JavaScript 中的流借用了管道相关的概念，因为原理是相通的。根据规范，“这些 API 实际是为映射低级 I/O 原语而设计，包括适当时候对字节流的规范化”。 Stream API 直接解决的问题是处理网络请求和读写磁盘。  

Stream API 定义了三种流。  

+ **可读流** 可以通过某个公共接口读取数据块的流。数据在内部从底层源进入流，然后由**消费者（ consumer）**进行处理  

- **可写流**  可以通过某个公共接口写入数据块的流。 生产者（ producer）将数据写入流，数据在内部传入底层数据槽（ sink）  

- **换换流** 由两种流组成，可写流用于接收数据（可写端），可读流用于输出数据（可读端）。这两个流之间是转换程序（ transformer），可以根据需要检查和修改流内容  

**块、内部队列和反压  **

流的基本单位是块（ chunk）。**块可是任意数据类型，但通常是定型数组**。每个块都是离散的流片段，可以作为一个整体来处理。更重要的是，块不是固定大小的，也不一定按固定间隔到达。在理想的流当中，块的大小通常近似相同，到达间隔也近似相等。不过好的流实现需要考虑边界情况。  

前面提到的各种类型的流都有入口和出口的概念。有时候，由于数据进出速率不同，可能会出现不匹配的情况。为此流平衡可能出现如下三种情形。  

- 流出口处理数据的速度比入口提供数据的速度快。流出口经常空闲（可能意味着流入口效率较低），但只会浪费一点内存或计算资源，因此这种流的不平衡是可以接受的  

- 流入和流出均衡。这是理想状态  
- 流入口提供数据的速度比出口处理数据的速度快。这种流不平衡是固有的问题。此时一定会在某个地方出现数据积压，流必须相应做出处理  

流不平衡是常见问题，但流也提供了解决这个问题的工具。所有流都会为已进入流但尚未离开流的块提供一个内部队列。对于均衡流，这个内部队列中会有零个或少量排队的块，因为流出口块出列的速度与流入口块入列的速度近似相等。这种流的内部队列所占用的内存相对比较小   

如果块入列速度快于出列速度，则内部队列会不断增大。流不能允许其内部队列无限增大，因此它会使用反压（ backpressure）通知流入口停止发送数据，直到队列大小降到某个既定的阈值之下。这个阈值由排列策略决定，这个策略定义了内部队列可以占用的最大内存，即高水位线（ high water mark）  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>20.9.2 可读流</title>
  </head>
  <body>
    <script>
      async function* ints() {
        for (let i = 0; i < 5; i++) {
          yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
        }
      }
      const readableStream = new ReadableStream({
        async start(controller) {
          console.log(controller);
          for await (const chunk of ints()) {
            controller.enqueue(chunk);
          }
          controller.close();
        },
      });
      console.log(readableStream.locked);
      const readableStreamDefaultReader = readableStream.getReader();
      console.log(readableStream.locked);

      // 消费者
      (async function () {
        while (true) {
          const { done, value } = await readableStreamDefaultReader.read();
          if (done) {
            break;
          } else {
            console.log(value);
          }
        }
      })();
    </script>
  </body>
</html>
```

![image-20220104155034551](https://s2.loli.net/2022/01/04/RPcBvGNUfsaSzOu.png)

### 20.9.2 可读流

可读流是对底层数据源的封装。底层数据源可以将数据填充到流中，允许消费者通过流的公共接口读取数据  

1. **`ReadableStreamDefaultController`**

   来看下面的生成器，它每 1000 毫秒就会生成一个递增的整数  

   ```javascript
   async function* ints() {
       // 每 1000 毫秒生成一个递增的整数
       for (let i = 0; i < 5; ++i) {
           yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
       }
   }
   ```

   这个生成器的值可以通过可读流的控制器传入可读流。访问这个控制器最简单的方式就是创建ReadableStream 的一个实例，并在这个构造函数的 underlyingSource 参数（第一个参数）中定义start()方法，然后在这个方法中使用作为参数传入的 controller。默认情况下，这个控制器参数是
   ReadableStreamDefaultController 的一个实例：  

   ```javascript
   const readableStream = new ReadableStream({
       async start(controller) {
           for await (let chunk of ints()) {
               controller.enqueue(chunk);
           }
   
           controller.close();
       }
   }); 
   ```

   

2.  **`ReadableStreamDefaultReader`**

   前面的例子把 5 个值加入了流的队列，但没有把它们从队列中读出来。为此，需要一个 ReadableStreamDefaultReader 的实例，该实例可以通过流的 getReader()方法获取。调用这个方法会获得流的锁，保证只有这个读取器可以从流中读取值：  

   ```javascript
   console.log(readableStream.locked);
   const readableStreamDefaultReader = readableStream.getReader();
   console.log(readableStream.locked);
   
   // 消费者
   (async function () {
       while (true) {
           const {done, value} = await readableStreamDefaultReader.read();
           if (done) {
               break;
           } else {
               console.log(value);
           }
       }
   })
   ```

   



### 20.9.3 可写流

可写流是底层数据槽的封装。底层数据槽处理通过流的公共接口写入的数据  

1. **创建 `WritebleStream`**

   来看下面的生成器，它每 1000 毫秒就会生成一个递增的整数：  

   ```javascript
   async function* ints() {
       // 每 1000 毫秒生成一个递增的整数
       for (let i = 0; i < 5; ++i) {
           yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
       }
   }
   ```

   这些值通过可写流的公共接口可以写入流。在传给 `WritableStream` 构造函数的` underlyingSink`参数中，通过实现 write()方法可以获得写入的数据：  

   ```javascript
   const readableStream = new ReadableStream({
       write(value) {
           console.log(value);
       }
   });
   ```

   

2. **`WritableStreamDefaultWriter`**

   要把获得的数据写入流，可以通过流的 `getWriter()`方法获取 `WritableStreamDefaultWriter`的实例。这样会获得流的锁，确保只有一个写入器可以向流中写入数据：  

   ```javascript
   const writeableStream = new WritableStream({
       write(value) {
           console.log(value);
       }
   });
   
   console.log(writeableStream.locked);
   const writeableStreamDefaultWriter = writeableStream.getWriter();
   console.log(writeableStream.locked);
   ```

   在向流中写入数据前，生产者必须确保写入器可以接收值。 `writableStreamDefaultWriter.ready`返回一个期约，此期约会在能够向流中写入数据时解决。然后，就可以把值传给 writableStreamDefaultWriter.write()方法。写入数据之后，调用 `writableStreamDefaultWriter.close()` 将流关闭：
    ```javascript
   // 生产者
   (async function () {
       for await (let chunk of ints()) {
           await writeableStreamDefaultWriter.ready;
           writeableStreamDefaultWriter.write(chunk);
       }
   })();
    ```


​     



## 20.10 计时 API

页面性能始终是 Web 开发者关心的话题。 Performance 接口通过 JavaScript API 暴露了浏览器内部的度量指标，允许开发者直接访问这些信息并基于这些信息实现自己想要的功能。这个接口暴露在window.performance 对象上。所有与页面相关的指标，包括已经定义和将来会定义的，都会存在于这个对象上。  

Performance 接口由多个 API 构成：  

- High Resolution Time API
- Performance Timeline API
- Navigation Timing API
- User Timing API
- Resource Timing API
- Paint Timing API
- 