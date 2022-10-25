# CSS Cascading Style Sheet 层叠样式表

- CSS作用：给HTML页面标签添加各种样式，**定义网页的显示效果**
- **CSS的优点**
  - 让数据和显示分离
  - 降低网络流量
  - 使整个网页视觉效果一致
  - 提高开发效率，降低耦合性
- 重点、
  - 盒子模型
  - 浮动
  - 定位
- CSS 与 HTML 结合的方式
  - 行内样式
  - 内嵌样式
  - 引入外部样式 
    - `<link rel = "stylesheet" type = "text/css" href = "a.css"></link>`
      - `link`标签的`rel`属性
        - `stylesheet`
        - `alternative styleshee` 候选的 必须定义`title`属性
    - `@import url(a.css) ;` `import`必须写在`<style>`标签内部，而且必须是第一句

## 1. 选择器

- **基本选择器**

  - 标签选择器 例如 `p {}`
    - 所有的标签，都可以是选择器。比如 `ul、li、label、dt、dl、input`
    - 无论这个标签藏的多深，一定能够被选择上
    - 选择的所有，而不是一个。
  - ID选择器 例如 `#title{ }`
    - （1）只能有字母、数字、下划线
    - （2）必须以字母开头
    - （3）不能和标签同名。比如 id 不能叫做 body、img、a
    - **HTML 页面，不能出现相同的 id，哪怕他们不是一个类型**
    - **一个标签可以被多个 css 选择器选择**
  - 类选择器 例如 `.main {}`
    - 特性 1：类选择器可以被多种标签使用。
    - 特性 2：同一个标签可以使用多个类选择器。用 **空格** 隔开
  - 通用选择器 通配符 `*`：匹配任何标签
    - 通用选择器，将匹配任何标签。不建议使用，IE 有些版本不支持，大网站增加客户端负担。
    - 效率不高，如果页面上的标签越多，效率越低，所以页面上不能出现这个选择器

- **扩展选择器**

  - **后代选择器** 用空格` `隔开

    ```html
    <style type="text/css">
        .div1 p {
            color: red;
        }
    </style>
    ```

    `.div1 p` 表示`.div1` 的后代所有的 `p`

  - **交集选择器** 选择器之间紧密相连 使用 **`.`** 连接

    - 定义交集选择器的时候，两个选择器之间紧密相连。一般是以标签名开头，比如`div.haha`

      ```css
      h3.special {
          color: red;
      }
      ```

      ![img](https://camo.githubusercontent.com/5b53f53a5f40d1ee2061b55b4263c26b8b0d411109b0de304a0e5ed182c6f6c1/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303731315f313835312e706e67)

  - **并集选择器** （分组选择器）：用逗号隔开

    ```css
    p,
    h1,
    #mytitle,
    .one {
        color: red;
    }
    ```

  - **子代选择器** 用符号 **`>`** 表示 不同于后代

    ```css
    div > p {
        color: red;
    }
    ```

    div 的儿子 p。和 div 的后代 p 的截然不同

  - **序选择器**

    - 设置无序列表 `<ul>` 中的第一个 `<li>` 为红色 `:first-child`：

      ```css
      ul li:first-child {
          color: red;
      }
      ```

    - 设置无序列表 `<ul>` 中的最后一个`<li>` `last-child`为红色：

      ```css
      ul li:last-child {
          color: blue;
      }
      ```

  - **下一个兄弟选择器** `+` 表示下一个兄弟

    ```css
    h3 + p {
            color: red;
    }
    ```

    上方的选择器意思是：选择的是 h3 元素后面紧挨着的第一个兄弟

  - **伪类选择器**

    - 伪类：同一个标签，根据其 **不同的种状态，有不同的样式**。这就叫做“伪类”。伪类用冒号来表示
    - 静态伪类 只能属于超链接
      - `:link` 点击超链接之前
      - `:visited `超链接被访问之后
      - 超链接a标签在使用的时候，比较难。因为不仅仅要控制a这个盒子，也要控制它的伪类
      - 我们一定要将a标签写在前面，将 `:link、:visited、:hover、:active` 这些伪类写在后面。
    - 动态伪类 所有标签都适用
      - `:hover`
      - `:active`
      - `:focus`

## 2. 样式表的继承性和层叠性

- **继承性**：有一些属性，当给自己设置的时候，自己的后代都继承上了，这个就是 **继承性**。**继承性是从自己开始，直到最小的元素**。

  - **关于文字样式的属性，都具有继承性。这些属性包括：color、 text-开头的、line-开头的、font-开头的**
  - **关于盒子、定位、布局的属性，都不能继承**

- **层叠性** **就是css处理冲突的能力。** 所有的权重计算，没有任何兼容问题

  - 当多个选择器，选择上了某个元素的时候，要按照如下顺序统计权重：

    - id 选择器
    - 类选择器、属性选择器、伪类选择器
    - 标签选择器、伪元素选择器
    - 因为对于相同方式的样式表，其选择器排序的优先级为：ID选择器 > 类选择器 > 标签选择器

    ![img](https://camo.githubusercontent.com/793b50a0dc02f26dee9232ca152854e31c9a11455e1ea5453970b396d15685a4/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303732375f323035302e706e67)

  综上：

  - **选择上了，数权重**，(id的数量，类的数量，标签的数量)。如果权重一样，谁写在后面听谁的。
  - **没有选择上，通过继承影响的**，就近原则，谁描述的近听谁的。如果描述的一样近，比如选择器权重，如果权重再一样重，谁写在后面听谁的。

  总结

  - 1、对于相同的选择器（比如同样都是类选择器），其样式表排序：行级样式 > 内嵌样式表 > 外部样式表（就近原则）

  - 2、对于相同类型的样式表（比如同样都是内部样式表），其选择器排序：ID选择器 > 类选择器 > 标签选择器

  - 3、外部样式表的ID选择器  > 内嵌样式表的标签选择器

  - 4、对同一个标签，如果用到的都是内嵌样式表，且权重一致，那它的优先级：**定义**的CSS样式表中，谁最近，就用谁。

  - 5、对于同一个标签，如果用到的都是外部样式表，且权重一致，那它的优先级：html文件中，引用样式表的位置越近，就用谁。

  - 给标签选择器的加一个 `!important` 标记，此时其权重为无穷大

  - 同一个标签，携带了多个类名，有冲突：

    这里需要补充两种冲突的情况：

    - 1、对同一个标签，如果用到了了多个相同的内嵌样式表，它的优先级：**定义** 的样式表中，谁最近，就用谁。
    - 2、对于同一个标签，如果引用了多个相同的外部样式表，它的优先级：html文件中，引用样式表的位置越近，就用谁。

## 3. 字体属性和文本属性

- CSS的单位 `1 in = 2.54 cm = 25.4 mm = 72 pt = 6 pc` ，而HTML中只有一种单位 `px`
    - **绝对单位**
      
      - `in` 英寸
      - `cm` 厘米
      - `mm` 毫米
      - `pt` 点，英镑
      - `pc ` 皮卡 Picas
      
    - **相对单位**
    
      - `px` 像素
    
      - `em` 相当于12个点
    
      - `%` 相对周围文字的大小，例如下面的例子，嵌套的第一个 `div` 沿用外层 `div` 字体大小，嵌套的第二个 `div` 字体大小就为前面`div`两倍
    
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS</title>
            <style>
                div {
                    font-size: 40px;
                }
                .f2 {
                    font-size: 200%;
                }
            </style>
        </head>
        <body>
            <div>
                <div class="f1">this is div 1</div>
                <div class="f2">this is div 2</div>
            </div>
        
        </body>
        </html>
        ```
    
        ![image-20210813095346641](https://i.loli.net/2021/08/13/BfIetblyk1FUHX5.png)
    
- **字体属性**，常用的如下

    - `font: 400 14px/24px/ "宋体"` `font: 加粗 字号/行高 字体`
    - `font-size` 字体大小
    - `line-height` 行高，行高也可以用百分比表示
    - `font-family` 字体类型，可以为多个，一次寻找，英文字体应该放最前面
    - `font-style` `italic`斜体 `normal`表示不倾斜
    - `font-weight` 字体权重 可以设置为100-900的数值 `normal` 为400 `bold `为700
    - `font-variant` 

- **文本属性**
  
  - `letter-spaceing: 0.4cm;` 单个字母的间距
  - `word-spaceing: 1cm;` 单词之间的间距
  - `text-decoration: none` 字体修饰
    - `none  ` 去掉下划线
    - `underline` 下划线
    - `line-through `中划线
    - `overline` 上划线
  - `color: red;` 字体颜色
  - `text-align: center;` 在当前容器的对齐方式
    - `left`
    - `center`
    - `right`
    - `justify`
  - `text-transform: lowercase` 单词的字体大小写
    - `lowercase`
    - `uppercase`
    - `capitalize` 每个单词首字母大写
  - `text-indent` 缩进元素中文本的首行
  - `direction`文本方向
    - `ltr`
    - `rtl`
- **列表属性**
  
  - `list-style: list-style-type list-style-position position list-style-image` 将所有列表属性写到一起
  - `list-style-type` 标记类型
  - `list-style-posiont ` 流标标记被放置的位置
  - `list-style-image` 将图像设置为列表项标记
- **`overflow` 属性**：处理超出范围的内容
  
  - `visible` 默认值。多余的内容不剪切也不添加滚动条，会全部显示出来
  - `hidden` 不显示超过对象尺寸的内容
  - `auto  `如果内容不超出，则不显示滚动条; 如果内容超出，则显示滚动条
  - `scroll` Windows 平台下，无论内容是否超出，总是显示滚动条。Mac 平台下，和 `auto` 属性相同
- **鼠标属性** `cursor`
  
  - `auto`
  - `pointer`
  - `hand`
  - `help`
  - `...` 还有很多

## 4. 背景属性

- `background-color`背景颜色
  - 单词 例如`red`
  - rgb表示 例如 `rgb(233,2,2)`
  - 16进制表示 例如 `#ff0022`
  - rgbc表示 例如 `rgba(255, 255, 0, 0.4)`
  - HSLA表示 例如 `hsla(240, 50%, 40%, 0.4)`
    - `H`表示色调 0-360，0和360表示红色 120 表示绿色 240 表示蓝色
    - `S`饱和度 0%-100% 值越大 越鲜艳
    - `L`亮度 0%-100% 亮度最大时为白色 最小时为黑色
    - `A`透明度 0-1
- `backgound-repeat`设置背景图片重复方式，默认平铺满
  - 默认为平铺满
  - `no-repeat`
  - `repeat-x`
  - `repeat-y`

- `background-position: 左右 上下`
- `background-attachment`设置图片是否被固定
  - `fixed`
  - `scroll`
- `backgournd: red url(1.jpg) no-repeat 100px 100px fixed` 综合属性，等价于下面
  - `background-color:red;`	
  - `background-image:url(1.jpg);`
  - `background-repeat:no-repeat;`
  - `background-position:100px 100px;`
  - `background-attachment:fixed;`
- `background-size` 背景尺寸
  
  - 宽高具体值 `background-size: 100px 100px;`
  - 百分比
  - `cover`图片始终**填充满**容器，且保证**长宽比不变**。图片如果有超出部分，则超出部分会被隐藏
  - `contain`：将图片**完整地**显示在容器中，且保证**长宽比不变**。可能会导致容器的部分区域留白
- `background-origin` 控制背景从什么地方开始显示
  
  - `padding-box` 内边距开始显示背景图
  - `border-box` 边框开始显示背景图
  - `content-box` 内容区域开始显示背景图
  
- `background-clip `设置元素的背景是否延伸到边框下面

  - `content-box`  超出 border-box 的部分，将裁剪掉
  - `border-box`  超出 border-box 的部分，将裁剪掉
  - `padding-box` 超出 content-box 的部分，将裁剪掉

- 可以同时设置多个背景，用逗号隔开

  ```html
  <!DOCTYPE html>
  <html>
  <head lang="en">
      <meta charset="UTF-8">
      <title></title>
      <style>
          .box {
              height: 416px;
              border: 1px solid #000;
              margin: 100px auto;
              /* 给盒子加多个背景，按照背景语法格式书写，多个背景使用逗号隔开 */
              background: url(images/bg1.png) no-repeat left top,
              url(images/bg2.png) no-repeat right top,
              url(images/bg3.png) no-repeat right bottom,
              url(images/bg4.png) no-repeat left bottom,
              url(images/bg5.png) no-repeat center;
          }
      </style>
  </head>
  <body>
  <div class="box"></div>
  </body>
  </html>
  ```

  ![img](https://camo.githubusercontent.com/8d5be7b6e6f37bf0306bf9d7338af695603b481059bfc9507d1fd615f9b0fc31/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303230375f323134302e676966)

- `background-image` 渐变
  - 线性渐变：沿着某条直线朝一个方向产生渐变效果
    -  `linear-gradient(方向, 起始颜色, 终止颜色);`
    - 方向可以是：`to left`、`to right`、`to top`、`to bottom`、角度`30deg`（指的是顺时针方向30°）
  - 径向渐变：从一个 **中心点** 开始沿着 **四周** 产生渐变效果
    - `background-image: radial-gradient(辐射的半径大小, 中心的位置, 起始颜色, 终止颜色);`
  - 重复渐变
- `clip-path` 裁剪出元素的部分区域做展示 例如 `clip-path: circle(80px at 100px 100px);`

## 5. 盒模型

**盒子模型**，英文即box model。无论是div、span、还是a都是盒子。但是，**图片、表单元素一律看作是文本，它们并不是盒子**。这个很好理解，比如说，一张图片里并不能放东西，它自己就是自己的内容。



- 盒子中的区域

  - `width` 和 `height`：**内容** 的宽度、高度（不是盒子的宽度、高度）
  - `padding`：内边距
    - `padding-top: 30px;`
    - `padding-right: 20px;`
    - `padding-bottom: 40px;`
    - `padding-left: 100px;`
    - `padding:30px 20px 40px 100px;` (上、右、下、左)（**顺时针方向**，用空格隔开。margin的道理也是一样的）
  - border：边框有三个要素：像素（粗细）、线型、颜色。例如 `border: 2px solid red;`
    - `border-width:10px 20px;`
    - `border-style:solid dashed dotted;`
    - `border-color:red green blue yellow;`
    - `border-image: url(.img.png) 30 round;`
  - margin：外边距

  ![img](https://i.loli.net/2021/09/14/nyvLEkr7hYX6FB4.png)

- `<body>` 标签也有 `margin`

  `<body>` 标签有必要强调一下。很多人以为 `<body>` 标签占据的是整个页面的全部区域，其实是错误的，正确的理解是这样的：整个网页最大的盒子是`<document>`，即浏览器。而 `<body>` 是 `<document>` 的儿子。浏览器给 `<body>` 默认的 `margin` 大小是8个像素，此时 `<body>` 占据了整个页面的一大部分区域，而不是全部区域。来看一段代码。

## 6. 浮动

- **标准文档流的特性**

  - 空白折叠现象 无论多少个空格、换行、tab，都会折叠为一个空格
  - 高低不齐 底边对齐
  - 自动换行 一行不写满 换行写

- **行内元素与块级元素**

  - 行内元素

    - 与其他行内元素并排
    - 不能设置宽、高。默认的宽度，就是文字的宽度

  - 块级元素

    - 霸占一行，不能与其他任何元素并列
    - 能接受宽、高。如果不设置宽度，那么宽度将默认变为父亲的100%

  - 分类

    - 从HTML角度

      - **文本级标签**：`p、span、a、b、i、u、em`
      - **容器级标签**：`div、h` 系列、`li、dt、dd`

      > PS：为甚么说p是文本级标签呢？因为p里面只能放文字&图片&表单元素，p里面不能放h和ul，p里面也不能放p

      ![img](https://camo.githubusercontent.com/838121374fbbb7a49fadec68c6e9a8a935d54f03fc01065f9902071664b6001e/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303732395f313534352e706e67)

    - 从CSS角度

      - 行内元素：除了p之外，所有的文本级标签，都是行内元素。p是个文本级，但是是个块级元素

      - 块级元素：所有的容器级标签都是块级元素，还有p标签

      - >  为甚么说p是文本级标签呢？因为p里面只能放文字&图片&表单元素，p里面不能放h和ul，p里面也不能放p

          ![img](https://camo.githubusercontent.com/838121374fbbb7a49fadec68c6e9a8a935d54f03fc01065f9902071664b6001e/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303732395f313534352e706e67)

  - 块级元素和行内元素的相互转换

    - 块级 -> 行内

      `display: inline`

      - 此时这个div不能设置宽度、高度
      - 此时这个div可以和别人并排了

    - 行内 -> 块级

      `display: block`

      - 此时这个span能够设置宽度、高度
      - 此时这个span必须霸占一行了，别人无法和他并排
      - 如果不设置宽度，将撑满父亲

- **脱离标准流**

  - （1）浮动
  - （2）绝对定位
  - （3）固定定位

- **浮动性质**

  - 浮动的元素脱离标准流
  - 浮动的元素相互贴靠
  - 浮动元素有 ''字围" 效果
  - 收缩 一个浮动元素，如果没有设置`width`，将自动收缩为内容宽度

- **浮动清除**

  - 给浮动元素的祖先加高度

  - `clear: both;`

  - 隔墙法

  - `overflow: hidden;`

  - 浏览器兼容问题

    - **微型盒子** IE6不支持小于12px的盒子，任何小于12px的盒子，在IE6中看都大。即：IE 6不支持微型盒子，解决办法

      ```css
      height: 10px;
      _font-size:0;
      ```

    - **IE6**不支持用`overflow:hidden;`来清除浮动。

      ```css
      overflow: hidden;
      _zoom:1;
      ```

- `margin` 相关
  
  - `margin` 塌陷 重叠：**标准文档流中，竖直方向的margin不叠加，取 **较大的值**作为`margin`
  - 盒子居中 `margin: 0 auto;`
    - （1）只有标准流的盒子，才能使用 `margin:0 auto;` 居中。也就是说，当一个盒子浮动了、绝对定位了、固定定位了，都不能使用 `margin:0 auto;`
    - （2）使用 `margin:0 auto;` 的盒子，必须有 `width`，有明确的 `width`。（可以这样理解，如果没有明确的witdh，那么它的witdh就是霸占整行，没有意义）
    - （3）`margin:0 auto;`是让盒子居中，不是让盒子里的文本居中。文本的居中，要使用`text-align:center;`
  - 善用父亲的`padding`，而不是儿子的`margin`

## 7. 定位属性

- **相对定位** `posion: relative;` 让元素相对于自己原来的位置，进行位置调整

  ```css
  position: relative;
  left: 50px;
  top: 50px;
  ```

- **绝对定位** `position: absolute` 定义横纵坐标。原点在父容器的左上角或左下角。横坐标用 `left` 表示，纵坐标用 `top` 或者 `bottom` 表示

  ```css
  position: absolute;  /*绝对定位*/
  left: 10px;  /*横坐标*/
  top/bottom: 20px;  /*纵坐标*/
  ```

  - 绝对定位的参考点
    - 如果使用 `top` 描述，则参考点是 **页面左上角**，而不是浏览器左上角
    - 如果使用 `bottom` 描述，则参考点是 **浏览器首屏窗口尺寸**，即页面的左下角

- **固定定位** `position: fixed` 就是相对浏览器窗口进行定位。无论页面如何滚动，这个盒子显示的位置不变，IE6不兼容
  
  - **用途1**： 网页左下角的返回到顶部
  - **用途2**: 顶部导航栏
  
- **`z-index ` 属性** 表示谁压着谁。数值大的压盖住数值小的
  
  - 特性
    - （1）属性值大的位于上层，属性值小的位于下层
      - （2）z-index值没有单位，就是一个正整数。默认的 `z-index` 值是 0
    - （3）如果大家都没有z-index值，或者z-index值一样，那么在HTML代码里写在后面，谁就在上面能压住别人。定位了的元素，永远能够压住没有定位的元素
    - （4）只有定位了的元素，才能有z-index值。也就是说，不管相对定位、绝对定位、固定定位，都可以使用z-index值。**而浮动的元素不能用**
    - （5）从父现象：父亲怂了，儿子再牛逼也没用。意思是，如果父亲1比父亲2大，那么，即使儿子1比儿子2小，儿子1也能在最上层

## 8. CSS3 选择器

前面的CSS选择器

```css
div 标签选择器

.box 类名选择器

#box　id选择器

div p 后代选择器

div.box 交集选择器

div, p, span 并集选择器

div > p 子代选择器

* : 通配符

div+p: 选中div后面相邻的第一个p

div~p: 选中的div后面所有的p
```
### 8.1 属性选择器

- **属性选择器** 的标识符为 **`[]`**

- 匹配含义：

  ```css
  ^：开头  $：结尾  *：包含
  ```

- 格式

  - `E[title]` 选中页面的E元素，并且E存在 title 属性即可
  - `E[title="abc"]` 选中页面的E元素，并且E需要带有title属性，且属性值 **完全等于 **abc
  - `E[attr~=val]`  选择具有 att 属性且属性值为：用空格分隔的字词列表，其中一个等于 val 的E元素
  - `E[attr|=val]` 表示要么是一个单独的属性值，要么这个属性值是以“-”分隔的
  - `E[title^="abc"]` 选中页面的E元素，并且E需要带有 title 属性,属性值以 abc 开头
  - `E[title$="abc"]` 选中页面的E元素，并且E需要带有 title 属性,属性值以 abc 结尾
  - `E[title*="abc"]` 选中页面的E元素，并且E需要带有 title 属性,属性值任意位置包含abc

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>选择器 - 属性</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: '微软雅黑';
              background-color: #F7F7F7;
          }
  
          .wrapper {
              width: 1024px;
              margin: 0 auto;
          }
  
          .wrapper > section {
              min-height: 300px;
              margin-bottom: 30px;
              box-shadow: 1px 1px 4px #DDD;
              background-color: #FFF;
          }
  
          .wrapper > header {
              text-align: center;
              line-height: 1;
              padding: 20px;
              margin-bottom: 10px;
              font-size: 30px;
          }
  
          .wrapper section > header {
              line-height: 1;
              padding: 10px;
              font-size: 22px;
              color: #333;
              background-color: #EEE;
          }
  
          .wrapper .wrap-box {
              padding: 20px;
          }
  
          form {
              width: 300px;
              height: 300px;
              margin: 0 auto;
          }
  
          form input[type="text"] {
              width: 200px;
              height: 30px;
          }
  
          form input[type="password"] {
              width: 200px;
              height: 30px;
          }
  
          .attr1 {
  
          }
  
          .download {
          }
  
          .attr1 a[href="./a.rmvb"] {
              color: red;
          }
  
          .attr1 a[href="./b.rmvb"] {
              color: pink;
          }
  
          /*  E[attr~=val] 表示的一个单独的属性值 这个属性值是以空格分隔的*/
          .attr2 a[class~="download"] {
              color: red;
          }
  
          /*  E[attr|=val] 表示的要么一个单独的属性值 要么这个属性值是以"-"分隔的*/
          .attr3 a[class|="download"] {
              color: red;
          }
  
          /*  E[attr*=val] 表示的属性值里包含val字符并且在“任意”位置 */
          .attr4 a[class*="download"] {
              color: red;
          }
  
          /*  E[attr^=val] 表示的属性值里包含val字符并且在“开始”位置 */
          .attr5 a[class^="download"] {
              color: red;
          }
  
          /*  E[attr$=val] 表示的属性值里包含val字符并且在“结束”位置 */
          .attr6 a[class$="download"] {
              color: red;
          }
      </style>
  </head>
  <body>
  <div class="wrapper">
      <header>CSS3-属性选择器</header>
      <section>
          <header>简介</header>
          <div class="wrap-box">
              <form action="">
  
                  <ul>
                      <li>
                          姓名: <input type="text">
                      </li>
                      <li>
                          密码: <input type="password">
                      </li>
  
                      <li>
                          性别: <input type="radio">男
                          <input type="radio"> 女
                      </li>
                      <li>
                          兴趣: <input type="checkbox" name="" id="">写代码
                      </li>
                      <li>
                          <input type="submit" value="提交">
                      </li>
                  </ul>
              </form>
          </div>
      </section>
      <section class="attr1">
          <header>E[attr]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download download-movie">下载</a>
              <a href="./b.rmvb" class="download download-movie">下载</a>
              <a href="./a.mp3" class="download download-music">下载</a>
          </div>
      </section>
      <section class="attr2">
          <header>E[attr~=attr]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download download-movie">下载</a>
              <a href="./b.rmvb" class="download download-movie">下载</a>
              <a href="./a.mp3" class="download download-music">下载</a>
          </div>
      </section>
      <section class="attr3">
          <header>E[attr|=attr]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download">下载</a>
              <a href="./b.rmvb" class="download-movie">下载</a>
              <a href="./a.mp3" class="download-music">下载</a>
          </div>
      </section>
      <section class="attr4">
          <header>E[attr*=val]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download">下载</a>
              <a href="./b.rmvb" class="moviedownload">下载</a>
              <a href="./a.mp3" class="downloadmusic">下载</a>
          </div>
      </section>
      <section class="attr5">
          <header>E[attr^=val]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download">下载</a>
              <a href="./b.rmvb" class="moviedownload">下载</a>
              <a href="./a.mp3" class="downloadmusic">下载</a>
          </div>
      </section>
      <section class="attr6">
          <header>E[attr$=val]</header>
          <div class="wrap-box">
              <a href="./a.rmvb" class="download">下载</a>
              <a href="./b.rmvb" class="moviedownload">下载</a>
              <a href="./a.mp3" class="downloadmusic">下载</a>
          </div>
      </section>
  </div>
  </body>
  </html>
  ```

### 8.2 结构伪类选择器

- 全面的伪类选择器为动态伪类选择器
  - `:link`
  - `:active`
  - `:visited`
  - `:hover`

- 格式1

  - `E:first-child` 匹配父元素的第一个子元素E
  - `E:last-child` 匹配父元素的最后一个子元素E
  - `E:nth-child(n)` 匹配父元素的第n个子元素E。**注意**，盒子的编号是从`1`开始算起，不是从`0`开始算起
  - `E:nth-child(odd)` 匹配奇数
  - `E:nth-child(even)` 匹配偶数
  - `E:nth-last-child(n)` 匹配父元素的倒数第n个子元素E

- 理解

  - 这里我们要好好理解 **父元素** 的含义，它指的是：以 E 元素的父元素为参考

  - 注意：以上选择器中所选到的元素的类型，必须是指定的类型E，如果选不中，则无效。这个要好好理解，具体可以看CSS参考手册中的 `E:nth-child(n)`的示例。我们可以理解成：**先根据选择器找到选中的全部位置，如果发现某个位置不是类型E，则该位置失效**

  - 另外，`E:nth-child(n)` 这个属性也很有意思。比如，针对下面这样一组标签：

    ```html
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
    </ul>
    ```

    上方代码中：

    - 如果选择器写成`li:nth-child(2)`，则表示第2个 `li`
    - 如果选择器写成`li:nth-child(n)`，则表示**所有的** `li`。因为此时的 `n` 表示 0,1,2,3,4,5,6,7,8.....（当n小于1时无效，因为n = 0 也是不会选中的）
    - 如果选择器写成`li:nth-child(2n)`，则表示所有的**第偶数个 **` li`
    - 如果选择器写成`li:nth-child(2n+1)`，则表示所有的**第奇数个 **` li`
    - 如果选择器写成`li:nth-child(-n+5)`，则表示**前5个** `li`
    - 如果选择器写成`li:nth-last-child(-n+5)`，则表示**最后5个** ` li`
    - 如果选择器写成`li:nth-child(7n)`，则表示选中7的倍数
    - 上面列举的选择器中，我们只要记住： `n` 表示 0,1,2,3,4,5,6,7,8.....就很容易明白了

- 格式2

  - `E:first-of-type` 匹配同类型中的第一个同级兄弟元素E
  - `E:last-of-type` 匹配同类型中的最后一个同级兄弟元素E
  - `E:nth-of-type(n)` 匹配同类型中的第n个同级兄弟元素E
  - `E:nth-last-of-type(n)` 匹配同类型中的倒数第n个同级兄弟元素E

  - 既然上面这几个选择器带有`type`，我们可以这样理解：先在同级里找到所有的E类型，然后根据 n 进行匹配

- 格式3
  - `E:empty` 匹配没有任何子节点（包括空格等text节点）的元素E
  - `E:target` 匹配相关URL指向的E元素。要配合锚点使用

![img](https://i.loli.net/2021/09/14/YqSTphcWHeLlRn2.png)

### 8.3 伪元素选择器

- 格式1
  - `E::before` 设置在 元素E 前面（依据对象树的逻辑结构）的内容，配合 content 属性一起使用
  - `E::after` 设置在 元素E 后面（依据对象树的逻辑结构）的内容，配合 content 属性一起使用

- 格式2

  - `E::first-letter` 设置元素 E 里面的 **第一个字符** 的样式

  - `E::first-line` 设置元素 E 里面的 **第一行** 的样式

  - `E::selection` 设置元素 E 里面被鼠标选中的区域的样式（一般设置颜色和背景色）

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            li::selection {
                color: red;
                font-size: 200%;
            }
    
            li::first-letter {
                font-size: 150%;
            }
        </style>
    </head>
    
    <body>
        <ul>
            <li>仰天大笑出门去</li>
            <li>我辈岂是蓬蒿人</li>
            <li>抽刀断水水更流</li>
        </ul>
    </body>
    
    </html>
    ```

    ![image-20210814193459457](https://i.loli.net/2021/08/14/mhSqlkY8ZgRTOEz.png)

### 8.4 属性

- 文本

  - `text-shadow`: 设置文本的阴影，`text-shadow` 可以设置多个阴影，每个阴影之间使用逗号隔开

    ```css
    参数解释：水平位移 垂直位移 模糊程度 阴影颜色
    text-shadow: 20px 27px 22px pink;
    ```

- 盒模型中的 `box-sizing` 属性，CSS3 对盒模型做出了新的定义，即允许开发人员 **指定盒子宽度和高度的计算方式**，属性值可以是：`content-box`、`border-box`

  - 外加模式：CSS默认方式

    ```css
    box-sizing: content-box;
    ```

    此时设置的 width 和 height 是 **内容区域** 的宽高。`盒子的实际宽度 = 设置的 width + padding + border`。此时改变 padding 和 border 的大小，也不会改变内容的宽高，而是盒子的总宽高发生变化

  - 内减模式

    ```css
    box-sizing: border-box;
    ```

    此时设置的 width 和 height 是**盒子**的总宽高。`盒子的实际宽度 = 设置的 width`。此时改变 padding 和 border 的大小，会改变内容的宽高，盒子的总宽高不变

- **私有前缀**

  ```css
      -webkit-: 谷歌 苹果
      -moz-:火狐
      -ms-：IE
      -o-：欧朋
  ```

  例如：

  ```css
      background: -webkit-linear-gradient(left, green, yellow);
      background: -moz-linear-gradient(left, green, yellow);
      background: -ms-linear-gradient(left, green, yellow);
      background: -o-linear-gradient(left, green, yellow);
      background: linear-gradient(left, green, yellow);
  ```

- 边框

  - 边框圆角 `border-radius` 边框的每个圆角，本质上是一个圆，圆有 **水平半径** 和 **垂直半径** ：如果二者相等，就是圆；如果二者不等， 就是椭圆

    - 单个属性写法

      ```css
      border-top-left-radius: 60px 120px;        //参数解释：水平半径   垂直半径
      
      border-top-right-radius: 60px 120px;
      
      border-bottom-left-radius: 60px 120px;
      
      border-bottom-right-radius: 60px 120px;
      ```

    - 复合写法
    
      ```css
      border-radius: 60px/120px;             //参数：水平半径/垂直半径
      
      border-radius: 20px 60px 100px 140px;  //从左上开始，顺时针赋值。如果当前角没有值，取对角的值
      
      border-radius: 20px 60px;
      ```
    
    - 简洁写法（四个角的半径都相同时）
    
      ```css
      border-radius: 60px;
      ```
    
  - 边框阴影 `box-shadow`
  
    - 水平偏移：正值向右 负值向左
    - 垂直偏移：正值向下 负值向上
    - 模糊程度：不能为负值
    - 后面还可以再加一个 inset 属性，表示内阴影。如果不写，则默认表示外阴影
  
    ```css
    box-shadow: 水平偏移 垂直偏移 模糊程度 阴影大小 阴影颜色
    box-shadow: 15px 21px 48px -2px #666 inset;
    ```
  
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            ul {
                border: 2px solid darkblue;
                border-radius: 20px;
                box-shadow: 15px 21px 48px -2px #666 inset;
            }
            li::selection {
                color: red;
                font-size: 200%;
            }
    
            li::first-letter {
                font-size: 150%;
            }
        </style>
    </head>
    
    <body>
        <ul>
            <li>仰天大笑出门去</li>
            <li>我辈岂是蓬蒿人</li>
            <li>抽刀断水水更流</li>
        </ul>
    </body>
    
    </html>
    ```
  
    ![image-20210815125206908](https://i.loli.net/2021/08/15/qJZDzQmLiGRtXrE.png)
  
  - 边框图片
  
    ```css
    /* 边框图片的路径*/
    border-image-source: url("images/border.png");
    
    /* 图片边框的裁剪*/
    border-image-slice: 27;
    
    /*图片边框的宽度*/
    border-image-width: 27px;
    
    /*边框图片的平铺*/
    /* repeat :正常平铺 但是可能会显示不完整*/
    /*round: 平铺 但是保证 图片完整*/
    /*stretch: 拉伸显示*/
    border-image-repeat: stretch;
    ```
    或者是
  
    ```css
    border-image: url("images/border.png") 27/20px round;
    ```
  
    
  
  ![img](https://i.loli.net/2021/09/14/vqlMFZJ1mkiV3w7.png)

### 8.5 动画

- 过渡： transition 可以实现元素 **不同状态的平滑过渡**

  - 补间动画：自动完成从起始状态到终止状态的过渡，不用管中间的状态

  - 帧动画：通过一帧一帧的画面按照固定的顺序和速度播放，例如电影胶片

  - tansition 属性

    - `transition-property: all;` 如果希望所有属性都发生过渡，是使用 `all`

    - `transition-duration: 1s;` 过渡持续时间

    - `transition-timing-function: linear; ` 运动曲线，属性值可以是

      - `linear` 线性
      - `ease` 减速
      - `ease-in`加速
      - `ease-out` 加速
      - `ease-in-out` 先加速后减速

    - `transition-delay: 1s` 过渡延迟，多长时间后再自行这个过渡动画

    - `transition: 让哪些属性进行过度 过渡的持续时间 运动曲线 延迟时间`

      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              .box {
                  width: 200px;
                  height: 200px;
                  background-color: green;
                  margin: 100px auto;
      
                  transition: width 2s ease-in-out 0s;
              }
      
              .box:hover {
                  width: 500px;
                  background-color: orange;
              }
          </style>
      </head>
      <body>
          <div class="box"></div>
      </body>
      </html>
      ```

- 2D 转换 可以实现元素的 **位移、旋转、变形、缩放** 通过 `transform` 来实现

  - 缩放 `scale`

    ```css
    transform: scale(x, y);
    tranform: scale(2, 0.5)
    ```

    - `x` 表示水平方向的缩放倍速
    - `y` 表示垂直方向的缩放倍速
  
  - 位移 `translate`
  
    ```css
    transform: translate(水平位移, 垂直位移);
    
    transform: translate(-50%, -50%);
    ```
  
    - 参数为百分比，相对于自身移动。
  
    - 正值：向右和向下。 负值：向左和向上。如果只写一个值，则表示水平移动
  
  - 旋转 `rotate`
  
    ```css
    transform: rotate(角度);
    
    transform: rotate(45deg);
    ```
  
    - 参数解释：正值 顺时针；负值：逆时针

- 3D 转换

  - 旋转 `rotateX, rotateY, rotateZ`

    - 3D 左手坐标系

      ![img](https://camo.githubusercontent.com/6302cc87daea5f17e7a16a5775f654de3738231ec3c3aa6cd7793beb5812a8da/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303230385f323031302e706e67)

    - 旋转方向（左手法则）

      - 左手握住旋转轴，竖起拇指指向旋转轴的 **正方向**，正向就是 **其余手指卷曲的方向**
      - 所有的3d旋转，对着正方向去看，都是顺时针旋转

      ```css
      transform: rotateX(360deg);    //绕 X 轴旋转360度
      
      transform: rotateY(360deg);    //绕 Y 轴旋转360度
      
      transform: rotateZ(360deg);    //绕 Z 轴旋转360度
      ```

  - 移动 `translateX, tranlateY, translateZ`

    ```css
    transform: translateX(100px);    //沿着 X 轴移动
    
    transform: translateY(360px);    //沿着 Y 轴移动
    
    transform: translateZ(360px);    //沿着 Z 轴移动
    ```

    

  - 透视 `persperctive`

    - 作为一个属性，设置给父元素，作用于所有3D转换的子元素
    - 作为 transform 属性的一个值，做用于元素自身

    ```css
    perspective: 500px;
    ```

  - 3D呈现 `transform-style`

    - 3D元素构建是指某个图形是由多个元素构成的，可以给这些元素的 **父元素 ** 设置`transform-style: preserve-3d`来使其变成一个真正的3D图形。属性值可以如下

      ```css
      transform-style: preserve-3d;     /* 让 子盒子 位于三维空间里 */
      
      transform-style: flat;            /* 让子盒子位于此元素所在的平面内（子盒子被扁平化） */
      ```

      

- 动画 CSS3中具有颠覆性的特征，可通过设置 **多个节点** 来精确控制一个或一组动画，常用来实现 **复杂** 的动画效果

  - 定义动画的步骤

    1. 通过 `@keyframes` 定义动画

    2. 将这段动画通过百分比，分割成多个节点；然后各节点中分别定义各属性

    3. 在指定元素里，通过 `animation` 属性调用动画

       - 在 CSS3 中 **定义动画** 的时候，也是 **先定义，再调用**：

       ```css
       定义动画：
       @keyframes 动画名{
           from{ 初始状态 }
           to{ 结束状态 }
       }
       
       调用：
       animation: 动画名称 持续时间；
       ```

       - `animation`属性的格式如下：

       ```css
       animation: 定义的动画名称 持续时间  执行次数  是否反向  运动曲线 延迟执行。(infinite 表示无限次)
       
       animation: move1 1s  alternate linear 3;
       
       animation: move2 4s;
       ```

  - 动画属性

    - 动画名称 `animation-name: move;` 必选1

    - 执行一次动画持续时间 `animation-duration: 4s;` 必选2

    - 动画执行次数 `animation-iteration-count: 1;` `infinite` 表示无数次

    - 动画方向 `animation-direction: alternate;` `normal `表示正常 `alternate `表示反向

    - 动画延迟执行 `animation-delay: 1s;`

    - 设置动画结束后，盒子的状态 `animation-fill-mode: forward;` `forwards` 表示保持动画结束后的状态 `backwards ` 表示回到最初的状态

    - 运动曲线 `animation-timing-function: ease-in`

      - `linear`

      - `ease-in`

      - `ease-out`

      - `steps()` 表示动画不是连续执行，而是间断的分成几步执行

        ```css
        animation: move2 4s steps(2);
        ```

        

## 9. Flex 布局

 **flex** 属性，在布局方面做了非常大的改进，使得我们对 **多个元素之间** 的布局排列变得十分灵活，适应性非常强。其强大的伸缩性和自适应性，在网页开中可以发挥极大的作用

- 对比
  - 默认布局 在默认文档流中，在一个父容器李放置多个块级的子元素，这些子元素会默认从上往下排列

    ![img](https://camo.githubusercontent.com/2be8de2a61aac5f981abce05a96a4869f1b8e1a0fc587c8f184c0c5bd6bcf893/687474703a2f2f696d672e736d79687661652e636f6d2f32303139313030395f313535352e706e67)

  - `display: flex` 如果给父容器设置，则子元素会 **在水平方向上，从左至右排列**

    ![img](https://camo.githubusercontent.com/ebba096b7ad8f5498dd341b011391318637c70c24303d4bdf394343e43d7314e/687474703a2f2f696d672e736d79687661652e636f6d2f32303139313030395f313630302e706e67)

- `flex` 布局优势

  - flex 布局的子元素不会脱离文档流

  - flex 布局是一种现代的布局方式，提供了丰富的属性，灵活易用

  - 缺点在于不支持低版本的IE浏览器

    ![css flexible box layout module](https://i.loli.net/2021/09/14/xa7z6XG9UORBsfl.png)
    
    

- 概念

  - **弹性盒子：** 指的是使用 `display: flex;` 或  `display: inline-flex` 声明的 **父容器**

  - **子元素/弹性元素：** 指的是父容器里面的子元素
  - **主轴：** flex容器的主轴，默认为水平方向，从左向右
  - **侧轴：** 与主轴垂直的轴，默认垂直方向，从上往下 主轴和侧轴可以通过 `flex-direction`更换方向

- 弹性盒子
  - 声明： `display: flex;`或`display: inline-flex;`
  - `flex-direction` 属性 用于设置盒子中 **子元素** 属性值可以是
    - `row` 默认值 从左往右排列子元素
    - `column` 从上往下排列
    - `row-reverse` 从右向左排列
    - `colomn-reverse` 从下往上排列
  - `flex-wrap` 控制子元素溢出时的换行处理
  - `justify-content`控制子元素在主轴上的排列方式
- 弹性元素
  - `justify-content` 属性 设置元素在主轴上的对齐方式
    - `flex-start` 从主轴的起点对齐
    - `flex-end` 从主轴终点对齐
    - `center` 居中对齐
    - `space-around` 在父盒子里平分
    - `space-between` 两端对齐平分
  - `flex` 设置盒子的权重
  - `align-items` 设置子元素在侧轴上的对齐方式
    - `flex-start` 从侧轴开始的方向对齐
    - `flex-end` 从侧轴结束的方向对齐
    - `baseline` 默认 同 `flex-start`
    - `center`  中间对齐
    - `stretch` 拉伸

- CSS3 Flexbox 布局完全指南 | 中文翻译：https://www.html.cn/archives/8629
- [后盾人 flex 教程](http://houdunren.gitee.io/note/css/10 弹性布局.html)

## 10. Web 字体

- 常见字体格式

  - TrueType .ttf
  - OpenType .otf
  - Web Open Font Format .woff
  - Embedded Open Type .eot
  - SVG .svg

- 使用 WebFont 的步骤

  1. 使用 `font-face` 声明字体

     ```css
     font-face {font-family: 'webfont';
         src: url('webfont.eot'); /* IE9*/
         src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('webfont.woff') format('woff'), /* chrome、firefox */
         url('webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
         url('webfont.svg#webfont') format('svg'); /* iOS 4.1- */
     }
     ```

  2. 定义使用webfont的样式

     ```css
     .web-font{
         font-family:"webfont" !important;
         font-size:16px;font-style:normal;
         -webkit-font-smoothing: antialiased;
         -webkit-text-stroke-width: 0.2px;
         -moz-osx-font-smoothing: grayscale;
     }
     ```

  3. 为文字加上对应样式

     ```html
     <i class="web-font">这一分钟，你和我在一起，因为你，我会记得那一分钟。从现在开始，我们就是一分钟的朋友。这是事实，你改变不了，因为已经完成了。</i>
     ```

- 字体图标 我们其实可以把图片制作成字体。常见的做法是：把网页中一些小的图标，借助工具生成一个字体包，然后就可以像使用文字一样使用图标了。这样做的优点是：
  - 将所有图标打包成字体库，减少请求；
  - 具有矢量性，可保证清晰度；
  - 使用灵活，便于维护。

## 11. Sass 入门

- 定义 Sass：英文是 Syntactically Awesome Stylesheets Sass。最早由 Hampton Catlin 开发和设计。 一种帮助你简化 CSS 工作流程的方式，帮助你更容易维护和开发 CSS 内容。 官网是：https://sass-lang.com/
  - Sass 是这个世界上最成熟、稳定和强大的专业级 CSS 扩展语言。
  - Sass专注的是怎样创建优雅的样式表，而不是内容。

- Sass 、Compass、CSS
  - **关系**：Less/Sass 是语法、Compass是框架、CSS是目标
  - **优点**
    - 写出更优秀的CSS
    - 解决CSS编写过程中的痛点问题，比如精灵图合图、属性的浏览器前缀处理等
    - 有效组织样式、图片、字体等项目元素
  - **受众群体**
    - 重构的同学，写很多CSS，不知如何自动化。
    - 希望在项目周期内更好地组织项目内容。