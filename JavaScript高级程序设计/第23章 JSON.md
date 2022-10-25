# 第23章 JSON

## 23.1 语法

JSON 语法支持表示 3 种类型的值。  

- **简单值**  字符串、数值、布尔值和 null 可以在 JSON 中出现，就像在 JavaScript 中一样。**特殊值 undefined 不可以**  
- **对象** 第一种复杂数据类型，对象表示有序键/值对。每个值可以是简单值，也可以是复杂类型  
- **数组** 第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表。数组的值可以是任意类型，包括简单值、对象，甚至其他数组  

JSON 没有变量、函数或对象实例的概念。 JSON 的所有记号都只为表示结构化数据，虽然它借用了JavaScript 的语法，但是千万不要把它跟 JavaScript 语言混淆  

### 23.1.1 简单值

最简单的 JSON 可以是一个数值。例如，下面这个数值是有效的 JSON：  

```json
5
```

JavaScript 字符串与 JSON 字符串的主要区别是， **JSON 字符串必须使用双引号**（单引号会导致语法错误）。  

布尔值和 null 本身也是有效的 JSON 值。不过，实践中更多使用 JSON 表示比较复杂的数据结构，其中会包含简单值。  

### 23.1.2 对象

布尔值和 null 本身也是有效的 JSON 值。不过，实践中更多使用 JSON 表示比较复杂的数据结构，其中会包含简单值。  **JSON 中的对象必须使用双引号把属性名包围起来**  

```json
{
    "name": "Nicholas",
    "age": 29
}
```

与 JavaScript 对象字面量相比， JSON 主要有两处不同。首先，没有变量声明（ JSON 中没有变量）。其次，最后没有分号（不需要，因为不是 JavaScript 语句）。同样，用引号将属性名包围起来才是有效的JSON。属性的值可以是简单值或复杂数据类型值，后者可以在对象中再嵌入对象，  

### 23.1.3 数组

数组在 JSON 中使用 JavaScript 的数组字面量形式表示。例如，以下是一个 JavaScript 数组：  

```json
[25, "hi", true]
```

同样，这里没有变量，也没有分号。数组和对象可以组合使用，以表示更加复杂的数据结构  

```json
[
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas",
            "Matt Frisbie"
        ],
        "edition": 4,
        "year": 2017
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        "edition": 3,
        "year": 2011
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        "edition": 2,
        "year": 2009
    },
    {
        "title": "Professional Ajax",
        "authors": [
            "Nicholas C. Zakas",
            "Jeremy McPeak",
            "Joe Fawcett"
        ],
        "edition": 2,
        "year": 2008
    },
    {
        "title": "Professional Ajax",
        "authors": [
            "Nicholas C. Zakas",
            "Jeremy McPeak",
            "Joe Fawcett"
        ],
        "edition": 1,
        "year": 2007
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        "edition": 1,
        "year": 2006
    }
]
```

## 23.2 解析与序列化

JSON 的迅速流行并不仅仅因为其语法与 JavaScript 类似，很大程度上还因为 JSON 可以直接被解析成可用的 JavaScript 对象。与解析为 DOM 文档的 XML 相比，这个优势非常明显。为此， JavaScript 开发者可以非常方便地使用 JSON 数据。  

### 23.2.1 JSON 对象

早期的 JSON 解析器基本上就相当于 JavaScript 的 eval()函数。因为 JSON 是 JavaScript 语法的子集，所以 eval()可以解析、解释，并将其作为 JavaScript 对象和数组返回。 ECMAScript 5 增加了 JSON全局对象，正式引入解析 JSON 的能力。这个对象在所有主流浏览器中都得到了支持。旧版本的浏览器可以使用垫片脚本（参见 GitHub 上 douglascrockford/JSON-js 中的 JSON in JavaScript）。考虑到直接执行代码的风险，最好不要在旧版本浏览器中只使用 eval()求值 JSON。这个 JSON 垫片脚本最好只在浏览器原生不支持 JSON 解析时使用。  

JSON 对象有两个方法： stringify()和 parse()。在简单的情况下，这两个方法分别可以将JavaScript 序列化为 JSON 字符串，以及将 JSON 解析为原生 JavaScript 值。  

```javascript
// JSON 对象
let book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book);
```

默认情况下， JSON.stringify()会输出不包含空格或缩进的 JSON 字符串，因此  jsonText 的值是这样的：  

```json
{"title":"Professional JavaScript","authors":["Nicholas C. Zakas","Matt Frisbie"],"edition":4,"year":2017}
```

在序列化 JavaScript 对象时，所有函数和原型成员都会有意地在结果中省略。此外， 值为 undefined的任何属性也会被跳过。最终得到的就是所有实例属性均为有效 JSON 数据类型的表示。  

JSON 字符串可以直接传给 JSON.parse()，然后得到相应的 JavaScript 值。比如，可以使用以下代码创建与 book 对象类似的新对象：  

```javascript
let  bookCopy = JSON.parse(jsonText);
```

注意， book 和 bookCopy 是两个完全不同的对象，没有任何关系。但是它们拥有相同的属性和值。
如果给 JSON.parse()传入的 JSON 字符串无效，则会导致抛出错误。  

### 23.2.2 序列化选项

实际上， JSON.stringify()方法除了要序列化的对象，还可以接收两个参数。这两个参数可以用于指定其他序列化 JavaScript 对象的方式。

- **第一个参数是过滤器，可以是数组或函数；**
- **第二个参数是用于缩进结果 JSON 字符串的选项。单独或组合使用这些参数可以更好地控制 JSON 序列化。**  

1. **过滤结果**

   如果第二个参数是一个数组，那么 `JSON.stringify()` 返回的结果只会包含该数组中列出的对象属性。  

   ```javascript
   let book = {
       title: "Professional JavaScript",
       authors: [
           "Nicholas C. Zakas",
           "Matt Frisbie"
       ],
       edition: 4,
       year: 2017
   };
   let jsonText = JSON.stringify(book, ["title", "edition"]);
   console.log(jsonText);
   ```

   ![image-20210905111552409](https://i.loli.net/2021/09/05/qCeG5ugKP6aV3md.png)

   如果第二个参数是一个函数，则行为又有不同。提供的函数接收两个参数：属性名（ key）和属性值（ value）。可以根据这个 key 决定要对相应属性执行什么操作。这个 key 始终是字符串，只是在值不属于某个键/值对时会是空字符串。  

   为了改变对象的序列化，返回的值就是相应 key 应该包含的结果。注意，返回 undefined 会导致属性被忽略。  

   ```javascript
   let book = {
       title: "Professional JavaScript",
       authors: [
           "Nicholas C. Zakas",
           "Matt Frisbie"
       ],
       edition: 4,
       year: 2017
   };
   let jsonText = JSON.stringify(book, (key, value) => {
       switch (key) {
           case "authors":
               return value.join(",")
           case "year":
               return 5000;
           case "edition":
               return undefined;
           default:
               return value;
       }
   });
   console.log(jsonText);
   ```

   ![image-20210905111843339](https://i.loli.net/2021/09/05/WkhHsBepVzmUiOl.png)

   注意，函数过滤器会应用到要序列化的对象所包含的所有对象，因此如果数组中包含多个具有这些属性的对象，则序列化之后每个对象都只会剩下上面这些属性  

2. **字符串缩进**

   JSON.stringify()方法的第三个参数控制缩进和空格。在这个参数是数值时，表示每一级缩进的空格数。  

   ```javascript
   let book = {
       title: "Professional JavaScript",
       authors: [
           "Nicholas C. Zakas",
           "Matt Frisbie"
       ],
       edition: 4,
       year: 2017
   };
   let jsonText = JSON.stringify(book, (key, value) => {
       switch (key) {
           case "authors":
               return value.join(",")
           case "year":
               return 5000;
           case "edition":
               return undefined;
           default:
               return value;
       }
   }, 4);
   console.log(jsonText);
   ```

   ![image-20210905121836375](https://i.loli.net/2021/09/05/tucgzCDdn7bO8Vk.png)

3. **`toJSON()` 方法**

   有时候，对象需要在 JSON.stringify()之上自定义 JSON 序列化。此时，可以在要序列化的对象中添加 toJSON()方法，序列化时会基于这个方法返回适当的 JSON 表示。事实上，原生 Date 对象就有一个 toJSON()方法，能够自动将 JavaScript 的 Date 对象转换为 ISO 8601 日期字符串（本质上与在Date 对象上调用 toISOString()方法一样）。  

   toJSON()方法可以与过滤函数一起使用，因此理解不同序列化流程的顺序非常重要。在把对象传给 JSON.stringify()时会执行如下步骤。  

   1. 如果可以获取实际的值，则调用 toJSON()方法获取实际的值，否则使用默认的序列化  
   2. 如果提供了第二个参数，则应用过滤。传入过滤函数的值就是第(1)步返回的值  
   3. 第(2)步返回的每个值都会相应地进行序列化  
   4. 如果提供了第三个参数，则相应地进行缩进  



### 23.2.3 解析选项

JSON.parse()方法也可以接收一个额外的参数，这个函数会针对每个键/值对都调用一次。为区别于传给 JSON.stringify()的起过滤作用的**替代函数（ replacer）**，这个函数被称为**还原函数（ reviver）**。实际上它们的格式完全一样，即还原函数也接收两个参数，属性名（ key）和属性值（ value），另外也需要返回值。  