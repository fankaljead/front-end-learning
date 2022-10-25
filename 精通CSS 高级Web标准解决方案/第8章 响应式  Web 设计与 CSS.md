# 第8章 响应式  Web 设计与 CSS

针对手机和触屏分别设计独立的网站，造成 移动Web 和 桌面Web 的分野

## 8.1 一个例子

从 CSS 的角度来看，响应式 Web 设计最核心的一点，就是可以适配不同视口大小的流式布局。

### 8.1.1 简单上手

对于较窄的视口，例如手机屏幕，一个简单的布局通常就行。这个布局只有一列，按照内容的重要程度排列（也就是 HTML 源代码中的顺序），如下所示：

![窄屏幕下的单列布局](https://i.loli.net/2021/10/06/c2qGJUwX845HS1A.png)

第 7 章的实例代码则需要删除一部分。所有指定宽度的代码基本都得去掉，只保留行和列设置内、外边距的代码，同时，还有把列设置为浮动和 100% 宽度，以保证行可以包含浮动的子元素。

```css
.row {
    padding: 0;
    margin: 0 -.6875em
}

.row:after{
    content: '';
    display: block;
    clear: both;
}

.col {
    box-sizingz: border-box;
    padding: 0 .6875em 1.375em;
    float: left;
    width: 100%;
}
```

### 8.1.2 媒体查询

如果视口更宽一点，那就有可能在一屏之内显示更多内容。例如，可以让第二篇和第三篇报道各占容器的一半：

![在稍宽一些的屏幕下，重点报道下面的两则报道并列显示](https://i.loli.net/2021/10/05/p1YyNV6IzbqXlDB.png)

通过缩放窗口来确定在什么情况下并排展示两篇报道，我们发现合适的最小宽度是 560 像素或 35em。 

这里需要添加 **媒体查询** ，让其中的规则只在满足最小宽度条件时才触发：

```css
@media only sceen and (min-width: 35em) {
    .row-quartet > * {
        width: 50%;
    }
    .subcategory-featured {
        width: 100%;
    }
}
```

如果条件为真，就执行这些代码。媒体查询使用的 `@media` 和 `@support` 规则相似，都是 CSS 中的 `if` 语句，针对的是显示网页的环境的能力。在这个例子中，条件就是浏览器视口至少 35em 宽。而像这样引入媒体查询的 宽度值，就叫做 **断点** 。

注意，断点相关的规则与设备类型无关，无论是手机还是其他什么设备都可以。也就是说，对于这个断点，我们只需要关心在这么大的空间里该如何有效地展示内容就行。不建议基于特定的设备宽度来设置断点，因为新设备层出不穷。我们也不能通过更多的断点来区分 “移动 Web” 和 “桌面 Web” 。

### 8.1.3 加入更多断点

继续增大浏览器窗口，随着空间增大，我们可以找出更高效地利用空间的方式。在宽度约为 800像素（50em）的时候，可以并排放 4 篇报道。此时，让重点报道占总宽度的一半：

![image-20211005103221305](https://i.loli.net/2021/10/05/TpBP4HEfWaIsj6R.png)

此时的布局就有点类似刚开始的 “非相应式的” 例子，除了子分类的标签还在报道上方。

最后，我们发现在宽度约 70em 或 1120 像素时，可以把子分类标题放到一侧：

```css
@media only screen and (min-width: 70em) {
    .subcategory-header {
        width: 20%;
    }
    .subcategory-content {
        width: 80%;
    }
}
```

![image-20211005103444762](https://i.loli.net/2021/10/05/grnmqdM28zJlWX4.png)

到现在，我们就完成了这个例子的响应式版本。涵盖4种不同的布局。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>响应式新闻</title>
    <script src="js/modernizr.min.js"></script>

    <link rel="stylesheet" href="css/grid-base.css">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <style>
        .row {
            list-style: none;
            padding: 0;
            margin: 0 .6875em;
        }

        .row::after {
            content: '';
            display: block;
            clear: both;
        }

        .row-wrapping {
            font-size: 0;
            margin: 0 -11px;
            margin: 0 -.6875em;
        }

        .row-wrapping>.col {
            float: none;
            vertical-align: top;
            display: inline-block;
            font-size: 16px;
            font-size: 1em;
        }

        .col {
            box-sizing: border-box;
            padding: 0 .6875em 1.375em;
            float: left;
            width: 100%;
        }

        .flexwrap .row {
            display: flex;
            flex-wrap: wrap;
        }

        .flexwrap .col>* {
            flex: 1;
        }

        @media only screen and (min-width:35em) {
            .row-quartet>* {
                width: 50%;
            }

            .subcategory-featured {
                width: 100%;
            }
        }

        @media only screen and (min-width:50em) {
            .row-quartet>* {
                width: 25%;
            }

            .subcategory-featured {
                width: 50%;
            }
        }

        @media only screen and (min-width:70em) {
            .subcategory-header {
                width: 20%;
            }

            .subcategory-content {
                width: 80%;
            }
        }

        .col:last-child {
            float: right;
        }

        .subcategory {
            margin-top: 1.5em;
            border-bottom: 1px solid #8e3339;
        }

        .story {
            padding: .6875em;
            background-color: #eee;
        }

        .story+.story {
            margin-top: 1.375em;
        }

        .story img {
            width: 100%;
        }
    </style>
</head>

<body>
    <header class="masthead">
        <div class="wrapper">
            <h1>Important News</h1>

        </div>
    </header>

    <nav role="navigation" class="navbar">
        <div class="wrapper">
            <ul class="navlist">
                <li><a href="#">Home</a></li>
                <li><a href="#">World</a></li>
                <li><a href="#">Local</a></li>
                <li><a href="#">Sports</a></li>
            </ul>
        </div>
    </nav>
    <main class="wrapper">

        <section class="subcategory">
            <div class="row">
                <header class="col subcategory-header">
                    <h2>Lorem ipsum</h2>
                </header>
                <div class="col subcategory-content">
                    <div class="row row-quartet">
                        <div class="col subcategory-featured">
                            <article class="story">
                                <img src="http://placehold.it/600x300" alt="Dummy image">
                                <h3><a href="#">Cras suscipit nec leo id.</a></h3>
                                <p>Autem repudiandae aliquid tempora quos reprehenderit architecto, sequi repellat.</p>
                            </article>
                        </div>
                        <div class="col">
                            <article class="story">
                                <img src="http://placehold.it/600x300" alt="Dummy image">
                                <h3><a href="#">Perferendis, ipsam!</a></h3>
                                <p>Neque magnam vero obcaecati facere nobis sint dolore accusamus vitae consequuntur ad
                                    necessitatibus, laborum molestiae.</p>
                            </article>
                        </div>
                        <div class="col">
                            <article class="story">
                                <img src="http://placehold.it/600x300" alt="Dummy image">
                                <h3><a href="#">Curabitur mattis purus nec velit.</a></h3>
                                <p>Neque magnam vero obcaecati facere nobis sint dolore accusamus vitae consequuntur ad
                                    necessitatibus, laborum molestiae.</p>
                            </article>
                        </div>
                    </div>
                    <ul class="row row-quartet row-wrapping">
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Perferendis, ipsam! Dolor sit amet consectetur</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Aliquam mattis eros id posuere.</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Proin leo felis, semper nec</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Aliquam vitae risus tortor. Sed!</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Perferendis, ipsam!</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Aliquam mattis eros id posuere.</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Proin leo felis, semper nec</a></h3>
                            </div>
                        </li>
                        <li class="col">
                            <div class="story">
                                <h3><a href="#">Aliquam vitae risus tortor. Sed!</a></h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </main>
</body>

</html>
```

<blockquote class="imgur-embed-pub" lang="en" data-id="a/73NHe2y"  ><a href="//imgur.com/a/73NHe2y">响应式新闻布局例子</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

## 8.2 响应式 Web 设计的起源

Ethan Marcotte 在 2010 年在 “A List Apart” 网站上的文章 《[响应式 Web 设计](https://alistapart.com/article/responsive-web-desgisn)》提出 “响应式 Web 设计” 这一概念，描述综合了流动网格、弹性嵌入对象（图片或视频）及媒体查询适配，从而不受屏幕大小限制的布局模式。

**CSS 之外的响应性**

- **三明治菜单**

    通常在大屏幕上，全局菜单会扩展开来，而在小屏幕上，他们会隐藏到一个 “三明治” 按钮的后面

    ![image-20211005111148880](https://i.loli.net/2021/10/05/uiByoFfDO2bsvQN.png)

    这里一般会使用 JavaScript 根据视口大小来切换显示方式。但关键在于，原本的内容和 HTML 标记没有变化，与设备无关。这种 “核心体验” 可以通过编程方式进行任意切换。

    这里的模式是：先加载核心资源，之后再根据设备的能力决定是否加载更多资源。响应式 Web 设计也是渐进增强的一个例子。

- 掌握响应式 CSS 的第一步就是理解呈现网页的这块画布：视口。

## 8.3 浏览器视口

**视口** **就是浏览器显示网页的矩形区域**。这个区域对布局的影响，用 CSS 的话来说，就是 “有多少空间可用” 。要恰当地使用视口进行响应式设计，需要理解视口的原理，以及如何操作它。在桌面浏览器上，视口的概念很直观，就是通过 CSS 像素来合理利用视口中的空间。

CSS 像素跟屏幕的物理像素不是一回事。CSS 中说的像素与屏幕物理像素之间存在一种灵活的对应关系。这个关系取决于硬件、操作系统和浏览器，以及用户是非缩放了页面。

“虚拟的” CSS 像素与实际的硬件像素自己的比例系数，范围从1（1个 CSS 像素=1个单位物理像素）到 4（1个 CSS 像素=$4\times4$ 个物理像素）不等，视设备屏幕的分辨率不同而不同。

对于响应式布局，只需要关心 CSS像素；但是需要深入李继鹏视口的工作机制，方便二者协调。



### 8.3.1 视口定义的差别

1. **默认视口与理想视口**

    - **默认视口** 模拟一个大约 1000 像素宽的视口，然后在其中显示缩小后的页面
    - **理想视口** 与设备自身尺寸接近的视口，理想视口的大小因设备、操作系统和浏览器而已，但一般对手机而言，宽度大约在 300~500 CSS 像素之间；对于平板而言，宽度大约在 800~1400 CSS 像素之间

    在响应式设计中，这才是我们设计要用的视口，下图展示了经过优化和未经优化的同一个网格的样子：

    ![image-20211228154237643](https://s2.loli.net/2021/12/28/pltzNC6njuROSia.png)

    其中，**为移动设备优化的网站使用的是理想视口**，而未经优化的网站使用的是默认视口，其中显示的是缩小版的桌面网站。

    

2. **可见视口和布局视口**

    - **可见视口** 首先，**显示网页的这个矩形区域**，称为 “**可见视口**” 。 这个视口等于浏览器窗口减去所有按钮、工作条、滚动条等组件之后，实际包含网页内容的空间（也称为 “浏览器骨架 browser chrome”）.

    放大网页时，网页的某些部分会跑到可见视口之外：

    ![视口](https://i.loli.net/2021/10/05/tauzdjsEZpVUWRS.png)

    - **布局视口** 此时，我们看到的仍然是可见视口，而假想的那个约束 “整个页面” 的矩形区域，称为 “**布局视口**” 。可见视口与布局视口的工作机制在桌面浏览器和移动浏览器中是一样的。

    不过，对于响应式 Web 设计而言，我们只会基于每个设备的 “理想视口” 来适配页面。桌面浏览器不需要任何特殊对待，因为桌面浏览器的理想视口就是其默认视口。但在智能手机和平板电脑中，就需要拆解模拟的默认视口，令其等于理想视口。这需要通过 HTML 中的 `meta` 元素来做到。

### 8.3.2 配置视口

要让具有不同默认视口的设备都使用各自的理想视口，只要在页面的头部元素添加一个视口标签 `meta` 即可：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

1. 这行代码告诉浏览器，我们希望使用当前设备的理想尺寸（即 `device-width`）作为视口宽度的基准。

2. 同时设置了 `initial-scale=1` ，其作用是设置与理想视口匹配的缩放级别。这个配置可以避免 iOS 中的一些奇怪的缩放行为。虽然在多数设备中，只要设置缩放级别，就会把视口宽度默认设置为 `device-width` ，但为了确保跨设备和跨操作系统兼容，还是需要同时把这两项都设置上。

3. `initial-scale` 值大于 1 ，表示要放大布局，实际会导师布局视口缩小，因为能显示的像素反而减少了。相反，小于 1 的值会缩小布局，实际会导致布局视口中可容纳的 CSS 像素增多。

1. **其他可配置的值**

    - 这里也可以将 `width` 的值设置为具体的像素值，而不是 `device-width` 关键字，这样实际上将布局视口设置为指定的宽度。如果此时还设置了 `initial-width` 的值，那么移动浏览器会选择应用其中较大的
    - 可以通过在视口 `meta` 标签中设置 `maximum-scale, minimum-scale` 属性（为数值）锁定缩放范围。
    - 可以通过 `user-scalable=no` 完全禁止缩放

2. **设备适配及 CSS 的 `@viewport`**

    在 `<meta>` 标签中声明视口相关的配置使目前为止的推荐做法。但是，这也是一种非标准的机制。这个标签最初只是苹果在第一代 iPhone 中为 Safari 浏览器增加的一个 “开关” ，之后被其它移动浏览器照搬了。

    既然这种做法已经成为移动浏览器渲染网页的标准，那就有必要在 CSS 中引入相应的视口属性。确实有一个针对性的建议标准，叫 CSS Device Adaptation。这个建议主张不用 `meta` 标签，而是在网页头部使用下面这样的样式声明：

    ```html
    <style>
        @viewport {
            width: auto;
        }
    </style>
    ```

    这里有一个重要细节：把视口声明放到 HTML 的一个 `style` 元素里面，而不是放在实际的 CSS 文件中。这是因为浏览器必须在 CSS 加载完成前就知道视口大小。把这个声明放到 HTML 中，可以保证浏览器不多费事。



## 8.4 媒体类型与媒体查询

实现响应式设计：通过媒体查询让设计适配设备

### 8.4.1 媒体类型

依据设备能力来分离样式的能力，始于媒体类型。HTML 4.01 和 CSS 2.1 定义了媒体类型，用于针对特定的环境应用样式，包括屏幕显示、打印和电视等。

- 通过给 `link` 元素添加 `media` 属性，可以指定在那些设备上应用相关样式，例如：

```html
<link rel="stylesheet" href="main.css" media="screen, print" >
```

上面代码的意思是将相关的样式应用于（任意）屏幕显示和打印。如果不关心媒体类型，可以在这里使用 `all` 关键字，或者不写 `media` 属性。逗号分隔的有效类型关键字猎鸟，意味着只要其中一个匹配即可。如果一个都不匹配，则不引用该样式表。

- 除了在 HTML 中指定媒体类型，还可以在 CSS 中指定。最常见的方式就是使用 `@media` 语法，比如：

```css
@media prin {
    .smallprint {
        font-size: 11pt;
    }
}
```

除了 `screen` 和 `print` ，还有一些常用的媒体类型，**包括 `handhel` 和 `tv`** 。这两个貌似可以在响应式设计中使用，但其实不行。由于种种原因，浏览器开发商都不会明确给出某种设备所属的媒体类型，因此用得上的类型只剩下 `screen, print, all` 了。

### 8.4.2 媒体查询

因为不仅要指定设备类型，还要指定设备的能力，所以 CSS3 的 Media Queries 规范应运而生。这个规范扩展了媒体类型，而且语法也是媒体类型加（包括在括号中指定 **媒体特性** 的）**媒体条件** 。此外，在媒体选择语法中，也增加了新关键字，用于支持更复杂的逻辑。

在 `link` 元素中，媒体查询可以这样写：

```html
<link rel="stylesheet" href="main.css" media="screen and (min-width: 600px)" >
```

这样就声明了 `main.css` 应用于屏幕媒体，而且媒体条件是视口至少 600 CSS 像素宽。

>  **注意 在媒体查询并不匹配的情况下，很多浏览器仍然会下载 CSS 文件**。因此，不要过度使用带媒体查询的 `link` 标签，否则可能导致下载过多不必要的数据，影响性能。

同样的声明可以在 CSS 文件中通过 `@media` 规则写成如下格式：

```css
@media screen and (min-width: 600px) {
    
}
```

这里的 `and` 关键字负责把媒体类型与我们要测试的条件连接起来，因此可以同时测试多个条件：

```css
@media screen and (min-width: 600px) and (max-width: 1000px){
    
}
```

多个媒体查询可以写成一连串，用逗号分隔，逗号相当于 “或”。此时，大括号中的规则会在任意媒体查询结果为真时应用。如果所有媒体查询结果均为假，则跳过。

也可以完全忽略媒体类型，只保留括号中的媒体条件：

```css
@media (min-width: 300px) {
    
}

/* 相当于 */
@media all and (min-width: 300px) {
    
}
```

另外，使用 `not` 关键字可以对媒体查询取反。例如下面的媒体查询匹配除屏幕媒体之外的任何媒体：

```css
@media not screen {
    
}
```

还有一个 `only` 关键字，目的在于避免旧版本浏览器无解误解媒体查询。

正常情况下，不支持媒体查询的浏览器看到 `screen, and (min-width:...)` 时，会认为他是语法错误的媒体类型声明，从而忽略它。但是，有些旧版本的浏览器可能会在读取完 `screen`  时停下来，认为他是一个有效的媒体类型，然后为所有屏幕媒体应用样式。

为此，Media Queries 规范特意引入了 `only` 关键字，这样，当前面提到的旧版本浏览器看到 `only` 时，就会跳过整个 `@media` 块，因为媒体类型从未有过 `only` 这个关键字。所有支持媒体查询的浏览器必须忽略 `only` 关键字，仿佛他不存在。

为防止旧版本浏览器错误地应用样式，应该像下面这样声明只针对特定媒体类型的样式：

```css
@media only screen and (min-width: 30em) {
    
}
```

如果不关心媒体类型，可以简化为：

```css
@media (min-width: 30em) {
    
}
```

1. **尺度查询**

    在 `width` 和 `height` 中，`width` 以及 （`min-width, max-width`）是响应式 Web 设计的主打属性。

    宽度之所以如此重要，是因为我们创建网页的默认方式就是水平布局最多只能跟视口一样宽。而在垂直方向上，可以让内容自动扩展，用户可以垂直滚动页面。因此，知道什么时候有多少水平空间可用于布局是非常必要的。

2. **更多尺度：分辨率、宽高比和方向**

    虽然查询视口的尺寸占据了媒体查询的绝大多数，但还可以查询其他设备特性。比如，可以仅在设备宽度小于高度时，也就是方向改变时，改变布局：

    ```css
    @media(orientaion: portrait) {
        
    }
    ```

    类似的，也可以只在视口匹配最小宽高比时应用规则：

    ```css
    @media (min-aspect-ratio: 16/9) {
        
    }
    ```

    设备的像素比很多程度上并不重要。对 **布局** 来说，这是没问题的。后面使用 `min-resolution` 媒体查询来适配要加载的图片，这时像素比就很重要了。

    媒体查询很可能在未来被扩展，能够检测用户设备和环境的其他方面。

3. **浏览器对媒体查询的支持**

    **几乎** 所有的浏览器都已经支持了基本的媒体查询。可惜很多其他 “CSS 3” 特性，IE8 及更早版本的浏览器都不支持。

    因此，可以使用一些策略。对这些旧浏览器，要么提供一个固定宽度的布局，要么使用赋予脚本，也就是让这些浏览器假装支持新特性的脚本。



## 8.5 响应式设计与结构化 CSS

### 8.5.1 移动优先的 CSS

CSS 文件中的第一批规则，既针对最小的屏幕，也针对那些不支持媒体查询的浏览器。

- **基本的板式：** 大小、颜色、行高、标题、段落、列表、链接，等等
- **基本的 “盒子” ：** 特定的边框样式、内边距、弹性图片、背景颜色和一些背景图片
- **基本的跳转和浏览组件：** 导航、表单和按钮

接下来在移动设备和各种浏览器中测试，通过调节窗口大小，会发现这些样式在某个点上需要调整：行的长度变得过长，内容之间离得太远，等等。这是就可以考虑添加媒体查询了，这个点就叫 **断点** 。断点可以使用任何度量方式表达，但重点是让代码适应内容，而不是每个设备的像素尺寸。

```css
/* 开始时先写基本样式和小屏幕的样式 */
.myThing {
    font-size: 1em;
}

/* 然后在 min-width 媒体查询中调整 */
@media only screen and (min-width: 23.75em) {
    .myThing {
        width: 50%;
        float: left;
    }
}

/* 进一步调整 */
@media only screen and (min-width:38.75em) {
    .myThing {
        width: 33.333%;
    }
}
```

> **媒体查询与 `em` 单位** 在媒体查询中使用 em 单位可以进一步强化设计，使其更能使用变化的环境。使用 em 单位可以让布局在后一种情况下正常伸缩，因为 em 就是一文档的基准字号作为参考的。
>
> > **注意 在媒体查询中使用的 em 始终相对于浏览器偏好中的基准字号**，而不是可以通过 CSS 调整的 html 元素的字号（1rem）



- **最大宽度查询与小屏幕样式**

    以 `min-width` 查询作为主要工具，可以基于视口宽度渐进地应用调整。但是也不能忽略 `max-width` 查询。有时候我们可能会应用一些适合小屏幕，当不见得适合大屏幕的样式。此时如果使用 `min-width` ，就要先写出样式，再对选择条件取反。使用 `max-width` 查询可以省点事。

    比如，你可能希望在小屏幕中给标题应用窄一点的字体，从而避免过多折行：

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>8-10-使用最大和最小宽度媒体查询</title>
    
        <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700|Open+Sans:700,400' rel='stylesheet'
            type='text/css'>
        <style>
            body {
                font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.5;
            }
    
            @media only screen and (max-width: 37.5em) {
    
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: 'Open Sans Condensed', 'Arial Narrow', Arial, sans-serif;
                }
            }
        </style>
    </head>
    
    <body>
        <h1>This is a heading with a few words.</h1>
    
        <p>This is a paragraph with many many words. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            laboriosam esse distinctio tenetur ad sapiente aliquid quas consectetur eos provident, doloribus a, eum harum
            obcaecati, tempore iste iusto cumque porro?</p>
    
        <p>Another paragraph with many many words. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            laboriosam esse distinctio tenetur ad sapiente aliquid quas consectetur eos provident, doloribus a, eum harum
            obcaecati, tempore iste iusto cumque porro?</p>
    </body>
    
    </html>
    ```

    ![8-10-使用最大和最小宽度媒体查询](https://i.loli.net/2021/10/05/y1uC9qvS6xfI35n.gif)



### 8.5.2 媒体查询放在何处

上面中的样式表，前头是基本的 “不限定范围” 样式，后头是 `min-width` 查询，可以看做包含媒体查询的样式表的简单范例。

媒体查询也可用于不同的目的：调整细节或重排布局。通常这两类媒体查询的条件也不太一样，因此有必要区别对待。

样式表的结构并没有硬性规定。不过，把不同用途的媒体查询分门别类会比较清晰。

- 影响这个页面布局的媒体查询通常涉及一堆类名，这些类名代表的是网站的主要组件，另外会涵盖集中不同的屏幕尺寸。这类媒体查询一般建议放在与布局相关的规则附近
- 如果有调整网站组件中某些细节的媒体查询，可以把他们放在定义该组件样式的规则旁边
- 最后，如果出现了在相同断点下对布局的很多修改，以及对个别组件的小修小补，那么把他们同意放在样式表最后可能比较好。这样做体现了先通用后具体的设计模式

- 最重要的一点，媒体查询放在那里，并没有固定位置

> **警告** 媒体查询不会增加其选择符的特殊性，因此你的代码结构和顺序要确保他们不会在别处被覆盖。另外，把他们放在最后也不能保证他们可以覆盖前面的声明，他们仍然遵循正常的层叠机制



## 8.6 几种响应式设计模式

“移动优先” 的 CSS 编写方式体现了响应式设计的一种基本模式。除此之外，还有很多模式可以让设计更加灵活、适配性更强。

### 8.6.1 响应式文本列

第 4 章中的 CSS3 Multi-column Layout 规范是 CSS 中很早就以响应式设计为目标的一个规范。这个规范使用列宽而不是列数，让内容能够在容器中分布到尽可能多的列中：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>8-11-多列响应式文本</title>

    <style>
        body {
            font-family: Georgia, 'Times New Roman', Times, serif;
            line-height: 1.4em;
        }

        p {
            margin: 0 0 1.4em;
        }

        .multicol {
            column-width: 16em;
        }
    </style>
</head>

<body>
    <div class="multicol">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis iusto sint tenetur impedit aspernatur
            pariatur id minima explicabo quis vitae corrupti nisi, iure, voluptatibus obcaecati porro repellat mollitia
            officia suscipit!</p>

        <p>Unde repellat earum facere nam. Eligendi cupiditate sed fugiat accusantium, esse itaque rem eaque officia
            maxime, ex praesentium molestias, perspiciatis officiis fugit. Nemo quidem ex labore eum autem aspernatur,
            voluptatibus explicabo. Quisquam ipsum rerum ullam officia vel est, minus ducimus quos expedita magnam
            reprehenderit.</p>

        <p>Id magni totam animi velit laborum tempore deserunt, eveniet veritatis, tempora nostrum excepturi
            accusantium. Reprehenderit repellat error ullam, laudantium maxime. Excepturi, delectus.</p>
    </div>
</body>

</html>
```

![8-11-多列响应式文本](https://i.imgur.com/5vHGWGw.gif)

实现这个响应式文本列的 CSS 只有一行，用不着媒体查询：

```css
.multicol {
    column-width: 16em;
}
```

多栏文本在网页中应该尽量少用。这种模式的用武之地，就是文本内容本身不是特别长，无需让用户在很宽的屏幕上滚动很多的情况。此时，利用多列文本既可以避免声明过宽的容器，也可以有效利用水平空间。

### 8.6.2 没有媒体查询的响应式 Flexbox

Flexbox 也是 CSS 中具有某种响应式特质的规范。无需使用媒体查询，Flexbox 本身就可以创建出能够有效利用空间的适配布局。

假设要创建一个购物工具，通过它来为你的时光机购买零件，只要单击按钮就可以增加或减少购物车中的零件数量：

![image-20211005154303563](https://i.loli.net/2021/10/05/rmvTsViA1UYLjpB.png)

这个零件列表是无序列表，每一项都有如下结构：

```html
<ul class="ordering-widget">
    <li class="item">
        <span class="item-name">Flux capacitor regulator</span>
        <span class="item-controls">
            <button class="item-control item-increase" aria-label="Increase">+</button>
            <button class="item-control item-decrease" aria-label="Decrease">-</button>
        </span>
    </li>
    <li class="item">
        <span class="item-name">Multiverse unicorn wrench</span>
        <span class="item-controls">
            <button class="item-control item-increase" aria-label="Increase">+</button>
            <button class="item-control item-decrease" aria-label="Decrease">-</button>
        </span>
    </li>
    <li class="item">
        <span class="item-name">Singularity transmogrifier</span>
        <span class="item-controls">
            <button class="item-control item-increase" aria-label="Increase">+</button>
            <button class="item-control item-decrease" aria-label="Decrease">-</button>
        </span>
    </li>
    <li class="item">
        <span class="item-name">Time-reverse sensitive oil</span>
        <span class="item-controls">
            <button class="item-control item-increase" aria-label="Increase">+</button>
            <button class="item-control item-decrease" aria-label="Decrease">-</button>
        </span>
    </li>
</ul>
```

给名称和按钮应用灵活的尺寸，这样在整个组件在一行里放不下是，能够自动改变布局。首先，给列表应用一些重置样式，以及一些基本的排版规则：

```css
.ordering-widget {
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: 'Avenir Next', Avenir, SegoeUI, sans-serif;
}
```

然后把每一个列表转换为一个 Flexbox 行：

```css
.item {
    color: #fff;
    background-color: #129490;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5em;
    padding: 0;
    margin-bottom: .25em;
}
```

为容纳最长的零件名，每一项至少 13em 宽，而超出的空间可以自动填充：

```css
.item-name {
    padding: .25em;
    flex: 1 0 13em;
}
```

然后，包含两个按钮的 `span` 也应该自动填充可用空间，且最少为 4em 宽。同时他们也作为按钮的 Flexbox 容器：

```css
.item-controls {
    flex: 1 0 4em;
    display: flex;
}
```

每个按钮都转换成 Flex 项，占据相同宽度。其他样式主要用于调整按钮的默认样式：

```css
.item-control {
    flex: 1;
    text-align: center;
    padding: .25em;
    cursor: pointer;
    width: 100%;
    margin: 0;
    border: 0;
    color: #fff;
    font-size: inherit;
}
```

最后就是按钮本身的背景颜色：

```css
.item-increase {
    background-color: #1e6f6d;
}
.item-decrease {
    background-color: #1c5453;
}
```

![8-13-响应式购物界面](https://i.loli.net/2021/10/05/gxdQiERpVy4DK3r.gif)

- **容器相关的响应式组件**

    在前面的例子中，没有使用媒体查询，却也创建了一个响应式的组件，降低了 CSS 的复杂度。这种包装行为虽然简单，却是使用浮动或行内块无法实现的。

    另外，这种基于 Flexbox 的组件并不能根据视口大小而变化，只能基于包含他们的容器中的可用空间而变化。这通常正是我们想要实现的效果。

    媒体查询虽然是基于视口创建响应式布局的主打方式，但他们并没考虑特定组件出现在多个可能的位置，以及渲染为不同宽度的情况。换句话说，如果一个组件出现在很窄的侧栏中，我们希望它能匹配这种狭窄的方式来显示，而不是根据视口大小进行调整。在某种形式的 “容器查询” 出现之前，我们可以先是用 Flexbox。

### 8.6.3 响应式网格与网格模板区

Grid Layout 提供的属性可以把之前属性承担的布局任务转移到网格容器。下面这个模式是用了第 7 章介绍的命名模板区域语法，可以极大简化页面布局响应式的创建。

看看第 7 章新闻网站示例中的第二个子标题区，只需要修改几个地方，就可以把它变成响应式布局。不过先看看其 HTML 代码：

```html
<section class="subcategory">
    <div class="grid-b">
        <header class="subcategory-header">      
        </header>
        <article class="story"></article>
        <article class="story"></article>
        <div class="ad">
        </div>
        <div class="ad">
        </div>
    </div>
</section>
```

HTML 代码中包含这个区域的标题、两篇文章和两个广告。如果不引用任何布局样式（网格布局或其他布局样式），那么这几个块会垂直堆叠并填满页面。这在小视口中效果很不错：

![image-20211005161904828](https://i.loli.net/2021/10/05/6PNR3oEWJOVp5Ig.png)

代码中元素的顺序是按重要程度排列的，因此新闻报道在最前面，最后才是广告。如果广告销售团队担心广告都放在页面底部可能被忽略掉，希望在移动设备上把广告查到新闻中间呢？

这可以通过网格布局属性来实现。首先，给标题和新闻定义网格区域名称：

```css
.grid-b  .subcategory-header {
    grid-area: hd;
}

.grid-b .story:nth-of-type(1) {
    grid-area: st1;
}
.grid-b .story:nth-of-type(2) {
    grid-area: st1;
}
```

不用写媒体查询，只要定义网格容器以及其中的行的顺序就行了。这样，网格模板就能替我们摆好单列内容区中各个 项目的次序。现在广告跑到了未命名的区域（由一个点号表示），位于两篇报道之间：

```css
.grid-b {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "hd" "st1" "." "st2";
}
```

如果视口再宽一点，那就可以把新闻区改成 $2\times2$ 的网格，只要通过媒体查询添加一个新模块即可：

```css
@media only screen and (min-width: 37.5em) {
    .grid-b {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "hd hd "
            				"st1 ..."
            				"... st2";
    }
}
```

![在稍宽一些的视口中，新闻和广告交错排列](https://i.loli.net/2021/10/05/c5CzjZ3kysbRNK4.png)

我们可以使用任意数量连续的点表示匿名网格区域，从而让代码中的值上下对齐。

在更宽一些的视口中，标题还是在内容上方，但新闻和广告可以构成第 7 章的示例相同的布局：

```css
@media only screen and (min-width: 55em) {
    .grid-b {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: "hd hd hd "
            				"st1 .. st2"
            				"st1 .. st2";
    }
}
```

![标题在内容上方，新闻和广告构成了两行三列布局](C:\Users\72867\AppData\Roaming\Typora\typora-user-images\image-20211005162920601.png)

最后，再切换到侧边标题加三列布局：

```css
@media only screen and (min-width: 70em) {
    .grid-b {
        grid-template-columns: 20% 1fr 1fr 1fr;
        grid-template-areas: "hd st1 . st2"
            				"hd st1 . st2";
    }
}
```

![8-17-响应式新闻布局](https://i.loli.net/2021/10/05/u5cICfwh3iLeUzW.gif)



## 8.7 响应式布局之外

### 8.7.1 响应式背景图片

在 CSS 中，让背景图片适配屏幕大小很简单，因为可以使用媒体查询。

以第 5 章实例（猫咪社交网站）中的页面标题为例。这个标题必要性一个元素，暂时忽略其中内容，只关心应用背景图片。

```html
<header class="profile-box" role="banner"></header>
```

这里要使用两个图片文件来当背景。小图宽度为 600 像素，剪切为 1 个正方形。大图宽度为 1200 像素，剪切方式为矩形。

在小视口中使用小图的背景图片：

```css
.profile-box {
    position: relative;
    height: 300px;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url(img/small-cat.jpg);
}
```

而在视口变大时，背景图片会自动变大（因为设置了 `background-size: cover`），不过如果尺寸过大，图片就会模糊了。此时，就要切换到大图：

```css
@media only screen and (min-width: 600px) {
    .profile-box {
        height: 600px;
        background-image: url(img/big-cat.jpg);
    }
}
```

![8-18-背景图片媒体查询](https://i.imgur.com/sQAzrUO.gif)

上面简单的例子说明两点：

- 首先，可以使用媒体查询来应用最适合视口的图片
- 其次，不仅可以通过响应式加载不同大小的图片资源，还能基于视口对背景图片应用不同的剪切方式，产生根据艺术性的效果



- **使用分辨率查询切换图片**

    前面的例子中，我们基于视口的大小来改变图片。而有时候虽然视口大小相同，但我们希望能基于设备的像素比来加载不同分辨率的图片。对图片来讲，其实际像素需要与 CSS 像素对应起来。如果一张固定大小为 $400\times400$ 像素的图片，在高分辨率的屏幕上也显示为 $400\times400$ CSS 相似，就会导致图片会被放大，从而失真、模糊。此时为保持清晰，就许村根据分辨率查询来加载一张更大、分辨率更高的图片。

    假设我们想针对最小屏幕加载一张叫 medium-cat.jpg 的图片，条件时像素 比至少为 1.5。这个 medium-cat.jpg 也是正方形，不过大小为 $800 像素 \times 800 像素$ 。1.5 这个数多少有点拍脑袋决定的意思，但它可以保证在高分辨率手机和平板上加载更大的图片，这些设备的像素比最低都是 1.5。当然也可以再继续针对更高的分辨率添加更多的媒体查询（以及更多高分辨率图片），只要控制好图片的大小就好。

    基于像素比改变图片，需要测试的标准媒体特性为 `resolution` ，因此这里检测的是 `min-resolution` ，单位是 `dppx` （device-pixels per pixel 每像素的设备像素）。并非所有设备都支持这个标准的查询，因此这里还添加了一个 `-webkit-mindevice-pixel-ratio` ，主要针对 Safari。它只有值，没有单位。

    ```css
    @media (-webkit-mindevice-pixel-ratio: 1.5),
        (min-resolution: 1.5) {
            .profile-box {
                background-image: url(medium-cat.jpg);
            }
    }
    ```

    > **老式分辨率查询语法** 
    >
    > - 最早的 Firefox 中使用的 `min--moz-device-pixel-ratio` 以及使用 `dpi` 为单位的 `min-resolution`

### 8.7.2 响应式嵌入媒体

恰当处理内容图片、视频以及其他嵌入对象的可伸缩性，是响应式 Web 设计的难道之一。对于 CSS 背景图片，可以用媒体查询实现很多控制。但对于嵌入页面中的对象，CSS 有时候会显得力不从心。

1. **响应式媒体基础**

    通过设置 `max-width` 属性为 100% 让元素变得可以伸缩，同时又不会超过其固有大小：

    ```css
    img, object, video, embed {
        width: auto;
        max-width: 100%;
        height: auto;
    }
    ```

    这几行代码虽然简单，但能保证固定宽度的元素不会混入响应式设计。不过，不同的使用场景可能需要不同的方法来控制大小。

2. **响应式图片如 `srcset` 属性**

    浏览器会对网页进行 **预处理** ，图片等资源会在浏览器构建完成整个页面或运行 JavaScript 之前就开始下载。这意味着不可能仅凭脚本就完美解决图片的响应式问题。

    `srcset` 及其对应的 `sizes` 属性，是对 `img` 元素最简单的扩展。通过他们可以设置与图片相关的不同选项。

    - 哪个是当前图片可替换的源文件，其宽度是多少像素 ？
    - 在各个断点中，他们的 CSS 宽度是多少 ？

    通过在 HTML 而非 CSS 中指定这个信息，浏览器的预解析器就能迅速决定下载哪个图片。

    对于新闻页面中的专题报道而言，我们可以让默认分辨率或不支持的浏览器加载 $600像素\times600像素$ 的图片，而在像素比高的时候加载两倍大图片：

    ```html
    <img src="img/600x300.png" srcset="img/1200x600.png 1.5x" alt="Dummy image">
    ```

    ![image-20211006113624809](https://i.loli.net/2021/10/06/yoTNdFg6xOrzq5G.png)

    根据分辨率只能切换图片，不能控制图片显示的尺寸。为此，可以添加 `sizes` 属性，声明显示宽度，而不是检测像素比。

    这时候， `srcset` 语法又会出现变化。如果同一张图片有不同大小的版本（300x300像素到 1200x600像素不等），每个版本对应一个源文件，那么就要指定媒体查询加宽度。要精确表达宽度，可以使用从 CSS 中借鉴过来的视口相关的单位及 `calc()` 函数：

    ```html
    <img src="img/xsmall.png"
         srcset="img/xsmall.png 300w,
                 img/small.png 400w,
                 img/medium.png 600w,
                 img/large.png 800w,
                 img/xlarge.png 1200w
                 "
         sizes="(min-width: 70em) 12.6875em,
                (min-width: 50em) calc(25vw * 0.95 - 2.75em),
                (min-width: 35em) calc(95vw / 2 - 4.125em),
                calc(95vw - 1.375em)"
         alt="Dummy image" />
    ```

    上面除了常规的 `src` 和 `alt` 属性，还有一个 `srcset` 属性。他的值是一组图片 URL 加一个实际宽度（不是 CSS 像素）。这个宽度值后面加 `w` 字母的语法加 **宽度描述符** 。

    ```css
    srcset="img/xsmall.png 300w,
            img/small.png 400w,
            img/medium.png 600w,
            img/large.png 800w,
            img/xlarge.png 1200w
            "
    ```

    接下来要告诉浏览器怎么使用这些图片。只需要在 `sizes` 中对应给出一组宽度值即可，每个值开头可以加上（或不加）媒体条件，就像在 CSS 媒体查询中一样。注意，这里的媒体条件表达式不是 CSS 表达式，不会遵循层叠机制，即后面声明的不会覆盖先声明的。相反，他的顺序是从前往后，找到匹配就退出，所以这里先声明最宽的媒体条件。最后一个宽度不需要条件，只是作为匹配最小屏幕之后兜底的值。

    ```css
    sizes="(min-width: 70em) 12.6875em,
        (min-width: 50em) calc(25vw * 0.95 - 2.75em),
        (min-width: 35em) calc(95vw / 2 - 4.125em),
        calc(95vw - 1.375em)"
    ```

    媒体条件后面的宽度是根据图片在不同断点下的大致宽度而估算的。这是对响应式图片的折中利用，实际上是在 HTML 中声明了一些 CSS 样式规则。这里不能用百分比值，因为百分比值是基于 CSS 样式计算的。不过，可以使用视口相关单位，例如 `vw` 和 `em` 。这里的 `em` 对应浏览器默认的文本大小，与媒体查询中一样。

    > **注意**  `vw` 是视口相关的单位，1 表示视口单位的 1% 

    最后，浏览器决定，当前视口大小下哪个图片文件最合适，就下载哪一个。

    

3. **`picture` 元素**

    除了在多个不同分辨率的图片间切换，还有几个很重要的响应式图片应用场景

    - 响应式图片在小屏幕和大屏幕上分别需要不同的裁切方式
    - 根据浏览器的支持情况加载不同格式的图片

    上面问题的标准解决方案是 `picture` 元素，他作为 `img` 元素的容器，同时扩展了 `scrset` 和 `sizes` 属性的能力

    比如，可以利用 `srcset` 给响应式新闻页面添加 WebP 图片：

    ```html
    <picture>
        <source type="image/webp"
         srcset="img/xsmall.webp 300w,
                 img/small.webp 400w,
                 img/medium.webp 600w,
                 img/large.webp 800w,
                 img/xlarge.webp 1200w
                 "
         sizes="(min-width: 70em) 12.6875em,
                (min-width: 50em) calc(25vw * 0.95 - 2.75em),
                (min-width: 35em) calc(95vw / 2 - 4.125em),
                calc(95vw - 1.375em)"
         alt="Dummy image" />
    	<img src="img/xsmall.png"
         srcset="img/xsmall.png 300w,
                 img/small.png 400w,
                 img/medium.png 600w,
                 img/large.png 800w,
                 img/xlarge.png 1200w
                 "
         sizes="(min-width: 70em) 12.6875em,
                (min-width: 50em) calc(25vw * 0.95 - 2.75em),
                (min-width: 35em) calc(95vw / 2 - 4.125em),
                calc(95vw - 1.375em)"
         alt="Dummy image" />
    </picture>
    ```

    `<img>` 标签及其属性没有变。区别在于增加了一个 `<picture>` 容器和一个 `<source>` 标签，后者与 `<img>` 很相似

    - 首先， `picture` 元素中仍然要有 `img` ；`picture` 与 `source` 元素的作用是选择哪个图片作为 `img` 的最终源文件。此外，`img` 也是不支持 `picture` 的浏览器的后备。

    - `img` 元素上仍然有 `srcset` 和 `sizes` 属性，浏览器在碰到包含 `img` 的 `picture` 元素时，会尝试寻找 `source` 元素，并从中选出匹配的源文件，让 `img` 现实。`source` 元素也可以有多个

    - 这里 `source` 元素的 `type` 属性值为 `image/webp` ，如果浏览器支持该格式，就会从中挑选匹配的图片

    - 然后，`source` 元素与 `img` 元素拥有相同的 `srcset` 和 `sizes` 属性，只是 `srcset` 中给出的都是 WebP 文件

    - 如果浏览器匹配到一个文件，那么该文件就会作为 `img` 元素的源文件。如果 `source` 元素中没有匹配的元素，浏览器最终还是会回到 `img` 元素，检查他的属性

    - 而 `img` 元素的 `src` 属性则是前面没有找到任何匹配文件（或浏览器不支持前面的图片语法）的情况下的兜底属性

    - 如果我们想对文件来源拥有更多控制，也可以在 `source` 元素上使用 `media` 属性，在其中包含媒体查询：

        ```html
        <picture>
        	<source media="(min-width: 70em) and (min-resolution: 3dppx)" srcset="..." />
            <img src="..." alt="..." />
        </picture>
        ```

        

4. **浏览器支持与 Picturefill**

    `srcset` 和 `sizes` 方案的后备是，他们会在不支持的浏览器时回退到 `img` 元素

    考虑到响应式图片可能会对性能产生较大影响，可以考虑使用赋予脚本

    Picturefill 是一个官方的 JavaScript 赋予脚本



### 8.7.3 响应式排版

布局对响应式设计非常重要，实际上，在考虑兼容所有设备的前提下，排版与布局是同等重要的

1. **设备不同，大小不同**

    在大屏幕上阅读，一般每行 45~70 个字符比较舒服。而在手机上阅读，如果每行的字符达到 70 个，字就看不太清楚了。这就意味着在小屏幕上，需要让每行字符数在 35-45 个。

    随着每行字符数的减少，行高通常也可以减小。比如，台式机显示器上的行高如果为 1.5，那么移动设备上的行高差不多可以是 1.3

    屏幕大小不同，排版的基准尺寸也要相应调整。一种简单办法是，与屏幕保持适当距离

2. **使用弹性字体大小**

    `em` 、`rem` 及视口单位 `vw, vh, vmin, vmax` 等相对长度的字体大小很适合不同屏幕间的适配

3. **设置基准字体大小**

    几乎每个浏览器的用户用户都会设置一个 16 像素的基准字体大小。要想修改这个值，只要重新在 html 元素上设置 `font-size` 属性即可。基于 `em` 单位的媒体查询，就是以这个由 **浏览器** 设置的基准大小为参考值得。为保证 CSS 中的一致性，应该在 `body` 元素上重新设置这个基准大小

    重新设置对小屏幕友好的基准大小，可以贯彻 “移动优先” 的策略，之后，就可以参照这个基准来设置其他不同性质文本的大小

    可伸缩的基准大小便于我们通过媒体查询来放大和缩小字号（以及 `margin, line-height, padding` 等相对基准大小）

4. **视口相关的单位**

    `em` 和 `rem` 单位可以伸缩，因为他们不表示具体的像素大小。下一步是让字体大小适配视口大小，此时要用视口相关的单位。在视口单位中，1 表示 1%，指占视口宽度或高度的百分比：

    - `vw` 表示视口宽度
    - `vh` 表示视口高度
    - `vmin` 表示宽度和高度中较小的
    - `vmax` 表示宽度和高度中较大的

    例如：

    ```css
    p {
        font-size: 5vw;
    }
    ```

    这里的 `5vw` 就表示，如果视口宽度是 400 像素，那么采用以上设置的段落文本大小就是视口宽度 1% 的 5 倍。这里 1% 等于 4 像素，而 $4\times5=20$ 像素

    ![视口单位](https://i.loli.net/2021/10/06/sJfcGQiK7HkamEw.gif)

5. **测试与调整**

    响应式排版是板式设计的xb [xin]
