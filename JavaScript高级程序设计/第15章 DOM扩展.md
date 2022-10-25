# 第15章 DOM扩展

## 15.1 Selectors API

Selectors API（参见 W3C 网站上的 Selectors API Level 1）是 W3C 推荐标准，规定了浏览器原生支持的 CSS 查询 API。支持这一特性的所有 JavaScript 库都会实现一个基本的 CSS 解析器，然后使用已有的 DOM 方法搜索文档并匹配目标节点。虽然库开发者在不断改进其性能，但 JavaScript 代码能做到的毕竟有限。通过浏览器原生支持这个 API，解析和遍历 DOM 树可以通过底层编译语言实现，性能也有了数量级的提升 。



1. Selectors API Level 1 的核心是两个方法： `querySelector()` 和  `querySelectorAll()` 。在兼容浏览器中， Document 类型和 Element 类型的实例上都会暴露这两个方法。  

2. Selectors API Level 2 规范在 Element 类型上新增了更多方法，比如 `matches()`、 `find()` 和 `findAll()`。不过，目前还没有浏览器实现或宣称实现 find()和 findAll()。  

### 15.1.1 `querySelector()`

`querySelector()` 方法接收 CSS 选择符参数，**返回匹配该模式的第一个后代元素**，如果没有匹配项则返回 null。下面是一些例子：  

```javascript
// querySelector()
// 取得 <body> 元素
let body = document.querySelector('body');

// 取得 ID 为 'myDiv' 的元素
let myDiv = document.querySelector('#myDiv');

// 取得类名为 'selected' 的第一个元素
let selected = document.querySelector('.selected');

// 取得类名为 'button' 的图片
let img = document.body.querySelector('img.button');
```

在 Document 上使用 querySelector()方法时，会从文档元素开始搜索；在 Element 上使用querySelector()方法时，则只会从当前元素的后代中查询。  

### 15.1.2 `querySelectorAll()`

`querySelectorAll()` 方法跟 `querySelector()` 一样，也接收一个用于查询的参数，**但它会返回所有匹配的节点**，而不止一个。这个方法返回的是一个 NodeList 的 **静态实例**。  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>15.1.2 querySelectorAll()</title>
  </head>
  <body>
    <div></div>
    <div></div>
    <div></div>
    <script>
      let divs = document.querySelectorAll("div");
    </script>
  </body>
</html>
```

![image-20211218104628101](https://s2.loli.net/2021/12/18/YPGq3wLFda7rkvT.png)

再强调一次，` querySelectorAll()` 返回的 NodeList 实例一个属性和方法都不缺，**但它是一个静态的“快照”，而非“实时”的查询**。这样的底层实现避免了使用 NodeList 对象可能造成的性能问题。  



以有效 CSS 选择符调用 `querySelectorAll()` 都会返回 NodeList，无论匹配多少个元素都可以。如果没有匹配项，则返回空的 NodeList 实例  



**注意： 这里返回的节点不包含文本节点，是元素**

```javascript
// querySelectorAll()
// 取得 ID 为 "myDiv" 的 <div> 元素中的所有 <em>元素
let ems = document.getElementById('myDiv').querySelectorAll('em');

// 取得所有类名中包含 'selected' 的元素
let selecteds = document.querySelectorAll('.selected');

// 取得所有是 <p> 元素子元素的 <strong> 元素
let strongs = document.querySelectorAll('p strong');

// 遍历
for (const strong of strongs) {
    strong.className = 'important';
}
```

### 15.1.3 `matches()`

`matches()` 方法（在规范草案中称为 matchesSelector()）接收一个 CSS 选择符参数，如果元素匹配则该选择符返回 true，否则返回 false。例如：  



使用这个方法可以方便地检测某个元素会不会被`  querySelector()` 或 `querySelectorAll()` 方法返回  



所有主流浏览器都支持 matches()。 Edge、 Chrome、 Firefox、 Safari 和 Opera 完全支持， IE9~11及一些移动浏览器支持带前缀的方法  

## 15.2 元素遍历

IE9 之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了 childNodes和 firstChild 等属性上的差异。为了弥补这个差异，同时不影响 DOM 规范， W3C 通过新的 Element Traversal 规范定义了一组新属性。  



Element Traversal API 为 DOM 元素添加了 5 个属性：  

+ `childElementCount` 返回子元素数量（**不包含文本节点和注释**）
+ `firstElementChild` 指向第一个 Element子元素
+ `lastElementChild`
+ `previousElementSibling` 指向前一个
+ `nextElementSibling`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>15.1.2 querySelectorAll()</title>
  </head>
  <body>
    <div>div1</div>
    <div>div2</div>
    <div>div3</div>
    <script>
      let divs = document.querySelectorAll("div");
      let body = document.body;

      if (document.body.matches("body.page1")) {
        // lll
      }
    </script>
  </body>
</html>
```

![image-20211218110147443](https://s2.loli.net/2021/12/18/4s8KyojCFqnRl15.png)

在支持的浏览器中，所有 DOM 元素都会有这些属性，为遍历 DOM 元素提供便利。这样开发者就不用担心空白文本节点的问题了  

```javasc
// 元素遍历
let parentElement = document.getElementById('parent');
let currentChildElement = parentElement.firstElementChild;

while (currentChildElement) {
    if (currentChildElement === parentElement.lastElementChild) {
        break;
    }

    currentChildElement = currentChildElement.nextElementSibling;
}
```

## 15.3 HTML5

HTML5 代表着与以前的 HTML 截然不同的方向。在所有以前的 HTML 规范中，从未出现过描述JavaScript 接口的情形， HTML 就是一个纯标记语言。 JavaScript 绑定的事，一概交给 DOM 规范去定义。

然而， HTML5 规范却包含了与标记相关的大量 JavaScript API 定义。其中有的 API 与 DOM 重合，定义了浏览器应该提供的 DOM 扩展。  

### 15.3.1 CSS 类扩展

1. **`getElementsByClassName()`** 方法接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的 NodeList。如果提供了多个类名，则顺序无关紧要。  只会返回以调用它的对象为根元素的子树中所有匹配的元素  

    如果要给包含特定类（而不是特定 ID 或标签）的元素**添加事件处理程序**，使用这个方法会很方便。  

2. **`classList` 属性**

    这就是从 `<div>` 元素的类名中删除"user"类要写的代码。替换类名和检测类名也要涉及同样的算法。添加类名只涉及字符串拼接，但必须先检查一下以确保不会重复添加相同的类名。很多 JavaScript库为这些操作实现了便利方法。

    HTML5 通过给所有元素增加 classList 属性为这些操作提供了更简单也更安全的实现方式。classList 是一个新的集合类型 DOMTokenList 的实例。与其他 DOM 集合类型一样， DOMTokenList也有 length 属性表示自己包含多少项，也可以通过 item()或中括号取得个别的元素。此外，DOMTokenList 还增加了以下方法。  

    - `add(value)`
    - `contains(valuie)`
    - `remove(value)`
    - `toggle(value)` 如果类名列表中已经存在指定的 value，则删除；如果不存在，则添加  

### 15.3.2 焦点管理

HTML5 增加了辅助 DOM 焦点管理的功能。首先是 document.activeElement，始终包含当前拥有焦点的 DOM 元素。页面加载时，可以通过用户输入（按 Tab 键或代码中使用 focus()方法）让某个元素自动获得焦点。  



**默认情况下， document.activeElement 在页面刚加载完之后会设置为 document.body。而在页面完全加载之前， document.activeElement 的值为 null。**

其次是 document.hasFocus()方法，该方法返回布尔值，表示文档是否拥有焦点  

### 15.3.3 HTMLDocument 扩展

1. **`document.readyState` 属性** 判断文档是否加载完毕
   1. `loading` 表示正在加载
   2. `complete` 表示加载完成
   
   实际开发中，最好是把 document.readState 当成一个指示器，以判断文档是否加载完毕。在这个属性得到广泛支持以前，通常要依赖 onload 事件处理程序设置一个标记，表示文档加载完了。  
   
2. **`document.compatMode` 属性** 指示浏览器当前处于什么渲染模式
   1. `CSS1Compat` 标准模式
   2. `BackCompat` 混杂模式
   
3. **`document.head` 属性** 指向文档的 `<head>` 元素

    ![image-20211218125135394](https://s2.loli.net/2021/12/18/VvP6SHYjrcgZeRb.png)

### 15.3.4 字符集属性

HTML5 增加了几个与文档字符集有关的新属性。其中， characterSet 属性表示文档实际使用的字符集，也可以用来指定新字符集。这个属性的默认值是"UTF-16"，但可以通过<meta>元素或响应头，以及新增的 characterSeet 属性来修改。  



![image-20211218125240159](https://s2.loli.net/2021/12/18/xE8kNZRB2zd7vUe.png)

### 15.3.5 自定义数据属性

HTML5 允许给元素指定非标准的属性，但要使用**前缀 data-**以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息。除了前缀，自定义属性对命名是没有限制的， data-后面跟什么都可以。下面是一个例子：  

```html
<div id="myDiv" data-appId="12345" data-myname="Zhou Xianghui"></div>
```

定义了自定义数据属性后，可以通过**元素的 dataset 属性**来访问。 dataset 属性是一个DOMStringMap 的实例，包含一组键/值对映射。元素的每个 data-name 属性在 dataset 中都可以通过 data-后面的字符串作为键来访问（例如，属性 data-myname、 data-myName 可以通过 myname 访问，但要注意 data-my-name、 data-My-Name 要通过 myName 来访问）。下面是一个使用自定义数据属性的例子：  

```javascript
// 自定义数据属性
let div = document.getElementById('myDiv');

// 取得自定义数据属性的值
let appId = div.dataset.appId;
let myName = div.dataset.myname;

// 设置自定义数据属性的值
div.dataset.appId = 1233;
div.dataset.myname = 'jj';

// 有 'myname' 吗 ?
if (div.dataset.myname) {
    console.log(`hello ${div.dataset.myname}`);
}
```

自定义数据属性非常适合需要给元素附加某些数据的场景，比如链接追踪和在聚合应用程序中标识页面的不同部分。另外，单页应用程序框架也非常多地使用了自定义数据属性。  

### 15.3.6 插入标记

1. **`innerHTML` 属性** 在读取 innerHTML 属性时，会返回元素所有后代的 HTML 字符串，**包括元素、注释和文本节点**。而在写入 innerHTML 时，则会根据提供的字符串值以新的 DOM 子树替代元素中原来包含的所有节点。比如下面的 HTML 代码：  

   ```html
   <div id="content">
       <p>This is a <strong>paragraph</strong> with a list following it.</p>
       <ul>
           <li>Item 1</li>
           <li>Item 2</li>
           <li>Item 3</li>
       </ul>
   </div>
   ```

   

   实际返回的文本内容会因浏览器而不同。 IE 和 Opera 会把所有元素标签转换为大写，而 Safari、Chrome 和 Firefox 则会按照文档源代码的格式返回，包含空格和缩进。因此不要指望不同浏览器的innerHTML 会返回完全一样的值。  

   ![image-20211218130744856](https://s2.loli.net/2021/12/18/DoZ3b8EPRI7vejf.png)

   

   在写入模式下，赋给 innerHTML 属性的值会被解析为 DOM 子树，并替代元素之前的所有节点。因为所赋的值默认为 HTML，所以其中的所有标签都会以浏览器处理 HTML 的方式转换为元素（同样，  转换结果也会因浏览器不同而不同）。如果赋值中不包含任何 HTML 标签，则直接生成一个文本节点  )

   **注意**  设置 innerHTML 会导致浏览器将 HTML 字符串解析为相应的 DOM 树。这意味着**设置 innerHTML 属性后马上再读出来会得到不同的字符串**。这是因为返回的字符串是将原始字符串对应的 DOM 子树序列化之后的结果。  

2. **旧 IE 中的 innerHTML**

   **在所有现代浏览器中，通过 innerHTML 插入的 `<script>` 标签是不会执行的**。而在 IE8 及之前的版本中，只要这样插入的 `<script>` 元素指定了 defer 属性，且 `<script>` 之前是“受控元素”（ scoped element），那就是可以执行的。 `<script>` 元素与 `<style>` 或注释一样，都是“非受控元素”（ NoScope element），也就是在页面上看不到它们。 IE 会把 innerHTML 中从非受控元素开始的内容都删掉  

3. **`outerHTML` 属性** 读取 outerHTML 属性时，会返回调用它的元素（及所有后代元素）的 HTML 字符串。在写入outerHTML 属性时，调用它的元素会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代  

    ![image-20211218184620621](https://s2.loli.net/2021/12/18/gwjXoh86AZRGYOu.png)

4. **`insertAdjacentHTML()` 与 `insertAdjacentText()`**，两个参数： 要插入标记的位置和要插入的 HTML或文本

    - 第一个参数值为：
        - `“beforebegin”` 插入当前元素前面，作为前一个通过节点
        - `afterbegin` 插入当前元素内部，作为新的子节点或放在第一个子节点前面
        - `“beforeend”` 插入当前元素内部，作为新节点或放在最后一个子节点后面
        - `“afterend”`  插入当前元素后面，作为下一个同胞节点

5. **内存与性能问题**

    在使用 innerHTML、outerHTML 和 insertAdjacentHTML()之前，最好手动删除要被替换的元素上关联的事件处理程序和JavaScript 对象  

6. **跨站点脚本**

###  15.3.7 `scrollIntoView()`

如何滚动页面中的某个区域

`scrollIntoView()` 方法**存在于所有 HTML 元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。**这个方法的参数如下 :

-  `alignToTop`
  - `true` 窗口滚动后元素的顶部与视口顶部对齐 不传参数为默认值 `true`
  - `false` 窗口滚动后元素的底部与视口底部对齐
- `scrollIntoViewOptions` 
  - `behavior` 定义过度动画
    - `smooth`
    - `auto` 默认值
  - `block` 定义垂直文本的对齐
    - `start` 默认值
    - `center`
    - `end`
    - `nearest`
  - `inline` 定义水平方向的对齐
    - `start` 
    - `center`
    - `end`
    - `nearest` 默认

## 15.4 专有扩展

### 15.4.1 children 属性

IE9 之前的版本与其他浏览器在处理空白文本节点的差异导致了 `children` 属性的出现。

`children` 属性是一个 HTMLCollection,只包含元素的 Element 类型的子节点。

如果元素的子节点全部都是元素类型，那么 `children` 和 `childNodes` 中包含的节点就是一样的

```html
<ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
</ul>
<script type="text/javascript">
    let ul = document.querySelector("ul");

    let childCount = ul.children.length;
    let firstChild = ul.children[0];
</script>

```

![image-20211219123240719](https://s2.loli.net/2021/12/19/KbpNWd3q6nOgUR1.png)

### 15.4.2 contains() 方法

DOM 编程中经常需要确定一个元素是不是另一个元素的后代。`contains()` 方法可以在不遍历 DOM 的情况下获取这个信息。

`contains()` 方法应该在要搜索的祖先元素上调用，参数是待确定的目标节点。

如果目标节点是被搜索元素的后代，返回 `true` 

![image-20211219123806219](https://s2.loli.net/2021/12/19/4Fkn1BRCSxGb9s6.png)

另为，使用 DOm Level 3 中的 `compareDocumentPosition()` 也可以确定节点间的关系

不过返回的是表示两个节点关系的位掩码

![image-20211219123931364](https://s2.loli.net/2021/12/19/3Wo75XnMbAmYilH.png)

要模仿 contains()方法，就需要用到掩码 16（ 0x10）。 compareDocumentPosition()方法的结果可以通过按位与来确定参考节点是否包含传入的节点，比如

![image-20211219124145472](https://s2.loli.net/2021/12/19/lsSYJWxCtF27Ui5.png)

### 15.4.3 滚动

如前所述，滚动是 HTML5 之前 DOM 标准没有涉及的领域。虽然 HTML5 把 scrollIntoView()标 准 化 了 ， 但 不 同 浏 览 器 中 仍 然 有 其 他 专 有 方 法 。 比 如 ， scrollIntoViewIfNeeded() 作 为HTMLElement 类型的扩展可以在所有元素上调用。 scrollIntoViewIfNeeded(alingCenter)会在元素不可见的情况下，将其滚动到窗口或包含窗口中，使其可见；如果已经在视口中可见，则这个方法什么也不做。如果将可选的参数 alingCenter 设置为 true，则浏览器会尝试将其放在视口中央。 Safari、Chrome 和 Opera 实现了这个方法。
