# 第16章 DOM2 和 DOM3

DOM1（ DOM Level 1）主要定义了 HTML 和 XML 文档的底层结构。 DOM2（ DOM Level 2）和DOM3（ DOM Level 3）在这些结构之上加入更多交互能力，提供了更高级的 XML 特性。实际上， DOM2和 DOM3 是按照模块化的思路来制定标准的，每个模块之间有一定关联，但分别针对某个 DOM 子集。这些模式如下所示。

DOM Core：在 DOM1 核心部分的基础上，为节点增加方法和属性。

- DOM Views：定义基于样式信息的不同视图
- DOM Events：定义通过事件实现 DOM 文档交互。
- DOM Style：定义以编程方式访问和修改 CSS 样式的接口。
- DOM Traversal and Range：新增遍历 DOM 文档及选择文档内容的接口。
- DOM HTML：在 DOM1 HTML 部分的基础上，增加属性、方法和新接口。
- DOM Mutation Observers：定义基于 DOM 变化触发回调的接口。这个模块是 DOM4 级模块，用于取代 Mutation Events。

## 16.1 DOM 的演进

DOM2 和 DOM3 Core 模块的目标是扩展 DOM API，满足 XML 的所有需求并提供更好的错误处理和特性检测。很大程度上，这意味着支持 XML 命名空间的概念。 DOM2 Core 没有新增任何类型，仅仅在 DOM1 Core 基础上增加了一些方法和属性。 DOM3 Core 则除了增强原有类型，也新增了一些新类型。

类似地， DOM View 和 HTML 模块也丰富了 DOM 接口，定义了新的属性和方法

### 16.1.1 XML 命名空间

XML 命名空间可以实现在一个格式规范的文档中混用不同的 XML 语言，而不必担心元素命名冲突。严格来讲， XML 命名空间在 XHTML 中才支持， HTML 并不支持。

命名空间是使用 xmlns 指定的。 XHTML 的命名空间是"http://www.w3.org/1999/xhtml"，应该包含在任何格式规范的 XHTML 页面的<html>元素中，如下所示：

```html
<!DOCTYPE xhtml>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>16.1.1 XML 命名空间</title>
    <meta charset="utf-8" />
  </head>
  <body>
    hello world!
  </body>
</html>
```

对这个例子来说，所有元素都默认属于 XHTML 命名空间。可以使用 xmlns 给命名空间创建一个前缀，格式为“xmlns: 前缀”，如下面的例子所示：

```html
<!DOCTYPE html>
<xhtml:html xhtml:xmlns="http://www.w3.org/1999/xhtml">
  <xhtml:head>
    <xhtml:meta charset="utf-8" />
    <xhtml:title>16.1.1 xmlns</xhtml:title>
  </xhtml:head>
  <xhtml:body></xhtml:body>
</xhtml:html>
```

这里为 XHTML 命名空间定义了一个前缀 xhtml，同时所有 XHTML 元素都必须加上这个前缀。为避免混淆，属性也可以加上命名空间前缀

```html
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.1.1 svg</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <rect x="0" y="0" width="100" height="100" style="fill: red"></rect>
    </svg>
  </body>
</html>
```

![image-20211219142839702](https://s2.loli.net/2021/12/19/z5gSbv6WlhNQaCU.png)

在这个例子中，通过给 `<svg>` 元素设置自己的命名空间，将其标识为当前文档的外来元素。这样一来， `<svg>`元素及其属性，包括它的所有后代都会被认为属于"https://www.w3.org/2000/svg"命名空间。虽然这个文档从技术角度讲是 XHTML 文档，但由于使用了命名空间，其中包含的 SVG 代码也是有效的。

1. **Node 的变化**

    在 DOM2 中， Node 类型包含下面特定与命名空间的属性：

    1. `localname` 不包含命名空间前缀的节点名
    2. `namespaceURI` 节点的命名空间 URL,如果未指定则为 `null`
    3. `prefix` 命名空间前缀，如果未指定为 `null`

    在节点使用命名空间前最的前提下，`nodeName = prefix + “:” +localName` 

1. 

## 16.2 样式

HTML 中的样式有 3 种定义方式：外部样式表（通过`<link`>元素）、文档样式表（使用`<style>`元素）和元素特定样式（使用 style 属性）。 DOM2 Style 为这 3 种应用样式的机制都提供了 API。

### 16.2.1 存取元素样式

任何支持 style 属性的 HTML 元素在 JavaScript 中都会有一个对应的 style 属性。这个 style 属性是 CSSStyleDeclaration 类型的实例，其中包含通过 HTML style 属性为元素设置的所有样式信息，但不包含通过层叠机制从文档样式和外部样式中继承来的样式。 

HTML style 属性中的 CSS 属性在 JavaScript style 对象中都有对应的属性。因为 CSS 属性名使用连字符表示法（用连字符分隔两个单词 ， 如 background-image）， 所 以 在 **JavaScript 中 这 些 属 性 必 须 转 换 为 驼 峰 大 小 写 形 式** （ 如backgroundImage）。

大多数属性名会这样直接转换过来。但**有一个 CSS 属性名不能直接转换，它就是 float。因为float 是 JavaScript 的保留字，所以不能用作属性名。 DOM2 Style 规定它在 style 对象中对应的属性应该是 cssFloat。**

任何时候，只要获得了有效 DOM 元素的引用，就可以通过 JavaScript 来设置样式。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.2.1 存取元素样式</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <style type="text/css" media="screen">
      #mydiv {
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div id="mydiv"></div>
    <script type="text/javascript">
      let myDiv = document.querySelector("#mydiv");
      myDiv.style.backgroundColor = "red";
      myDiv.style.border = "1px solid black";
    </script>
  </body>
</html>
```

![image-20211219144503645](https://s2.loli.net/2021/12/19/D6GVgfkArc91mSC.png)



**注意 在标准模式下，所有尺寸都必须包含单位。**在混杂模式下，可以把 style.width设置为"20"，相当于"20px"。如果是在标准模式下，把 style.width 设置为"20"会被忽略，因为没有单位。实践中，最好一直加上单位。

通过 style 属性设置的值也可以通过 style 对象获取。

如果元素上没有 style 属性，则 style 对象包含所有可能的 CSS 属性的空值。

关于计算样式要记住一点，在所有浏览器中计算样式都是只读的，不能修改 `getComputedStyle()`方法返回的对象。

而且，计算样式还包含浏览器内部样式表中的信息。因此有默认值的 CSS 属性会出现在计算样式里。例如， visibility 属性在所有浏览器中都有默认值，但这个值因实现而不同。有些浏览器会把 visibility 的默认值设置为"visible"，而另一些将其设置为"inherit"。不能假设 CSS 属性的默认值在所有浏览器中都一样。如果需要元素具有特定的默认值，那么一定要在样式表中手动指定。

### 16.2.2 操作样式表

CSSStyleSheet 类型表示 CSS 样式表，包括使用 `<link>` 元素和通过 `<style>` 元素定义的样式表。注意，这两个元素本身分别是 HTMLLinkElement 和 HTMLStyleElement。 CSSStyleSheet 类型是一个通用样式表类型，可以表示以任何方式在 HTML 中定义的样式表。另外，元素特定的类型允许修改HTML 属性，而 CSSStyleSheet 类型的实例则是一个只读对象（只有一个属性例外）。

CSSStyleSheet类型继承StyleSheet，后者可用作非 CSS样式表的基类。以下是CSSStyleSheet从 StyleSheet 继承的属性。

- disabled，布尔值，表示样式表是否被禁用了（这个属性是可读写的，因此将它设置为 true会禁用样式表）。
- href，如果是使用 `<link>`包含的样式表，则返回样式表的 URL，否则返回 null。
- media，样式表支持的媒体类型集合，这个集合有一个 length 属性和一个 item()方法，跟所有 DOM 集合一样。同样跟所有 DOM 集合一样，也可以使用中括号访问集合中特定的项。如果样式表可用于所有媒体，则返回空列表。
- ownerNode，指向拥有当前样式表的节点，在 HTML 中要么是`<link>`元素要么是`<style>`元素（在 XML 中可以是处理指令）。如果当前样式表是通过@import 被包含在另一个样式表中，则这个属性值为 null。
- parentStyleSheet，如果当前样式表是通过@import 被包含在另一个样式表中，则这个属性指向导入它的样式表。
- title， ownerNode 的 title 属性。
- type，字符串，表示样式表的类型。对 CSS 样式表来说，就是"text/css"。

上述属性里除了 disabled，其他属性都是只读的。除了上面继承的属性， CSSStyleSheet 类型还支持以下属性和方法。

- cssRules，当前样式表包含的样式规则的集合。
- ownerRule，如果样式表是使用@import 导入的，则指向导入规则；否则为 null。
- deleteRule(index)，在指定位置删除 cssRules 中的规则。
- insertRule(rule, index)，在指定位置向 cssRules 中插入规则。

`document.styleSheets` 表示文档中可用的样式表集合。这个集合的 `length` 属性保存着文档中样式表的数量，而每个样式表都可以使用中括号或 item()方法获取。来看这个例子：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.2.2 操作样式表</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="stylesheet" href="./16.2.2.css" type="text/css" media="screen" />
    <style type="text/css" media="screen">
      #main {
        width: 200px;
        height: 200px;
        background-color: aqua;
      }
    </style>
    <!-- Place favicon.ico in the root directory -->
  </head>
  <body>
    <div id="main">hello world</div>
    <!--[if lt IE 8]>
      <p class="browserupgrade">
        You are using an <strong>outdated</strong> browser. Please
        <a href="http://browsehappy.com/">upgrade your browser</a> to improve
        your experience.
      </p>
    <![endif]-->
    <script type="text/javascript">
      let main = document.getElementById("main");
      let sheet = null;
      for (let i = 0, len = document.styleSheets.length; i < len; ++i) {
        sheet = document.styleSheets[i];
        console.log(sheet);
      }
    </script>
  </body>
</html>
```

![image-20211219213059579](https://s2.loli.net/2021/12/19/LObShgsyvDIXa1Z.png)

1. CSS 规则

    SSRule 类型表示样式表中的一条规则。这个类型也是一个通用基类，很多类型都继承它，但其中最常用的是表示样式信息的 CSSStyleRule（其他 CSS 规则还有`@import、 @font-face、 @page `和`@charset` 等，不过这些规则很少需要使用脚本来操作）。以下是 CSSStyleRule 对象上可用的属性

    - cssText，返回整条规则的文本。这里的文本可能与样式表中实际的文本不一样，因为浏览器内部处理样式表的方式也不一样。 Safari 始终会把所有字母都转换为小写。
    - parentRule，如果这条规则被其他规则（如@media）包含，则指向包含规则，否则就是 null。
    - parentStyleSheet，包含当前规则的样式表。
    - selectorText，返回规则的选择符文本。这里的文本可能与样式表中实际的文本不一样，因为浏览器内部处理样式表的方式也不一样。这个属性在 Firefox、 Safari、 Chrome 和 IE 中是只读的，在 Opera 中是可以修改的。
    - style，返回 CSSStyleDeclaration 对象，可以设置和获取当前规则中的样式。
    - type，数值常量，表示规则类型。对于样式规则，它始终为 1。

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>16.2.2.1 CSS 规则</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="./16.2.2.css" type="text/css" media="screen" />
        <style type="text/css" media="screen">
          #main {
            width: 200px;
            height: 200px;
            background-color: aqua;
          }
        </style>
      </head>
      <body>
        <div id="main">hello world</div>
        <script type="text/javascript">
          let main = document.getElementById("main");
          let sheet = document.styleSheets[1];
          let rules = sheet.cssRules || sheet.rules;
          let rule = rules[0];
        </script>
      </body>
    </html>
    ```

    ![image-20211219220632272](https://s2.loli.net/2021/12/19/VlJPG41kId98qaE.png)

    

2. 创建规则

    DOM 规定，可以使用 insertRule()方法向样式表中添加新规则。这个方法接收两个参数：规则的文本和表示插入位置的索引值。下面是一个例子：

    ```js
    sheet.insertRule("body{background-color: silver}", 0)
    ```

    插入了一条改变文档背景颜色的规则。这条规则是作为样式表的第一条规则（位置 0）插入的，顺序对规则层叠是很重要的。

3. 删除规则

    支持从样式表中删除规则的 DOM 方法是 deleteRule()，它接收一个参数：要删除规则的索引。要删除样式表中的第一条规则，可以这样做：

    ```js
    sheet.deleteRule(0);
    ```

### 16.2.3 元素尺寸

1. **偏移尺寸（只读）**

    **偏移尺寸（ offset dimensions）**，包含元素在屏幕上占用的所有视觉空间。元素在页面上的视觉空间由其高度和宽度决定，包括所有内边距、滚动条和边框（但不包含外边距）。以下 4 个属性用于取得元素的偏移尺寸。

    - offsetHeight，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度（如果可见）和上、下边框的高度。
    - offsetLeft，元素左边框外侧距离包含元素左边框内侧的像素数。
    - offsetTop，元素上边框外侧距离包含元素上边框内侧的像素数。
    - offsetWidth，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度（如果可见）和左、右边框的宽度。

    其中， offsetLeft 和 offsetTop 是相对于包含元素的，包含元素保存在 offsetParent 属性中。offsetParent 不一定是 parentNode。比如， `<td>`元素的 offsetParent 是作为其祖先的`<table>`元素，因为`<table>`是节点层级中第一个提供尺寸的元素。

    ![image-20211219222548720](https://s2.loli.net/2021/12/19/XOeiYzc2HvuEQUS.png)

    

2. **客户端尺寸（只读）**

    元素的客户端尺寸（ client dimensions）包含元素内容及其内边距所占用的空间。客户端尺寸只有两个相关属性： clientWidth 和 clientHeight。其中， clientWidth 是内容区宽度加左、右内边距宽度， clientHeight 是内容区高度加上、下内边距高度。

    ![image-20211219222715187](https://s2.loli.net/2021/12/19/Cs9iyTdVAvaUkZ8.png)

    客户端尺寸实际上就是元素内部的空间，因此不包含滚动条占用的空间。这两个属性最常用于确定浏览器视口尺寸，即检测 document.documentElement 的 clientWidth 和 clientHeight。这两个属性表示视口（ `<html>`或`<body>`元素）的尺寸。

3. **滚动尺寸**

    滚动尺寸（ scroll dimensions），提供了元素内容滚动距离的信息。有些元素，比如`<html>`无须任何代码就可以自动滚动，而其他元素则需要使用 CSS 的 overflow 属性令其滚动。滚动尺寸相关的属性有如下 4 个：

    - scrollHeight，没有滚动条出现时，元素内容的总高度。
    - scrollLeft，内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置。
    - scrollTop，内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。
    - scrollWidth，没有滚动条出现时，元素内容的总宽度。

    ![image-20211219222926257](https://s2.loli.net/2021/12/19/7lcTPfIpoZD1z93.png)

    scrollWidth 和 scrollHeight 可以用来确定给定元素内容的实际尺寸。例如， `<html>` 元素是浏览器中滚动视口的元素。因此， `document.documentElement.scrollHeight` 就是整个页面垂直方向的总高度。

    scrollLeft 和 scrollTop 属性可以用于确定当前元素滚动的位置，或者用于设置它们的滚动位置。元素在未滚动时，这两个属性都等于 0。如果元素在垂直方向上滚动，则 scrollTop 会大于 0，表示元素顶部不可见区域的高度。如果元素在水平方向上滚动，则 scrollLeft 会大于 0，表示元素左侧不可见区域的宽度。因为这两个属性也是可写的，所以把它们都设置为 0 就可以重置元素的滚动位置。

4. **确定元素尺寸**

    浏览器在每个元素上都暴露了 getBoundingClientRect()方法，返回一个 DOMRect 对象，包含6 个属性： left、 top、 right、 bottom、 height 和 width。这些属性给出了元素在页面中相对于视口的位置。

    ![image-20211219223215285](https://s2.loli.net/2021/12/19/z2NQPtJbx1ycmDR.png)

    ![image-20211219223313478](https://s2.loli.net/2021/12/19/kdBpDWe5bwOnfX7.png)

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>16.2.2.4 确定元素尺寸</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style type="text/css" media="screen">
          div {
            width: 400px;
            height: 200px;
            padding: 20px;
            margin: 50px auto;
            background: purple;
          }
        </style>
      </head>
      <body>
        <div></div>
        <script type="text/javascript">
          let elem = document.querySelector("div");
          let rect = elem.getBoundingClientRect();
          for (let key in rect) {
            if (typeof rect[key] !== "function") {
              let para = document.createElement("p");
              para.textContent = `${key} : ${rect[key]}`;
              document.body.appendChild(para);
            }
          }
        </script>
      </body>
    </html>
    ```

    ![image-20211219224515585](https://s2.loli.net/2021/12/19/KOBMFsvAwiITNXn.png)

## 16.3 遍历

DOM2 Traversal and Range 模块定义了两个类型用于辅助顺序遍历 DOM 结构。这两个类型——NodeIterator 和 TreeWalker——从某个起点开始执行对 DOM 结构的深度优先遍历。

DOM 遍历是对 DOM 结构的深度优先遍历，至少允许朝两个方向移动（取决于类型）。遍历以给定节点为根，不能在 DOM 中向上超越这个根节点。

### 16.3.1 NodeIterator

NodeIterator 类型是两个类型中比较简单的，可以通过 `document.createNodeIterator()` 方法创建其实例。这个方法接收以下 4 个参数。

- root，作为遍历根节点的节点。
- whatToShow，数值代码，表示应该访问哪些节点。
- filter， NodeFilter 对象或函数，表示是否接收或跳过特定节点。
- entityReferenceExpansion，布尔值，表示是否扩展实体引用。这个参数在 HTML 文档中没有效果，因为实体引用永远不扩展

whatToShow 参数是一个位掩码，通过应用一个或多个过滤器来指定访问哪些节点。这个参数对应的常量是在 NodeFilter 类型中定义的。

- NodeFilter.SHOW_ALL，所有节点。
- NodeFilter.SHOW_ELEMENT，元素节点。
- NodeFilter.SHOW_ATTRIBUTE，属性节点。由于 DOM 的结构，因此实际上用不上。
- NodeFilter.SHOW_TEXT，文本节点。
- NodeFilter.SHOW_CDATA_SECTION， CData 区块节点。不是在 HTML 页面中使用的。
- NodeFilter.SHOW_ENTITY_REFERENCE，实体引用节点。不是在 HTML 页面中使用的。
- NodeFilter.SHOW_ENTITY，实体节点。不是在 HTML 页面中使用的。
- NodeFilter.SHOW_PROCESSING_INSTRUCTION，处理指令节点。不是在 HTML 页面中使用的。
- NodeFilter.SHOW_COMMENT，注释节点。
- NodeFilter.SHOW_DOCUMENT，文档节点。
- NodeFilter.SHOW_DOCUMENT_TYPE，文档类型节点。
- NodeFilter.SHOW_DOCUMENT_FRAGMENT，文档片段节点。不是在 HTML 页面中使用的。
- NodeFilter.SHOW_NOTATION，记号节点。不是在 HTML 页面中使用的。

这些值除了 NodeFilter.SHOW_ALL 之外，都可以组合使用。

比如，可以像下面这样使用按位或操作组合多个选项:

```js
let whatToShow = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT;
```

createNodeIterator()方法的 filter 参数可以用来指定自定义 NodeFilter 对象，或者一个作为节点过滤器的函数。 NodeFilter 对象只有一个方法 acceptNode()，如果给定节点应该访问就返回 NodeFilter.FILTER_ACCEPT，否则返回 NodeFilter.FILTER_SKIP。因为 NodeFilter 是一个抽象类型，所以不可能创建它的实例。只要创建一个包含 acceptNode()的对象，然后把它传给createNodeIterator()就可以了。

- 对象形式的 filter 过滤器

    ```js
    // 对象形式的 filter
    let filter = {
        acceptNode(node) {
            return node.tagName.toLowerCase() === "p"
                ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
    };
    ```

- 函数形式的 filter 过滤器

    ```js
    // 函数形式的 filter
    let filterf = function (node) {
        return node.tagName.toLowerCase() === "p"
            ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    };
    ```

通常， JavaScript 会使用这种形式，因为更简单也更像普通 JavaScript 代码。如果不需要指定过滤器，则可以给这个参数传入 null。

要创建一个简单的遍历所有节点的 NodeIterator，可以使用以下代码：

```js
// 遍历所有节点的 NodeIterator
let iteratorAll = document.createNodeIterator(
    document,
    NodeFilter.SHOW_ALL,
    null,
    false
);
```

NodeIterator 的两个主要方法是 nextNode()和 previousNode()。 nextNode()方法在 DOM子树中以深度优先方式进前一步，而 previousNode()则是在遍历中后退一步。创建 NodeIterator对象的时候，会有一个内部指针指向根节点，因此第一次调用 nextNode()返回的是根节点。当遍历到达 DOM 树最后一个节点时， nextNode()返回 null。 previousNode()方法也是类似的。当遍历到达DOM 树最后一个节点时，调用 previousNode()返回遍历的根节点后，再次调用也会返回 null。

```js
<!DOCTYPE html>
<html class="no-js" lang="us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.3.1.1 遍历 div 元素内部所有元素</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <div id="div1">
      <p><b>Hello</b> world!</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </div>
    <script type="text/javascript">
      let div = document.getElementById("div1");
      let iterator = document.createNodeIterator(
        div,
        NodeFilter.SHOW_ELEMENT,
        null,
        false
      );

      let node = iterator.nextNode();
      while (node !== null) {
        console.log(node.tagName);
        node = iterator.nextNode();
      }
    </script>
  </body>
</html>
```

![image-20211219231836093](https://s2.loli.net/2021/12/19/JLxXKH4h3mcEwaT.png)

如果只想遍历 `<li>` 元素，可以传入一个过滤器：

```js
// 只遍历 li 元素过滤器
let filter = function (node) {
    return node.tagName.toLowerCase() === "li"
        ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP;
};
console.log("只遍历 li 元素");
let iteratorF = document.createNodeIterator(
    div,
    NodeFilter.SHOW_ELEMENT,
    filter,
    false
);
node = iteratorF.nextNode();
while (node !== null) {
    console.log(node.tagName);
    node = iterator.nextNode();
}

```

![image-20211219232336649](https://s2.loli.net/2021/12/19/dUhTL7P9qZKuWyp.png)

nextNode()和 previousNode()方法共同维护 NodeIterator 对 DOM 结构的内部指针，因此**修改 DOM 结构也会体现在遍历中**。

### 16.3.2 TreeWalker

TreeWalker 是 NodeIterator 的高级版。除了包含同样的 nextNode()、 previousNode()方法，TreeWalker 还添加了如下在 DOM 结构中向不同方向遍历的方法

- parentNode()，遍历到当前节点的父节点。
- firstChild()，遍历到当前节点的第一个子节点。
- lastChild()，遍历到当前节点的最后一个子节点。
- nextSibling()，遍历到当前节点的下一个同胞节点。
- previousSibling()，遍历到当前节点的上一个同胞节点。

TreeWalker 对 象 要 调用 document.createTreeWalker()方 法 来创 建 ， 这个方 法 接 收与document.createNodeIterator()同样的参数：作为遍历起点的根节点、要查看的节点类型、节点过滤器和一个表示是否扩展实体引用的布尔值。因为两者很类似，所以 TreeWalker 通常可以取代NodeIterator，比如：

```js
let div = document.getElementById("div1");

// 只遍历 li 元素过滤器
let filter = function (node) {
    return node.tagName.toLowerCase() === "li"
        ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP;
};

console.log("只遍历 li 元素");
let walker = document.createTreeWalker(
    div,
    NodeFilter.SHOW_ELEMENT,
    filter,
    false
);

let node = walker.nextNode();
while (node !== null) {
    console.log(node.tagName);
    node = walker.nextNode();
}
```

![image-20211220102135419](https://s2.loli.net/2021/12/20/hCR8dBjWkDFOoTu.png)

## 16.4 范围

为了支持对页面更细致的控制， DOM2 Traversal and Range 模块定义了范围接口。**范围可用于在文档中选择内容，而不用考虑节点之间的界限**。（选择在后台发生，用户是看不到的。）范围在常规 DOM操作的粒度不够时可以发挥作用。

### 16.4.1 DOM 范围

DOM2 在 Document 类型上定义了一个 createRange()方法，暴露在 document 对象上。使用这个方法可以创建一个 DOM 范围对象，如下所示：

```js
let range = document.createRange();
```

与节点类似，这个新**创建的范围对象是与创建它的文档关联的，不能在其他文档中使用**。然后可以使用这个范围在后台选择文档特定的部分。创建范围并指定它的位置之后，可以对范围的内容执行一些操作，从而实现对底层 DOM 树更精细的控制。

每个范围都是 Range 类型的实例，拥有相应的属性和方法。下面的属性提供了与范围在文档中位置相关的信息。

- startContainer，范围起点所在的节点（选区中第一个子节点的父节点）。
- startOffset，范围起点在 startContainer 中的偏移量。如果 startContainer 是文本节点、注释节点或 CData 区块节点，则 startOffset 指范围起点之前跳过的字符数；否则，表示范围中第一个节点的索引。
- endContainer，范围终点所在的节点（选区中最后一个子节点的父节点）。
- endOffset，范围起点在 startContainer 中的偏移量（与 startOffset 中偏移量的含义相同）。
- commonAncestorContainer， 文档中以startContainer和endContainer为后代的最深的节点。这些属性会在范围被放到文档中特定位置时获得相应的值。

### 16.4.2 简单选择

通过范围选择文档中某个部分最简单的方式，就是使用 `selectNode()` 或 `selectNodeContents()` 方法。这两个方法都接收一个节点作为参数，并将该节点的信息添加到调用它的范围。 `selectNode()`方法选择整个节点，包括其后代节点，而 `selectNodeContents()`只选择节点的后代。

```html
<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.4.2 简单选择</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <p id="p1"><b>hello</b> world!</p>
    <script type="text/javascript">
      let range1 = document.createRange(),
        range2 = document.createRange(),
        p1 = document.getElementById("p1");

      range1.selectNode(p1);
      range2.selectNodeContents(p1);
    </script>
  </body>
</html>
```

![image-20211220105200328](https://s2.loli.net/2021/12/20/kTDFL4WKidh6YJB.png)

![image-20211220105402600](https://s2.loli.net/2021/12/20/NaQJzUgp6FqhxIc.png)

在像上面这样选定节点或节点后代之后，还可以在范围上调用相应的方法，实现对范围中选区的更精细控制。

- setStartBefore(refNode)，把范围的起点设置到 refNode 之前，从而让 refNode 成为选区的第一个子节点。 startContainer 属性被设置为 refNode.parentNode，而 startOffset属性被设置为 refNode 在其父节点 childNodes 集合中的索引。
- setStartAfter(refNode)，把范围的起点设置到 refNode 之后，从而将 refNode 排除在选区之外，让其下一个同胞节点成为选区的第一个子节点。 startContainer 属性被设置为refNode.parentNode， startOffset 属性被设置为 refNode 在其父节点 childNodes 集合中的索引加 1。
- setEndBefore(refNode)，把范围的终点设置到 refNode 之前，从而将 refNode 排除在选区之外、让其上一个同胞节点成为选区的最后一个子节点。 endContainer 属性被设置为 refNode.parentNode， endOffset 属性被设置为 refNode 在其父节点 childNodes 集合中的索引。
- setEndAfter(refNode)，把范围的终点设置到 refNode 之后，从而让 refNode 成为选区的最后一个子节点。 endContainer 属性被设置为 refNode.parentNode， endOffset 属性被设置为 refNode 在其父节点 childNodes 集合中的索引加 1。

调用这些方法时，所有属性都会自动重新赋值。不过，为了实现复杂的选区，也可以直接修改这些属性的值。

### 16.4.3 复杂选择

要创建复杂的范围，需要使用 setStart()和 setEnd()方法。这两个方法都接收两个参数：参照节点和偏移量。对 setStart()来说，参照节点会成为 startContainer，而偏移量会赋值给 startOffset。对 setEnd()而言，参照节点会成为 endContainer，而偏移量会赋值给 endOffset。

当然，只选择文档中的某个部分并不是特别有用，除非可以对选中部分执行操作。

### 16.4.4 操作范围

创建范围之后，浏览器会在内部创建一个文档片段节点，用于包含范围选区中的节点。为操作范围的内容，选区中的内容必须格式完好。

不过，范围能够确定缺失的开始和结束标签，从而可以重构出有效的 DOM 结构，以便后续操作。

创建了范围之后，就可以使用很多方法来操作范围的内容。（注意，范围对应文档片段中的所有节点，都是文档中相应节点的指针。）

1. `deleteContents()` 从文档中删除范围包含的节点

    ```html
    <!DOCTYPE html>
    <html class="no-js" lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>16.4.4 操作范围</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <p id="p1"><b>he</b><b>llo</b> world!</p>
        <script type="text/javascript">
          let range = document.createRange(),
            p1 = document.getElementById("p1"),
            helloNode = p1.firstChild.firstChild,
            worldNode = p1.lastChild;
    
          range.setStart(helloNode, 2);
          range.setEnd(worldNode, 3);
    
          range.deleteContents();
        </script>
      </body>
    </html>
    ```

    执行上面代码后，页面的 HTML 会变成这样：

    ![image-20211220110858639](https://s2.loli.net/2021/12/20/SumDdC5aN7wyqbs.png)

2. `extractContents()` 从文档中移除范围选区，返回范围对应的文本片段，这样，就可以把范围选中的内容插入到文档中其他地方

    ```js
    // 移除范围选区并添加到 p1 同级
    let fragment = range.extractContents();
    p1.parentNode.appendChild(fragment);
    ```

    ![image-20211220111516288](https://s2.loli.net/2021/12/20/s2ZmjohTJNCYGF5.png)

3. `cloneContens()` 创建一个副本，然后把这个副本插入到文档其它地方

### 16.4.5 范围插入

使用 `insertNode()`方法可以在范围选区的开始位置插入一个节点，如果想插入下面内容：

```html
<span style="color: red;">Inserted text</span>
```

```js

let range = document.createRange(),
    p1 = document.getElementById("p1"),
    helloNode = p1.firstChild.firstChild,
    worldNode = p1.lastChild;

range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);

let span = document.createElement("span");
span.style.color = "red";
span.appendChild(document.createTextNode("Inserted text"));
range.insertNode(span);
```

使用这个技术可以插入有用的信息，比如在外部链接旁边插入一个小图标。

除了向范围中插入内容，还可以使用 surroundContents()方法插入包含范围的内容。这个方法接收一个参数，即包含范围内容的节点。调用这个方法时，后台会执行如下操作：

1. 提取出范围的内容；
2. 在原始文档中范围之前所在的位置插入给定的节点；
3. 将范围对应文档片段的内容添加到给定节点。

这种功能适合在网页中高亮显示某些关键词，比如：

```js
range.selectNode(helloNode);

let span = document.createElement("span");
span.style.backgroundColor = "red";
range.surroundContents(span);
```

执行以上代码会以红色背景高亮显示范围选择的文本。

为了插入`<span>`元素，范围中必须包含完整的 DOM 结构。如果范围中包含部分选择的非文节点，这个操作会失败并报错。另外，如果给定的节点是 Document、 DocumentType 或 DocumentFragment类型，也会导致抛出错误。

### 16.4.6 范围折叠

如果范围并没有选择文档的任何部分，则称为折叠（ collapsed）。折叠范围有点类似文本框：如果文本框中有文本，那么可以用鼠标选中以高亮显示全部文本。这时候，如果再单击鼠标，则选区会被移除，光标会落在某两个字符中间。而在折叠范围时，位置会被设置为范围与文档交界的地方，可能是范围选区的开始处，也可能是结尾处。

折叠范围可以使用 collapse()方法，这个方法接收一个参数：布尔值，表示折叠到范围哪一端。true 表示折叠到起点， false 表示折叠到终点。要确定范围是否已经被折叠，可以检测范围的 collapsed属性：

```html
<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>16.4.7 范围折叠</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <p id="p1">Paragraph 1</p>
    <p id="p2">Paragraph 2</p>
    <script type="text/javascript">
      let p1 = document.getElementById("p1"),
        p2 = document.getElementById("p1"),
        range = document.createRange();
      range.setStartAfter(p1);
      range.setStartBefore(p2);
    </script>
  </body>
</html>
```

### 16.4.7 范围比较

如果有多个范围，则可以使用 compareBoundaryPoints()方法确定范围之间是否存在公共的边界（起点或终点）。这个方法接收两个参数：要比较的范围和一个常量值，表示比较的方式。这个常量参数包括：

- Range.START_TO_START（ 0），比较两个范围的起点；
- Range.START_TO_END（ 1），比较第一个范围的起点和第二个范围的终点；
- Range.END_TO_END（ 2），比较两个范围的终点；
- Range.END_TO_START（ 3），比较第一个范围的终点和第二个范围的起点。

### 16.4.8 复制范围

调用范围的 cloneRange()方法可以复制范围。这个方法会创建调用它的范围的副本：

```js
let newRange = range.cloneRange();
```

新范围包含与原始范围一样的属性，修改其边界点不会影响原始范围。

### 16.4.9 清理

在使用完范围之后，最好调用 detach()方法把范围从创建它的文档中剥离。调用 detach()之后，就可以放心解除对范围的引用，以便垃圾回收程序释放它所占用的内存。下面是一个例子：

```js
range.detach(); // 从文档中剥离范围
range = null; // 解除引用
```

这两步是最合理的结束使用范围的方式。剥离之后的范围就不能再使用了。
