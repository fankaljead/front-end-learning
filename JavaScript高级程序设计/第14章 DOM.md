# 第14章 DOM

文档对象模型 DOM, Document Object Model，DOM表示有多层节点构成的文档

## 14.1 节点层级

其中， document 节点表示每个文档的根节点。在这里，根节点的唯一子节点是 `<html>` 元素，我们称之为 **文档元素**（ documentElement）。文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。每个文档只能有一个文档元素。在 HTML 页面中，文档元素始终是 `<html>` 元素。在 XML 文档中，则没有这样预定义的元素，任何元素都可能成为文档元素。  

HTML 中的每段标记都可以表示为这个树形结构中的一个节点。元素节点表示 HTML 元素，属性节点表示属性，文档类型节点表示文档类型，注释节点表示注释。 DOM 中总共有 12 种节点类型，这些类型都继承一种基本类型  

### 14.1.1 Node 类型

- 所有的 DOM 节点类型都必须实现 Node 接口，在 JavaScript 中，所有节点都继承 Node 类型，所有类型都共享相同的基本属性和方法

- 每个节点都有 nodeType 属性，表示该节点的类型，由 12 个数值常量表示：
  
  1. `Node.ELEMENT_NODE` 1
  
  2. `Node.ATTRIBUTE_NODE  ` 2
  
  3. `NODE.TEXT_NODE` 3
  
  4. `Node.CDATA_SECTION_NODE` 4
  
  5. `Node.ENTITY_REFERENCE_NODE` 5
  
  6. `Node.ENTITY_NODE` 6
  
  7. `Node.PROCESSING_INSTRUCTION_NODE` 7
  
  8. `Node.COMMENT_NODE` 8
  
  9. `Node.DOCUMENT_NODE` 9
  
  10. `Node.DOCUMENT_TYPE_NODE` 10
  
  11. `Node.DOCUMENT_FRAGMENT_NODE` 11
  
  12. `Node.NOTATION_NODE` 12
  - 节点之间比较
    
    ```javascript
    if (someNode.nodeType == Node.Element_NODE) {
        console.log("Node is an element");
    }
    ```
  
  - `nodeName` 和 `nodeValue` 保存在节点信息，对元素而言， nodeName 始终等于元素的标签名，而 nodeValue 则始终为 null。
  
      - 对于文档节点来说, `nodeValue`返回`null`. 对于text, comment, 和 CDATA 节点来说, `nodeValue返回该节点的文本内容`. 对于 attribute 节点来说, 返回该属性的属性值.  
  
          ![image-20211215212719221](https://s2.loli.net/2021/12/15/4QOCLivnNq8Ikfc.png)
  
      ![image-20211214161823928](https://s2.loli.net/2021/12/14/IPdtcVARbs3y29J.png)
  
  - **节点关系**
  
      文档中的所有节点都与其他节点有关系。这些关系可以形容为家族关系，相当于把文档树比作家谱。在 HTML 中， `<body>` 是 `<html>` 元素的子元素，而 `<html>` 元素则是 `<body>` 元素的父元素。 `<head>` 元素是 `<body>` 元素的同胞元素，因为它们有共同的父元素 `<html>`。  
  
      
  
      每个节点都有一个 `childNodes` 属性，其中包含一个 NodeList 的实例。 NodeList 是一个类数组对象，用于存储可以按位置存取的有序节点。注意， NodeList 并不是 Array 的实例，但可以使用中括号访问它的值（也可以使用 `item()` 方法访问），而且它也有 length 属性。 NodeList 对象独特的地方在于，它其实是一个对 DOM 结构的查询，因此 DOM 结构的变化会自动地在 NodeList 中反映出来。我们通常说 **NodeList 是实时的活动对象**，而不是第一次访问时所获得内容的快照。  
  
      - `childNodes` 是 NodeList 实例，且为只读， **包括换行及其文本节点**，例如下面 ul 中有 三个 li 元素：
  
          ```html
          <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
          </ul>
          ```
  
          ![image-20211215213535827](C:\Users\72867\AppData\Roaming\Typora\typora-user-images\image-20211215213535827.png)
  
      - `children` 只包括
  
      - ![image-20211214162217395](https://s2.loli.net/2021/12/14/ZX1TfnQ4oYgUe6c.png)
  
      ![image-20211214162653034](https://s2.loli.net/2021/12/14/PRKgIGW2JE1XsnT.png)
  
      - 使用 `hasChildNodes()` 查看节点有一个或多个节点
  
  - **操作节点**
  
      由于所有关系指针都是只读的，所以 DOM 提供了一些操纵节点的方法
  
      - `appendChild()` 用于在 childNodes 列表末尾添加节点 ，添加新节点后会更新相关的关系指针，包括父节点和之前的最后一个子节点。并且**返回新添加的节点**
  
          - 如果把文档中已经存在的节点传给 `appendChild()`，则这个节点会从之前的位置转移到新位置，即一个节点不会再文档中同时出现再两个或更多地方
  
            
  
      - `insertBefore()` **把节点放到特定位置**，**返回新插入的节点**，参数为：
  
          1. 要插入的节点
          2. 参照节点，如果参照节点为 `null` ，则与 `appendChild()` 效果相同
  
      - `replaceChild()` 替换节点，返回被替换的节点，参数为：
  
          1. 要插入的节点
          2. 要替换的节点
  
      - `removChild()` 移除节点
  
  - 其它方法
  
    - `cloneNode()` 传入 `true` 表示深复制， `false` 表示浅复制，没有子节点
  
        - **不会复制添加到 DOM 节点的 JavaScript 属性，例如事件处理程序，只复制 HTML 属性，以及可选择地复制子节点**
  
        ![image-20211215214922855](https://s2.loli.net/2021/12/15/YUGCZNjB6xJvWdf.png)
  
        ![image-20211214170740493](https://s2.loli.net/2021/12/14/bECj5FZR9r2nNoG.png)
  
    - `normalize()`  处理文档子树的文本节点
  
        由于解析器实现的差异或 DOM 操作等原因，可能会出现并不包含文本的文本节点，或者文本节点之间互为同胞关系。在节点上调用 `normalize()` 方法检测这个节点的所有后代，从中搜索上述两种情形。如果发现空文本节点，则将其删除；如果两个同胞节点是相邻的，则将其合并为一个文本节点。

### 14.1.2 Document 类型

- Document 类型是 JavaScript 中表示文档节点的类型。在浏览器中，文档对象 document 是HTMLDocument 的实例（ HTMLDocument 继承 Document），表示整个 HTML 页面。 document 是 window 对象的属性，因此是一个全局对象。 Document 类型的节点有以下特征：

  - `nodeType` 9
  - `nodeName` `"#document"`
  - `nodeValue` `null`
  - `parentNode` `null`
  - `ownerDocument` `null`
  - 子节点可以是 DocumentType（最多一个）、 Element（最多一个）、 ProcessingInstruction或 Comment 类型  

  <img src="https://s2.loli.net/2021/12/14/GbFMarOLI6lYwkv.png" alt="image-20211214171131010" style="zoom:100%;" />

- **document 对象可用于获取关于页面的信息以及操纵其外观和底层结构**  

1. **文档子节点**

    - DOM 规范 Document 节点的子节点可以是 `DocumentType、 Element、 ProcessingInstruction、Comment  `

    - `document.documentElement` 和 `document.childNodes[0]` 始终指向 `<html>` 元素，使用前者可以更快更直接地访问该元素

        ![image-20211214171753743](https://s2.loli.net/2021/12/14/PGRFxtUSuHXcsEd.png)

    - `document.body` 直接指向 `<body>` 元素

    - 一般来说， appendChild()、 removeChild()和 replaceChild()方法不会用在 document 对象上。这是因为文档类型（如果存在）是只读的，而且只能有一个 Element 类型的子节点（即 `<html>`，已经存在了）。  

    ![image-20211216231859392](https://s2.loli.net/2021/12/16/aUdJtDkZxsLGyT1.png)

2. **文档信息**

   1. `document.title` 修改 `document.title` 并不会改变 `<title>` 元素
      2. `document.url` 包含当前页面的完整 URL（地址栏中的 URL）  
      3. `document.domain` 包含页面的域名，只有 `domain` 是可以设置的，但是是有限制的，不能给这个属性设置 URL 中不包含的值
          1. 不能把 `domain` 设置 URL 中不包含的值
          2. `domain` 属性一旦放松就不能再收紧
      4. `document.referrer` 包含链接到当前页面地那个页面的 URL

3. **定位元素**

    1. `document.getElementById()` 返回的是 Element 元素

       - 参数为获取元素的 ID，如果没找到返回 `null`
       - 如果页面中存在许多具有相同 ID 的元素，**则返回文档中出现的第一个元素**
       - getElementById方法不会搜索**不在文档中的元素**，当创建一个元素，并且分配ID后，必须将元素插入到文档中，才能通过 `getElementById` 获取到

    2.  `document.getElementsByTagName()` 返回的是 HTMLCollection

       - 参数为获取元素的标签名, **运行前会将参数转为小写字母形式**
       - 返回零个或多个元素的 HTMLCollection
       - 返回的列表是动态的，这意味着它会随着DOM树的变化自动更新自身。所以，使用相同元素和相同参数时，没有必要多次的调用

    3. `document.getElementsByName()` 返回具有给定 `name` 属性的所有 **元素(HTMLCollection)**，主要用于单选按钮，因为同一字段的单选按钮必须具有相同的 `name` 属性才能确保把正确的值发送给服务器

        ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>14.1.2.4 getElementsByName</title>
          </head>
          <body>
            <fieldset>
              <legend>Which color do you prefer?</legend>
              <ul>
                <li>
                  <input type="radio" value="red" name="color" id="colorRed" />
                  <label for="colorRed">Red</label>
                </li>
                <li>
                  <input type="radio" value="green" name="color" id="colorGreen" />
                  <label for="colorGreen">Green</label>
                </li>
                <li>
                  <input type="radio" value="blue" name="color" id="colorBlue" />
                  <label for="colorBlue">Blue</label>
                </li>
              </ul>
            </fieldset>
        
            <script>
              let radios = document.getElementsByName("color");
              
            </script>
          </body>
        </html>
        ```
    
        ![image-20211216121907193](https://s2.loli.net/2021/12/16/prExNMGneo2vXm4.png)
    
    4. 
    
        


   4. **注意：**
        1. HTMLCollection 是元素集合，而 NodeList 是节点集合（即可以包含元素，也可以包含文本节点）
        
        2. 所以 `node.childNodes` 返回 NodeList
        
        3. `node.children` 和 `document.getElementByXXX` 返回 HTMLCollection
        
        4. **还需注意：** `querySelectorAll` 返回的虽然是 NodeList，但实际上还是元素集合，并且还是静态的
        
        5. HTMLCollection 对象可以通过 `namedItem()` 获取标签 `name` 属性取得某一项的引用，例如：
        
            ```html
            <img src="test.png" name="myimg" />
            
            <script>
            	let myimg = images.namedItem("myimg")
            </script>
            ```
        
            ![image-20211216121105084](https://s2.loli.net/2021/12/16/JEBmzaiP9ZTpKXs.png)
        
        6. 对于 name 属性的元素，还可以直接使用中括号来获取  
        
        7. 对于 HTMLCollection 对象而言，中括号既可以接收数值索引，也可以接收字符串索引，而在后台，数值索引会调用 `item()` ，字符串索引会调用 `namedItem()`


​        

4. **特殊集合**

   1. `document.anchors` 包含文档中所有带 `name` 属性的 `<a>` 元素
   2. `document.applets` 所有 `<applet>` 元素
   3. `document.forms` 所有 `<form>` 元素
   4. `document.images` 所有 `<img>`
   5. `document.links` 所有带有 `href` 属性的 `<a>` 元素
5. **DOM 兼容性检测** `document.implementation.hasFeature()`
6. **文档写入**

   1. `document.write()` `document.writeln()` 将字符串写入网页
       - `write(), writeln()` 经常用于动态包含外部资源，如 JavaScript 文件，但是不能直接包含字符串 `“</script>”` ，因为这个字符串会被解释为脚本的结尾，导致后面代码不能执行
   2. `open()` `close()` 分别打开和关闭网页输出流

### 14.1.3 Element 类型

- Element 表示 XML 或 HTML元素，对外暴露出访问元素标签名、子节点和属性的能力  

- Element 类型节点特点：
  
  - `nodeType` 1
  
  - `nodeName` 为元素标签名
  
      - `tagName` 也是获取元素的标签名，两个属性返回相同的值，在 HTML 中，元素标签名始终以全大写表示
      - 在 XML （包括 XHTML）中，标签名始终与源代码中的大小写一致
      - 所以，最好将标签名转换为小写形式，以便于比较
  
      ![image-20211216143714988](https://s2.loli.net/2021/12/16/FnwD7Kb1NGZokhA.png)
  
  - `nodeValue` 为 `null`
  
  - `parentNode` 为 `Document` 或 `Element` 对象
  
  - 子节点可以是 `Element、 Text、 Comment、 ProcessingInstruction、 CDATASection、EntityReference`类型  
  
  - 在 HTML 中，元素标签名始终以全大写表示；在 XML（包括 XHTML）中，标签名始终与源代码中的大小写一致  
1. **HTML** 元素 所有 HTML 元素都通过 HTMLElement 类型表示，都有下面属性
   
   1. id 唯一标识符
   2. title 元素额外信息，通常以提示条展示
   3. lang 语言代码
   4. dir 语言书写方向
      1. ltr  表示从左向右
      2. rtl 表示从右向左
   5. className class属性，用于指定 CSS 类

   ![image-20211216144252867](https://s2.loli.net/2021/12/16/fJ3WbgNCd7m6h2L.png)
   
   - **所有 HTML 元素都是 HTMLElement 或其子类型的实例**。下表列出了所有 HTML 元素及其对应的类型（斜体表示已经废弃的元素）
   
       ![image-20211216144422026](https://s2.loli.net/2021/12/16/8eKYQ9hgGdDTF4R.png)
   
       ![image-20211216144436857](https://s2.loli.net/2021/12/16/Qaj6rT8D4KqnbSX.png)
   
2. **取得属性**
   
   1. `getAttribute()`
   
       1. 传给 `getAttribute()` 的属性名，与他们实际的属性名是一样的，例如是 `class` 而不是 `className`

       2. `getAttribute()` 也可以取得不是 HTML 语言正式属性的自定义属性，例如：
   
           ```html
           <div
                id="mydiv"
                title="mydiv title"
                dir="rtl"
                class="shark"
                sp="speacial attribute"
                >
               My Div
           </div>
           ```
   
           ![image-20211216165739264](https://s2.loli.net/2021/12/16/FQuw4bWyTHavEm3.png)
   
       3. **属性名不区分大小写，并且 HTML5 规范要求，自定义属性名应该以前缀 `data-` 以方便验证**
   
       4. 元素属性也可以通过相应的 DOM 元素对象的属性来获取（非自定义）
   
           1. 通过 DOM 对象访问的属性中有两个返回的值和使用 `getAttribute()` 取的的值不一样：
   
               1. `style` 属性，这个属性用于为元素设定 CSS 样式
   
                   - 通过 `getAttribute()` 返回的是字符串
   
                   - DOM 对象的 style 属性用于以编程方式读写元素样式，不会直接映射元素的 style 属性的字符串值
   
                       ```html
                       <!DOCTYPE html>
                       <html lang="en">
                         <head>
                           <meta charset="UTF-8" />
                           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                           <title>14.1.3 Element 类型</title>
                         </head>
                       
                         <body>
                           <div
                             id="mydiv"
                             title="mydiv title"
                             dir="rtl"
                             class="shark"
                             sp="speacial attribute"
                             style="
                               font-size: 20px;
                               width: 200px;
                               height: 200px;
                               background-color: antiquewhite;
                             "
                           >
                             My Div
                           </div>
                       
                           <script>
                             let mydiv = document.getElementById("mydiv");
                           </script>
                         </body>
                       </html>
                       ```
   
                       ![image-20211216172854449](https://s2.loli.net/2021/12/16/DWdertuFv954Hh1.png)
   
               2. 事件处理程序（或者事件属性）
   
                   - 在元素是使用事件属性时，属性的值是一段 Javascript 代码
                   - 使用 `getAttribute()` 返回的是字符串形式的源代码
   
               3. **所以进行 DOM 编程时同时不使用 `getAttribute`，而只使用对象属性，`getAttribute` 主要用于取得自定义属性的值**
   
   2. `setAttribute()` 给属性设置值，如果不存在，则会创建该属性
   
       1. 使用 `setAttribute` 设置的属性名会自动规范化为小写形式，例如 `Data-bbB` 会变成 `data-bbb`
   
           ![image-20211216173350550](https://s2.loli.net/2021/12/16/b1oZ8RGXxEhAOfI.png)
   
       2. 直接在 DOM 对象上添加自定义属性，不会自动让他变成元素的属性
   
           ![image-20211216173653723](https://s2.loli.net/2021/12/16/FwdMqjOYHc3vZAo.png)
   
   3. `removeAtrribute()` 会将**整个**属性完全从元素中去掉
   
3. **`attributes`** 属性 Element 类型是唯一使用 attributes 属性的 DOM 节点类型。 attributes 属性包含一个NamedNodeMap 实例，是一个类似 NodeList 的“实时”集合。元素的每个属性都表示为一个 Attr 节点，并保存在这个 NamedNodeMap 对象中。 NamedNodeMap 对象包含下列方法 ：
   
   - `getNamedItem(name)`
   - `removeNamedItem(name)`
   - `setNamedItem(node)`
   - `item(pos)`

   1. attributes 属性最有用的场景是需要**迭代元素上所有属性**的时候。这时候往往是要把 DOM 结构序列化为 XML 或 HTML 字符串。  
   
4. **创建元素** `createElement` 接收一个参数，即要创建元素的标签名，并且在 HTML 文档中，标签名不区分大小写
   
   - 使用 `document.createElement()` 方法创建新元素的同时，会把其 `ownerDocument` 设置为 `document`
   - 元素被添加到文档树之后，浏览器和立即将其渲染出来，之后再对这个元素所作的任何修改，都会立即在浏览器中反映出来
   
   ```javascript
   let div = document.createElement('div');
   ```
   
   ![image-20211216174551195](https://s2.loli.net/2021/12/16/LIpsW6x5eYjzg9h.png)
   
5. **元素后代**  

    1. 元素可以用于任意多个子元素和后代元素

    2. **childNodes** 属性包含元素所有的子节点，这些子节点可能是其他元素、文本节点、注释或处理指令  

    3. 不同浏览器在识别这些节点时表现有明显不同

    4. 要取得某个元素的子节点和其他后代节点，可以使用元素的 `getElementsByTagName()`

        ```html
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        ```

        

        ![image-20211216175032748](https://s2.loli.net/2021/12/16/EoPK9zSnfZ1LHCq.png)


### 14.1.4 Text 类型

- Text 节点由 Text 类型表示，包含按字面解释的纯文本，**也可能包含转义后的 HTML 字符**，但不含 HTML 代码。 Text 类型的节点具有以下特征  ：
  
  - nodeType 1
  
  - nodeName "#text"
  
  - nodeValue 为节点中包含的文本

  - parentNode 值为 Element 对象
  
  - 不支持子节点
  
      ```html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>14.1.4 Text 类型</title>
        </head>
        <body>
          <div id="mydiv1"></div>
          <div id="mydiv2">div2</div>
          <script>
            let mydiv1 = document.getElementById("mydiv1");
            let mydiv2 = document.getElementById("mydiv2");
          </script>
        </body>
      </html>
      ```
  
      
  
      ![image-20211216182609275](C:\Users\72867\AppData\Roaming\Typora\typora-user-images\image-20211216182609275.png)
  
- Text 节点中包含的文本可以通过 nodeValue 属性访问，也可以通过 data 属性访问，这两个属性包含相同的值。修改 nodeValue 或 data 的值，也会在另一个属性反映出来。文本节点暴露了以下操作文本的方法：  
  
  ![image-20211216182732085](https://s2.loli.net/2021/12/16/UW86VaqgFXktrMB.png)
  
  - `appendDate(text)`
  
  - `deleteDate(offset, count)`
  
  - `insertData(offset, text)`
  
  - `replaceData(offset, count, text)`
  
  - `splitText(offset)`
  
  - `substringData(offset, count)`
  
  - `length`
  
      ![image-20211216183542368](https://s2.loli.net/2021/12/16/Knq2XDCcAfTadmw.png)
1. **创建文本节点**
   
    `document.createTextNode()` 可以用来创建新文本节点，它接收一个参数，即要插入节点的文本。跟设置已有文本节点的值一样，这些要插入的文本也会应用 HTML 或 XML 编码  
   
   ```javascript
   let textNode = document.createTextNode("<strong>Hello</strong> world!");
   ```
   
    一般来说一个元素只包含一个文本子节点。不过，也可以让元素包含多个文本子节点  

2. **规范会文本节点**
   
    DOM 文档中的同胞文本节点可能导致困惑，因为一个文本节点足以表示一个文本字符串。同样，DOM 文档中也经常会出现两个相邻文本节点。为此，有一个方法可以**合并相邻的文本节点。这个方法叫 `normalize()`**，是在 Node 类型中定义的（因此所有类型的节点上都有这个方法）。在包含两个或多个相邻文本节点的父节点上调用 normalize()时，所有同胞文本节点会被合并为一个文本节点，这个文本节点的 nodeValue 就等于之前所有同胞节点 nodeValue 拼接在一起得到的字符串。  
   
    浏**览器在解析文档时，永远不会创建同胞文本节点。同胞文本节点只会出现在 DOM 脚本生成的文档树中。**  

3. **拆分文本节点**
   
    Text 类型定义了一个与 normalize()相反的方法——splitText()。这个方法可以在指定的偏移位置拆分 nodeValue，将一个文本节点拆分成两个文本节点。拆分之后，原来的文本节点包含开头到偏移位置前的文本，新文本节点包含剩下的文本。这个方法返回新的文本节点，具有与原来的文本节点相同的 parentNode。  
    
    ![image-20211216222215053](https://s2.loli.net/2021/12/16/pW5DL2lv43XmoYu.png)
    
    **拆分文本节点最常用于从文本节点中提取数据的 DOM 解析技术**

### 14.1.5 Comment 类型

DOM 中的注释通过 Comment 类型表示。 Comment 类型的节点具有以下特征 ：

- nodeType 等于 8；
- nodeName 值为"#comment"；
- nodeValue 值为注释的内容；
- parentNode 值为 Document 或 Element 对象；
- 不支持子节点。  

Comment 类型与 Text 类型继承同一个基类（ CharacterData），因此拥有除 splitText()之外Text 节点所有的字符串操作方法。与 Text 类型相似，注释的实际内容可以通过 nodeValue 或 data属性获得。  

- 可以使用 document.createComment()方法创建注释节点，参数为注释文本  

注释节点可以作为父节点的子节点来访问。  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14.1.5 Comment 类型</title>
  </head>
  <body>
    <div id="mydiv">
      <!-- 这是注释 -->
    </div>
    <script>
      let mydiv = document.getElementById("mydiv");
    </script>
  </body>
</html>
```

![image-20211216223812598](https://s2.loli.net/2021/12/16/onLx7OlbNYAu9rT.png)

### 14.1.6 CDATASection 类型

CDATASection 类型表示 XML 中特有的 CDATA 区块。 CDATASection 类型继承 Text 类型，因此拥有包括 splitText()在内的所有字符串操作方法。 CDATASection 类型的节点具有以下特征：  

- nodeType 等于 4；
- nodeName 值为"#cdata-section"；
- nodeValue 值为 CDATA 区块的内容；
- parentNode 值为 Document 或 Element 对象；
- 不支持子节点。  

CDATA 区块只在 XML 文档中有效，因此某些浏览器比较陈旧的版本会错误地将 CDATA 区块解析为 Comment 或 Element。  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14.1.6 CDATASection 类型</title>
  </head>
  <body>
    <div id="mydiv"><![CDATA[This is some content.]]></div>
    <script>
      let mydiv = document.getElementById("mydiv");
    </script>
  </body>
</html>
```

![image-20211216224445724](https://s2.loli.net/2021/12/16/ZLb4kO1pvnA2N6I.png)

### 14.1.7 DocumentType 类型

DocumentType 类型的节点包含文档的文档类型（ doctype）信息，具有以下特征：  

- nodeType 等于 10；
- nodeName 值为文档类型的名称；
- nodeValue 值为 null；
- parentNode 值为 Document 对象；
- **不支持子节点**。

DocumentType 对象在 DOM Level 1 **中不支持动态创建**，只能在解析文档代码时创建。对于支持这个类型的浏览器， DocumentType 对象保存在 document.doctype 属性中。 DOM Level 1 规定了DocumentType 对象的 3 个属性： name、 entities 和 notations。其中， name 是文档类型的名称，
entities 是这个文档类型描述的实体的 NamedNodeMap，而 notations 是这个文档类型描述的表示法的 NamedNodeMap。因为浏览器中的文档通常是 HTML 或 XHTML 文档类型，所以 entities 和notations 列表为空。（这个对象只包含行内声明的文档类型。）无论如何，只有 name 属性是有用的。这个属性包含文档类型的名称，即紧跟在<!DOCTYPE 后面的那串文本。  

![image-20211216224726131](https://s2.loli.net/2021/12/16/DScErnBopi7d25t.png)

### 14.1.8 DocumentFragment 类型

在所有节点类型中， DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。 DOM 将文档 片 段定 义为 “ 轻量 级 ” 文 档， 能够 包 含和 操作 节 点， 却没 有 完整 文档 那 样额 外的 消 耗 。DocumentFragment 节点具有以下特征：  

- nodeType 等于 11；
- nodeName 值为"#document-fragment"；
- nodeValue 值为 null；
- parentNode 值为 null；
- 子节点可以是 Element、 ProcessingInstruction、 Comment、 Text、 CDATASection 或 EntityReference。  

不能直接把文档片段添加到文档。相反，文档片段的作用是充当其他要被添加到文档的节点的仓库。可以使用 document.createDocumentFragment()方法像下面这样创建文档片段：  

```javascript
let fragment = document.createDocumentFragment();
```

文档片段从 Node 类型继承了所有文档类型具备的可以执行 DOM 操作的方法。如果文档中的一个节点被添加到一个文档片段，则该节点会从文档树中移除，不会再被浏览器渲染。添加到文档片段的新节点同样不属于文档树，不会被浏览器渲染。可以通过 appendChild()或 insertBefore()方法将文档片段的内容添加到文档。在把文档片段作为参数传给这些方法时，这个文档片段的所有子节点会被添加到文档中相应的位置。**文档片段本身永远不会被添加到文档树**。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14.1.8 DocumentFragment 类型</title>
  </head>
  <body>
    <div id="mydiv"></div>
    <script>
      let mydiv = document.getElementById("mydiv");
      let fragment = document.createDocumentFragment();
      let ul = document.createElement("ul");
      for (let i = 0; i < 3; ++i) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`Item ${i + 1}`));
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      mydiv.appendChild(ul);
    </script>
  </body>
</html>
```

  ![image-20211216225528209](https://s2.loli.net/2021/12/16/Eb2841CjnsBw5GA.png)

### 14.1.9 Attr 类型

元素数据在 DOM 中通过 Attr 类型表示。 Attr 类型构造函数和原型在所有浏览器中都可以直接访问。技术上讲，属性是存在于元素 attributes 属性中的节点。 Attr 节点具有以下特征：  

- nodeType 等于 2；
- nodeName 值为属性名；
- nodeValue 值为属性值；
- parentNode 值为 null；
- 在 HTML 中不支持子节点；
- 在 XML 中子节点可以是 Text 或 EntityReference。  

属性节点尽管是节点，却不被认为是 DOM 文档树的一部分。 Attr 节点很少直接被引用，通常开发者更喜欢使用 getAttribute()、 removeAttribute()和 setAttribute()方法操作属性。  

Attr 对象上有 3 个属性： name、 value 和 specified。其中， name 包含属性名（与 nodeName一样）， value 包含属性值（与 nodeValue 一样），而 specified 是一个布尔值，表示属性使用的是默认值还是被指定的值。  

可以使用 document.createAttribute()方法创建新的 Attr 节点，参数为属性名。  

**注意 将属性作为节点来访问多数情况下并无必要。推荐使用 getAttribute()、removeAttribute()和 setAttribute()方法操作属性，而不是直接操作属性节点。**  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14.1.9 Attr 类型</title>
    <style>
      .mm {
        font-size: 34px;
      }
    </style>
  </head>
  <body>
    <div id="mydiv">hello world</div>
    <script>
      let mydiv = document.getElementById("mydiv");
      let attr = document.createAttribute("class");
      attr.value = "mm";
      mydiv.setAttributeNode(attr);
      // mydiv.setAttribute("class", "mm")
    </script>
  </body>
</html>

```

![image-20211216231026387](https://s2.loli.net/2021/12/16/BK4LXG3fokgitDx.png)

## 14.2 DOM 编程

很多时候，操作 DOM 是很直观的。通过 HTML 代码能实现的，也一样能通过 JavaScript 实现。但有时候， DOM 也没有看起来那么简单。浏览器能力的参差不齐和各种问题，也会导致 DOM 的某些方面会复杂一些。  

### 14.2.1 动态脚本

- **动态脚本** 就是在页面初始加载时不存在，之后又通过 DOM 包含的脚本。与对应的HTML 元素一样，有两种方式 
  - 通过 `<script>` 动态为网页添加脚本
  - 引入外部文件和直接插入源代码  
  - **注意：通过 innerHTML 属性创建的 `<script>` 元素永远不会执行**
  
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>14.2.1 动态脚本</title>
    </head>
    <body>
      <script>
        function loadScript(url) {
          let script = document.createElement("script");
          script.src = url;
          document.body.appendChild(script);
        }
        function loadScriptString(code) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          try {
            script.appendChild(document.createTextNode(code));
          } catch (ex) {
            script.text = code;
          }
          document.body.appendChild(script);
        }
      </script>
    </body>
  </html>
  ```
  
  

### 14.2.2 动态样式

- **注意：应该把 `<link>` 元素添加到 `<head>` 元素而不是 `<body>` 元素，保证所有浏览器都能正常运行**
- 通过外部文件加载样式是一个异步过程。因此，样式的加载和正执行的 JavaScript 代码没有先后顺序。一般来讲，没有必要知道样式什么时候加载完成

CSS 样式在 HTML 页面中可以通过两个元素加载。`<link>` 元素用于包含 CSS 外部文件， 而 `<style>` 元素用于添加嵌入样式。与动态脚本类似，动态样式也是页面初始加载时并不存在，而是在之后才添加到页面中的  

```javascript
// 动态样式
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';
let head = document.getElementsByTagName('head')[0];
head.appendChild(link);
```

### 14.2.3 操作表格

表格是 HTML 中最复杂的结构之一。通过 DOM 编程创建<table>元素，通常要涉及大量标签，包括表行、表元、表题，等等。因此，通过 DOM 编程创建和修改表格时可能要写很多代码。  

```html
<table border="1" width="100%">
    <tbody>
        <tr>
            <td>Cell 1,1</td>
            <td>Cell 2,1</td>
        </tr>
        <tr>
            <td>Cell 1,2</td>
            <td>Cell 2,2</td>
        </tr>
    </tbody>
</table>
```



![image-20211217000331685](https://s2.loli.net/2021/12/17/GpyERVq1kFi4lTB.png)

```javascript
// 创建表体
let tbody = document.createElement('tbody');
table.appendChild(tbody);

// 创建第一行
let row1 = document.createElement('tr');
tbody.appendChild(row1);
let cell1_1 = document.createElement('tr');
cell1_1.appendChild(document.createTextNode('Cell 1, 1'));
row1.appendChild(cell1_1);
let cell1_2 = document.createElement('tr');
cell1_2.appendChild(document.createTextNode('Cell 1, 2'));
row1.appendChild(cell1_2);

// 创建第二行
let row2 = document.createElement('tr');
tbody.appendChild(row1);
let cell2_1 = document.createElement('tr');
cell2_1.appendChild(document.createTextNode('Cell 2, 1'));
row2.appendChild(cell2_1);
let cell2_2 = document.createElement('tr');
cell2_2.appendChild(document.createTextNode('Cell 2, 2'));
row2.appendChild(cell2_2);
```

- HTML DOM 给 `<table> <tbody> <tr> ` 元素添加了一些元素和方法
  - `<tbody>`
    - `caption`
    - `tBodies`
    - `tFoot`
    - `tHead`
    - `rows`
    - `createTHead()`
    - `createTFoot()`
    - `createCaption()`
    - `deleteTHead()`
    - `deleteTFoot()`
    - `deleteCaption()`
    - `deleteRows(pos)`
    - `insertRow(pos)`
    - `rows`

### 14.2.4 使用 NodeList

- NodeList NamedNodeMap HTMLCollection 3 个集合类型都是“实时的”，意味着文档结构的变化会实时地在它们身上反映出来，因此它们的值始终代表最新的状态    

- NodeList 就是基于 DOM 文档的实时查询  

- 任何时候要迭代 NodeList，最好再初始化一个变量保存当时查询时的长度，然后用循环变量与这个变量进行比较，如下所示  
  
  ```javascript
  let divs = document.getElementsByTagName('div');
  
  for (let i = 0, len = divs.length; i < len; ++i) {
      let div = document.createElement('div');
      document.body.appendChild(div);
  }
  ```
  
  一般来说，最好限制操作 NodeList 的次数。因为每次查询都会搜索整个文档，所以最好把查询到的 NodeList 缓存起来。  

## 14.3 MutationObserver 接口

**MutationObserver 接口**，可以在 DOM 被修改时异步执行回调。使用 MutationObserver 可以观察整个文档、 DOM 树的一部分，或某个元素 ，还可以观察元素属性、子节点、文本，或者前三者任意组合的变化  

- 整个文档
- DOM 树的一部分
- 元素属性
- 子节点
- 文本
- 或者任意组合

**注意** 新引进 MutationObserver 接口是为了取代废弃的 MutationEvent  

### 14.3.1 基本用法

MutationObserver 的实例要通过调用 MutationObserver 构造函数并传入一个回调函数来创建：  

```javascript
let observer = new MutationObserver(
    () => console.log('DOM was mutated')
);
```

1. **`observe()`** 方法 新创建的 MutationObserver 实例不会关联 DOM 的任何部分。要把这个 observer 与 DOM 关联起来，需要使用 observe()方法。这个方法接收两个必需的参数：要观察其变化的 DOM 节点，以及一个 MutationObserverInit 对象。 
   
   MutationObserverInit 对象用于控制观察哪些方面的变化， 是一个键/值对形式配置选项的字典。  
   
   ```javascript
   let observer = new MutationObserver(
       () => console.log('<body>attributes changed')
   );
   
   observer.observe(
       document.body, 
       { attributes: true}
   )
   
   document.body.className = 'foo';
   console.log('Changed body class');
   
   // Changed body class
   // <body> attributed changed
   ```

2. **回调与 MutationRecord** 每个回调都会收到一个 MutationRecord 实例的数组。 MutationRecord 实例包含的信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响 。因为回调执行之前可能同时发生多个满足观察条件的事件，所以每次执行回调都会传入一个包含按顺序入队的 MutationRecord 实例的数组。  

    ```js
    let observer = new MutationObserver((mutationRecords) => {
        console.log(mutationRecords);
    });
    
    observer.observe(document.body, { attributes: true });
    
    document.body.setAttribute("foo", "bar");
    ```

    ![image-20211217161540822](https://s2.loli.net/2021/12/17/OR5lzbjoEqUZ1Ce.png)

    ![image-20211217161718984](https://s2.loli.net/2021/12/17/CpyLmRFoBT5Jj8e.png)

    ![image-20211217161730084](https://s2.loli.net/2021/12/17/StU9VJa3MiXTlqY.png)

    

3. **`disconnect()` 方法**  默认情况下，只要被观察的元素不被垃圾回收， MutationObserver 的回调就会响应 DOM 变化事件，从而被执行。要提前终止执行回调，可以调用 `disconnect()` 方法 。要想让已经加入任务队列的回调执行，可以使用 `setTimeout` 让已经入列的回调执行完毕后再调用 `disconnect()`

    ```js
    let observer = new MutationObserver(
        (mutationRecords, mutationObserver) => {
            console.log("<body> attributes changed");
            console.log(mutationRecords);
            console.log(mutationObserver);
        }
    );
    
    observer.observe(document.body, {
        attributes: true,
        attributeOldValue: true,
    });
    
    document.body.className = "foo";
    
    setTimeout(() => {
        observer.disconnect();
        document.body.className = "bar";
    }, 0);
    ```

    ![image-20211217182654080](https://s2.loli.net/2021/12/17/viYtxAuOFXg8wlJ.png)

4. **复用  MutationObserver ** 多次调用  `observe()` 方法，可以复用一个 MutationObserver 对象观察多个不同的目标节点。此时， MutationRecord 的 target 属性可以标识发生变化事件的目标节点  

    ```js
    let observer = new MutationObserver((mutationRecords) => {
        console.log(mutationRecords.map((x) => x.target));
    });
    
    // 向 document body 添加两个子节点
    let childA = document.createElement("div"),
        childB = document.createElement("span");
    document.body.appendChild(childA);
    document.body.appendChild(childB);
    
    // 观察两个节点
    observer.observe(childA, { attributeOldValue: true, attributes: true });
    observer.observe(childB, { attributeOldValue: true, attributes: true });
    
    // 修改两个子节点的属性
    childA.setAttribute("foo", "bar");
    childB.setAttribute("foo", "bar");
    ```

    ![image-20211217183155755](https://s2.loli.net/2021/12/17/OJcIrUWtg8RoPmA.png)

    `disconnect()` 方法是一个 一刀切 的方案，调用它会停止观察所有目标：

    ```js
    let observer = new MutationObserver((mutationRecords) => {
        console.log(mutationRecords.map((x) => x.target));
    });
    
    // 向 document body 添加两个子节点
    let childA = document.createElement("div"),
        childB = document.createElement("span");
    document.body.appendChild(childA);
    document.body.appendChild(childB);
    
    // 观察两个节点
    observer.observe(childA, { attributeOldValue: true, attributes: true });
    observer.observe(childB, { attributeOldValue: true, attributes: true });
    
    observer.disconnect();
    
    // 修改两个子节点的属性
    childA.setAttribute("foo", "bar");
    childB.setAttribute("foo", "bar");
    ```

    

    ![image-20211217183316453](https://s2.loli.net/2021/12/17/Ril8CqTY4acIfFj.png)

5. **重用 MutationObserver** 调用 `disconnect()` 并不会结束 MutationObserver 的生命。还可以重新使用这个观察者，再将它关联到新的目标节点  

    ```js
    let observer = new MutationObserver((mutationRecords) => {
        console.log("<body> attributes has changed");
        console.log(mutationRecords);
    });
    
    observer.observe(document.body, {
        attributeOldValue: true,
        attributes: true,
    });
    
    document.body.setAttribute("foo", "bar");
    
    setTimeout(() => {
        observer.disconnect();
        document.body.setAttribute("bar", "baz");
    }, 0);
    
    setTimeout(() => {
        // Reattach
        observer.observe(document.body, {
            attributeOldValue: true,
            attributes: true,
        });
        document.body.setAttribute("baz", "qux");
    }, 0);
    ```

    

    ![image-20211217184113262](https://s2.loli.net/2021/12/17/ykxUC1qOnth29jX.png)

### 14.3.2 MutationObserverInit 与观察范围

**MutationObserverInit 对象用于控制对目标节点的观察范围**。粗略地讲，观察者可以观察的事件包括属性变化、文本变化和子节点变化。

![image-20211217184221462](https://s2.loli.net/2021/12/17/fKmqtzBPk59RIpi.png)

![image-20211217184247834](https://s2.loli.net/2021/12/17/yHfQOlozVSswarP.png)

![image-20211217184501674](https://s2.loli.net/2021/12/17/zqWHMn7VhjdsGkS.png)

1. **观察属性**

    1. MutationObserver 可以观察节点属性的添加、移除和修改。要为属性变化注册回调，需要在MutationObserverInit 对象中将 attributes 属性设置为 true  

        ```js
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        observer.observe(document.body, {
            attributes: true,
            attributeOldValue: true,
        });
        
        // 添加属性
        document.body.setAttribute("foo", "bar");
        
        // 修改属性
        document.body.setAttribute("foo", "baz");
        
        // 删除属性
        document.body.removeAttribute("foo");
        ```

        ![image-20211217185046893](https://s2.loli.net/2021/12/17/xEtuVbSeOh38UMD.png)

    2. 把 attributes 设置为 true 的默认行为是观察所有属性，但不会在 MutationRecord 对象中记录原来的属性值。如果想观察某个或某几个属性，可以使用 attributeFilter 属性来设置白名单，即一个属性名字符串数组：  

        ```js
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        observer.observe(document.body, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ["foo"],
        });
        
        // 添加属性
        document.body.setAttribute("foo", "bar");
        
        // 修改属性
        document.body.setAttribute("foo", "baz");
        
        // 删除属性
        document.body.removeAttribute("foo");
        
        // 添加被排除的属性
        document.body.setAttribute("baz", "qux");
        ```

        ![image-20211217185232714](https://s2.loli.net/2021/12/17/je5lmqorvYESsDt.png)

2. **观察字符数据**

    1. MutationObserver 可以观察文本节点（如 Text、 Comment 或 ProcessingInstruction 节点）中字符的添加、删除和修改。要为字符数据注册回调，需要在 MutationObserverInit 对象中将characterData 属性设置为 true，如下所示 :

        ```js
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        
        // 创建被观察的文本节点
        document.body.firstChild.textContent = "foo";
        
        observer.observe(document.body.firstChild, {
            characterData: true,
            characterDataOldValue: true,
        });
        
        // 赋值为相同的字符串
        document.body.firstChild.textContent = "foo";
        
        // 赋值为新字符串
        document.body.firstChild.textContent = "bar";
        
        // 通过节点设置函数赋值
        document.body.firstChild.textContent = "baz";
        ```

        ![image-20211217185703839](https://s2.loli.net/2021/12/17/y42XHdmqwaPYtJZ.png)

        **设置元素文本内容的标准方式是 textContent 属性。 Element 类也定义了 innerText 属性，与 textContent 类似。但 innerText 的定义不严谨，浏览器间的实现也存在兼容性问题，因此不建议再使用了。**  

    2. 

3. **观察子节点**

    1. MutationObserver 可以观察目标节点子节点的添加和移除。要观察子节点，需要在 MutationObserverInit 对象中将 childList 属性设置为 true。  

        ```js
        // 清空主体
        document.body.innerHTML = "";
        
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        
        observer.observe(document.body, { childList: true });
        
        // 添加主节点
        let div = document.createElement("div");
        document.body.appendChild(div);
        
        // 移除主节点
        document.body.removeChild(div);
        ```

        ![image-20211217191214648](https://s2.loli.net/2021/12/17/lPqefZFIENDaHk5.png)

    2. 对子节点重新排序（尽管调用一个方法即可实现）会报告两次变化事件，因为从技术上会涉及先移除和再添加：  

        ```js
        // 清空主体
        document.body.innerHTML = "";
        
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        
        observer.observe(document.body, { childList: true });
        
        // 创建两个初始子节点
        document.body.appendChild(document.createElement("div"));
        document.body.appendChild(document.createElement("span"));
        
        // 交换子节点顺序
        document.body.insertBefore(
            document.body.lastChild,
            document.body.firstChild
        );
        ```

        ![image-20211217191551863](https://s2.loli.net/2021/12/17/zKMsjY3Ntgv9Tur.png)

4. **观察子树**

    1. 默认情况下， MutationObserver 将观察的范围限定为一个元素及其子节点的变化。可以把观察的范围扩展到这个元素的子树（所有后代节点）， 这需要在 MutationObserverInit 对象中将 subtree属性设置为 true。  

        ```js
        document.body.innerHTML = "";
        
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        
        observer.observe(document.body, {
            attributeOldValue: true,
            subtree: true,
        });
        
        document.body.appendChild(document.createElement("div"));
        
        document.body.firstChild.setAttribute("foo", "bar");
        ```

        ![image-20211217192414626](https://s2.loli.net/2021/12/17/bgJd6t4HY1Bizok.png)

        

    2. 有意思的是，被观察子树中的节点被移出子树之后仍然能够触发变化事件。这意味着在子树中的节点离开该子树后，即使严格来讲该节点已经脱离了原来的子树，但它仍然会触发变化事件。

        ```js
        document.body.innerHTML = "";
        
        let observer = new MutationObserver((mutationRecords) => {
            console.log(mutationRecords);
        });
        
        let subTreeRoot = document.createElement("div"),
            subTreeLeaf = document.createElement("span");
        
        document.body.appendChild(subTreeRoot);
        subTreeRoot.appendChild(subTreeLeaf);
        
        // 观察子树
        observer.observe(subTreeRoot, {
            attributeOldValue: true,
            subtree: true,
        });
        
        // 把节点转移到其它子树
        document.body.insertBefore(subTreeLeaf, subTreeRoot);
        
        subTreeLeaf.setAttribute("foo", "bar");
        ```

          ![image-20211217212457956](https://s2.loli.net/2021/12/17/X19Jgf5LZot4n2O.png)


### 14.3.3 异步回调与记录队列

MutationObserver 接口是出于性能考虑而设计的，**其核心是异步回调与记录队列模型。为了在大量变化事件发生时不影响性能**，每次变化的信息（由观察者实例决定）会保存在 MutationRecord 实例中，然后添加到记录队列。这个队列对每个 MutationObserver 实例都是唯一的，是所有 DOM变化事件的有序列表。  

1. **记录队列**

    每次 MutationRecord 被添加到 MutationObserver 的记录队列时，仅当之前没有已排期的微任务回调时（队列中微任务长度为 0），才会将观察者注册的回调（在初始化 MutationObserver 时传入）**作为微任务调度**到任务队列上。这样可以保证记录队列的内容不会被回调处理两次。  

    不过在回调的微任务异步执行期间，有可能又会发生更多变化事件。因此被调用的回调会接收到一个 MutationRecord 实例的数组，顺序为它们进入记录队列的顺序。回调要负责处理这个数组的每一个实例，因为函数退出之后这些实现就不存在了。回调执行后，这些 MutationRecord 就用不着了，因此记录队列会被清空，其内容会被丢弃。  

2. **`takeRecords()` 方法**

    调用 MutationObserver 实例的 takeRecords()方法可以清空记录队列，取出并返回其中的所有 MutationRecord 实例。  

    ```js
    let observer = new MutationObserver((mutationRecorder) => {
        console.log(mutationRecorder);
    });
    observer.observe(document.body, { attributeOldValue: true });
    
    document.body.className = "foo";
    document.body.className = "bar";
    document.body.className = "baz";
    
    console.log(observer.takeRecords());
    console.log(observer.takeRecords());
    ```

    ![image-20211217223143690](https://s2.loli.net/2021/12/17/2KryVTaNwsPAiQZ.png)

### 14.3.4 性能、内存与垃圾回收

将变化回调委托给微任务来执行可以保证事件同步触发，同时避免随之而来的混乱。为 MutationObserver 而实现的记录队列，可以保证即使变化事件被爆发式地触发，也不会显著地拖慢浏览器。  

1. **MutationObserver 的引用**

    MutationObserver 实例与目标节点之间的引用关系是非对称的。 MutationObserver 拥有对要观察的目标节点的弱引用。因为是弱引用，所以不会妨碍垃圾回收程序回收目标节点。  

    然而，目标节点却拥有对 MutationObserver 的强引用。如果目标节点从 DOM 中被移除，随后被垃圾回收，则关联的 MutationObserver 也会被垃圾回收。  

2. **MutationRecord 的引用**

    记录队列中的每个 MutationRecord 实例至少包含对已有 DOM 节点的一个引用。如果变化是childList 类型，则会包含多个节点的引用。记录队列和回调处理的默认行为是耗尽这个队列，处理每个 MutationRecord，然后让它们超出作用域并被垃圾回收。  

    有时候可能需要保存某个观察者的完整变化记录。保存这些 MutationRecord 实例，也就会保存它们引用的节点，因而会妨碍这些节点被回收。如果需要尽快地释放内存，建议从每个 MutationRecord中抽取出最有用的信息，然后保存到一个新对象中，最后抛弃 MutationRecord。  