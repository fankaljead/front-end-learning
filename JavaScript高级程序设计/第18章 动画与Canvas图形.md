# 第18章 动画与Canvas图形

图形和动画已经日益成为浏览器中现代 Web 应用程序的必备功能，但实现起来仍然比较困难。视觉上复杂的功能要求性能调优和硬件加速，不能拖慢浏览器。目前已经有一套日趋完善的 API 和工具可以用来开发此类功能。



## 18.1 使用 requestAnimationFrame

**`requestAnimationFrame()`** 这个方法会告诉浏览器要执行动画了，于是浏览器可以通过最优方式确定重绘的时序。

### 18.1.1 早期定时动画

- 以前，使用 `setInterval()`

  ```javascript
  // 早期定时动画
  (function() {
      function updateAnimations() {
          doAnimation1();
          doAnimation2();
      }
      setInterval(updateAnimations, 100);
  })();
  ```

  虽然使用 setInterval()的定时动画比使用多个 setTimeout()实现循环效率更高，但也不是没有问题。无论 setInterval()还是 setTimeout()都是不能保证时间精度的。作为第二个参数的延时只能保证何时会把代码添加到浏览器的任务队列，不能保证添加到队列就会立即运行。如果队列前面还有其他任务，那么就要等这些任务执行完再执行。简单来讲，这里毫秒延时并不是说何时这些代码会执行，而只是说到时候会把回调加到任务队列。如果添加到队列后，主线程还被其他任务占用，比如正在处理用户操作，那么回调就不会马上执行。  

### 18.1.2 时间间隔的问题

知道何时绘制下一帧是创造平滑动画的关键。直到几年前，都没有办法确切保证何时能让浏览器把下一帧绘制出来。随着<canvas>的流行和 HTML5 游戏的兴起，开发者发现 setInterval()和setTimeout()的不精确是个大问题。  



E9 之前版本的计时器精度是 15.625 毫秒，意味着 0～ 15 范围内的任何值最终要么是 0， 要么是 15，不可能是别的数。 IE9 把计时器精度改进为 4 毫秒，但这对于动画而言还是不够精确。 Chrome 计时器精度是 4 毫秒，而 Firefox 和 Safari 是 10 毫秒。更麻烦的是，浏览器又开始对切换到后台或不活跃标签页中的计时器执行限流。因此即使将时间间隔设定为最优，也免不了只能得到近似的结果。  



### 18.1.3 requestAnimationFrame()

**`requestAnimationFrame()`**方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数 ，这个函数就是修改 DOM 样式以反映下一次重绘有什么变化的地方。为了实现动画循环，可以把多个requestAnimationFrame()调用串联起来，就像以前使用 setTimeout()时一样：  

```javascript
// requestAnimationFrame()
function updateProgress() {
    var div = document.getElementById('status');
    div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
    if (div.style.left != "100%") {
        requestAnimationFrame(updateProgress);
    }
}
requestAnimationFrame(updateProgress);
```

因为 requestAnimationFrame()只会调用一次传入的函数，所以每次更新用户界面时需要再手动调用它一次。同样，也需要控制动画何时停止。结果就会得到非常平滑的动画。

目前为止， requestAnimationFrame()已经解决了浏览器不知道 JavaScript 动画何时开始的问题，以及最佳间隔是多少的问题，但是，不知道自己的代码何时实际执行的问题呢？这个方案同样也给出了解决方法。

传给 requestAnimationFrame()的函数实际上可以接收一个参数，此参数是一个 DOMHighResTimeStamp 的实例（比如 performance.now()返回的值），表示下次重绘的时间。这一点非常重要：requestAnimationFrame()实际上把重绘任务安排在了未来一个已知的时间点上，而且通过这个参数告诉了开发者。基于这个参数，就可以更好地决定如何调优动画了。  

### 18.1.4 cancelAnimationFrame

与 setTimeout()类似， requestAnimationFrame()也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame()来取消重绘任务。下面的例子展示了刚把一个任务加入队列又立即将其取消：  

```javascript
let requestID = window.requestAnimationFrame(() => {
	console.log('Repaint!');
});
window.cancelAnimationFrame(requestID);
```

### 18.1.5 通过 requestAnimationFrame 节流

requestAnimationFrame 这个名字有时候会让人误解，因为看不出来它跟排期任务有关。支持这个方法的浏览器实际上会暴露出作为钩子的回调队列。所谓钩子（ hook），就是浏览器在执行下一次重绘之前的一个点。这个回调队列是一个可修改的函数列表，包含应该在重绘之前调用的函数。每次调用requestAnimationFrame()都会在队列上推入一个回调函数，队列的长度没有限制。  



这个回调队列的行为不一定跟动画有关。不过，通过 requestAnimationFrame()递归地向队列中加入回调函数，可以保证每次重绘最多只调用一次回调函数。这是一个非常好的节流工具。在频繁执行影响页面外观的代码时（比如滚动事件监听器），可以利用这个回调队列进行节流。  



先来看一个原生实现，其中的滚动事件监听器每次触发都会调用名为 expensiveOperation()（耗时操作）的函数。当向下滚动网页时，这个事件很快就会被触发并执行成百上千次：  

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
    <script>
        let enabled = true;

        function expensiveOperation() {
            console.log('Invoked at', Date.now());
        }

        window.addEventListener('scroll', () => {
            if (enabled) {
                enabled = false;
                window.requestAnimationFrame(expensiveOperation);
                window.setTimeout(() => enabled = true, 50);
            }
        });
    </script>
</body>

</html>
```

# 18.2 基本的画布功能

创建 `<canvas>` 元素时至少要设置其 `width` 和 `height` 属性，这样才能告诉浏览器在多大面积上绘图。出现在开始和结束标签之间的内容是后备数据，会在浏览器不支持 `<canvas>` 元素时显示。比如：  

```html
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>
```

与其他元素一样， width 和 height 属性也可以在 DOM 节点上设置，因此可以随时修改。整个元素还可以通过 CSS 添加样式，并且元素在添加样式或实际绘制内容前是不可见的。

要在画布上绘制图形，首先要取得绘图上下文。使用 getContext()方法可以获取对绘图上下文的引用。对于平面图形，需要给这个方法传入参数"2d"，表示要获取 2D 上下文对象：  

```javascript
let drawing = document.getElementById('drawing');

if (drawing.getContext) {
    let context = drawing.getContext('2d');
}
```

使用<canvas>元素时，最好先测试一下 getContext()方法是否存在。有些浏览器对 HTML 规范中没有的元素会创建默认 HTML 元素对象。这就意味着即使 drawing 包含一个有效的元素引用，getContext()方法也未必存在。  



**可以使用 toDataURL()方法导出 `<canvas>` 元素上的图像**。这个方法接收一个参数：要生成图像的 MIME 类型（与用来创建图形的上下文无关）。例如，要从画布上导出一张 PNG 格式的图片，可以这样做：  

```javascript
let drawing = document.getElementById('drawing');

if (drawing.getContext) {
    let context = drawing.getContext('2d');

    let imgURI = drawing.toDataURL('image/png');
    let image = document.createElement('img');
    image.src = imgURI;
    document.body.appendChild(image);
}

```

浏览器默认将图像编码为 PNG 格式，除非另行指定。 Firefox 和 Opera 还支持传入"image/jpeg"进行 JPEG 编码。因为这个方法是后来才增加到规范中的，所以支持的浏览器也是在后面的版本实现的，包括 IE9、 Firefox 3.5 和 Opera 10。  

## 18.3 2D 绘图上下文

2D 绘图上下文提供了绘制 2D 图形的方法，包括矩形、弧形和路径。 2D 上下文的坐标原点(0, 0)在 `<canvas>` 元素的左上角。所有坐标值都相对于该点计算，因此 x 坐标向右增长， y 坐标向下增长。默认情况下， width 和 height 表示两个方向上像素的最大值。  

### 18.3.0 Canvas From MDN

`<canvas>` 是一个可以使用脚本来绘制图形的 HTML 元素

- `<canvas>` 元素类似于 `img` 元素

    ```html
    <canvas id="tutorial" width="150" height="150"></canvas>
    ```

    - `<canvas>` 的默认长宽为 300, 150
    - 建议用 `width, height` 属性明确规定宽高，而不是使用 CSS

- 在不支持的浏览器上使用替代内容

    ```html
    <canvas id="stockGraph" width="150" height="150">
      current stock price: $3.15 +0.15
    </canvas>
    
    <canvas id="clock" width="150" height="150">
      <img src="images/clock.png" width="150" height="150" alt=""/>
    </canvas>
    ```

    

- **`</canvas>` 标签不能省略** 如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

- **渲染上下文**

    `<canvas>` 元素创造了一个固定大小的画布，并且公开了一个或多个 **渲染上下文**，可以用来绘制和处理显示的内容。

    canvas 起初是空白的，为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>` 元素有一个 `getContext()` 方法，获得渲染上下文和其绘布功能，参数是上下文的类型：

    ```js
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');
    ```

    

- 

### 18.3.1 填充和描边

2D 上下文有两个基本绘制操作：填充和描边。填充以指定样式（颜色、渐变或图像）自动填充形状，而描边只为图形边界着色。大多数 2D 上下文操作有填充和描边的变体，显示效果取决于两个属性：`fillStyle` 和 `strokeStyle`。  



这两个属性可以是字符串、渐变对象或图案对象，默认值都为"#000000"。字符串表示颜色值，可以是 CSS 支持的任意格式：名称、十六进制代码、 rgb、 rgba、 hsl 或 hsla。比如：  

```javascript
let drawing = document.getElementById('drawing');

if (drawing.getContext) {
    let context = drawing.getContext('2d');

    context.strokeStyle = 'red';
    context.fillStyle = '#0000ff';

    let imgURI = drawing.toDataURL('image/png');
    let image = document.createElement('img');
    image.src = imgURI;
    document.body.appendChild(image);
}
```

这里把 strokeStyle 设置为"red"（ CSS 颜色名称），把 fillStyle 设置为"#0000ff"（蓝色）。所有与描边和填充相关的操作都会使用这两种样式，除非再次修改。  

### 18.3.2 绘制矩形

矩形是唯一一个可以直接在 2D 绘图上下文中绘制的形状。与绘制矩形相关的方法有 3 个：fillRect()、 strokeRect()和 clearRect()。这些方法都接收 4 个参数：矩形 x 坐标、矩形 y 坐标、矩形宽度和矩形高度。这几个参数的单位都是像素。  



fillRect()方法用于以指定颜色在画布上绘制并填充矩形。填充的颜色使用 fillStyle 属性指定。来看下面的例子：  

```javascript
let drawing = document.getElementById('drawing');

if (drawing.getContext) {
    let context = drawing.getContext('2d');

    context.fillStyle = '#ff00ff';
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = 'rgba(0,0,255,0.5)';
    context.fillRect(30, 30, 50, 50);

    let imgURI = drawing.toDataURL('image/png');
    let image = document.createElement('img');
    image.src = imgURI;
    document.body.appendChild(image);
}
```

![image-20210829112418470](https://i.loli.net/2021/08/29/BvIxeLJkGytKEjR.png)

strokeRect()方法使用通过 strokeStyle 属性指定的颜色绘制矩形轮廓。下面是一个例子  

```javascript
context.strokeStyle = '#ff0000';
context.strokeRect(70, 70, 50, 50);

context.strokeStyle = 'rgba(0,0,255,0.5)';
context.strokeRect(90, 90, 50, 50);
```

![image-20210829112647635](https://i.loli.net/2021/08/29/bMjOvn6imwhKFxE.png)

**注意** 描边宽度由 lineWidth 属性控制，它可以是任意整数值。类似地， lineCap 属性控制线条端点的形状［ "butt"（平头）、 "round"（出圆头）或"square"（出方头）］，而 lineJoin属性控制线条交点的形状［ "round"（圆转）、 "bevel"（取平）或"miter"（出尖）］。  

```javascript
context.strokeStyle = 'rgba(0,0,255,0.5)';
context.lineWidth = 4;
context.lineCap = 'round';
context.lineJoin = 'miter';
context.strokeRect(90, 90, 50, 50);
```

使用 clearRect()方法可以擦除画布中某个区域。该方法用于把绘图上下文中的某个区域变透明。通过先绘制形状再擦除指定区域，可以创建出有趣的效果，比如从已有矩形中开个孔。来看下面的例子：  

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
    <canvas id="drawing" width="200" height="200">A drawing of something.</canvas>

    <script>
        let drawing = document.getElementById('drawing');

        if (drawing.getContext) {
            let context = drawing.getContext('2d');

            context.fillStyle = '#ff00ff';
            context.fillRect(10, 10, 50, 50);

            context.fillStyle = 'rgba(0,0,255,0.5)';
            context.fillRect(30, 30, 50, 50);

            context.strokeStyle = '#ff0000';
            context.strokeRect(70, 70, 50, 50);

            context.strokeStyle = 'rgba(0,0,255,0.5)';
            context.lineWidth = 4;
            context.lineCap = 'round';
            context.lineJoin = 'miter';
            context.strokeRect(90, 90, 50, 50);

            context.clearRect(40,40,10,10);

            let imgURI = drawing.toDataURL('image/png');
            let image = document.createElement('img');
            image.src = imgURI;
            document.body.appendChild(image);
        }
    </script>
</body>

</html>
```

![image-20210829114359655](https://i.loli.net/2021/08/29/APUDsgC1fxIFTl4.png)

### 18.3.3 绘制路径

- 2D 绘图上下文支持很多在画布上绘制路径的方法。通过路径可以创建复杂的形状和线条。要绘制路径，必须首先调用 beginPath()方法以表示要开始绘制新路径。然后，再调用下列方法来绘制路径。  
  - `arc(x, y, radius, startAngle, endAngle, counterclockwise)`：以坐标(x, y)为圆心，以 radius 为半径绘制一条弧线，起始角度为 startAngle，结束角度为 endAngle（都是弧度）。最后一个参数 counterclockwise 表示是否逆时针计算起始角度和结束角度（默认为
    顺时针）。  
  - `arcTo(x1, y1, x2, y2, radius)`：以给定半径 radius，经由(x1, y1)绘制一条从上一点到(x2, y2)的弧线。  
  - `bezierCurveTo(c1x, c1y, c2x, c2y, x, y)`：以(c1x, c1y)和(c2x, c2y)为控制点，绘制一条从上一点到(x, y)的弧线（三次贝塞尔曲线）  
  - `lineTo(x, y)`：绘制一条从上一点到(x, y)的直线  
  - `moveTo(x, y)`：不绘制线条，只把绘制光标移动到(x, y)  
  - `quadraticCurveTo(cx, cy, x, y)`：以(cx, cy)为控制点，绘制一条从上一点到(x, y)的弧线（二次贝塞尔曲线）  
  - `rect(x, y, width, height)`：以给定宽度和高度在坐标点(x, y)绘制一个矩形。这个方法与 `strokeRect()`和 `fillRect()` 的区别在于，它创建的是一条路径，而不是独立的图形  
  - 创建路径之后，可以使用` closePath()`方法绘制一条返回起点的线。如果路径已经完成，则既可以指定 `fillStyle` 属性并调用 fill()方法来填充路径，也可以指定` strokeStyle` 属性并调用`stroke()`方法来描画路径，还可以调用 clip()方法基于已有路径创建一个新剪切区域。  

这个例子使用 arc()绘制了两个圆形，一个外圆和一个内圆，以构成表盘的边框。外圆半径 99 像素，原点为(100,100)，也就是画布的中心。要绘制完整的圆形，必须从 0 弧度绘制到 2π 弧度（使用数学常量 Math.PI）。而在绘制内圆之前，必须先把路径移动到内圆上的一点，以避免绘制出多余的线条。第二次调用 arc()时使用了稍小一些的半径，以呈现边框效果。然后，再组合运用 moveTo()和 lineTo()分别绘制分针和时针。最后一步是调用 stroke()  

![image-20210829134058501](https://i.loli.net/2021/08/29/m93YnSETbjviOq5.png)

路径是 2D 上下文的主要绘制机制，为绘制结果提供了很多控制。因为路径经常被使用，所以也有一个 isPointInPath()方法，接收 x 轴和 y 轴坐标作为参数。这个方法用于确定指定的点是否在路径上，可以在关闭路径前随时调用，比如：  

```javascript
if (context.isPointInPath(100, 100)) {
    console.log("Point (100, 100) is in the Path.");
}
```

2D 上下文的路径 API 非常可靠，可用于创建涉及各种填充样式、描述样式等的复杂图像  

### 18.3.4 绘制文本

文本和图像混合也是常见的绘制需求， 因此 2D 绘图上下文还提供了绘制文本的方法，即 **`fillText()` 和 `strokeText()`**。这两个方法都接收 4 个参数：**要绘制的字符串、 x 坐标、 y 坐标和可选的最大像素宽度**。而且，这两个方法最终绘制的结果都取决于以下 3 个属性。  

- `font` 以 CSS 语法指定的字体样式、大小、字体族等，比如`"10px Arial"`

- `textAlign` 指定文本的对齐方式，可能的值包括 `"start"、 "end"、 "left"、 "right"` 和 `"center"`。推荐使用"start"和"end"，不使用"left"和"right"，因为前者无论在从左到右书写的语言还是从右到左书写的语言中含义都更明确。  

- `textBaseLine` 指 定 文 本 的 基 线 ， 可 能 的 值 包 括 "top" 、 "hanging" 、 "middle" 、"alphabetic"、 "ideographic"和"bottom"。  

这些属性都有相应的默认值，因此没必要每次绘制文本时都设置它们。 fillText()方法使用fillStyle 属性绘制文本，而 strokeText()方法使用 strokeStyle 属性。通常， fillText()方法是使用最多的，因为它模拟了在网页中渲染文本。例如，下面的例子会在前一节示例的表盘顶部绘制数字“12”  

```javascript
// 绘制文字
context.font = 'bold 14px Arial';
context.textAlign = 'center';
context.textBaseLine = 'middle';
context.fillText("12", 100, 20);
```

![image-20210829134937791](https://i.loli.net/2021/08/29/JPlqTzya8kCx1XG.png)

由于绘制文本很复杂，特别是想把文本绘制到特定区域的时候，因此 2D 上下文提供了用于辅助确定文本大小的 measureText()方法。这个方法接收一个参数，即要绘制的文本，然后返回一个TextMetrics 对象。这个返回的对象目前只有一个属性 width，不过将来应该会增加更多度量指标  



measureText()方法使用 font、 textAlign 和 textBaseline 属性当前的值计算绘制指定文本后的大小。例如，假设要把文本"Hello world!"放到一个 140 像素宽的矩形中，可以使用以下代码，从 100 像素的字体大小开始计算，不断递减，直到文本大小合适：  

```javascript
let fontSize = 100;
context.font = fontSize + 'px Arial';
while (context.measureText("hello world").width > 140) {
    fontSize--;
    context.font = fontSize + 'px Arial';
}
context.fillText("Hello World", 10, 10);
context.fillText("Font Size is " + fontSize + "px", 10, 50);
```

### 18.3.5 变换

上下文变换可以操作绘制在画布上的图像。 2D 绘图上下文支持所有常见的绘制变换。在创建绘制上下文时，会以默认值初始化变换矩阵，从而让绘制操作如实应用到绘制结果上。对绘制上下文应用变换，可以导致以不同的变换矩阵应用绘制操作，从而产生不同的结果。  

以下方法可用于改变绘制上下文的变换矩阵。  

- `rotate(angel)` 围绕原点把图像旋转 angle 弧度  
- `scale(scaleX, scaleY)`：通过在 x 轴乘以 scaleX、在 y 轴乘以 scaleY 来缩放图像。 scaleX和 scaleY 的默认值都是 1.0  

- `translate(x, y)`：把原点移动到(x, y)。执行这个操作后，坐标(0, 0)就会变成(x, y)  
- `transform(m1_1, m1_2, m2_1, m2_2, dx, dy`)：像下面这样通过矩阵乘法直接修改矩阵  
- `setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)`把矩阵重置为默认值，再以传入的参数调用 transform()  

变换可以简单，也可以复杂。例如，在前面绘制表盘的例子中，如果把坐标原点移动到表盘中心，那再绘制表针就非常简单了：  

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
    <canvas id="drawing" width="200" height="200">A drawing of something.</canvas>

    <script>
        let drawing = document.getElementById('drawing');

        if (drawing.getContext) {
            let context = drawing.getContext('2d');

            // 绘制路径
            context.beginPath()

            // 绘制外圆
            context.arc(100, 100, 99, 0, 2*Math.PI, false);

            // 绘制内圆
            context.moveTo(194, 100);
            context.arc(100, 100, 94, 0, 2*Math.PI, false);

            // 移动原点到表盘中心
            context.translate(100, 100);

            // 绘制分针
            context.moveTo(0, 0);
            context.lineTo(0, -85);

            // 绘制时针
            context.moveTo(0, 0);
            context.lineTo(-65, 0);

            // 绘制文字
            context.font = 'bold 14px Arial';
            context.textAlign = 'center';
            context.textBaseLine = 'middle';
            context.fillText("12", 100, 20);

            // 描画路径
            context.stroke();
        }
    </script>
</body>

</html>
```

![image-20210829142022238](https://i.loli.net/2021/08/29/H8e1SQvxjLGDwnz.png)

把原点移动到(100, 100)，也就是表盘的中心后，要绘制表针只需简单的数学计算即可。这是因为所有计算都是基于(0, 0)，而不是(100, 100)了。当然，也可以使用 rotate()方法来转动表针  



所有这些变换，包括 fillStyle 和 strokeStyle 属性，会一直保留在上下文中，直到再次修改它们。虽然没有办法明确地将所有值都重置为默认值，但有两个方法可以帮我们跟踪变化。如果想着什么时候再回到当前的属性和变换状态，**可以调用 save()方法。调用这个方法后，所有这一时刻的设置会被放到一个暂存栈中。保存之后，可以继续修改上下文**。而在需要恢复之前的上下文时，可以**调用  restore()方法。这个方法会从暂存栈中取出并恢复之前保存的设**置。多次调用 save()方法可以在暂存栈中存储多套设置，然后通过 restore()可以系统地恢复。下面来看一个例子：  

```javascript
context.fillStyle = "#ff0000";
context.save();

context.fillStyle = "#00ff00";
context.translate(100, 100);
context.save();

context.fillStyle = "#0000ff";
context.fillRect(0, 0, 100, 200); // 在(100, 100)绘制蓝色矩形

context.restore();
context.fillRect(10, 10, 100, 200); // 在(100, 100)绘制绿色矩形

context.restore();
context.fillRect(0, 0, 100, 200); // 在(0, 0)绘制红色矩形
```

以上代码先将 fillStyle 设置为红色，然后调用 save()。接着，将 fillStyle 修改为绿色，坐标移动到(100, 100)，并再次调用 save()，保存设置。随后，将 fillStyle 属性设置为蓝色并绘制一个矩形。因为此时坐标被移动了，所以绘制矩形的坐标实际上是(100, 100)。在调用 restore()之后，fillStyle 恢复为绿色，因此这一次绘制的矩形是绿色的。而绘制矩形的坐标是(110, 110)，因为变换仍在起作用。再次调用 restore()之后，变换被移除， fillStyle 也恢复为红色。绘制最后一个矩形的坐标变成了(0, 0)。  



注意， save()方法只保存应用到绘图上下文的设置和变换，不保存绘图上下文的内容  

### 18.3.6 绘制图像

2D 绘图上下文内置支持操作图像。如果想把现有图像绘制到画布上，可以使用 **drawImage()方法**。这个方法可以接收 3 组不同的参数，并产生不同的结果。最简单的调用是传入一个 HTML 的<img>元素，以及表示绘制目标的 x 和 y 坐标，结果是把图像绘制到指定位置。比如：  

```javascript
let image = document.images[0];
context.drawImage(image, 10, 10);
```

以上代码获取了文本中的第一个图像，然后在画布上的坐标(10, 10)处将它绘制了出来。绘制出来的图像与原来的图像一样大。如果想改变所绘制图像的大小，可以再传入另外两个参数：目标宽度和目标高度。这里的缩放只影响绘制的图像，不影响上下文的变换矩阵。  

### 18.3.7 阴影

2D 上下文可以根据以下属性的值自动为已有形状或路径生成阴影。  

- `shadowColor` 2D 上下文可以根据以下属性的值自动为已有形状或路径生成阴影。  
- `shadowOffsetX` 阴影相对于形状或路径的 x 坐标的偏移量，默认为 0。  
- `shadowOffsetY`  阴影相对于形状或路径的 y 坐标的偏移量，默认为 0  
- `shadowBlur` 像素，表示阴影的模糊量。默认值为 0，表示不模糊  

这些属性都可以通过 context 对象读写。只要在绘制图形或路径前给这些属性设置好适当的值，阴影就会自动生成。比如：  

```javascript
// 绘制阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = 'rgba(11,22,33,0.5)';
```

![image-20210829160535843](https://i.loli.net/2021/08/29/5EWyNz4USdTt78x.png)

### 18.3.8 渐变

渐变通过 CanvasGradient 的实例表示，在 2D 上下文中创建和修改都非常简单。**要创建一个新的线性渐变，可以调用上下文的 createLinearGradient()方法**。这个方法接收 4 个参数：**起点 x 坐标、起点 y 坐标、终点 x 坐标和终点 y 坐标**。调用之后，该方法会以指定大小创建一个新的 CanvasGradient对象并返回实例。  



有了 gradient 对象后，接下来要使用 addColorStop()方法为渐变指定色标。这个方法接收两个参数：色标位置和 CSS 颜色字符串。色标位置通过 0～ 1 范围内的值表示， 0 是第一种颜色， 1 是最后一种颜色。比如：  

```javascript
// 绘制阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = 'rgba(11,22,33,0.5)';

let gradient = context.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'black');

context.fillStyle = '#ff0000';
context.fillRect(10, 10, 50, 50);

context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```

![image-20210829161823390](https://i.loli.net/2021/08/29/cwvyCfelHo1xPzR.png)

### 18.3.9 图案

图案是用于填充和描画图形的重复图像。要创建新图案，可以调用 createPattern()方法并传入两个参数：一个 HTML <img>元素和一个表示该如何重复图像的字符串。第二个参数的值与 CSS 的background-repeat 属性是一样的，包括"repeat"、 "repeat-x"、 "repeat-y"和"no-repeat"。比如：  

```javascript
// 图案
let image = document.images[0];
let pattern = context.createPatern(image, 'repeat');
context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);

```

记住，跟渐变一样，图案的起点实际上是画布的原点(0, 0)。将填充样式设置为图案，表示在指定位置而不是开始绘制的位置显示图案。  

### 18.3.10 图像数据

2D 上下文中比较强大的一种能力是可以使用 getImageData()方法获取原始图像数据。这个方法接收 4 个参数：要取得数据中第一个像素的左上角坐标和要取得的像素宽度及高度。例如，要从(10, 5)开始取得 50 像素宽、 50 像素高的区域对应的数据，可以这样写：  

```javascript
// 图像数据
let imageData = context.getImageData(10, 5, 50, 50);
```

返回的对象是一个 ImageData 的实例。每个 ImageData 对象都包含 3 个属性： width、 height和 data，其中， data 属性是包含图像的原始像素信息的数组。每个像素在 data 数组中都由 4 个值表示，分别代表红、绿、蓝和透明度值。换句话说，第一个像素的信息包含在第 0 到第 3 个值中，  



这个数组中的每个值都在 0~255 范围内（包括 0 和 255）。对原始图像数据进行访问可以更灵活地操作图像。  

### 18.3.11 合成

2D 上下文中绘制的所有内容都会应用两个属性： globalAlpha 和 globalComposition Operation，其中， globalAlpha 属性是一个范围在 0~1 的值（包括 0 和 1），用于指定所有绘制内容的透明度，默 认值为 0。如果所有后来的绘制都需要使用同样的透明度，那么可以将 globalAlpha 设置为适当的值，执行绘制，然后再把 globalAlpha 设置为 0。比如：   

```javascript
let context = drawing.getContext('2d');

// 绘制阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = 'rgba(11,22,33,0.5)';

let gradient = context.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'black');

context.fillStyle = '#ff0000';
context.fillRect(10, 10, 50, 50);

// 修改全局透明度
context.globalAlpha = 0.5;

context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);

// 重置
context.globalAlpha = 0;
```

![image-20210829162810876](https://i.loli.net/2021/08/29/m1HVY8aTA6uFcU4.png)

globalCompositionOperation 属性表示新绘制的形状如何与上下文中已有的形状融合。这个属性是一个字符串，可以取下列值。  

- `source-over`
- `source-in`
- `source-out`
- `source-atop`
- `destination-over`
- `destination-in`
- `destination-out`
- `destination-atop`
- `lighter`
- `copy`
- `xor`

## 18.4 WebGL

WebGL 是画布的 3D 上下文。与其他 Web 技术不同， WebGL 不是 W3C 制定的标准，而是 Khronos Group 的标准。根据官网描述，“Khronos Group 是非营利性、会员资助的联盟，专注于多平台和设备下并行计算、图形和动态媒体的无专利费开放标准”。 Khronos Group 也制定了其他图形 API，包括作为浏览器中 WebGL 基础的 OpenGL ES 2.0。  



**注意** 定型数组是在 WebGL 中执行操作的重要数据结构。  

### 18.4.1 WebGL 上下文

在完全支持的浏览器中， WebGL 2.0 上下文的名字叫"webgl2"， WebGL 1.0 上下文的名字叫"webgl1"。如果浏览器不支持 WebGL，则尝试访问 WebGL 上下文会返回 null。在使用上下文之前，应该先检测返回值是否存在：  

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGL</title>
</head>

<body>
    <canvas id="drawing" width="200" height="200">A drawing of something.</canvas>

    <script>
        let drawing = document.getElementById('drawing');

        // 确保浏览器支持 <canvas>
        if (drawing.getContext) {
            let gl = drawing.getContext('webgl');
            if (gl) {
                // 使用 WebGL
            }
        }
    </script>
</body>

</html>
```

这里把 WebGL context 对象命名为 gl。大多数 WebGL 应用和例子遵循这个约定，因为 OpenGL ES 2.0 方法和值通常以"gl"开头。这样可以让 JavaScript 代码看起来更接近 OpenGL 程序。  

### 18.4.2 WebGL 基础

可以在调用 getContext()取得 WebGL 上下文时指定一些选项。这些选项通过一个参数对象传入，选项就是参数对象的一个或多个属性。  

- `alpha` 布尔值，表示是否为上下文创建透明通道缓冲区，默认为 true  
- `depth` 布尔值，表示是否使用 16 位深缓冲区，默认为 true  
- `stencil` 布尔值，表示是否使用 8 位模板缓冲区，默认为 false  
- `antialias` 布尔值，表示是否使用默认机制执行抗锯齿操作，默认为 true  
- `premultipliedAlpha` 布尔值，表示绘图缓冲区是否预乘透明度值，默认为 true  
- `preserveDrawingBuffer` 布尔值，表示绘图完成后是否保留绘图缓冲区，默认为 false  

```javascript
let drawing = document.getElementById('drawing');

// 确保浏览器支持 <canvas>
if (drawing.getContext) {
    let gl = drawing.getContext('webgl', {
        alpha: false
    });
    if (gl) {
        // 使用 WebGL
    }
}
```

如果调用 getContext()不能创建 WebGL 上下文，某些浏览器就会抛出错误。为此，最好把这个方法调用包装在 try/catch 块中：  

```javascript
let drawing = document.getElementById('drawing');

// 确保浏览器支持 <canvas>
if (drawing.getContext) {
    let gl;
    try {
        gl = drawing.getContext('webgl');
    } catch (e) {
        // 什么也不做
    }
    if (gl) {
        // 使用 WebGL
    } elese {
        console.log("WebGL context could not be created");
    }
}
```

1. **常量** WebGL 中要这样访问 gl.COLOR_BUFFER_BIT。 WebGL 以这种方式支持大部分 OpenGL 常量  

2. **方法命名** 

   OpenGL（同时也是 WebGL）中的很多方法会包含相关的数据类型信息。接收不同类型和不同数量参数的方法，会通过方法名的后缀体现这些信息。表示参数数量的数字（ 1~4）在先，表示数据类型的字符串（“f”表示浮点数，“i”表示整数）在后。比如， gl.uniform4f()的意思是需要 4 个浮点数值参数，而 gl.uniform3i()表示需要 3 个整数值参数。  还有很多方法接收数组，这类方法用字母“v”（ vector）来表示。因此， gl.uniform3iv()就是要
   接收一个包含 3 个值的数组参数。在编写 WebGL 代码时，要记住这些约定。  

3. **准备绘图**

   准备使用 WebGL 上下文之前，通常需要先指定一种实心颜色清除<canvas>。为此，要调用clearColor()方法并传入 4 个参数，分别表示红、绿、蓝和透明度值。每个参数必须是 0~1 范围内的值，表示各个组件在最终颜色的强度。比如：  、

   ```javascript
   gl.clearColor(0, 0, 0, 1);
   gl.clear(gl.COLOR_BUFF_BIT);
   ```

   以上代码把清理颜色缓冲区的值设置为黑色，然后调用 clear()方法，这个方法相当于 OpenGL中的 glClear()方法。参数 gl.COLOR_BUFFER_BIT 告诉 WebGL 使用之前定义的颜色填充画布。通常，所有绘图操作之前都需要先清除绘制区域。  

4. **视口与坐标**

   绘图前还要定义 WebGL 视口。默认情况下，视口使用整个 `<canvas>` 区域。要改变视口，可以调用 `viewport()` 方法并传入视口相对于 `<canvas>` 元素的 x、 y 坐标及宽度和高度。例如，以下代码表示要使用整个 `<canvas>` 元素  

   ```javascript
   gl.viewport(0, 0, drawing.width, drawing.width);
   ```

   这个视口的坐标系统与网页中通常的坐标系统不一样。视口的 x 和 y 坐标起点(0, 0)表示 `<canvas>` 元素的左下角，向上、向右增长可以用点(width–1, height–1)定义（见图 18-14）。  

   ![image-20210830102532267](https://i.loli.net/2021/08/30/9qUCO7QZfsizIkc.png)

   定义视口的坐标系统与视口中的坐标系统不一样。在视口中，坐标原点(0, 0)是视口的中心点。左下角是(–1, –1)，右上角是(1, 1)，  