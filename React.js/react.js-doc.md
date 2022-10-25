# React.js

**React** 是一个用于构建用户界面的 JavaScript 库

## 1. 核心概念

### 1.1 Hello World

- 引入 React CDN 

```jsx
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```

- 把自己的 `<script>` 标签 `type` 属性设置为 `text/babel`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Hello World</title>
</head>

<body>

    <div id="root"></div>


    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <script type="text/babel">
        ReactDOM.render(
            <h1>Hello World</h1>,
            document.getElementById('root')
        );
    </script>
</body>

</html>
```

![image-20211013105836106](https://i.loli.net/2021/10/13/LNumHzRYs28ijx1.png)

### 1.2 JSX 简介

**JSX** 是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能。

JSX 可以生成 React “元素”

- 使用 JSX 的原因

    React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

    React 并没有采用将*标记与逻辑进行分离到不同文件*这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现[*关注点分离*](https://en.wikipedia.org/wiki/Separation_of_concerns)。

    React [不强制要求](https://zh-hans.reactjs.org/docs/react-without-jsx.html)使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息

- 在 JSX 中嵌入表达式，使用 `{varable_name}` 语法

    ```jsx
    const name = "Zhou Xianghui";
    const element = <h1>Hello {name}</h1>;
    ReactDOM.render(
        <h1>Hello World</h1>,
        document.getElementById('root')
    );
    ```

    - 在 JSX 中，可以在 `{}` 中放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) 。例如

        - `2+2`
        - `user.name`
        - `formatName(user)`

        ```jsx
        function formatName(user) {
            return user.firstName + ' ' + user.lastName;
        }
        const user = {
            firstName: "Xianghui",
            lastName: "Zhou"
        };
        const element = (
            <h1>
                Hello, {formatName(user)}
            </h1>
        );
        ReactDOM.render(
            <h1>Hello World</h1>,
            document.getElementById('root')
        );
        ```

        ![image-20211013110753594](https://i.loli.net/2021/10/13/dv6mUkM32oZKF9Q.png)

        **为了便于阅读，可以把 JSX 拆分成多行，建议把内容包裹在括号中**

- JSX 本身也是一个表达式

    在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

    也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

    ```jsx
    function getGreeting(user) {
        if (user) {
            return <h1>Hello, {formatName(user)}!</h1>;
        } else {
            return <h1>Hello, Stranger.</h1>;
        }
    }
    ```

- JSX 中指定属性

    - 可以通过大括号，来将属性值指定为字符串字面量

        ```jsx
        const element = <div tabIndex="0"></div>;
        ```
        
    - 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式
    
        ```jsx
        const element = <img src={user.avatarUrl}></img>
        ```
    
        在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。
    
    > **警告**
    >
    > 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
    >
    > 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。

- 使用 JSX 指定子元素

    - 假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

        ```jsx
        const element = <img src={user.avatarUrl} />;
        ```

    - JSX 标签里能够包含很多子元素:

        ```jsx
        const element = (
          <div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
          </div>
        );
        ```

- JSX 防止注入攻击

    以安全地在 JSX 当中插入用户输入内容：

    ```jsx
    const title = response.potentiallyMaliciousInput;
    // 直接使用是安全的：
    const element = <h1>{title}</h1>;
    ```

    React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

- JSX 表示对象

    Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用

    以下两种示例代码完全等效：

    ```jsx
    const element = (
      <h1 className="greeting">
        Hello, world!
      </h1>
    );
    ```

    ```jsx
    const element = React.createElement(
      'h1',
      {className: 'greeting'},
      'Hello, world!'
    );
    ```

    `React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

    ```jsx
    // 注意：这是简化过的结构
    const element = {
      type: 'h1',
      props: {
        className: 'greeting',
        children: 'Hello, world!'
      }
    };
    ```

    这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新

### 1.3 元素渲染

**元素是构成 React  应用的最小砖块**

元素描述了在屏幕上看到的内容：

```jsx
const element = <h1>Hello, world</h1>;
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

> **注意**
>
> 你可能会将元素与另一个被熟知的概念——“组件”混淆起来。我们会在[下一个章节](https://zh-hans.reactjs.org/docs/components-and-props.html)介绍组件。组件是由元素构成的。

- **将一个元素渲染为 Dom **

    假设你的 HTML 文件某处有一个 `<div>`：

    ```html
    <div id="root"></div>
    ```

    我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

    仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

    想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render)：

    ```jsx
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
    ```

- **更新已渲染的元素**

    React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

    根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render)。

    考虑一个计时器的例子：

    ```jsx
    function tick() {
        const element = (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}</h2>
            </div>
        );
        ReactDOM.render(element, document.getElementById("root"));
    }
    setInterval(tick, 1000);
    ```

    ![计时器的例子](https://i.loli.net/2021/10/13/kzWeRFv3w1Acuo7.gif)

    这个例子会在 [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) 回调函数，每秒都调用 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render)。

    > **注意**
    >
    > 在实践中，大多数 React 应用只会调用一次 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render)

- **React 只更新他需要更新的部分**

    React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

    例如计时器例子中：

    ![计时器的例子2](https://i.loli.net/2021/10/13/rXG9PQYRlvcJh8p.gif)

    尽管每一秒我们都会新建一个描述整个 UI 树的元素，React DOM 只会更新实际改变了的内容，也就是例子中的文本节点。

    根据我们的经验，应该专注于 UI 在任意给定时刻的状态，而不是一视同仁地随着时间修改整个界面。

### 1.4 组件 & Props

**组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思 [详细组件 API](https://zh-hans.reactjs.org/docs/react-component.html)**

**组件**，**从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。**

- **函数组件与 `class` 组件**

    定义组件最简单的方式就是编写 JavaScript 函数：

    ```jsx
    function WelcomeF(props) {
        return <h1>Hello, {props.name} from WelcomeF</h1>;
    }
    ```

    该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

    还可以使用 [ES6 的 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 来定义组件：

    ```jsx
    class WelcomeC extends React.Component {
        render() {
            return <h1>Hello, {this.props.name} from WelcomeC</h1>
        }
    }
    ```

    上述两个组件在 React 里是等效的。

    ```jsx
    ReactDOM.render(
        <div>
            <WelcomeC name="ZhouXianghui" />
            <WelcomeF name="周翔辉" />
        </div>,
        document.getElementById("root")
    );
    ```

    ![image-20211013115650690](https://i.loli.net/2021/10/13/wJ43I25MsueZjWS.png)

- **渲染组件**

    之前，我们遇到的 React 元素都只是 DOM 标签：

    ```jsx
    const element = <div />;
    ```

    不过，React 元素也可以是用户自定义的组件：

    ```jsx
    const element = <Welcome name="Sara" />;
    ```

    当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

    例如，这段代码会在页面上渲染 “Hello, Sara”：

    ```jsx
    function Welcome(props) {  return <h1>Hello, {props.name}</h1>;
    }
    
    const element = <Welcome name="Sara" />;ReactDOM.render(
      element,
      document.getElementById('root')
    );
    ```

    让我们来回顾一下这个例子中发生了什么：

    1. 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。
    2. React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。
    3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
    4. React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

    > **注意**
    >
    > **React 会将以小写字母开头的组件视为原生 DOM 标签**。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。
    >
    > [深入 JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) 

- **组合组件**

    组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

    例如，我们可以创建一个可以多次渲染 `Welcome` 组件的 `App` 组件：

    ```jsx
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }
    
    function App() {
        return (
            <div>
                <Welcome name="Sara" />
                <Welcome name="Cahal" />
                <Welcome name="Edite" />
            </div>
        );
    }
    
    ReactDOM.render(<App />, document.getElementById("root"));
    ```

    ![image-20211013120127337](https://i.loli.net/2021/10/13/zxaUpILsdbTc24O.png)

    通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 `Button` 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

- **提取组件**

    将组件拆分为更小的组件。

    例如，参考如下 `Comment` 组件：

    ```jsx
    function Comment(props) {
        return (
            <div className="Comment">
                <div className="UserInfo">
                    <img
                        className="Avatar"
                        src={props.author.avatarUrl}
                        alt={props.author.name}
                        />
                    <div className="UserInfo-name">{props.author.name}</div>
                </div>
                <div className="Comment-text">{props.text}</div>
                <div className="Comment-date">{formatDate(props.date)}</div>
            </div>
        );
    }
    ```

    该组件用于描述一个社交媒体网站上的评论功能，它接收 `author`（对象），`text` （字符串）以及 `date`（日期）作为 props。

    该组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来。

    首先，我们将提取 `Avatar` 组件：

    ```jsx
    function Avatar(props) {
        return (
            <img
                className="Avatar"
                src={props.user.avatarUrl}
                alt={props.user.name}
                />
        );
    }
    ```

    `Avatar` 不需知道它在 `Comment` 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：`user`，而不是 `author`。

    我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。

    我们现在针对 `Comment` 做些微小调整：

    ```jsx
    function Comment(props) {
        return (
            <div className="Comment">
                <div className="UserInfo">
                    <Avatar user={props.author} />
                    <div className="UserInfo-name">{props.author.name}</div>
                </div>
                <div className="Comment-text">{props.text}</div>
                <div className="Comment-date">{formatDate(props.date)}</div>
            </div>
        );
    }
    ```

    接下来，我们将提取 `UserInfo` 组件，该组件在用户名旁渲染 `Avatar` 组件：

    ```jsx
    function UserInfo(props) {
        return (
            <div className="UserInfo">
                <Avatar user={props.user} />
                <div className="UserInfo-name"> {props.user.name} </div>
            </div>
        );
    }
    ```

    进一步简化 `Comment` 组件：

    ```jsx
    function Comment(props) {
        return (
            <div className="Comment">
                <UserInfo user={props.author} />{" "}
                <div className="Comment-text">{props.text}</div>
                <div className="Comment-date">{formatDate(props.date)}</div>
            </div>
        );
    }
    ```

    最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（`Button`，`Panel`，`Avatar`），或者组件本身就足够复杂（`App`，`FeedStory`，`Comment`），那么它就是一个可提取出独立组件的候选项。

- **Props 的只读性**

    组件无论是使用[函数声明还是通过 class 声明](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props。来看下这个 `sum` 函数：

    ```jsx
    function sum(a, b) {
      return a + b;
    }
    ```

    这样的函数被称为[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

    相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

    ```jsx
    function withdraw(account, amount) {
      account.total -= amount;
    }
    ```

    React 非常灵活，但它也有一个严格的规则：

    **所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**

    当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。

### 1.5 State & 生命周期

[react 生命周期详细的组件 API 参考文档](https://zh-hans.reactjs.org/docs/react-component.html)

在时钟的例子。在[元素渲染](https://zh-hans.reactjs.org/docs/rendering-elements.html#rendering-an-element-into-the-dom)章节中，我们只了解了一种更新 UI 界面的方法。通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素：

```jsx
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(    element,    document.getElementById('root')  );
}

setInterval(tick, 1000);
```

下面封装真正可复用的 `Clock` 组件。它将设置自己的计时器并每秒更新一次。

我们可以从封装时钟的外观开始：

```jsx
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}
function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById("root")
    );
}

setInterval(tick, 1000);
```

然而，它忽略了一个关键的技术细节：`Clock` 组件需要设置一个计时器，并且需要每秒更新 UI。

理想情况下，我们希望只编写一次代码，便可以让 `Clock` 组件自我更新：

```jsx
ReactDOM.render(
  <Clock />,  document.getElementById('root')
);
```

我们需要在 `Clock` 组件中添加 “state” 来实现这个功能。

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

- **将函数组件转换为 `class` 组件**

    通过以下五步将 `Clock` 的函数组件转成 class 组件：

    1. 创建一个同名的 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，并且继承于 `React.Component`。
    2. 添加一个空的 `render()` 方法。
    3. 将函数体移动到 `render()` 方法之中。
    4. 在 `render()` 方法中使用 `this.props` 替换 `props`。
    5. 删除剩余的空函数声明。

    ```jsx
    class Clock extends React.Component {
        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    ```

    现在 `Clock` 组件被定义为 class，而不是函数。

    每次组件更新时 `render` 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<Clock />` ，就仅有一个 `Clock` 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

- **向 `class` 组件中添加局部的 `state`**

    我们通过以下三步将 `date` 从 props 移动到 state 中：

    1. 把 `render()` 方法中的 `this.props.date` 替换成 `this.state.date` ：

        ```jsx
        class Clock extends React.Component {
            render() {
                return (
                    <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                    </div>
                );
            }
        }
        ```

        

    2. 添加一个 [class 构造函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)，然后在该函数中为 `this.state` 赋初值：

        ```jsx
        class Clock extends React.Component {
          constructor(props) {
            super(props);
            this.state = {date: new Date()};  }
        
          render() {
            return (
              <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>
            );
          }
        }
        ```

        通过以下方式将 `props` 传递到父类的构造函数中：

        ```jsx
        constructor(props) {
            super(props);    this.state = {date: new Date()};
        }
        ```

        Class 组件应该始终使用 `props` 参数来调用父类的构造函数。

    3. 移除 `<Clock />` 元素中的 `date` 属性：

        ```jsx
        ReactDOM.render(<Clock />, document.getElementById("root"));
        ```

        我们之后会将计时器相关的代码添加到组件中。

        代码如下：

        ```jsx
        class Clock extends React.Component {
            constructor(props) {
                super(props);
                this.state = { date: new Date() };
            }
            render() {
                return (
                    <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                    </div>
                );
            }
        }
        
        ReactDOM.render(<Clock />, document.getElementById("root"));
        ```

    接下来，我们会设置 `Clock` 的计时器并每秒更新它。

- **将生命周期方法添加到 `Class` 中**

    在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。

    当 `Clock` 组件第一次被渲染到 DOM 中的时候，就为其[设置一个计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)。这在 React 中被称为“挂载（mount）”。

    同时，当 DOM 中 `Clock` 组件被删除的时候，应该[清除计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)。这在 React 中被称为“卸载（unmount）”。

    我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：

    ```jsx
    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = { date: new Date() };
        }
    
        componentDidMount(){
    
        }
        componentWillUnmount(){
    
        }
    
    
        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    ```

    这些方法叫做“生命周期方法”。

    `componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：

    ```jsx
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    ```

    接下来把计时器的 ID 保存在 `this` 之中（`this.timerID`）。

    尽管 `this.props` 和 `this.state` 是 React 本身设置的，且都拥有特殊的含义，但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。

    我们会在 `componentWillUnmount()` 生命周期方法中清除计时器：

    ```jsx
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    ```

    最后，我们会实现一个叫 `tick()` 的方法，`Clock` 组件每秒都会调用它。

    使用 `this.setState()` 来时刻更新组件 state：

    ```jsx
    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = { date: new Date() };
        }
    
        componentDidMount() {
            this.timerID = setInterval(() => this.tick(), 1000);
        }
    
        componentWillUnmount() {
            clearInterval(this.timerID);
        }
    
        tick() {
            this.setState({
                date: new Date(),
            });
        }
    
        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
    
    ReactDOM.render(<Clock />, document.getElementById("root"));
    ```

    现在时钟每秒都会刷新。

    ![复用的时钟组件](https://i.loli.net/2021/10/13/MUkLz2EhrpxN4Zs.gif)

    让我们来快速概括一下发生了什么和这些方法的调用顺序：

    1. 当 `<Clock />` 被传给 `ReactDOM.render()`的时候，React 会调用 `Clock` 组件的构造函数。因为 `Clock` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 state。
    2. 之后 React 会调用组件的 `render()` 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 `Clock` 渲染的输出。
    3. 当 `Clock` 的输出被插入到 DOM 中后，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`Clock` 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法。
    4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，`Clock` 组件会通过调用 `setState()` 来计划进行一次 UI 更新。得益于 `setState()` 的调用，React 能够知道 state 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么。这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
    5. 一旦 `Clock` 组件从 DOM 中被移除，React 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了

- **正确地使用 `State`**

    关于 `setState()` 你应该了解三件事：

    - **不要直接修改 State**

        例如，此代码不会重新渲染组件：

        ```jsx
        // Wrong
        this.state.comment = 'Hello';
        ```

        而是应该使用 `setState()`:

        ```jsx
        // Correct
        this.setState({comment: 'Hello'});
        ```

        构造函数是唯一可以给 `this.state` 赋值的地方

    - **State 的更新可能是异步的**

        出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用

        因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

        例如，此代码可能会无法更新计数器：

        ```jsx
        // Wrong
        this.setState({
            counter: this.state.counter + this.props.increment,
        });
        ```

        要解决这个问题，可以让 `setState()` **接收一个函数而不是一个对象**。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

        ```jsx
        // Correct
        this.setState((state, props) => ({
            counter: state.counter + props.increment
        }));
        ```

        上面使用了[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，不过使用普通的函数也同样可以：

        ```jsx
        // Correct
        this.setState(function(state, props) {
            return {
                counter: state.counter + props.increment
            };
        });
        ```

    - **State 的更新会被合并**

        当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

        例如，你的 state 包含几个独立的变量：

        ```jsx
        constructor(props) {
            super(props);
            this.state = {
                posts: [],      
                comments: []   
            };
        }
        ```

        然后你可以分别调用 `setState()` 来单独地更新它们：

        ```jsx
        componentDidMount() {
            fetchPosts().then(response => {
                this.setState({
                    posts: response.posts      
                });
            });
        
            fetchComments().then(response => {
                this.setState({
                    comments: response.comments  
                });
            });
        }
        ```

        这里的合并是浅合并，所以 `this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`。

    - **数据是向下流动的**

        不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 `class` 组件。

        这就是为什么称 `state` 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

        组件可以选择把它的 `state` 作为 `props` 向下传递到它的子组件中：

        ```jsx
        <FormattedDate date={this.state.date} />
        ```

        `FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的：

        ```jsx
        function FormattedDate(props) {
            return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
        }
        ```

        这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

        如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

        ```jsx
        function App() {
            return (
                <div>
                    <Clock />
                    <Clock />
                    <Clock />
                </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById("root"));
        ```

        每个 `Clock` 组件都会单独设置它自己的计时器并且更新它。

        在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然。

        

### 1.6 事件处理

**React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：**

1. React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
2. 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

例如，传统的 HTML：

```html
<button onclick="activateLasers()">
    Activate Lasers
</button>
```

在 React 中略微不同：

```jsx
<button onClick={activateLasers}> 
    Activate Lasers
</button>
```

在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用`preventDefault`。例如，传统的 HTML 中阻止表单的默认提交行为，你可以这样写：

```html
<form onsubmit="console.log('You clicked submit.'); return false">
    <button type="submit">Submit</button>
</form>
```

在 React 中，可能是这样的：

```jsx
function Form() {
    function handleSubmit(e) {
        e.preventDefault();    console.log('You clicked submit.');
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
    );
}
```

在这里，`e` 是一个合成事件。React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/)来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同。

使用 React 时，你一般不需要使用 `addEventListener` 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。

当你使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。例如，下面的 `Toggle` 组件会渲染一个让用户切换开关状态的按钮：

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        );
    }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
```

你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

这并不是 React 特有的行为；这其实与 [JavaScript 函数工作原理](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)有关。通常情况下，如果你没有在方法后面添加 `()`，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

如果觉得使用 `bind` 很麻烦，这里有两种方式可以解决。如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 class fields 正确的绑定回调函数：

```jsx
class LogginButton extends React.Component {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    // 注意: 这是 *实验性* 语法。
    handleClick = () => {
        console.log("this is: ", this);
    };
    render() {
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
```

![image-20211013145639408](https://i.loli.net/2021/10/13/Cav8Irt9BVnUb2F.png)

[Create React App](https://github.com/facebookincubator/create-react-app) 默认启用此语法。

如果你没有使用 class fields 语法，你可以在回调中使用[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)：

```jsx
class LogginButton2 extends React.Component {
    handleClick() {
        console.log("LogginButton2 this is: ", this);
    }
    render() {
        return <button onClick={() => this.handleClick()}>Click Me2</button>;
    }
}
```

![image-20211013145824263](https://i.loli.net/2021/10/13/1kDLwJWgQvc7iYX.png)

此语法问题在于每次渲染 `LoggingButton` 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

- **向事件处理程序传递参数**

    ​	在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

    ```jsx
    <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
    ```

    上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。

    在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### 1.7 条件渲染

**在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。**

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者 [条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

观察这两个组件:

```jsx
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}
```

再创建一个 `Greeting` 组件，它会根据用户是否登录来决定显示上面的哪一个组件。

```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    } else {
        return <GuestGreeting />;
    }
}
ReactDOM.render(
    <div>
        <Greeting isLoggedIn={false} />
    </div>,
    document.getElementById("root")
);
```

![image-20211013150716584](https://i.loli.net/2021/10/13/TV6iDdwqMtxmIWo.png)

这个示例根据 `isLoggedIn` 的值来渲染不同的问候语。

- **元素变量**

    你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

    观察这两个组件，它们分别代表了注销和登录按钮：

    ```jsx
    function LoginButton(props) {
      return (
        <button onClick={props.onClick}>
          Login
        </button>
      );
    }
    
    function LogoutButton(props) {
      return (
        <button onClick={props.onClick}>
          Logout
        </button>
      );
    }
    ```

    在下面的示例中，我们将创建一个名叫 `LoginControl` 的[有状态的组件](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class)。

    它将根据当前的状态来渲染 `<LoginButton />` 或者 `<LogoutButton />`。同时它还会渲染上一个示例中的 `<Greeting />`。

    ```jsx
    class LoginControll extends React.Component {
        constructor(props) {
            super(props);
            this.handleLoginClick = this.handleLoginClick.bind(this);
            this.handleLogoutClick = this.handleLogoutClick.bind(this);
            this.state = { isLoggedIn: false };
        }
    
        handleLoginClick() {
            this.setState({ isLoggedIn: true });
        }
    
        handleLogoutClick() {
            this.setState({ isLoggedIn: false });
        }
    
        render() {
            const isLoggedIn = this.state.isLoggedIn;
            let button;
            if (isLoggedIn) {
                button = <LogoutButton onClick={this.handleLogoutClick} />;
            } else {
                button = <LoginButton onClick={this.handleLoginClick} />;
            }
    
            return (
                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    {button}
                </div>
            );
        }
    }
    
    ReactDOM.render(
        <div>
            <LoginControll />
        </div>,
        document.getElementById("root")
    );
    ```

    ![条件渲染](https://i.loli.net/2021/10/13/X9slArmEY63cekG.gif)

    声明一个变量并使用 `if` 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法。接下来，我们将介绍几种在 JSX 中内联条件渲染的方法。

- **与运算符 `&&`**

    通过花括号包裹代码，你可以[在 JSX 中嵌入表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染：

    ```jsx
    function Mailbox(props) {
        const unreadMessages = props.unreadMessages;
        return (
            <div>
                <h1>Hello!</h1>
                {unreadMessages.length > 0 && (
                    <h2> You have {unreadMessages.length} unread messages. </h2>
                )}
            </div>
        );
    }
    
    const messages = ["React", "Re: React", "Re:Re: React"];
    
    ReactDOM.render(
        <div>
            <LoginControll />
            <Mailbox unreadMessages={messages} />
        </div>,
        document.getElementById("root")
    );
    ```

    ![image-20211013151826437](https://i.loli.net/2021/10/13/AS3q4c95YlZp7wH.png)

    之所以能这样做，是因为在 JavaScript 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

    因此，如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略并跳过它。

    请注意，返回 false 的表达式会使 `&&` 后面的元素被跳过，但会返回 false 表达式。在下面示例中，render 方法的返回值是 `<div>0</div>`。

    ```jsx
    render() {
        const count = 0;  return (
            <div>
                { count && <h1>Messages: {count}</h1>}   
            </div>
        );
    }
    ```

    

- **三目运算符**

    另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。

    在下面这个示例中，我们用它来条件渲染一小段文本：

    ```jsx
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.    		</div>
        );
    }
    ```

    同样的，它也可以用于较为复杂的表达式中，虽然看起来不是很直观：

    ```jsx
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                {isLoggedIn 
                ? <LogoutButton onClick={this.handleLogoutClick} />
                : <LoginButton onClick={this.handleLoginClick} />      
                }
            </div>  
        );
    }
    ```

    就像在 JavaScript 中一样，你可以根据团队的习惯来选择可读性更高的代码风格。需要注意的是，如果条件变得过于复杂，那你应该考虑如何[提取组件](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)。

- **阻止组件渲染**

    在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

    下面的示例中，`<WarningBanner />` 会根据 prop 中 `warn` 的值来进行条件渲染。如果 `warn` 的值是 `false`，那么组件则不会渲染:

    ```jsx
    function WaringBanner(props) {
        if (!props.warn) {
            return null;
        }
        return <div class="warning">Warning!</div>;
    }
    
    class Page extends React.Component {
        constructor(props) {
            super(props);
            this.state = { showWaring: true };
            this.handleToggleClick = this.handleToggleClick.bind(this);
        }
    
        handleToggleClick() {
            this.setState((state) => ({
                showWaring: !state.showWaring,
            }));
        }
    
        render() {
            return (
                <div>
                    <WaringBanner warn={this.state.showWaring}></WaringBanner>
                    <button onClick={this.handleToggleClick}>
                        {this.state.showWaring ? "Hide" : "Show"}
                    </button>
                </div>
            );
        }
    }
    
    ReactDOM.render(
        <div>
            <Page />
        </div>,
        document.getElementById("root")
    );
    ```

    ![阻止组件渲染](https://i.loli.net/2021/10/13/4Ckl9wROdeqNLFH.gif)

    在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。



### 1.8 列表 & Key 

首先，让我们看下在 Javascript 中如何转化列表。

如下代码，我们使用 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 `doubled` 并打印出来：

```js
const numbers = [1, 2, , 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出 `[2, 4, 6, 8, 10]`。

在 React 中，把数组转化为[元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)列表的过程是相似的。

- **渲染多个组件**

    你可以通过使用 `{}` 在 JSX 内构建一个[元素集合](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。

    下面，我们使用 Javascript 中的 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>` 标签，最后我们将得到的数组赋值给 `listItems`：

    ```jsx
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) => {
        return <li>{number}</li>;
    });
    ```

    我们把整个 `listItems` 插入到 `<ul>` 元素中，然后[渲染进 DOM](https://zh-hans.reactjs.org/docs/rendering-elements.html#rendering-an-element-into-the-dom)：

    ```jsx
    ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));
    ```

    这段代码生成了一个 1 到 5 的项目符号列表。

    ![image-20211013153654343](https://i.loli.net/2021/10/13/YKCSdrfx6MtJi3B.png)

- **基础列表组件**

    通常你需要在一个[组件](https://zh-hans.reactjs.org/docs/components-and-props.html)中渲染列表。

    我们可以把前面的例子重构成一个组件，这个组件接收 `numbers` 数组作为参数并输出一个元素列表。

    ```jsx
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) => {
            return <li>{number}</li>;
        });
        return <ul>{listItems}</ul>;
    }
    const numbers = [1, 2, 3, 4, 5, 7, 8];
    
    ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById("root")
    );
    ```

    当我们运行这段代码，将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。

    ![image-20211013154023548](https://i.loli.net/2021/10/13/HRl2j1cniq9F4wE.png)

    让我们来给每个列表元素分配一个 `key` 属性来解决上面的那个警告：

    ```jsx
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) => {
            return <li key={number.toString()}>{number}</li>;
        });
        return <ul>{listItems}</ul>;
    }
    const numbers = [1, 2, 3, 4, 5, 7, 8];
    
    ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById("root")
    );
    ```

    可以看到已经没有这个警告了：

    ![image-20211013154127443](https://i.loli.net/2021/10/13/FTsXaEl7KBoQtJA.png)

    

- **Key**

    key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

    ```jsx
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
    	<li key={number.toString()}>    
    		{number}
    	</li>
    );
    ```

    一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：

    ```jsx
    const todoItems = todos.map((todo) =>
    	<li key={todo.id}>    
        	{todo.text}
    	</li>
    );
    ```

    当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

    ```jsx
    const todoItems = todos.map((todo, index) =>
        // Only do this if items have no stable IDs  
    	<li key={index}>    
    		{todo.text}
    	</li>
    );
    ```

    如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

    [深入解析为什么 key 是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)

    

- **用 Key 提取组件**

    **元素的 key 只有放在就近的数组上下文中才有意义。**

    比方说，如果你 [提取](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components) 出一个 `ListItem` 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上。

    - 不正确的使用 Key 的方式

        ```jsx
        function ListItem(props) {
          const value = props.value;
          return (
            // 错误！你不需要在这里指定 key：    
            <li key={value.toString()}>      
                  {value}
            </li>
          );
        }
        
        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            // 错误！元素的 key 应该在这里指定：    
            <ListItem value={number} />  
          );
          return (
            <ul>
              {listItems}
            </ul>
          );
        }
        
        const numbers = [1, 2, 3, 4, 5];
        ReactDOM.render(
          <NumberList numbers={numbers} />,
          document.getElementById('root')
        );
        ```

    - 正确的使用 Key 的方式

        ```jsx
        function ListItem(props) {
          // 正确！这里不需要指定 key：  
            return <li>{props.value}</li>;
        }
        
        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            // 正确！key 应该在数组的上下文中被指定    
            <ListItem key={number.toString()} value={number} />  
           );
          return (
            <ul>
              {listItems}
            </ul>
          );
        }
        
        const numbers = [1, 2, 3, 4, 5];
        ReactDOM.render(
          <NumberList numbers={numbers} />,
          document.getElementById('root')
        );
        ```

    **一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。**

- **key 值在兄弟节点之间必须唯一**

    数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

    ```jsx
    function Blog(props) {
        const siderbar = (
            <ul>
                {props.posts.map((post) => {
                    return <li key={post.id}>{post.title}</li>;
                })}
            </ul>
        );
        const content = props.posts.map((post) => {
            return (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            );
        });
    
        return (
            <div>
                {siderbar}
                <hr />
                {content}
            </div>
        );
    }
    
    const posts = [
        { id: 1, title: "Hello World", content: "Welcome to learning React!" },
        {
            id: 2,
            title: "Installation",
            content: "You can install React from npm.",
        },
    ];
    
    ReactDOM.render(<Blog posts={posts} />, document.getElementById("root"));
    ```

    ![image-20211013160531500](https://i.loli.net/2021/10/13/gmQ1vABOZwLRdlz.png)

    key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值：

    ```jsx
    const content = posts.map((post) =>
      <Post
        key={post.id}    
          id={post.id}    
          title={post.title} />
    );
    ```

    上面例子中，`Post` 组件可以读出 `props.id`，但是不能读出 `props.key`。

    

- **在 JSX 中嵌入 `map()`**

    在上面的例子中，我们声明了一个单独的 `listItems` 变量并将其包含在 JSX 中：

    ```jsx
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>    
          <ListItem key={number.toString()} value={number} />  
           );  
      return (
        <ul>
          {listItems}
        </ul>
      );
    }
    ```

    JSX 允许在大括号中[嵌入任何表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 `map()` 返回的结果：

    ```jsx
    function NumberList(props) {
      const numbers = props.numbers;
      return (
        <ul>
          {numbers.map((number) =>        
                       <ListItem key={number.toString()}  value={number} />      
           )}    
         </ul>
      );
    }
    ```

    这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个 `map()` 嵌套了太多层级，那可能就是你 [提取组件](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components) 的一个好时机。

### 1.9 表单

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称：

```html
<form>
    <label>
        名字:
        <input type="text" name="name" />
    </label>
    <input type="submit" value="提交" />
</form>
```

此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用  JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。

- **受控组件**

    在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.reactjs.org/docs/react-component.html#setstate)来更新。

    我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做 “**受控组件**”。

    例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

    ```jsx
    class NameForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: "" };
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(e) {
            this.setState({ value: e.target.value });
        }
    
        handleSubmit(e) {
            alert("提交的名字：" + this.state.value);
            e.preventDefault();
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label for="name">名字：</label>
                    <input
                        type="text"
                        id="name"
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    <input type="submit" value="提交" />
                </form>
            );
        }
    }
    
    ReactDOM.render(<NameForm />, document.getElementById("root"));
    ```

    由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

    ![受控组件](https://i.loli.net/2021/10/13/XZgucWE1fiY7hok.gif)

    对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。

- **`textarea` 标签**

    在 HTML 中, `<textarea>` 元素通过其子元素定义其文本:

    ```html
    <textarea>
      你好， 这是在 text area 里的文本
    </textarea>
    ```

    而在 React 中，`<textarea>` 使用 `value` 属性代替。这样，可以使得使用 `<textarea>` 的表单和使用单行 input 的表单非常类似：

    ```jsx
    class EssayForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: "请撰写一篇关于你喜欢的 DOM 元素的文章." };
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(e) {
            this.setState({ value: e.target.value });
        }
    
        handleSubmit(e) {
            alert("提交的文章：" + this.state.value);
            e.preventDefault();
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label for="article">文章：</label>
                    <textarea
                        type="text"
                        id="article"
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    <input type="submit" value="提交" />
                </form>
            );
        }
    }
    
    ReactDOM.render(<EssayForm />, document.getElementById("root"));
    ```

    请注意，`this.state.value` 初始化于构造函数中，因此文本区域默认有初值。

    ![image-20211013162239459](https://i.loli.net/2021/10/13/qF1WaoZ7OhyYNUR.png)

- **`select` 标签**

    在 HTML 中，`<select>` 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：

    ```html
    <select>
      <option value="grapefruit">葡萄柚</option>
      <option value="lime">酸橙</option>
      <option selected value="coconut">椰子</option>
      <option value="mango">芒果</option>
    </select>
    ```

    请注意，由于 `selected` 属性的缘故，椰子选项默认被选中。React 并不会使用 `selected` 属性，而是在根 `select` 标签上使用 `value` 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：

    ```jsx
    class FlavorForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: "coconut" };
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(e) {
            this.setState({ value: e.target.value });
        }
    
        handleSubmit(e) {
            alert("你喜欢的风味是：" + this.state.value);
            e.preventDefault();
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>选择你喜欢的风味：</label>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                    <input type="submit" value="提交" />
                </form>
            );
        }
    }
    
    ReactDOM.render(<FlavorForm />, document.getElementById("root"));
    ```

    ![受控组件-select](https://i.loli.net/2021/10/13/oCtlL1JeBVA4gnx.gif)

    **总的来说，这使得 `<input type="text">`, `<textarea>` 和 `<select>` 之类的标签都非常相似—它们都接受一个 `value` 属性，你可以使用它来实现受控组件。**

    > **注意**
    >
    > 你可以将数组传递到 `value` 属性中，以支持在 `select` 标签中选择多个选项：
    >
    > ```jsx
    > <select multiple={true} value={['B', 'C']}>
    > ```
    >
    > 

- **文件 `input` 标签**

    在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。

    ```html
    <input type="file" />
    ```

    因为它的 value 只读，所以它是 React 中的一个**非受控**组件。将与其他非受控组件[在后续文档中](https://zh-hans.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)一起讨论。

- **处理多个输入**

    当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

    例如：

    ```jsx
    class Reservation extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isGoing: true,
                numberOfGuests: 2,
            };
    
            this.handleInputChange = this.handleInputChange.bind(this);
        }
    
        handleInputChange(e) {
            const target = e.target;
            const value =
                  target.type === "checkbox" ? target.checked : target.value;
            const name = target.name;
    
            this.setState({
                [name]: value,
            });
        }
    
        render() {
            return (
                <form>
                    <label>
                        参与：
                        <input
                            type="checkbox"
                            name="isGoing"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange}
                            />
                    </label>
                    <br />
                    <label>
                        来宾人数：
                        <input
                            type="number"
                            name="numberOfGuests"
                            checked={this.state.numberOfGuests}
                            onChange={this.handleInputChange}
                            />
                    </label>
                </form>
            );
        }
    }
    
    ReactDOM.render(<Reservation />, document.getElementById("root"));
    ```

    这里使用了 ES6 [计算属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)的语法更新给定输入名称对应的 state 值：

    ```jsx
    this.setState({
      [name]: value}
    );
    ```

    等同于：

    ```js
    var partialState = {};
    partialState[name] = value;
    this.setState(partialState);
    ```

    另外，由于 `setState()` 自动[将部分 state 合并到当前 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged), 只需调用它更改部分 state 即可。

- **受控输入空值**

    在[受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)上指定 `value` 的 prop 会阻止用户更改输入。如果你指定了 `value`，但输入仍可编辑，则可能是你意外地将 `value` 设置为 `undefined` 或 `null`。

    下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

    ```jsx
    let mountNode = document.getElementById("root");
    ReactDOM.render(<input value="hi" />, mountNode);
    
    setTimeout(function () {
        ReactDOM.render(<input value={null} />, mountNode);
    }, 1000);
    ```

    ![image-20211013174240073](https://i.loli.net/2021/10/13/zp2ISTAeR68iBo9.png)

- **受控组件的替代品**

    有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入  state。当你将之前的代码库转换为 React 或将 React 应用程序与非 React  库集成时，这可能会令人厌烦。在这些情况下，你可能希望使用 [非受控组件](https://zh-hans.reactjs.org/docs/uncontrolled-components.html), 这是实现输入表单的另一种方式。

- **成熟的解决方案**

    如果你想寻找包含验证、追踪访问字段以及处理表单提交的完整解决方案，使用 [Formik](https://jaredpalmer.com/formik) 是不错的选择。然而，它也是建立在受控组件和管理 state 的基础之上 —— 所以不要忽视学习它们。

### 1.10 状态提升

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

在本节中，我们将创建一个用于计算水在给定温度下是否会沸腾的温度计算器。

我们将从一个名为 `BoilingVerdict` 的组件开始，它接受 `celsius` 温度作为一个 prop，并据此打印出该温度是否足以将水煮沸的结果。

```jsx
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
```

接下来, 我们创建一个名为 `Calculator` 的组件。它渲染一个用于输入温度的 `<input>`，并将其值保存在 `this.state.temperature` 中。

另外, 它根据当前输入值渲染 `BoilingVerdict` 组件。

```jsx
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: "" };
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input
                    type="text"
                    value={temperature}
                    onChange={this.handleChange}
                    />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}
```

![状态提升1](https://i.loli.net/2021/10/13/ueHrp5IKgL2yEbG.gif)

- **添加第二个输入框**

    我们的新需求是，在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步。

    我们先从 `Calculator` 组件中抽离出 `TemperatureInput` 组件，然后为其添加一个新的 `scale` prop，它可以是 `"c"` 或是 `"f"`：

    ```jsx
    const scaleNames = {
        c: "Celsius",
        f: "Fahrenheit",
    };
    
    class TemperatureInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = { temperature: "" };
        }
    
        handleChange(e) {
            this.setState({ temperature: e.target.value });
        }
    
        render() {
            const temperature = this.state.temperature;
            const scale = this.props.scale;
            return (
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input
                        type="text"
                        value={temperature}
                        onChange={this.handleChange}
                        />
                </fieldset>
            );
        }
    }
    ```

    我们现在可以修改 `Calculator` 组件让它渲染两个独立的温度输入框组件：

    ```jsx
    class Calculator extends React.Component {
        render() {
            const temperature = this.state.temperature;
            return (
                <div>
                    <TemperatureInput scale="c" />
                    <TemperatureInput scale="f" />
                </div>
            );
        }
    }
    ```

    ![image-20211013175750078](https://i.loli.net/2021/10/13/hHpbt6oQaSiemDj.png)

    我们现在有了两个输入框，但当你在其中一个输入温度时，另一个并不会更新。这与我们的要求相矛盾：我们希望让它们保持同步。

    另外，我们也不能通过 `Calculator` 组件展示 `BoilingVerdict` 组件的渲染结果。因为 `Calculator` 组件并不知道隐藏在 `TemperatureInput` 组件中的当前温度是多少。

- **编写转换函数**

    首先，我们将编写两个可以在摄氏度与华氏度之间相互转换的函数：

    ```js
    function toCelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5) / 9;
    }
    
    function toFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
    }
    ```

    上述两个函数仅做数值转换。而我们将编写另一个函数，它接受字符串类型的 `temperature` 和转换函数作为参数并返回一个字符串。我们将使用它来依据一个输入框的值计算出另一个输入框的值。

    当输入 `temperature` 的值无效时，函数返回空字符串，反之，则返回保留三位小数并四舍五入后的转换结果：

    ```js
    function tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return "";
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
    ```

    例如，`tryConvert('abc', toCelsius)` 返回一个空字符串，而 `tryConvert('10.22', toFahrenheit)` 返回 `'50.396'`。

- **状态提升**

    到目前为止, 两个 `TemperatureInput` 组件均在各自内部的 state 中相互独立地保存着各自的数据。

    ```jsx
    class TemperatureInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = { temperature: "" };
        }
    
        handleChange(e) {
            this.setState({ temperature: e.target.value });
        }
    
        render() {
            const temperature = this.state.temperature;
            const scale = this.props.scale;
            return (
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input
                        type="text"
                        value={temperature}
                        onChange={this.handleChange}
                        />
                </fieldset>
            );
        }
    }
    ```

    然而，我们希望两个输入框内的数值彼此能够同步。当我们更新摄氏度输入框内的数值时，华氏度输入框内应当显示转换后的华氏温度，反之亦然。

    在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。接下来，我们将 `TemperatureInput` 组件中的 state 移动至 `Calculator` 组件中去。

    如果 `Calculator` 组件拥有了共享的 state，它将成为两个温度输入框中当前温度的“数据源”。它能够使得两个温度输入框的数值彼此保持一致。由于两个 `TemperatureInput` 组件的 props 均来自共同的父组件 `Calculator`，因此两个输入框中的内容将始终保持一致。

    让我们看看这是如何一步一步实现的。

    首先，我们将 `TemperatureInput` 组件中的 `this.state.temperature` 替换为 `this.props.temperature`。现在，我们先假定 `this.props.temperature` 已经存在，尽管将来我们需要通过 `Calculator` 组件将其传入：

    ```jsx
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input
                    type="text"
                    value={temperature}
                    onChange={this.handleChange}
                    />
            </fieldset>
        );
    }
    ```

    我们知道 [props 是只读的](https://zh-hans.reactjs.org/docs/components-and-props.html#props-are-read-only)。当 `temperature` 存在于 `TemperatureInput` 组件的 state 中时，组件调用 `this.setState()` 便可修改它。然而，`temperature` 是由父组件传入的 prop，`TemperatureInput` 组件便失去了对它的控制权。

    在 React 中，这个问题通常是通过使用“受控组件”来解决的。与 DOM 中的 `<input>` 接受 `value` 和 `onChange` 一样，自定义的 `TemperatureInput` 组件接受 `temperature` 和 `onTemperatureChange` 这两个来自父组件 `Calculator` 的 props。

    现在，当 `TemperatureInput` 组件想更新温度时，需调用 `this.props.onTemperatureChange` 来更新它：

    ```jsx
    handleChange(e) {
        // this.setState({ temperature: e.target.value });
        this.props.onTemperatureChange(e.target.value);
    }
    ```

    > **注意**
    >
    > 自定义组件中的 `temperature` 和 `onTemperatureChange` 这两个 prop 的命名没有任何特殊含义。我们可以给它们取其它任意的名字，例如，把它们命名为 `value` 和 `onChange` 就是一种习惯。

    `onTemperatureChange` 的 prop 和 `temperature` 的 prop 一样，均由父组件 `Calculator` 提供。它通过修改父组件自身的内部 state 来处理数据的变化，进而使用新的数值重新渲染两个输入框。我们将很快看到修改后的 `Calculator` 组件效果。

    在深入研究 `Calculator` 组件的变化之前，让我们回顾一下 `TemperatureInput` 组件的变化。我们移除组件自身的 state，通过使用 `this.props.temperature` 替代 `this.state.temperature` 来读取温度数据。当我们想要响应数据改变时，我们需要调用 `Calculator` 组件提供的 `this.props.onTemperatureChange()`，而不再使用 `this.setState()`。

    ```jsx
    class TemperatureInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            // this.state = { temperature: "" };
        }
    
        handleChange(e) {
            // this.setState({ temperature: e.target.value });
            this.props.onTemperatureChange(e.target.value);
        }
    
        render() {
            // const temperature = this.state.temperature;
            const temperature = this.props.temperature;
            const scale = this.props.scale;
            return (
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input
                        type="text"
                        value={temperature}
                        onChange={this.handleChange}
                        />
                </fieldset>
            );
        }
    }
    ```

    现在，让我们把目光转向 `Calculator` 组件。

    我们会把当前输入的 `temperature` 和 `scale` 保存在组件内部的 state 中。这个 state 就是从两个输入框组件中“提升”而来的，并且它将用作两个输入框组件的共同“数据源”。这是我们为了渲染两个输入框所需要的所有数据的最小表示。

    例如，当我们在摄氏度输入框中键入 37 时，`Calculator` 组件中的 state 将会是：

    ```json
    {
      temperature: '37',
      scale: 'c'
    }
    ```

    如果我们之后修改华氏度的输入框中的内容为 212 时，`Calculator` 组件中的 state 将会是：

    ```json
    {
      temperature: '212',
      scale: 'f'
    }
    ```

    我们可以存储两个输入框中的值，但这并不是必要的。我们只需要存储最近修改的温度及其计量单位即可，根据当前的 `temperature` 和 `scale` 就可以计算出另一个输入框的值。

    由于两个输入框中的数值由同一个 state 计算而来，因此它们始终保持同步：

    ```jsx
    class Calculator extends React.Component {
        constructor(props) {
            super(props);
            this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
            this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
            this.state = { temperature: "", scale: "c" };
        }
    
        handleCelsiusChange(temperature) {
            this.setState({
                scale: "c",
                temperature,
            });
        }
    
        handleFahrenheitChange(temperature) {
            this.setState({
                scale: "f",
                temperature,
            });
        }
    
        render() {
            // const temperature = this.state.temperature;
            // const scale = this.state.scale;
            const { temperature, scale } = this.state;
            const celsius =
                  scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
            const fahrenheit =
                  scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    
            return (
                <div>
                    <TemperatureInput
                        scale="c"
                        temperature={celsius}
                        onTemperatureChange={this.handleCelsiusChange}
                        />
                    <TemperatureInput
                        scale="f"
                        temperature={fahrenheit}
                        onTemperatureChange={this.handleFahrenheitChange}
                        />
                    <BoilingVerdict celsius={parseFloat(celsius)} />
                </div>
            );
        }
    }
    ```

    现在无论你编辑哪个输入框中的内容，`Calculator` 组件中的 `this.state.temperature` 和 `this.state.scale` 均会被更新。其中一个输入框保留用户的输入并取值，另一个输入框始终基于这个值显示转换后的结果。

    ![状态提升2](https://i.loli.net/2021/10/13/ZSxniC7FDMowyBq.gif)

    让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：

    - React 会调用 DOM 中 `<input>` 的 `onChange` 方法。在本实例中，它是 `TemperatureInput` 组件的 `handleChange` 方法。
    - `TemperatureInput` 组件中的 `handleChange` 方法会调用 `this.props.onTemperatureChange()`，并传入新输入的值作为参数。其 props 诸如 `onTemperatureChange` 之类，均由父组件 `Calculator` 提供。
    - 起初渲染时，用于摄氏度输入的子组件 `TemperatureInput` 中的 `onTemperatureChange` 方法与 `Calculator` 组件中的 `handleCelsiusChange` 方法相同，而，用于华氏度输入的子组件 `TemperatureInput` 中的 `onTemperatureChange` 方法与 `Calculator` 组件中的 `handleFahrenheitChange` 方法相同。因此，无论哪个输入框被编辑都会调用 `Calculator` 组件中对应的方法。
    - 在这些方法内部，`Calculator` 组件通过使用新的输入值与当前输入框对应的温度计量单位来调用 `this.setState()` 进而请求 React 重新渲染自己本身。
    - React 调用 `Calculator` 组件的 `render` 方法得到组件的 UI 呈现。温度转换在这时进行，两个输入框中的数值通过当前输入温度和其计量单位来重新计算获得。
    - React 使用 `Calculator` 组件提供的新 props 分别调用两个 `TemperatureInput` 子组件的 `render` 方法来获取子组件的 UI 呈现。
    - React 调用 `BoilingVerdict` 组件的 `render` 方法，并将摄氏温度值以组件 props 方式传入。
    - React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值
    - 得益于每次的更新都经历相同的步骤，两个输入框的内容才能始终保持同步。

- **学习小结**

    在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠 [自上而下的数据流](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)，而不是尝试在不同组件间同步 state。

    虽然提升 state 方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，排查和隔离 bug  所需的工作量将会变少。由于“存在”于组件中的任何 state，仅有组件自己能够修改它，因此 bug  的排查范围被大大缩减了。此外，你也可以使用自定义逻辑来拒绝或转换用户的输入。

    **如果某些数据可以由 props 或 state 推导得出，那么它就不应该存在于 state 中**。举个例子，本例中我们没有将 `celsiusValue` 和 `fahrenheitValue` 一起保存，而是仅保存了最后修改的 `temperature` 和它的 `scale`。这是因为另一个输入框的温度值始终可以通过这两个值以及组件的 `render()` 方法获得。这使得我们能够清除输入框内容，亦或是，在不损失用户操作的输入框内数值精度的前提下对另一个输入框内的转换数值做四舍五入的操作。

    当你在 UI 中发现错误时，可以使用 [React 开发者工具](https://github.com/facebook/react/tree/main/packages/react-devtools) 来检查问题组件的 props，并且按照组件树结构逐级向上搜寻，直到定位到负责更新 state 的那个组件。这使得你能够追踪到产生 bug 的源头：

![Monitoring State in React DevTools](https://i.loli.net/2021/10/13/cqe5ENoYtfDwsxu.gif)

### 1.11 组合 vs 继承

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

- **包含关系**

    有些组件无法提前知晓它们子组件的具体内容。在 `Sidebar`（侧边栏）和 `Dialog`（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。

    我们建议这些组件使用一个特殊的 `children` prop 来将他们的子组件传递到渲染结果中：

    ```jsx
    function FancyBorder(props) {
        return (
            <div className={"FancyBorder FancyBorder-" + props.color}>
                {props.children}
            </div>
        );
    }
    ```

    这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。

    ```jsx
    function WelcomeDialog() {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title"> Welcome </h1>
                <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                </p>
            </FancyBorder>
        );
    }
    ```

    `<FancyBorder>` JSX 标签中的所有内容都会作为一个 `children` prop 传递给 `FancyBorder` 组件。因为 `FancyBorder` 将 `{props.children}` 渲染在一个 `<div>` 中，被传递的这些子组件最终都会出现在输出结果中。

    少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 `children`，而是自行约定：将所需内容传入 props，并使用相应的 prop。

    ```jsx
    function SplitPane(props) {
        return (
            <div className="SplitPane">
                <div className="SplitPane-left">{props.left}</div>
                <div className="SplitPane-right">{props.right}</div>
            </div>
        );
    }
    
    function App() {
        return <SplitPane left={<Contract />} right={<Chat />} />;
    }
    ```

    `<Contacts />` 和 `<Chat />` 之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递。这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。

- **特例关系**

    有些时候，我们会把一些组件看作是其他组件的特殊实例，比如 `WelcomeDialog` 可以说是 `Dialog` 的特殊实例。

    在 React 中，我们也可以通过组合来实现这一点。“特殊”组件可以通过 props 定制并渲染“一般”组件：

    ```jsx
    function Dialog(props) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">{props.title} </h1>
                <p className="Dialog-message">{props.message} </p>
            </FancyBorder>
        );
    }
    
    function WelcomeDialog() {
        return (
            <Dialog
                title="Welcome"
                message="Thank you for visiting our spacecraft!"
                />
        );
    }
    ```

    组合也同样适用于以 class 形式定义的组件。

    ```jsx
    class SignUpDialog extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSignUp = this.handleSignUp.bind(this);
            this.state = { login: "" };
        }
    
        render() {
            return (
                <Dialog
                    title="Mars Exploration Program"
                    message="How should we refer to you?"
                    >
                    <input value={this.state.login} onChange={this.handleChange} />
                    <button onClick={this.handleSignUp}> Sign Me Up! </button>
                </Dialog>
            );
        }
    }
    ```

    

- **那么继承呢**

    在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。

    Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

    如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。



### 1.12 React 哲学

> 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

React 最棒的部分之一是引导我们思考如何构建一个应用

- **从设计稿开始**

    假设我们已经有了一个返回 JSON 的 API，以及设计师提供的组件设计稿。如下所示：

    ![Mockup](https://i.loli.net/2021/10/13/twh6VRmvMKErqi1.png)

    该 JSON API 会返回以下数据：

    ```json
    [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];
    ```

    

- **第一步：将设计好的 UI 划分为组件层级**

    首先，你需要在设计稿上用方框圈出每一个组件（包括它们的子组件），并且以合适的名称命名。如果你是和设计师一起完成此任务，那么他们可能已经做过类似的工作，所以请和他们进行交流！他们的 Photoshop 的图层名称可能最终就是你编写的 React 组件的名称！

    但你如何确定应该将哪些部分划分到一个组件中呢？你可以将组件当作一种函数或者是对象来考虑，根据[单一功能原则](https://en.wikipedia.org/wiki/Single_responsibility_principle)来判定组件的范围。也就是说，一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。

    在实践中，因为你经常是在向用户展示 JSON 数据模型，所以如果你的模型设计得恰当，UI（或者说组件结构）便会与数据模型一一对应，这是因为 UI 和数据模型都会倾向于遵守相同的*信息结构*。将 UI 分离为组件，其中每个组件需与数据模型的某部分匹配。

    ![组件嵌套图示](https://i.loli.net/2021/10/13/561kFdObQeLMToi.png)

    你会看到我们的应用中包含五个组件。我们已经将每个组件展示的数据标注为了斜体。图片中的序号与下方列表中的序号对应。

    1. **`FilterableProductTable` (橙色):** 是整个示例应用的整体
    2. **`SearchBar` (蓝色):** 接受所有的*用户输入*
    3. **`ProductTable` (绿色):** 展示*数据内容*并根据*用户输入*筛选结果
    4. **`ProductCategoryRow` (天蓝色):** 为每一个*产品类别*展示标题
    5. **`ProductRow` (红色):** 每一行展示一个 *产品*

    你可能注意到，`ProductTable` 的表头（包含 “Name” 和 “Price” 的那一部分）并未单独成为一个组件。这仅仅是一种偏好选择，如何处理这一问题也一直存在争论。就这个示例而言，因为表头只起到了渲染*数据集合*的作用——这与 `ProductTable` 是一致的，所以我们仍然将其保留为 `ProductTable` 的一部分。但是，如果表头过于复杂（例如，我们需为其添加排序功能），那么将它作为一个独立的 `ProductTableHeader` 组件就显得很有必要了。

    现在我们已经确定了设计稿中应该包含的组件，接下来我们将把它们描述为更加清晰的层级。设计稿中被其他组件包含的子组件，在层级上应该作为其子节点。

    - `FilterableProductTable`
        - `SearchBar`
        - `ProductTable`
            - `ProductCategoryRow`
            - `ProductRow`

- **第二步：用 React 创建一个静态版本**

    参阅 [CodePen](https://codepen.io) 上的 [React 哲学：第二步](https://codepen.io/gaearon/pen/BwWzwm)。

    现在我们已经确定了组件层级，可以编写对应的应用了。最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的 UI。最好将渲染 UI  和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。我们会在接下来的代码中体会到其中的区别。

    在构建应用的静态版本时，我们需要创建一些会重用其他组件的组件，然后通过 *props* 传入所需的数据。*props* 是父组件向子组件传递数据的方式。即使你已经熟悉了 *state* 的概念，也**完全不应该使用 state** 构建静态版本。state 代表了随时间会产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。

    你可以自上而下或者自下而上构建应用：自上而下意味着首先编写层级较高的组件（比如 `FilterableProductTable`），自下而上意味着从最基本的组件开始编写（比如 `ProductRow`）。当你的应用比较简单时，使用自上而下的方式更方便；对于较为大型的项目来说，自下而上地构建，并同时为低层组件编写测试是更加简单的方式。

    到此为止，你应该已经有了一个可重用的组件库来渲染你的数据模型。由于我们构建的是静态版本，所以这些组件目前只需提供 `render()` 方法用于渲染。最顶层的组件 `FilterableProductTable` 通过 props 接受你的数据模型。如果你的数据模型发生了改变，再次调用 `ReactDOM.render()`，UI 就会相应地被更新。数据模型变化、调用 `render()` 方法、UI 相应变化，这个过程并不复杂，因此很容易看清楚 UI 是如何被更新的，以及是在哪里被更新的。React **单向数据流**（也叫*单向绑定*）的思想使得组件模块化，易于快速开发。

    静态版本如下：

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React 哲学</title>
        <style>
          body {
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
    
        <script src="res/js/react.development.js"></script>
        <script src="res/js/react-dom.development.js"></script>
        <script src="res/js/babel.min.js"></script>
    
        <script type="text/babel">
          const PRODUCTS = [
            {
              category: "Sporting Goods",
              price: "$49.99",
              stocked: true,
              name: "Football",
            },
            {
              category: "Sporting Goods",
              price: "$9.99",
              stocked: true,
              name: "Baseball",
            },
            {
              category: "Sporting Goods",
              price: "$29.99",
              stocked: false,
              name: "Basketball",
            },
            {
              category: "Electronics",
              price: "$99.99",
              stocked: true,
              name: "iPod Touch",
            },
            {
              category: "Electronics",
              price: "$399.99",
              stocked: false,
              name: "iPhone 5",
            },
            {
              category: "Electronics",
              price: "$199.99",
              stocked: true,
              name: "Nexus 7",
            },
          ];
    
          class ProductCategoryRow extends React.Component {
            render() {
              const category = this.props.category;
              return (
                <tr>
                  <th colSpan="2">{category}</th>
                </tr>
              );
            }
          }
    
          class ProductRow extends React.Component {
            render() {
              const product = this.props.product;
              const name = product.stocked ? (
                product.name
              ) : (
                <span style={{ color: "red" }}>{product.name}</span>
              );
              return (
                <tr>
                  <td>name</td>
                  <td>{product.price}</td>
                </tr>
              );
            }
          }
    
          class ProductTable extends React.Component {
            render() {
              const rows = [];
              let lastCategory = null;
              this.props.products.forEach((product) => {
                if (product.category !== lastCategory) {
                  rows.push(
                    <ProductCategoryRow
                      category={product.category}
                      key={product.category}
                    />
                  );
                }
                rows.push(<ProductRow product={product} key={product.name} />);
                lastCategory = product.category;
              });
              return (
                <table>
                  <thead>
                    <tr>Name</tr>
                    <tr>Price</tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              );
            }
          }
    
          class SearchBar extends React.Component {
            render() {
              return (
                <form>
                  <input type="text" placeholder="Search..." />
                  <p>
                    <input type="checkbox" /> Only show product in stock
                  </p>
                </form>
              );
            }
          }
    
          class FilterableProductTable extends React.Component {
            render() {
              return (
                <div>
                  <SearchBar />
                  <ProductTable products={this.props.products} />
                </div>
              );
            }
          }
    
          let mountNode = document.getElementById("root");
          ReactDOM.render(
            <FilterableProductTable products={PRODUCTS} />,
            mountNode
          );
        </script>
      </body>
    </html>
    ```

    ![image-20211013204525960](https://i.loli.net/2021/10/13/rE9ciCvfmL1UyBD.png)

- **第三步：确定 UI state 的最小（且完整）表示**

    想要使你的 UI 具备交互功能，需要有触发基础数据模型改变的能力。React 通过实现 **state** 来完成这个任务。

    为了正确地构建应用，你首先需要找出应用所需的 state 的最小表示，并根据需要计算出其他所有数据。其中的关键正是 [DRY: *Don’t Repeat Yourself*](https://en.wikipedia.org/wiki/Don't_repeat_yourself)。只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生。比如，你要编写一个任务清单应用，你只需要保存一个包含所有事项的数组，而无需额外保存一个单独的 state 变量（用于存储任务个数）。当你需要展示任务个数时，只需要利用该数组的 length 属性即可。

    我们的示例应用拥有如下数据：

    - 包含所有产品的原始列表
    - 用户输入的搜索词
    - 复选框是否选中的值
    - 经过搜索筛选的产品列表

    通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：

    1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
    2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
    3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

    包含所有产品的原始列表是经由 props 传入的，所以它不是 state；搜索词和复选框的值应该是  state，因为它们随时间会发生改变且无法由其他数据计算而来；经过搜索筛选的产品列表不是  state，因为它的结果可以由产品的原始列表根据搜索词和复选框的选择计算出来。

    综上所述，属于 state 的有：

    - 用户输入的搜索词
    - 复选框是否选中的值

- **确定 state 放置的位置**

    我们已经确定了应用所需的 state 的最小集合。接下来，我们需要确定哪个组件能够改变这些 state，或者说*拥有*这些 state。

    注意：React 中的数据流是单向的，并顺着组件层级从上往下传递。哪个组件应该拥有某个 state 这件事，**对初学者来说往往是最难理解的部分**。尽管这可能在一开始不是那么清晰，但你可以尝试通过以下步骤来判断：

    对于应用中的每一个 state：

    - 找到根据这个 state 进行渲染的所有组件。
    - 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
    - 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
    - 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

    根据以上策略重新考虑我们的示例应用：

    - `ProductTable` 需要根据 state 筛选产品列表。`SearchBar` 需要展示搜索词和复选框的状态。
    - 他们的共同所有者是 `FilterableProductTable`。
    - 因此，搜索词和复选框的值应该很自然地存放在 `FilterableProductTable` 组件中。

    很好，我们已经决定把这些 state 存放在 `FilterableProductTable` 组件中。首先，将实例属性 `this.state = {filterText: '', inStockOnly: false}` 添加到 `FilterableProductTable` 的 `constructor` 中，设置应用的初始 state；接着，将 `filterText` 和 `inStockOnly` 作为 props 传入 `ProductTable` 和 `SearchBar`；最后，用这些 props 筛选 `ProductTable` 中的产品信息，并设置 `SearchBar` 的表单值。

    你现在可以看到应用的变化了：将 `filterText` 设置为 `"ball"` 并刷新应用，你能发现表格中的数据已经更新了。

    参阅 [CodePen](https://codepen.io) 上的 [React 哲学：第四步](https://codepen.io/gaearon/pen/qPrNQZ)

    综上，在 `FilterableProductTable` 中添加 `state` ，再将 `state` 通过 `props` 传递给子组件：

    ```jsx
    class FilterableProductTable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: "",
                isStockOnly: false,
            };
        }
        render() {
            return (
                <div>
                    <SearchBar
                        filterText={this.state.filterText}
                        isStockOnly={this.state.isStockOnly}
                        />
                    <ProductTable
                        products={this.props.products}
                        filterText={this.state.filterText}
                        isStockOnly={this.state.isStockOnly}
                        />
                </div>
            );
        }
    }
    ```

    

- **第五步：添加反向数据流**

    参阅 [CodePen](https://codepen.io) 上的 [React 哲学：第五步](https://codepen.io/gaearon/pen/LzWZvb)。

    到目前为止，我们已经借助自上而下传递的 props 和 state 渲染了一个应用。现在，我们将尝试让数据反向传递：处于较低层级的表单组件更新较高层级的 `FilterableProductTable` 中的 state。

    React 通过一种比传统的双向绑定略微繁琐的方法来实现反向数据传递。尽管如此，但这种需要显式声明的方法更有助于人们理解程序的运作方式。

    如果你在这时尝试在搜索框输入或勾选复选框，React 不会产生任何响应。这是正常的，因为我们之前已经将 `input` 的值设置为了从 `FilterableProductTable` 的 `state` 传递而来的固定值。

    让我们重新梳理一下需要实现的功能：每当用户改变表单的值，我们需要改变 state 来反映用户的当前输入。由于 state 只能由拥有它们的组件进行更改，`FilterableProductTable` 必须将一个能够触发 state 改变的回调函数（callback）传递给 `SearchBar`。我们可以使用输入框的 `onChange` 事件来监视用户输入的变化，并通知 `FilterableProductTable` 传递给 `SearchBar` 的回调函数。然后该回调函数将调用 `setState()`，从而更新应用。

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React 哲学</title>
        <style>
          body {
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
    
        <script src="res/js/react.development.js"></script>
        <script src="res/js/react-dom.development.js"></script>
        <script src="res/js/babel.min.js"></script>
    
        <script type="text/babel">
          const PRODUCTS = [
            {
              category: "Sporting Goods",
              price: "$49.99",
              stocked: true,
              name: "Football",
            },
            {
              category: "Sporting Goods",
              price: "$9.99",
              stocked: true,
              name: "Baseball",
            },
            {
              category: "Sporting Goods",
              price: "$29.99",
              stocked: false,
              name: "Basketball",
            },
            {
              category: "Electronics",
              price: "$99.99",
              stocked: true,
              name: "iPod Touch",
            },
            {
              category: "Electronics",
              price: "$399.99",
              stocked: false,
              name: "iPhone 5",
            },
            {
              category: "Electronics",
              price: "$199.99",
              stocked: true,
              name: "Nexus 7",
            },
          ];
    
          class ProductCategoryRow extends React.Component {
            render() {
              const category = this.props.category;
              return (
                <tr>
                  <th colSpan="2">{category}</th>
                </tr>
              );
            }
          }
    
          class ProductRow extends React.Component {
            render() {
              const product = this.props.product;
              const name = product.stocked ? (
                product.name
              ) : (
                <span style={{ color: "red" }}>{product.name}</span>
              );
              return (
                <tr>
                  <td>{name}</td>
                  <td>{product.price}</td>
                </tr>
              );
            }
          }
    
          class ProductTable extends React.Component {
            render() {
              const filterText = this.props.filterText;
              const inStockOnly = this.props.inStockOnly;
    
              const rows = [];
              let lastCategory = null;
    
              this.props.products.forEach((product) => {
                if (product.name.indexOf(filterText) === -1) {
                  return;
                }
                if (inStockOnly && !product.stocked) {
                  return;
                }
                if (product.category !== lastCategory) {
                  rows.push(
                    <ProductCategoryRow
                      category={product.category}
                      key={product.category}
                    />
                  );
                }
                rows.push(<ProductRow product={product} key={product.name} />);
                lastCategory = product.category;
              });
    
              return (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              );
            }
          }
    
          class SearchBar extends React.Component {
            constructor(props) {
              super(props);
              this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
              this.handleInStockChange = this.handleInStockChange.bind(this);
            }
    
            handleFilterTextChange(e) {
              this.props.onFilterTextChange(e.target.value);
            }
    
            handleInStockChange(e) {
              this.props.onInStockChange(e.target.checked);
            }
    
            render() {
              return (
                <form>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                  />
                  <p>
                    <input
                      type="checkbox"
                      checked={this.props.inStockOnly}
                      onChange={this.handleInStockChange}
                    />
                    Only show products in stock
                  </p>
                </form>
              );
            }
          }
    
          class FilterableProductTable extends React.Component {
            constructor(props) {
              super(props);
              this.state = {
                filterText: "",
                inStockOnly: false,
              };
    
              this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
              this.handleInStockChange = this.handleInStockChange.bind(this);
            }
    
            handleFilterTextChange(filterText) {
              this.setState({
                filterText: filterText,
              });
            }
    
            handleInStockChange(inStockOnly) {
              this.setState({
                inStockOnly: inStockOnly,
              });
            }
    
            render() {
              return (
                <div>
                  <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                  />
                  <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                  />
                </div>
              );
            }
          }
    
          ReactDOM.render(
            <FilterableProductTable products={PRODUCTS} />,
            document.getElementById("root")
          );
        </script>
      </body>
    </html>
    ```

    ![反向数据流](https://i.loli.net/2021/10/13/Ve5lpuCyNbYDXSO.gif)



## 2. 高级指引

### 2.1 无障碍辅助功能

- **为什么我们需要无障碍辅助功能 ？**

    网络无障碍辅助功能（Accessibility，也被称为 [**a11y**](https://en.wiktionary.org/wiki/a11y)，因为以 A 开头，以 Y 结尾，中间一共 11 个字母）是一种可以帮助所有人获得服务的设计和创造。无障碍辅助功能是使得辅助技术正确解读网页的必要条件。

    React 对于创建可访问网站有着全面的支持，而这通常是通过标准 HTML 技术实现的。

- **标准和指南**

    - **WCAG**

        [网络内容无障碍指南（Web Content Accessibility Guidelines，WCAG）](https://www.w3.org/WAI/intro/wcag) 为开发无障碍网站提供了指南。

        下面的 WCAG 检查表提供了一些概览：

        - [Wuhcag 提供的 WCAG 检查表（WCAG checklist from Wuhcag）](https://www.wuhcag.com/wcag-checklist/)
        - [WebAIM 提供的 WCAG 检查表（WCAG checklist from WebAIM）](https://webaim.org/standards/wcag/checklist)
        - [A11Y Project 提供的检查表（Checklist from The A11Y Project）](https://a11yproject.com/checklist.html)

    - **WAI-ARIA**

        [网络无障碍倡议 - 无障碍互联网应用（Web Accessibility Initiative - Accessible Rich Internet Applications）](https://www.w3.org/WAI/intro/aria) 文件包含了创建完全无障碍 JavaScript 部件所需要的技术。

        > **注意**
        >
        > SX 支持所有 `aria-*` HTML 属性。虽然大多数 React 的 DOM 变量和属性命名都使用驼峰命名（camelCased），但 aria-* 应该像其在 HTML 中一样使用带连字符的命名法（也叫诸如 hyphen-cased，kebab-case，lisp-case)。
        >
        > ```jsx
        > <input
        >   type="text"
        >   aria-label={labelText}  aria-required="true"  onChange={onchangeHandler}
        >   value={inputValue}
        >   name="name"
        > />
        > ```
        >
        > 

    

- **语义化的 HTML**

    语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

    - [MDN 的 HTML 元素参照（MDN HTML elements reference）](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

        有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用  `<div>`  元素来实现 React 代码功能的时候，又或是在使用列表（`<ol>`， `<ul>` 和 `<dl>`）和 HTML `<table>` 时。 在这种情况下，我们应该使用 [React Fragments](https://zh-hans.reactjs.org/docs/fragments.html) 来组合各个组件。

        例如：

        ```jsx
        import React, { Fragment } from "react";
        
        function ListItem({ item }) {
            return (
                <Fragment>
                    <dt>{item.term}</dt>
                    <dt>{item.description}</dt>
                </Fragment>
            );
        }
        
        function Glossary(props) {
            return (
                <dl>
                    {props.items.map((item) => (
                        <ListItem item={item} key={item.key} />
                    ))}
                </dl>
            );
        }
        ```

        和其他的元素一样，你可以把一系列的对象映射到一个 fragment 的数组中。

        ```jsx
        export function Glossary2(props) {
            return (
                <dl>
                    {props.items.map((item) => (
                        <Fragment key={item.id}>
                            <dt>{item.term}</dt>
                            <dt>{item.description}</dt>
                        </Fragment>
                    ))}
                </dl>
            );
        }
        ```

        当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 [短语法](https://zh-hans.reactjs.org/docs/fragments.html#short-syntax)：

        ```jsx
        export function ListItem2({ item }) {
            return (
                <>
                    <dt>{item.term}</dt>
                    <dt>{item.description}</dt>
                </>
            );
        }
        ```

        更多信息请参见 [Fragments 文档](https://zh-hans.reactjs.org/docs/fragments.html)。

        

- **无障碍表单**

    - **标记**

        所有的 HTML 表单控制，例如 `<input>` 和 `<textarea>` ，都需要被标注来实现无障碍辅助功能。我们需要提供屏幕朗读器以解释性标注。

        以下资源向我们展示了如何写标注：

        - [W3C 向我们展示如何标注元素](https://www.w3.org/WAI/tutorials/forms/labels/)
        - [WebAIM 向我们展示如何标注元素](https://webaim.org/techniques/forms/controls)
        - [Paciello Group 解释什么是无障碍名称](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

        尽管这些标准 HTML 实践可以被直接用在 React 中，请注意 `for` 在 JSX 中应该被写作 `htmlFor`：

        ```jsx
        <label htmlFor="namedInput">Name:</label>
        <input id="namedInput" type="text" name="name" />
        ```

        

    - **在出错时提醒用户**

        当出现错误时，所有用户都应该知情。下面的链接告诉我们如何给屏幕朗读器设置错误信息：

        - [W3C 展示用户推送](https://www.w3.org/WAI/tutorials/forms/notifications/)
        - [WebAIM 关于表单校验的文章](https://webaim.org/techniques/formvalidation/)

- **控制焦点**

    确保你的网络应用在即使只拥有键盘的环境下正常运作。

    - [WebAIM 讨论使用键盘进行无障碍访问](https://webaim.org/techniques/keyboard/)

    - **键盘焦点及焦点轮廓**

        键盘焦点的定义是：在 DOM 中，当前被选中来接受键盘信息的元素。我们可以在各处看到键盘焦点，它会被焦点轮廓包围，像下面的这个图像一样。

        ![选中的链接被蓝色键盘焦点轮廓包围着。](https://i.loli.net/2021/10/14/uMOdrRtIFxJZ1Wh.png)

        请不要使用 CSS 移除这个轮廓，比如设置 `outline: 0`，除非你将使用其他的方法实现焦点轮廓。

    - **跳过内容机制**

        为了帮助和提速键盘导航，我们提供了一种机制，可以帮助用户跳过一些导航段落

    - 



### 2.2 代码分割

- **打包**

    大多数 React 应用都会使用 [Webpack](https://webpack.docschina.org)，[Rollup](https://rollupjs.org/) 或 [Browserify](http://browserify.org/) 这类的构建工具来打包文件。打包是一个将文件引入并合并到一个单独文件的过程，最终形成一个 “bundle”。接着在页面上引入该 bundle，整个应用即可一次性加载。

    **示例**

    - App 文件

        ```jsx
        // app.js
        import {add} from './math.js';
        
        console.log(add(16, 36)); // 42
        ```

        ```jsx
        // math.js
        export function add(a, b) {
            return a + b;
        }
        ```

        

    - 打包后文件

        ```js
        function add(a, b) {
            return a + b;
        }
        
        console.log(add(16, 36)); // 42
        ```

        > **注意**
        >
        > 最终你的打包文件看起来会和上面的例子区别很大。

    如果你正在使用 [Create React App](https://create-react-app.dev)，[Next.js](https://nextjs.org/)，[Gatsby](https://www.gatsbyjs.org/)，或者类似的工具，你可以直接使用的 Webpack 配置来构建你的应用

    

    如果你没有使用这类工具，你就需要自己来进行配置。例如，查看 Webpack 文档上的[安装](https://webpack.docschina.org/guides/installation/)和[入门教程](https://webpack.docschina.org/guides/getting-started/)。

- **代码分割**

    打包是个非常棒的技术，但随着你的应用增长，你的代码包也将随之增长。尤其是在整合了体积巨大的第三方库的情况下。你需要关注你代码包中所包含的代码，以避免因体积过大而导致加载时间过长。

    为了避免搞出大体积的代码包，在前期就思考该问题并对代码包进行分割是个不错的选择。 代码分割是由诸如 [Webpack](https://webpack.docschina.org/guides/code-splitting/)，[Rollup](https://rollupjs.org/guide/en/#code-splitting) 和 Browserify（[factor-bundle](https://github.com/browserify/factor-bundle)）这类打包器支持的一项技术，能够创建多个包并在运行时动态加载。

    对你的应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。

- **`import()`**

    在你的应用中引入代码分割的最佳方式是通过动态 `import()` 语法。

    - 使用之前

        ```js
        import { add } from './math';
        
        console.log(add(16, 26));
        ```

        

    - 使用之后

        ```js
        import("./math").then(math => {
          console.log(math.add(16, 26));
        });
        ```

        当 Webpack 解析到该语法时，会自动进行代码分割。如果你使用 Create React App，该功能已开箱即用，你可以[立刻使用](https://create-react-app.dev/docs/code-splitting/)该特性。[Next.js](https://nextjs.org/docs/advanced-features/dynamic-import) 也已支持该特性而无需进行配置。

        如果你自己配置 Webpack，你可能要阅读下 Webpack 关于[代码分割](https://webpack.docschina.org/guides/code-splitting/)的指南。你的 Webpack 配置应该[类似于此](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269)。

        当使用 [Babel](https://babeljs.io/) 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import) 插件。

    - 

- **`React.lazy`**

    > **注意**
    >
    > `React.lazy` 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 [Loadable Components](https://github.com/gregberge/loadable-components) 这个库。它有一个很棒的[服务端渲染打包指南](https://loadable-components.com/docs/server-side-rendering/)。

    `React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。

    - 使用之前

        ```jsx
        import OtherComponent from './OtherComponent';
        ```

        

    - 使用之后

        ```jsx
        const OtherComponent = React.lazy(() => import('./OtherComponent'));
        ```

        此代码将会在组件首次渲染时，自动导入包含 `OtherComponent` 组件的包。

        `React.lazy` 接受一个函数，这个函数需要动态调用 `import()`。它必须返回一个 `Promise`，该 Promise 需要 resolve 一个 `default` export 的 React 组件。

        然后应在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。

        ```jsx
        import React, { Suspense } from "react";
        
        const OtherComponent = React.lazy(() => import("./Card"));
        
        export default function MyComponent() {
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <OtherComponent />
                    </Suspense>
                </div>
            );
        }
        ```

        `fallback` 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 `Suspense` 组件置于懒加载组件之上的任何位置。你甚至可以用一个 `Suspense` 组件包裹多个懒加载组件。

        ```jsx
        import React, { Suspense } from "react";
        
        const OtherComponent = React.lazy(() => import("./Card"));
        const AnotherComponent = React.lazy(() => import("./MusicPlayer"));
        
        export function MyComponent2() {
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <OtherComponent />
                        <AnotherComponent />
                    </Suspense>
                </div>
            );
        }
        ```

        

    - 异常捕获边界 Error boundaries

        如果模块加载失败（如网络问题），它会触发一个错误。你可以通过[异常捕获边界（Error boundaries）](https://zh-hans.reactjs.org/docs/error-boundaries.html)技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。

        ```jsx
        import React, { Suspense } from "react";
        import MyErrorBoundary from "./MyErrorBoundary";
        
        const OtherComponent = React.lazy(() => import("./Card"));
        const AnotherComponent = React.lazy(() => import("./MusicPlayer"));
        
        const MyComponent3 = () => (
            <div>
                <MyErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <OtherComponent />
                            <AnotherComponent />
                        </section>
                    </Suspense>
                </MyErrorBoundary>
            </div>
        );
        ```

        

    - 

- **基于路由的代码分割**

    决定在哪引入代码分割需要一些技巧。你需要确保选择的位置能够均匀地分割代码包而不会影响用户体验。

    一个不错的选择是从路由开始。大多数网络用户习惯于页面之间能有个加载切换过程。你也可以选择重新渲染整个页面，这样您的用户就不必在渲染的同时再和页面上的其他元素进行交互。

    这里是一个例子，展示如何在你的应用中使用 `React.lazy` 和 [React Router](https://react-router.docschina.org/) 这类的第三方库，来配置基于路由的代码分割。

    ```jsx
    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    
    const Home = lazy(() => import('./routes/Home'));
    const About = lazy(() => import('./routes/About'));
    
    const App = () => (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Suspense>
      </Router>
    );
    ```

    

- **命名导出  Named Exports**

    `React.lazy` 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件。

    ```jsx
    // ManyComponents.js
    export const MyComponent = /* ... */;
    export const MyUnusedComponent = /* ... */;
    ```

    ```jsx
    // MyComponent.js
    export { MyComponent as default } from "./ManyComponents.js";
    ```

    ```jsx
    // MyApp.js
    import React, { lazy } from 'react';
    const MyComponent = lazy(() => import("./MyComponent.js"));
    ```

### 2.3 Context

**Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。**

在一个典型的 React 应用中，**数据是通过 props  属性自上而下（由父及子）进行传递的**，但此种用法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI  主题），这些属性是应用程序中许多组件都需要的。**Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递  props。**

#### 2.3.1 何时使用 Context

**Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据**，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

```jsx
class App extends React.Component {
    render() {
        return <Toolbar theme="dark" />;
    }
}
function Toolbar(props) {
    // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
    // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
    // 因为必须将这个值层层传递所有组件。
    return (
        <div>
            <ThemedButton theme={props.theme} />
        </div>
    );
}

class ThemedButton extends React.Component {
    render() {
        return <Button theme={this.props.theme} />;
    }
}
```

使用 context, 我们可以避免通过中间元素传递 props：

```jsx
// 使用 Context
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext("light");

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="blue-dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = ThemeContext;
    render() {
        return <button theme={this.context}>{this.context}</button>;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

#### 2.3.2 使用 Context 之前的考虑

**Context 主要应用场景在于 *很多* 不同层级的组件需要访问同样一些的数据**。请谨慎使用，因为这会使得组件的复用性变差。

**如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)有时候是一个比 context 更好的解决方案。**

比如，考虑这样一个 `Page` 组件，它层层向下传递 `user` 和 `avatarSize` 属性，从而让深度嵌套的 `Link` 和 `Avatar` 组件可以读取到这些属性：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果在最后只有 `Avatar` 组件真的需要 `user` 和 `avatarSize`，那么层层传递这两个 props 就显得非常冗余。而且一旦 `Avatar` 组件需要更多从来自顶层组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

一种**无需 context** 的解决方案是 [将 `Avatar` 组件自身传递下去](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)，因而中间组件无需知道 `user` 或者 `avatarSize` 等 props：

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

这种变化下，只有最顶部的 Page 组件需要知道 `Link` 和 `Avatar` 组件是如何使用 `user` 和 `avatarSize` 的。

这种对组件的 *控制反转* 减少了在你的应用中要传递的 props  数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，[正如这里的文档所列举的](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)

```jsx
function Page(props) {
    const user = props.user;
    const content = <Feed user={user} />;
    const topBar = (
        <NavigationBar>
            <Link href={user.permalink}>
                <Avatar user={user} size={props.avatarSize} />
            </Link>
        </NavigationBar>
    );
    return (
        <PageLayout
            topBar={topBar}
            content={content}
            />
    );
}
```

这种模式足够覆盖很多场景了，在这些场景下你需要将子组件和直接关联的父组件解耦。如果子组件需要在渲染前和父组件进行一些交流，你可以进一步使用 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。

但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context  能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。使用 context  的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。

#### 2.3.3 API

- **`React.createContext`**

    ```jsx
    const MyContext = React.createContext(defaultValue);
    ```

    创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

    **只有**当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 `undefined` 传递给 Provider 的 value 时，消费组件的 `defaultValue` 不会生效。

- **`Context.Provider`**

    ````jsx
    <MyContext.Provider value={/* 某个值 */}>
    ````

    每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

    Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

    当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 [.contextType](https://zh-hans.reactjs.org/docs/context.html#classcontexttype) 和 [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)）的传播不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。

    通过新旧值检测来确定变化，使用了与 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 相同的算法。

    > **注意**
    >
    > 当传递对象给 `value` 时，检测变化的方式会导致一些问题：详见[注意事项](https://zh-hans.reactjs.org/docs/context.html#caveats)。

    

- **`React.contextType`**

    ```jsx
    class MyClass extends React.Component {
        componentDidMount() {
            let value = this.context;
            /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
        }
        componentDidUpdate() {
            let value = this.context;
            /* ... */
        }
        componentWillUnmount() {
            let value = this.context;
            /* ... */
        }
        render() {
            let value = this.context;
            /* 基于 MyContext 组件的值进行渲染 */
        }
    }
    MyClass.contextType = MyContext;
    ```

    挂载在 class 上的 `contextType` 属性可以赋值为由 [`React.createContext()`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。此属性可以让你使用 `this.context` 来获取最近 Context 上的值。你可以在任何生命周期中访问到它，包括 render 函数中。

    > **注意**：
    >
    > 你只通过该 API 订阅单一 context。如果你想订阅多个，阅读[使用多个 Context](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts) 章节
    >
    > 如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 `static` 这个类属性来初始化你的 `contextType`

    ```jsx
    class MyClass extends React.Component {
        static contextType = MyContext;
        render() {
            let value = this.context;
            /* 基于这个值进行渲染工作 */
        }
    }
    ```

    

- **`Context.Consumer`**

    ```jsx
    <MyContext.Consumer>
        {value => /* 基于 context 值进行渲染*/}
    </MyContext.Consumer>
    ```

    一个 React 组件可以订阅 context 的变更，此组件可以让你在[函数式组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)中可以订阅 context。

    这种方法需要一个[函数作为子元素（function as a child）](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 `value` 值等价于组件树上方离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

    > **注意**
    >
    > 想要了解更多关于 “函数作为子元素（function as a child）” 模式，详见 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。

- **`Context.displayName`**

    context 对象接受一个名为 `displayName` 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

    示例，下述组件在 DevTools 中将显示为 MyDisplayName：

    ```jsx
    const MyContext = React.createContext(/* some value */);
    MyContext.displayName = 'MyDisplayName';
    
    <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
    <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
    ```

    

#### 2.3.4 示例

- **动态 Context**

    一个更加复杂的方案是对上面的 theme 例子使用动态值（dynamic values）：

    - theme-context.js

          ```jsx
          import React from "react";
          
          export const themes = {
              light: {
                  foreground: "#000000",
                  background: "#eeeeee",
              },
              dark: {
                  foreground: "#ffffff",
                  background: "#222222",
              },
          };
          
          export const ThemeContext = React.createContext(themes.light);
          
          ```

        

    - themed-button.js

        ```jsx
        import { ThemeContext } from "./theme-context";
        
        import React, { Component } from "react";
        
        export default class ThemedButton extends Component {
            static contextType = ThemeContext;
            render() {
                let props = this.props;
                let theme = this.context;
                return (
                    <button {...props} style={{ backgroundColor: theme.background }} />
                );
            }
        }
        
        ```

        

    - app.js

        ```jsx
        import { ThemeContext, themes } from "./theme-context";
        import ThemedButton from "./themed-button";
        import React from "react";
        
        function Toolbar(props) {
            return (
                <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
            );
        }
        
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    theme: themes.light,
                };
                this.toggleTheme = () => {
                    this.setState((state) => ({
                        theme: state.theme === themes.dark ? themes.light : themes.dark,
                    }));
                };
            }
            render() {
                return (
                    <div>
                        <ThemeContext.Provider value={this.state.theme}>
                            <Toolbar changeTheme={this.toggleTheme} />
                        </ThemeContext.Provider>
        				<section>
        					<ThemedButton>themed button</ThemedButton>
        				</section>
                    </div>
                );
            }
        }
        
        export default App;
        
        ```

        

- **在嵌套组件中更新 Context**

    从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。在这种场景下，你可以通过 context 传递一个函数，使得 consumers 组件更新 context：

    - them-context.js

        ```jsx
        // 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
        export const ThemeContext = React.createContext({
            theme: themes.light,
            toggleTheme: () => {},
        });
        ```

        

    - theme-toggle-button.js

        ```jsx
        import { ThemeContext } from "./theme-context";
        
        function ThemeTogglerButton() {
            return (
                <ThemeContext.Consumer>
                    {({ theme, toggleTheme }) => (
                        <button
                            onClick={toggleTheme}
                            style={{ backgroundColor: theme.background }}
                        >
                            Toggle Theme
                        </button>
                    )}
                </ThemeContext.Consumer>
            );
        }
        
        export default ThemeTogglerButton;
        
        ```

        

    - App.js

        ```jsx
        import { ThemeContext, themes } from "./theme-context";
        import ThemeTogglerButton from "./theme-toggle-button";
        import React from "react";
        
        function Content() {
            return (
                <div>
                    <ThemeTogglerButton />
                </div>
            );
        }
        
        class App extends React.Component {
            constructor(props) {
                super(props);
        
                this.toggleTheme = () => {
                    this.setState((state) => ({
                        theme: state.theme === themes.dark ? themes.light : themes.dark,
                    }));
                };
                this.state = {
                    toggleTheme: this.toggleTheme,
                    theme: themes.light,
                };
            }
        
            render() {
                return (
                    <ThemeContext.Provider value={this.state}>
                        <Content />
                    </ThemeContext.Provider>
                );
            }
        }
        
        export default App;
        ```

        

    - 

- **消费多个 Context**

    为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

    ```jsx
    // Theme context，默认的 theme 是 “light” 值
    const ThemeContext = React.createContext("light");
    
    // 用户登录 context
    const UserContext = React.createContext({
        name: "Guest",
    });
    
    class App extends React.Component {
        render() {
            const { signedInUser, theme } = this.props;
    
            // 提供初始 context 值的 App 组件
            return (
                <ThemeContext.Provider value={theme}>
                    <UserContext.Provider value={signedInUser}>
                        <Layout />
                    </UserContext.Provider>
                </ThemeContext.Provider>
            );
        }
    }
    
    function Layout() {
        return (
            <div>
                <Sidebar />
                <Content />
            </div>
        );
    }
    
    // 一个组件可能会消费多个 context
    function Content() {
        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <UserContext.Consumer>
                        {(user) => (
                            <ProfilePage user={user} theme={theme} />
                        )}
                    </UserContext.Consumer>
                )}
            </ThemeContext.Consumer>
        );
    }
    
    ReactDOM.render(<App />, document.getElementById("root"));
    ```

    如果两个或者更多的 context 值经常被一起使用，那你可能要考虑一下另外创建你自己的渲染组件，以提供这些值。

#### 2.3.5 注意事项

因为 context 会根据引用标识来决定何时进行渲染（本质上是 `value` 属性值的浅比较），所以这里可能存在一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 `value` 属性总是被赋值为新的对象：

```jsx
class App extends React.Component {
    render() {
        return (
            <MyContext.Provider value={{ something: "something" }}>
                <Toolbar />
            </MyContext.Provider>
        );
    }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：

```jsx
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: { something: "something" },
        };
    }

    render() {
        return (
            <MyContext.Provider value={this.state.value}>
                <Toolbar />
            </MyContext.Provider>
        );
    }
}
```

### 2.4 错误边界

过去，组件内的 JavaScript 错误会导致 React 的内部状态被破坏，并且在下一次渲染时 [产生](https://github.com/facebook/react/issues/4026) [可能无法追踪的](https://github.com/facebook/react/issues/6895) [错误](https://github.com/facebook/react/issues/8579)。这些错误基本上是由较早的其他代码（非 React 组件代码）错误引起的，但 React 并没有提供一种在组件中优雅处理这些错误的方式，也无法从错误中恢复。

#### 2.4.1错误边界 Error boundaries

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

错误边界是一种 React 组件，这种组件**可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI**，而并不会渲染那些发生崩溃的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

> **注意**
>
> 错误边界**无法**捕获以下场景中产生的错误：
>
> - 事件处理（[了解更多](https://zh-hans.reactjs.org/docs/error-boundaries.html#how-about-event-handlers)）
> - 异步代码（例如 `setTimeout` 或 `requestAnimationFrame` 回调函数）
> - 服务端渲染
> - 它自身抛出来的错误（并非它的子组件）

如果一个 class 组件中定义了 [`static getDerivedStateFromError()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromerror) 或 [`componentDidCatch()`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch) 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息。

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log("error:", error);
        console.log("errorInfo:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>ooops, you got some errors</h1>;
        } else {
            return this.props.children;
        }
    }
}
```

然后你可以将它作为一个常规组件去使用：

```jsx
function App(props) {
    return (
        <ErrorBoundary>
            <Profile />
        </ErrorBoundary>
    );
}
```

错误边界的工作方式类似于 JavaScript 的 `catch {}`，**不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件**。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

注意**错误边界仅可以捕获其子组件的错误**，**它无法捕获其自身的错误**。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 `catch {}` 的工作机制。

#### 2.4.2 在线演示

查看使用 [React 16](https://zh-hans.reactjs.org/blog/2017/09/26/react-v16.0.html) [定义和使用错误边界的例子](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)。

#### 2.4.3 错误边界放置位置

错误边界的粒度由你来决定，可以将其包装在最顶层的路由组件并为用户展示一个 “Something went wrong” 的错误信息，就像服务端框架经常处理崩溃一样。你也可以将单独的部件包装在错误边界以保护应用其他部分不崩溃。

#### 2.4.4 未捕获错误 （Uncaught Errors) 的新行为

这一改变具有重要意义，**自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。**

根据我们的经验，把一个错误的 UI 留在那比完全移除它要更糟糕。例如，在类似 Messenger 的产品中，把一个异常的 UI 展示给用户可能会导致用户将信息错发给别人。同样，对于支付类应用而言，显示错误的金额也比不呈现任何内容更糟糕。

鼓励使用 JS 错误报告服务（或自行构建）

#### 2.4.5 组件栈追踪

在开发环境下，React 16 会把渲染期间发生的所有错误打印到控制台，即使该应用意外的将这些错误掩盖。除了错误信息和 JavaScript 栈外，React 16 还提供了组件栈追踪。现在你可以准确地查看发生在组件树内的错误信息：

![Error caught by Error Boundary component](https://i.loli.net/2021/10/15/1TlLOKkJFfzUS3j.png)

你也可以在组件栈追踪中查看文件名和行号，这一功能在 [Create React App](https://github.com/facebookincubator/create-react-app) 项目中默认开启：

![Error caught by Error Boundary component with line numbers](https://i.loli.net/2021/10/15/OestxDL5XVmCKAd.png)

如果你没有使用 Create React App，可以手动将[该插件](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-source)添加到你的 Babel 配置中。注意它仅用于开发环境，**在生产环境必须将其禁用** 。

> **注意**
>
> 组件名称在栈追踪中的显示依赖于 [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) 属性。如果你想要支持尚未提供该功能的旧版浏览器和设备（例如 IE 11），考虑在你的打包（bundled）应用程序中包含一个 `Function.name` 的 polyfill，如 [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name) 。或者，你可以在所有组件上显式设置 [`displayName`](https://zh-hans.reactjs.org/docs/react-component.html#displayname) 属性。

#### 2.4.6 关于 `try/catch`

`try` / `catch` 很棒但它仅能用于命令式代码（imperative code）：

```jsx
try {
    showButton();
} catch (error) {
    // ...
}
```

**然而，React 组件是声明式的并且具体指出 *什么* 需要被渲染：**

```jsx
<Button />
```

错误边界保留了 React 的声明性质，其行为符合你的预期。例如，即使一个错误发生在 `componentDidUpdate` 方法中，并且由某一个深层组件树的 `setState` 引起，其仍然能够冒泡到最近的错误边界。

#### 2.4.7 关于事件处理器

错误边界**无法**捕获事件处理器内部的错误。

React 不需要错误边界来捕获事件处理器中的错误。与 `render` 方法和生命周期方法不同，事件处理器不会在渲染期间触发。因此，如果它们抛出异常，React 仍然能够知道需要在屏幕上显示什么。

如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript `try` / `catch` 语句：

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        try {      
            // 执行操作，如有错误则会抛出    
        } catch (error) {      
            this.setState({ error });   
        } 
    }

    render() {
        if (this.state.error) {    
            return <h1>Caught an error.</h1>  
        }    
        return <button onClick={this.handleClick}>Click Me</button>
    }
}
```

### 2.5 Refs 转发

**Ref 转发是一项将 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 自动地通过组件传递到其一子组件的技巧**。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。

#### 2.5.1 转发 refs 到 DOM 组件

考虑这个渲染原生 DOM 元素 `button` 的 `FancyButton` 组件：

```jsx
function FancyButton(props) {
    return (
        <button className="FancyButton">
            {props.children}
        </button>
    );
}
```

React 组件隐藏其实现细节，包括其渲染结果。其他使用 `FancyButton` 的组件 **通常不需要** 获取内部的 DOM 元素 `button` 的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)。这很好，因为这防止组件过度依赖其他组件的 DOM 结构。

虽然这种封装对类似 `FeedStory` 或 `Comment` 这样的应用级组件是理想的，但其对 `FancyButton` 或 `MyTextInput` 这样的高可复用“叶”组件来说可能是不方便的。这些组件倾向于在整个应用中以一种类似常规 DOM `button` 和 `input` 的方式被使用，并且访问其 DOM 节点对管理焦点，选中或动画来说是不可避免的。

**Ref 转发是一个可选特性，其允许某些组件接收 `ref`，并将其向下传递（换句话说，“转发”它）给子组件。**

在下面的示例中，`FancyButton` 使用 `React.forwardRef` 来获取传递给它的 `ref`，然后转发到它渲染的 DOM `button`：

```jsx
const ref = React.createRef();
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

function App() {
    return <FancyButton ref={ref}>Click Me!</FancyButton>;
}
```

这样，使用 `FancyButton` 的组件可以获取底层 DOM 节点 `button` 的 ref ，并在必要时访问，就像其直接使用 DOM `button` 一样。

以下是对上述示例发生情况的逐步解释：

1. 我们通过调用 `React.createRef` 创建了一个 [React ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 并将其赋值给 `ref` 变量。
2. 我们通过指定 `ref` 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。
3. React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其第二个参数。
4. 我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
5. 当 ref 挂载完成，`ref.current` 将指向 `<button>` DOM 节点。

> **注意**
>
> 第二个参数 `ref` 只在使用 `React.forwardRef` 定义组件时存在。常规函数和 class 组件不接收 `ref` 参数，且 props 中也不存在 `ref`。
>
> Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

#### 2.5.2 组件库维护者的注意事项

**当你开始在组件库中使用 `forwardRef` 时，你应当将其视为一个破坏性更改，并发布库的一个新的主版本。** 这是因为你的库可能会有明显不同的行为（例如 refs 被分配给了谁，以及导出了什么类型），并且这样可能会导致依赖旧行为的应用和其他库崩溃。

出于同样的原因，当 `React.forwardRef` 存在时有条件地使用它也是不推荐的：它改变了你的库的行为，并在升级 React 自身时破坏用户的应用。

#### 2.5.3 在高阶组件中转发 refs

这个技巧对 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)（也被称为 HOC）特别有用。让我们从一个输出组件 props 到控制台的 HOC 示例开始：

```jsx
function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(preProps) {
            console.log("old props:", prevProps);
            console.log("new props:", this.props);
        }
    }

    render() {
        return (
            <WrappedComponent {...this.props}/>
        )
    }
}
```

“logProps” HOC 透传（pass through）所有 `props` 到其包裹的组件，所以渲染结果将是相同的。例如：我们可以使用该 HOC 记录所有传递到 “fancy button” 组件的 props：

```jsx
class FancyButton extends React.Component {
    focus() {
        // ...
    }

    // ...
}

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
export default logProps(FancyButton);
```

下面的示例有一点需要注意：refs 将不会透传下去。这是因为 `ref` 不是 prop 属性。就像 `key` 一样，其被 React 进行了特殊处理。如果你对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。

这意味着用于我们 `FancyButton` 组件的 refs 实际上将被挂载到 `LogProps` 组件：

```jsx
import FancyButton from './FancyButton';

const ref = React.createRef();
// 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
// 尽管渲染结果将是一样的，
// 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
// 这意味着我们不能调用例如 ref.current.focus() 这样的方法
<FancyButton
    label="Click Me"
    handleClick={handleClick}
    ref={ref}/>;
```

幸运的是，我们可以使用 `React.forwardRef` API 明确地将 refs 转发到内部的 `FancyButton` 组件。`React.forwardRef` 接受一个渲染函数，其接收 `props` 和 `ref` 参数并返回一个 React 节点。例如：

```jsx
function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const {forwardedRef, ...rest} = this.props;
            // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
            return <Component ref={forwardedRef} {...rest} />;    }
    }

    // 注意 React.forwardRef 回调的第二个参数 “ref”。
    // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
    // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
    return React.forwardRef((props, ref) => {    
        return <LogProps {...props} forwardedRef={ref} />;  
    });
}
```

#### 2.5.4 在 Devtools 中显示自定义名称

`React.forwardRef` 接受一个渲染函数。React DevTools 使用该函数来决定为 ref 转发组件显示的内容。

例如，以下组件将在 DevTools 中显示为 “*ForwardRef*”：

```jsx
const WrappedComponent = React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
});
```

如果你命名了渲染函数，DevTools 也将包含其名称（例如 “*ForwardRef(myFunction)*”）：

```jsx
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```

你甚至可以设置函数的 `displayName` 属性来包含被包裹组件的名称：

```jsx
function logProps(Component) {
    class LogProps extends React.Component {
        // ...
    }

    function forwardRef(props, ref) {
        return <LogProps {...props} forwardedRef={ref} />;
    }

    // 在 DevTools 中为该组件提供一个更有用的显示名。
    // 例如 “ForwardRef(logProps(MyComponent))”
    const name = Component.displayName || Component.name;  
    forwardRef.displayName = `logProps(${name})`;
    return React.forwardRef(forwardRef);
}
```

### 2.6 Fragments

React 中的一个常见模式是一个组件返回多个元素。

**Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。**

```jsx
render() {
    return (
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    );
}
```

还有一种新的 [短语法](https://zh-hans.reactjs.org/docs/fragments.html#short-syntax) 可用于声明它们。

```jsx
class Columns extends React.Component {
    render() {
        return (
            <>        
            <td>Hello</td>
            <td>World</td>
            </>    
        );
    }
}
```

#### 2.6.1 动机

一种常见模式是组件返回一个子元素列表。以此 React 代码片段为例：

```jsx
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        );
    }
}
```

`<Columns />` 需要返回多个 `<td>` 元素以使渲染的 HTML 有效。如果在 `<Columns />` 的 `render()` 中使用了父 div，则生成的 HTML 将无效。

```jsx
class Columns extends React.Component {
    render() {
        return (
            <div>
                <td>Hello</td>
                <td>World</td>
            </div>
        );
    }
}
```

得到一个 `<Table />` 输出：

```jsx
<table>
    <tr>
        <div>
            <td>Hello</td>
            <td>World</td>
        </div>
    </tr>
</table>
```

![image-20211015140644560](https://i.loli.net/2021/10/15/fnA5ZbrRuX3Q4Lc.png)

Fragments 解决了这个问题。

#### 2.6.2 用法

```jsx
// 使用 Fragment
class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        );
    }
}
```

这样可以正确的输出 `<Table />`：

![image-20211015140754605](https://i.loli.net/2021/10/15/l7fyum8JcpiX3GU.png)

- 短语法

    ```jsx
    // 使用 Fragment 短语法
    class Columns extends React.Component {
        render() {
            return (
                <>
                <td>Hello</td>
                <td>World</td>
                </>
            );
        }
    }
    ```

    你可以像使用任何其他元素一样使用 `<> </>`，除了它不支持 key 或属性。

- 带 key 的 Fragments

    使用显式 `<React.Fragment>` 语法声明的片段可能具有 key。一个使用场景是将一个集合映射到一个 Fragments 数组 - 举个例子，创建一个描述列表：

    ```jsx
    function Glossary(props) {
        return (
            <dl>
                {props.items.map((item) => (
                    <React.Fragment key={item.id}>
                        <dt>{item.term}</dt>
                        <dt>{item.description}</dt>
                    </React.Fragment>
                ))}
            </dl>
        );
    }
    ```

    `key` 是唯一可以传递给 `Fragment` 的属性。未来我们可能会添加对其他属性的支持，例如事件。

- 在线 Demo

    你可以在 [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000) 中尝试这个新的 JSX Fragment 语法。

### 2.7 高阶组件

**高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。**

具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

HOC 在 React 的第三方库中很常见，例如 Redux 的 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) 和 Relay 的 [`createFragmentContainer`](https://relay.dev/docs/v10.1.3/fragment-container/#createfragmentcontainer)。

#### 2.7.1 使用 HOC 解决横切关注点问题

**组件是 React 中代码复用的基本单元**。但你会发现某些模式并不适合传统组件。

例如，假设有一个 `CommentList` 组件，它订阅外部数据源，用以渲染评论列表：

```jsx
class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            // 假设 "DataSource" 是个全局范围内的数据源变量
            comments: DataSource.getComments()
        };
    }

    componentDidMount() {
        // 订阅更改
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        // 当数据源更新时，更新组件状态
        this.setState({
            comments: DataSource.getComments()
        });
    }

    render() {
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        );
    }
}
```

稍后，编写了一个用于订阅单个博客帖子的组件，该帖子遵循类似的模式：

```jsx
class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render() {
        return <TextBlock text={this.state.blogPost} />;
    }
}
```

`CommentList` 和 `BlogPost` 不同 - 它们在 `DataSource` 上调用不同的方法，且渲染不同的结果。但它们的大部分实现都是一样的：

- 在挂载时，向 `DataSource` 添加一个更改侦听器。
- 在侦听器内部，当数据源发生变化时，调用 `setState`。
- 在卸载时，删除侦听器。

你可以想象，在一个大型应用程序中，这种订阅 `DataSource` 和调用 `setState` 的模式将一次又一次地发生。我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。

对于订阅了 `DataSource` 的组件，比如 `CommentList` 和 `BlogPost`，我们可以编写一个创建组件函数。该函数将接受一个子组件作为它的其中一个参数，该子组件将订阅数据作为 prop。让我们调用函数 `withSubscription`：

```jsx
const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

第一个参数是被包装组件。第二个参数通过 `DataSource` 和当前的 props 返回我们需要的数据。

当渲染 `CommentListWithSubscription` 和 `BlogPostWithSubscription` 时， `CommentList` 和 `BlogPost` 将传递一个 `data` prop，其中包含从 `DataSource` 检索到的最新数据：

```jsx
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
    // ...并返回另一个组件...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            // ...负责订阅相关的操作...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // ... 并使用新数据渲染被包装的组件!
            // 请注意，我们可能还会传递其他属性
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}
```

**请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。** **相反，HOC 通过将组件*包装*在容器组件中来*组成*新组件。HOC 是纯函数，没有副作用。**

被包装组件接收来自容器组件的所有 prop，同时也接收一个新的用于 render 的 `data` prop。HOC 不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的。

因为 `withSubscription` 是一个普通函数，你可以根据需要对参数进行增添或者删除。例如，您可能希望使 `data` prop 的名称可配置，以进一步将 HOC 与包装组件隔离开来。或者你可以接受一个配置 `shouldComponentUpdate` 的参数，或者一个配置数据源的参数。因为 HOC 可以控制组件的定义方式，这一切都变得有可能。

与组件一样，`withSubscription` 和包装组件之间的契约完全基于之间传递的 props。这种依赖方式使得替换 HOC 变得容易，只要它们为包装的组件提供相同的 prop 即可。例如你需要改用其他库来获取数据的时候，这一点就很有用。

#### 2.7.2 不要改变原始组件，使用组合

不要试图在 HOC 中修改组件原型（或以其他方式改变它）。

```jsx
function logProps(InputComponent) {
    InputComponent.prototype.componentDidUpdate = function(prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
    };
    // 返回原始的 input 组件，暗示它已经被修改。
    return InputComponent;
}

// 每次调用 logProps 时，增强组件都会有 log 输出。
const EnhancedComponent = logProps(InputComponent);
```

这样做会产生一些不良后果。其一是输入组件再也无法像 HOC 增强之前那样使用了。更严重的是，如果你再用另一个同样会修改 `componentDidUpdate` 的 HOC 增强它，那么前面的 HOC 就会失效！同时，这个 HOC 也无法应用于没有生命周期的函数组件。

修改传入组件的 HOC 是一种糟糕的抽象方式。调用者必须知道他们是如何实现的，以避免与其他 HOC 发生冲突。

HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能：

```jsx
function logProps(WrappedComponent) {
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('Current props: ', this.props);
            console.log('Previous props: ', prevProps);
        }
        render() {
            // 将 input 组件包装在容器中，而不对其进行修改。Good!
            return <WrappedComponent {...this.props} />;
        }
    }
}
```

该 HOC 与上文中修改传入组件的 HOC 功能相同，同时避免了出现冲突的情况。它同样适用于 class 组件和函数组件。而且因为它是一个纯函数，它可以与其他 HOC 组合，甚至可以与其自身组合。

您可能已经注意到 HOC 与**容器组件模式**之间有相似之处。容器组件担任将高级和低级关注点分离的责任，由容器管理订阅和状态，并将 prop 传递给处理 UI 的组件。HOC 使用容器作为其实现的一部分，你可以将 HOC 视为参数化容器组件。

#### 2.7.3 约定：将不相关的 props 传递给被包裹的组件

HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。

HOC 应该透传与自身无关的 props。大多数 HOC 都应该包含一个类似于下面的 render 方法：

```jsx
render() {
    // 过滤掉非此 HOC 额外的 props，且不要进行透传
    const { extraProp, ...passThroughProps } = this.props;

    // 将 props 注入到被包装的组件中。
    // 通常为 state 的值或者实例方法。
    const injectedProp = someStateOrInstanceMethod;

    // 将 props 传递给被包装组件
    return (
        <WrappedComponent
            injectedProp={injectedProp}
            {...passThroughProps}
            />
    );
}
```

这种约定保证了 HOC 的灵活性以及可复用性。

#### 2.7.4 约定：最大化可组合性

并不是所有的 HOC 都一样。有时候它仅接受一个参数，也就是被包裹的组件：

```jsx
const NavbarWithRouter = withRouter(Navbar);
```

HOC 通常可以接收多个参数。比如在 Relay 中，HOC 额外接收了一个配置对象用于指定组件的数据依赖：

```jsx
const CommentWithRelay = Relay.createContainer(Comment, config);
```

最常见的 HOC 签名如下：

```jsx
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*刚刚发生了什么？！*如果你把它分开，就会更容易看出发生了什么。

```jsx
// connect 是一个函数，它的返回值为另外一个函数。
const enhance = connect(commentListSelector, commentListActions);
// 返回值为 HOC，它会返回已经连接 Redux store 的组件
const ConnectedComment = enhance(CommentList);
```

换句话说，`connect` 是一个返回高阶组件的高阶函数！

这种形式可能看起来令人困惑或不必要，但它有一个有用的属性。 像 `connect` 函数返回的单参数 HOC 具有签名 `Component => Component`。 输出类型与输入类型相同的函数很容易组合在一起。

```jsx
// 而不是这样...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... 你可以编写组合工具函数
// compose(f, g, h) 等同于 (...args) => f(g(h(...args)))
const enhance = compose(
    // 这些都是单参数的 HOC
    withRouter,
    connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

（同样的属性也允许 `connect` 和其他 HOC 承担装饰器的角色，装饰器是一个实验性的 JavaScript 提案。）

许多第三方库都提供了 `compose` 工具函数，包括 lodash （比如 [`lodash.flowRight`](https://lodash.com/docs/#flowRight)）， [Redux](https://redux.js.org/api/compose) 和 [Ramda](https://ramdajs.com/docs/#compose)。

#### 2.7.5 约定：包装显示名称以便轻松调试

HOC 创建的容器组件会与任何其他组件一样，会显示在 [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) 中。为了方便调试，请选择一个显示名称，以表明它是 HOC 的产物。

最常见的方式是用 HOC 包住被包装组件的显示名称。比如高阶组件名为 `withSubscription`，并且被包装组件的显示名称为 `CommentList`，显示名称应该为 `WithSubscription(CommentList)`：

```jsx
function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {/* ... */}
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

#### 2.7.6 注意事项

- 不要在 `render` 方法中使用 HOC

    React 的 diff 算法（称为[协调](https://zh-hans.reactjs.org/docs/reconciliation.html)）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 `render` 返回的组件与前一个渲染中的组件相同（`===`），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。

    通常，你不需要考虑这点。但对 HOC 来说这一点很重要，因为这代表着你不应在组件的 render 方法中对一个组件应用 HOC：

    ```jsx
    render() {
        // 每次调用 render 函数都会创建一个新的 EnhancedComponent
        // EnhancedComponent1 !== EnhancedComponent2
        const EnhancedComponent = enhance(MyComponent);
        // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
        return <EnhancedComponent />;
    }
    ```

    这不仅仅是性能问题 - **重新挂载组件会导致该组件及其所有子组件的状态丢失**。

    如果在组件之外创建 HOC，这样一来组件只会创建一次。因此，每次 render 时都会是同一个组件。一般来说，这跟你的预期表现是一致的。

    在极少数情况下，你需要动态调用 HOC。你可以在组件的生命周期方法或其构造函数中进行调用

- 务必复制静态方法

    有时在 React 组件上定义静态方法很有用。例如，Relay 容器暴露了一个静态方法 `getFragment` 以方便组合 GraphQL 片段。

    但是，当你将 HOC 应用于组件时，原始组件将使用容器组件进行包装。这意味着新组件没有原始组件的任何静态方法。

    ```jsx
    // 定义静态函数
    WrappedComponent.staticMethod = function() {/*...*/}
    // 现在使用 HOC
    const EnhancedComponent = enhance(WrappedComponent);
    
    // 增强组件没有 staticMethod
    typeof EnhancedComponent.staticMethod === 'undefined' // true
    ```

    为了解决这个问题，你可以在返回之前把这些方法拷贝到容器组件上：

    ```jsx
    function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        // 必须准确知道应该拷贝哪些方法 :(
        Enhance.staticMethod = WrappedComponent.staticMethod;
        return Enhance;
    }
    ```

    但要这样做，你需要知道哪些方法应该被拷贝。你可以使用 [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) 自动拷贝所有非 React 静态方法:

    ```jsx
    import hoistNonReactStatic from 'hoist-non-react-statics';
    function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        hoistNonReactStatic(Enhance, WrappedComponent);
        return Enhance;
    }
    ```

    除了导出组件，另一个可行的方案是再额外导出这个静态方法。

    ```jsx
    // 使用这种方式代替...
    MyComponent.someFunction = someFunction;
    export default MyComponent;
    
    // ...单独导出该方法...
    export { someFunction };
    
    // ...并在要使用的组件中，import 它们
    import MyComponent, { someFunction } from './MyComponent.js';
    ```

    

- Refs 不会被传递

    虽然高阶组件的约定是将所有 props 传递给被包装组件，但这对于 refs 并不适用。那是因为 `ref` 实际上并不是一个 prop - 就像 `key` 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件

    这个问题的解决方案是通过使用 `React.forwardRef` API（React 16.3 中引入）



### 2.8 与第三方库协同

React 可以被用于任何 web 应用中。它可以被嵌入到其他应用，且需要注意，其他的应用也可以被嵌入到 React。

#### 2.8.1 集成带有 DOM 操作的插件

React 不会理会 React 自身之外的 DOM 操作。它根据内部虚拟 DOM 来决定是否需要更新，而且如果同一个 DOM 节点被另一个库操作了，React 会觉得困惑而且没有办法恢复。

这并不意味着 React 与其他操作 DOM 的方式不能结合，也不一定结合困难，只不过需要你去关注每个库所做的事情。

避免冲突的最简单方式就是防止 React 组件更新。你可以渲染无需更新的 React 元素，比如一个空的 `<div />`。

- **如何解决这个问题**

    为了证明这一点，我来草拟一个用于通用 jQuery 插件的 wrapper

    我们会添加一个 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 到这个根 DOM 元素。 在 `componentDidMount` 中，我们能够获取它的引用这样我们就可以把它传递给 jQuery 插件了。

    为了防止 React 在挂载之后去触碰这个 DOM，我们会从 `render()` 函数返回一个空的 `<div />`。这个 `<div />` 元素既没有属性也没有子元素，所以 React 没有理由去更新它，使得 jQuery 插件可以自由的管理这部分的 DOM：

    ```jsx
    class SomePlugin extends React.Component {
        componentDidMount() {
            this.$el = $(this.el);
            this.$el.somePlugin();
        }
        componentWillUnmount() {
            this.$el.somePlugin("destroy");
        }
        render() {
            return <div ref={(el) => (this.el = el)} />;
        }
    }
    ```

    注意我们同时定义了 `componentDidMount` 和 `componentWillUnmount` [生命周期函数](https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle)。许多 jQuery 插件绑定事件监听到 DOM 上，所以在 `componentWillUnmount` 中注销监听是很重要的。如果这个插件没有提供一个用于清理的方法，你很可能会需要自己来提供一个，为了避免内存泄漏要记得把所有插件注册的监听都移除掉。

- **集成 jQuery Chosen 插件**

    对于应用这些概念的更具体的一个例子，我们给这个用于增强 `<select>` 输入的 [Chosen](https://harvesthq.github.io/chosen/) 插件写一个最小的 wrapper。

    > **注意**：
    >
    > 仅仅是因为可能，但这并不意味着这是构建 React 应用的最佳方式。我们鼓励大家尽可能的使用 React 组件。组件在 React 应用中更易于复用，并且在大多数情况下能更好地控制其行为和显示。

    首先，我们来看下 Chosen 对 DOM 做了哪些操作

    如果你在一个 `<select>` DOM 节点上调用了它，它会读取原 DOM 节点的属性，使用行内样式隐藏它，然后紧挨着这个 `<select>` 之后增加一个独立的具有它自身显示表现的 DOM 节点。然后它会在值变化的时候触发 jQuery 事件来通知我们这些变化。

    以下代码是我们最终要实现的效果：

    ```jsx
    function Example() {
        return (
            <Chosen onChange={(value) => console.log(value)}>
                <option>vanilla</option>
                <option>chocolate</option>
                <option>straberry</option>
            </Chosen>
        );
    }
    ```

    为了简化，我们将它实现为 [uncontrolled component](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)

    首先，我会创建一个空的组件，它的 `render()` 函数我们返回一个包含 `<select>` 的 `<div>`:

    ```jsx
    class Chosen extends React.Component {
        render() {
            return (
                <div>
                    <select
                        className="Chosen-select"
                        ref={(el) => (this.el = el)}
                        ></select>
                </div>
            );
        }
    }
    ```

    注意我们为什么要把 `<select>` 使用一个额外的 `<div>` 包裹起来。这是很必要的，因为 Chosen 会紧挨着我们传递给它的 `<select>` 节点追加另一个 DOM 元素。然而，对于 React 来说 `<div>` 总是只有一个子节点。这样我们就能确保 React 更新不会和 Chosen 追加的额外 DOM 节点发生冲突。在 React 工作流之外修改 DOM 是非常重大的事情，你必须确保 React 没有理由去触碰那些节点。

    接下来，我们会实现生命周期函数。我们需要在 `componentDidMount` 中使用 `<select>` 的引用初始化 Chosen，并且在 `componentWillUnmount` 中将其销毁:

    ```jsx
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.chosen();
    }
    
    componentWillUnmount() {
        this.$el.chosen("destroy");
    }
    ```

    注意 React 不会给 `this.el` 字段赋予特殊的含义。它能够工作只是因为我们之前在 `render()` 函数中把一个 `ref` 赋值给了这个字段：

    ```jsx
    <select className="Chosen-select" ref={el => this.el = el}>
    ```

    到此已经足够让我们的组件去渲染了，但我们同时希望在值变化的时候被通知到。要做到这点，我们需要在订阅由 Chosen 管理的 `<select>` 上的 jQuery `change` 事件。

    我们不直接把 `this.props.onChange` 传递给 Chosen 是因为组件的 props 可能随时变化，并且这也包括事件处理函数。对应的，我们会定义一个 `handleChange()` 方法来调用 `this.props.onChange`，并且订阅 jQuery 的 `change` 事件：

    ```jsx
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.chosen();
    
        this.handleChange = this.handleChange.bind(this);
        this.$el.on('change', this.handleChange)
    }
    
    handleChange(e) {
        this.props.onChange(e.target.value);
    }
    
    componentWillUnmount() {
        this.$el.off("change", this.handleChange);
        this.$el.chosen("destroy");
    }
    ```

    最后，还剩下一件事情需要处理。在 React 中，props 可以在不同的时间有不同的值。例如，如果父组件的状态发生变化 `<Chosen>` 组件可能得到不同的 children。这意味着从集成的角度来看，我们因应 prop 的更新而手动更新 DOM 这一点是非常重要的，因为我们已经不再使用 React 来帮我们管理 DOM 了。

    hosen 的文档建议我们使用 jQuery `trigger()` API 来通知原始 DOM 元素这些变化。我们会让 React来管理在 `<select>` 中 `this.props.children` 的更新，但是我们同样需要增加一个 `componentDidUpdate()` 生命周期函数来通知 Chosen 关于 children 列表的变化：

    ```jsx
    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            this.$el.trigger("chosen: updated");
        }
    }
    ```

    通过这种方法，当由 React 管理的 `<select>` children 改变时， Chosen 会知道如何更新它的 DOM 元素。

    `Chosen` 组件的完整实现看起来是这样的：

    ```jsx
    class Chosen extends React.Component {
        render() {
            return (
                <div>
                    <select
                        className="Chosen-select"
                        ref={(el) => (this.el = el)}
                        >
                        {this.props.children}
                    </select>
                </div>
            );
        }
        componentDidMount() {
            this.$el = $(this.el);
            this.$el.chosen();
    
            this.handleChange = this.handleChange.bind(this);
            this.$el.on("change", this.handleChange);
        }
    
        handleChange(e) {
            this.props.onChange(e.target.value);
        }
    
        componentWillUnmount() {
            this.$el.off("change", this.handleChange);
            this.$el.chosen("destroy");
        }
    
        componentDidUpdate(prevProps) {
            if (prevProps.children !== this.props.children) {
                this.$el.trigger("chosen: updated");
            }
        }
    }
    ```

    

#### 2.8.2 和其他视图库集成

得益于 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render) 的灵活性 React 可以被嵌入到其他的应用中。

虽然 React 通常被用来在启动的时候加载一个单独的根 React 组件到 DOM 上，`ReactDOM.render()` 同样可以在 UI 的独立部分上多次调用，这些部分可以小到一个按钮，也可以大到一个应用。

事实上，这正是 Facebook 如何使用 React 的。这让我们小块小块地在应用中使用 React，并且把他们结合到我们现存的服务端产生的模板和其他客户端代码中。

- 利用 React 替换基于字符串的渲染

    在旧的 web 应用中一个通用的模式就是使用一个字符串描述 DOM 块并且通过类似 `$el.html(htmlString)` 这样的方式插入到 DOM 中。代码库中的这种例子是非常适合引入 React 的。直接把基于字符串的渲染重写成 React 组件即可。

    那么下面这段 jQuery 的实现…

    ```javascript
    $('#container').html('<button id="btn">Say Hello</button>');
    $('#btn').click(function() {
      alert('Hello!');
    });
    ```

    …可以使用 React 组件重写为：

    ```jsx
    function Button() {
        return <button id="btn">Say Hello</button>;
    }
    
    ReactDOM.render(
        <Button />,
        document.getElementById('container'),
        function() {
            $('#btn').click(function() {
                alert('Hello!');
            });
    	}
    );
    ```

    从这起你可开始以把更多的逻辑移动到组件中，并且开始应用更多通用 React 实践。例如，在组件中最好不要依赖 ID 因为同一个组件可能会被渲染多次。相反的，我们会使用 [React 事件系统](https://zh-hans.reactjs.org/docs/handling-events.html) 并且直接注册 click 处理函数到 React `<button>` 元素：

    ```jsx
    function Button(props) {
        return <button onClick={props.onClick}>Say Hello</button>;
    }
    
    function HelloButton() {
        function handleClick() {    
            alert('Hello!');
        }
        return <Button onClick={handleClick} />;
    }
    
    ReactDOM.render(
        <HelloButton />,
        document.getElementById('container')
    );
    ```

    只要你喜欢你可以有不限数量的这种独立组件，并且使用 `ReactDOM.render()` 把他们渲染到不同的容器中。逐渐的，随着你把越来越多的应用转换到 React，你就可以把它们结合成更大的组件，并且把 `ReactDOM.render()` 的调用移动到更上层的结构。

- 把 React 嵌入到 Backbone 视图

    [Backbone](http://backbonejs.org/) 视图通常使用 HTML 字符串，或者产生字符串的模板函数，来创建 DOM 元素的内容。这个过程，同样的，可以通过渲染一个 React 组件来替换掉。

    如下，我们会创建一个名为 `ParagraphView` 的 Backbone 视图。他会重载 Backbone 的 `render()` 函数来渲染一个 React `<Paragraph>` 组件到 Backbone (`this.el`) 提供的 DOM 元素中。这里，同样的，我们将会使用 [`ReactDOM.render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render)：

    ```jsx
    function Paragraph(props) {
        return <p>{props.text}</p>;
    }
    
    const ParagraphView = Backbone.View.extend({
        render() {
            const text = this.model.get("text");
            ReactDOM.render(<Paragraph text={text} />, this.el);
            return this;
        },
        remove() {
            ReactDOM.unmountComponentAtNode(this.el);
            Backbone.View.prototype.remove.call(this);
        },
    });
    ```

    在 `remove` 方法中我们也需要调用 `ReactDOM.unmountComponentAtNode()` 以便在它解除的时候 React 清理组件树相关的事件处理的注册和其他的资源，这点是是很重要的。

    当一个组件在 React 树中*从内部*删除的时候，清理工作是自动完成的，但是因为我们现在手动移除整个树，我们必须调用这个方法。

#### 2.8.3 和 Model 层集成

虽然通常是推荐使用单向数据流动的，例如 [React state](https://zh-hans.reactjs.org/docs/lifting-state-up.html)，[Flux](http://facebook.github.io/flux/)，或者 [Redux](http://redux.js.org/)，React 组件也可以使用一个其他框架和库的 Model 层。

- 在 React 组件中使用 Backbone 的 Model

    在 React 组件中使用 [Backbone](http://backbonejs.org/) 的 model 和 collection 最简单的方法就是监听多种变化事件并且手动强制触发一个更新。

    负责渲染 model 的组件会监听 `'change'` 事件，而负责渲染 collection 的组件需要监听 `'add'` 和 `'remove'` 事件。在这两种情况中，调用 [`this.forceUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#forceupdate) 来使用新的数据重新渲染组件。

    在下面的例子中，`List` 组件渲染一个 Backbone collection，使用 `Item` 组件来渲染独立的项

    ```jsx
    class Item extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
        }
    
        handleChange() {
            this.forceUpdate();
        }
        componentDidMount() {
            this.props.model.on("change", this.handleChange);
        }
    
        componentWillUnmount() {
            this.props.model.off("change", this.handleChange);
        }
    
        render() {
            return <li>{this.props.model.get("text")}</li>;
        }
    }
    
    class List extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
        }
    
        handleChange() {
            this.forceUpdate();
        }
        componentDidMount() {
            this.props.collection.on(
                "add",
                "remove",
                this.handleChange
            );
        }
    
        componentWillUnmount() {
            this.props.collection.off(
                "add",
                "remove",
                this.handleChange
            );
        }
    
        render() {
            return (
                <ul>
                    {this.props.collection.map((model) => (
                        <Item key={model.cid} model={model} />
                    ))}
                </ul>
            );
        }
    }
    
    const collection = new Backbone.Collection([
        new Backbone.Model({ text: "A" }),
        new Backbone.Model({ text: "B" }),
        new Backbone.Model({ text: "C" }),
    ]);
    
    ReactDOM.render(
        <List collection={collection} />,
        document.getElementById("root")
    );
    ```

    

### 2.9 深入 JSX

实际上，JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。如下 JSX 代码：

```jsx
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```

会被编译为：

```jsx
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
)
```

如果没有子节点，你还可以使用自闭合的标签形式，如：

```jsx
<div className="sidebar" />
```

会被编译为：

```jsx
React.createElement(
    'div',
    {className: 'sidebar'}
)
```

 [在线的 Babel 编译器](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)。

#### 2.9.1 指定 React 元素类型

JSX 标签的第一部分指定了 React 元素的类型。

大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用 JSX `<Foo />` 表达式时，`Foo` 必须包含在作用域内。

- React 必须在作用域内

    由于 JSX 会编译为 `React.createElement` 调用形式，所以 `React` 库也必须包含在 JSX 代码作用域内。

    例如，在如下代码中，虽然 `React` 和 `CustomButton` 并没有被直接使用，但还是需要导入

    ```jsx
    import React from 'react';
    import CustomButton from './CustomButton';
    function WarningButton() {
        // return React.createElement(CustomButton, {color: 'red'}, null); 
        return <CustomButton color="red" />;
    }
    ```

    如果你不使用 JavaScript 打包工具而是直接通过 `<script>` 标签加载 React，则必须将 `React` 挂载到全局变量中。

- 在 JSX 类型中使用点语法

    在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。例如，如果 `MyComponents.DatePicker` 是一个组件，你可以在 JSX 中直接使用：

    ```jsx
    import React from 'react';
    
    const MyComponents = {
        DatePicker: function DatePicker(props) {
            return <div>Imagine a {props.color} datepicker here.</div>;
        }
    }
    
    function BlueDatePicker() {
        return <MyComponents.DatePicker color="blue" />;
    }
    ```

- 用户定义的组件必须以大写字母开头

    以小写字母开头的元素代表一个 HTML 内置组件，比如 `<div>` 或者 `<span>` 会生成相应的字符串 `'div'` 或者 `'span'` 传递给 `React.createElement`（作为参数）。大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如 `<Foo />` 会编译为 `React.createElement(Foo)`。

    我们建议使用大写字母开头命名自定义组件。如果你确实需要一个以小写字母开头的组件，则在 JSX 中使用它之前，必须将它赋值给一个大写字母开头的变量。

    例如，以下的代码将无法按照预期运行：

    ```jsx
    import React from 'react';
    
    // 错误！组件应该以大写字母开头：
    function hello(props) {  
        // 正确！这种 <div> 的使用是合法的，因为 div 是一个有效的 HTML 标签
        return <div>Hello {props.toWhat}</div>;
    }
    
    function HelloWorld() {
        // 错误！React 会认为 <hello /> 是一个 HTML 标签，因为它没有以大写字母开头： 
        return <hello toWhat="World" />;
    }
    ```

    要解决这个问题，我们需要重命名 `hello` 为 `Hello`，同时在 JSX 中使用 `<Hello />` ：

    ```jsx
    import React from 'react';
    
    // 正确！组件需要以大写字母开头：
    function Hello(props) {  
        // 正确！ 这种 <div> 的使用是合法的，因为 div 是一个有效的 HTML 标签：
        return <div>Hello {props.toWhat}</div>;
    }
    
    function HelloWorld() {
        // 正确！React 知道 <Hello /> 是一个组件，因为它是大写字母开头的：  
        return <Hello toWhat="World" />;
    }
    ```

- 在运行时选择类型

    你不能将通用表达式作为 React 元素类型。如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。这通常用于根据 prop 来渲染不同组件的情况下

    ```jsx
    import React from 'react';
    import { PhotoStory, VideoStory } from './stories';
    
    const components = {
        photo: PhotoStory,
        video: VideoStory
    };
    
    function Story(props) {
        // 错误！JSX 类型不能是一个表达式。  
        return <components[props.storyType] story={props.story} />;
    }
    ```

    要解决这个问题, 需要首先将类型赋值给一个大写字母开头的变量：

    ```jsx
    import React from 'react';
    import { PhotoStory, VideoStory } from './stories';
    
    const components = {
        photo: PhotoStory,
        video: VideoStory
    };
    
    function Story(props) {
        // 正确！JSX 类型可以是大写字母开头的变量。  
        const SpecificStory = components[props.storyType]; 
        return <SpecificStory story={props.story} />;
    }
    ```

#### 2.9.2 JSX 中的 Props

有多种方式可以在 JSX 中指定 props。

- JavaScript 表达式作为 Props

    你可以把包裹在 `{}` 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素。例如，如下的 JSX：

    ```jsx
    <MyComponent foo={1 + 2 + 3 + 4} />
    ```

    在 `MyComponent` 中，`props.foo` 的值等于 `1 + 2 + 3 + 4` 的执行结果 `10`。

    `if` 语句以及 `for` 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用。但是，你可以用在 JSX 以外的代码中。比如：

    ```jsx
    function NumberDescriber(props) {
        let description;
        if (props.number % 2 == 0) {    
            description = <strong>even</strong>;  
        } else {    
            description = <i>odd</i>; 
        }  
        return <div>{props.number} is an {description} number</div>;
    }
    ```

- 字符串字面量

    你可以将字符串字面量赋值给 prop. 如下两个 JSX 表达式是等价的：

    ```jwx
    <MyComponent message="hello world" />
    
    <MyComponent message={'hello world'} />
    ```

    当你将字符串字面量赋值给 prop 时，它的值是未转义的。所以，以下两个 JSX 表达式是等价的：

    ```jsx
    <MyComponent message="&lt;3" />
    
    <MyComponent message={'<3'} />
    ```

- Props 默认值为 “True”

    如果你没给 prop 赋值，它的默认值是 `true`。以下两个 JSX 表达式是等价的：

    ```jsx
    <MyTextBox autocomplete />
    
    <MyTextBox autocomplete={true} />
    ```

    通常，我们不建议不传递 value 给 prop，因为这可能与 [ES6 对象简写](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) 混淆，`{foo}` 是 `{foo: foo}` 的简写，而不是 `{foo: true}`。这样实现只是为了保持和 HTML 中标签属性的行为一致。

- 属性展开

    如果你已经有了一个 props 对象，你可以使用展开运算符 `...` 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：

    ```jsx
    function App1() {
        return <Greeting firstName="Ben" lastName="Hector" />;
    }
    
    function App2() {
        const props = {firstName: 'Ben', lastName: 'Hector'};
        return <Greeting {...props} />;
    }
    ```

    你还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。

    ```jsx
    const Button = (props) => {
        const { kind, ...other } = props;
        const className =
              kind === "primary" ? "PrimaryButton" : "SecondaryButton";
        return <button className={className} {...other} />;
    };
    
    const App = () => {
        return (
            <div>
                <Button
                    kind="primary"
                    onClick={() => {
                        console.log("clicked");
                    }}
                    >
                    Hello World!
                </Button>
            </div>
        );
    };
    ```

    在上述例子中，`kind` 的 prop 会被安全的保留，它将*不会*被传递给 DOM 中的 `<button>` 元素。 所有其他的 props 会通过 `...other` 对象传递，使得这个组件的应用可以非常灵活。你可以看到它传递了一个 `onClick` 和 `children` 属性。

    属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。

#### 2.9.3 JSX 中的子元素

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 `props.children` 传递给外层组件。有几种不同的方法来传递子元素：

- 字符串字面量

    你可以将字符串放在开始和结束标签之间，此时 `props.children` 就只是该字符串。这对于很多内置的 HTML 元素很有用。例如：

    ```jsx
    <MyComponent>Hello World!</MyComponent>
    ```

    这是一个合法的 JSX，`MyComponent` 中的 `props.children` 是一个简单的未转义字符串 `"Hello world!"`。因此你可以采用编写 HTML 的方式来编写 JSX。如下所示：

    ```jsx
    <div>This is valid HTML &amp; JSX at the same time.</div>
    ```

    JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的：

    ```jsx
    <div>Hello World</div>
    
    <div>
      Hello World
    </div>
    
    <div>
      Hello
      World
    </div>
    
    <div>
    
      Hello World
    </div>
    ```

- JSX 子元素

    子元素允许由多个 JSX 元素组成。这对于嵌套组件非常有用：

    ```jsx
    <MyContainer>
        <MyFirstComponent />
        <MySecondComponent />
    </MyContainer>
    ```

    你可以将不同类型的子元素混合在一起，因此你可以将字符串字面量与 JSX 子元素一起使用。这也是 JSX 类似 HTML 的一种表现，所以如下代码是合法的 JSX 并且也是合法的 HTML：

    ```jsx
    <div>
        Here is a list:
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>
    </div>
    ```

    React 组件也能够返回存储在数组中的一组元素：

    ```jsx
    function App() {
         // 不需要额外包裹元素
        return [
            <li key="A">First item</li>,
            <li key="B">Second item</li>,
            <li key="C">Third item</li>,
        ];
    }
    
    ReactDOM.render(<App />, document.getElementById("root"));
    ```

    ![image-20211015165724096](https://i.loli.net/2021/10/15/OXt8WM5DV4PAfoL.png)

- JavaScript 表达式作为子元素

    JavaScript 表达式可以被包裹在 `{}` 中作为子元素。例如，以下表达式是等价的：

    ```jsx
    <MyComponent>foo</MyComponent>
    
    <MyComponent>{'foo'}</MyComponent>
    ```

    这对于展示任意长度的列表非常有用。例如，渲染 HTML 列表：

    ```jsx
    function Item(props) {
        return <li>{props.message}</li>;
    }
    
    function TodoList() {
        const todos = ["finish doc", "submit pr", "nag dan to review"];
        return (
            <ul>
                {todos.map((message) => (
                    <Item key={message} message={message} />
                ))}
            </ul>
        );
    }
    
    ReactDOM.render(<TodoList />, document.getElementById("root"));
    ```

    ![image-20211015170201983](https://i.loli.net/2021/10/15/eYRUM14iKDzBmgE.png)

    JavaScript 表达式也可以和其他类型的子元素组合。这种做法可以方便地替代模板字符串：

    ```jsx
    function Hello(props) {
        return <div>Hello {props.addressee}!</div>;
    }
    ```

- 函数作为子元素

    通常，JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。不过，`props.children` 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。例如，如果你有一个自定义组件，你可以把回调函数作为 `props.children` 进行传递：

    ```jsx
    function Repeat(props) {
        let items = [];
        for (let i = 0; i < props.numTimes; ++i) {
            items.push(props.children(i));
        }
        return <div>{items}</div>;
    }
    
    function ListOfTenThings() {
        return (
            <Repeat numTimes={10}>
                {(index) => (
                    <div key={index}>
                        This is item {index} in the list
                    </div>
                )}
            </Repeat>
        );
    }
    
    ReactDOM.render(
        <ListOfTenThings />,
        document.getElementById("root")
    );
    ```

    ![image-20211015171024889](https://i.loli.net/2021/10/15/HLpCaV3eZcbjYuG.png)

    可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX

- 布尔类型、Null、Undefined 将会忽略

    `false`, `null`, `undefined`, and `true` 是合法的子元素。但它们并不会被渲染。以下的 JSX 表达式渲染结果相同：

    ```jsx
    <div />
    
    <div></div>
    
    <div>{false}</div>
    
    <div>{null}</div>
    
    <div>{undefined}</div>
    
    <div>{true}</div>
    ```

    这有助于依据特定条件来渲染其他的 React 元素。例如，在以下 JSX 中，仅当 `showHeader` 为 `true` 时，才会渲染 `<Header />` 组件：

    这有助于依据特定条件来渲染其他的 React 元素。例如，在以下 JSX 中，仅当 `showHeader` 为 `true` 时，才会渲染 `<Header />` 组件：

    ```jsx
    <div>
    	{showHeader && <Header></Heade>}
        <Content></Content>
    </div>
    ```

    值得注意的是有一些 [“falsy” 值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)，如数字 `0`，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当 `props.messages` 是空数组时，`0` 仍然会被渲染：

    ```jsx
    <div>
      {props.messages.length &&    <MessageList messages={props.messages} />
      }
    </div>
    ```

    要解决这个问题，确保 `&&` 之前的表达式总是布尔值：

    ```jsx
    <div>
      {props.messages.length > 0 &&    <MessageList messages={props.messages} />
      }
    </div>
    ```

    反之，如果你想渲染 `false`、`true`、`null`、`undefined` 等值，你需要先将它们[转换为字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion)：

    ```jsx
    <div>
      My JavaScript variable is {String(myVariable)}.
    </div>
    ```

### 2.10 性能优化

UI 更新需要昂贵的 DOM 操作，而 React 内部使用几种巧妙的技术以便最小化 DOM 操作次数。对于大部分应用而言，使用 React 时无需专门优化就已拥有高性能的用户界面。尽管如此，你仍然有办法来加速你的 React 应用。

#### 2.10.1 使用生产版本

当你需要对你的 React 应用进行 benchmark，或者遇到了性能问题，请确保你正在使用压缩后的生产版本。

React 默认包含了许多有用的警告信息。这些警告信息在开发过程中非常有帮助。然而这使得 React 变得更大且更慢，所以你需要确保部署时使用了生产版本。

如果你不能确定你的编译过程是否设置正确，你可以通过安装 [Chrome 的 React 开发者工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 来检查。如果你浏览一个基于 React 生产版本的网站，图标背景会变成深色：

![React DevTools on a website with production version of React](https://i.loli.net/2021/10/15/H8st3EThV62BZrG.png)

如果你浏览一个基于 React 开发模式的网站，图标背景会变成红色：

![React DevTools on a website with development version of React](https://i.loli.net/2021/10/15/Gv4odDIXq5Q8pnV.png)

推荐你在开发应用时使用开发模式，而在为用户部署应用时使用生产模式。

你可以在下面看到几种为应用构建生产版本的操作说明。

- Create React App

    如果你的项目是通过 [Create React App](https://github.com/facebookincubator/create-react-app) 构建的，运行：

    ```sh
    npm run build
    ```

    这段命令将在你的项目下的 `build/` 目录中生成对应的生产版本。

    注意只有在生产部署前才需要执行这个命令。正常开发使用 `npm start` 即可。

- 单文件构建

    我们提供了可以在生产环境使用的单文件版 React 和 React DOM：

    ```html
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    ```

    注意只有以 `.production.min.js` 为结尾的 React 文件适用于生产

- Brunch

    通过安装 [`terser-brunch`](https://github.com/brunch/terser-brunch) 插件，来获得最高效的 Brunch 生产构建

    ```sh
    # 如果你使用 npm
    npm install --save-dev terser-brunch
    
    # 如果你使用 Yarn
    yarn add --dev terser-brunch
    ```

    接着，在 `build` 命令后添加 `-p` 参数，以创建生产构建：

    ```sh
    brunch build -p
    ```

    请注意，你只需要在生产构建时这么做。你不需要在开发环境中使用 `-p` 参数或者应用这个插件，因为这会隐藏有用的 React 警告信息并使得构建速度变慢

- Browserify

    为了最高效的生产构建，需要安装一些插件：

    ```sh
    # 如果你使用 npm
    npm install --save-dev envify terser uglifyify
    
    # 如果你使用 Yarn
    yarn add --dev envify terser uglifyify
    ```

    为了创建生产构建，确保你添加了以下转换器 **（顺序很重要）**：

    - [`envify`](https://github.com/hughsk/envify) 转换器用于设置正确的环境变量。设置为全局 (`-g`)。
    - [`uglifyify`](https://github.com/hughsk/uglifyify) 转换器移除开发相关的引用代码。同样设置为全局 (`-g`)。
    - 最后，将产物传给 [`terser`](https://github.com/terser-js/terser) 并进行压缩（[为什么要这么做？](https://github.com/hughsk/uglifyify#motivationusage)）。

    举个例子：

    ```sh
    browserify ./index.js \
      -g [ envify --NODE_ENV production ] \
      -g uglifyify \
      | terser --compress --mangle > ./bundle.js
    ```

    请注意，你只需要在生产构建时用到它。你不需要在开发环境应用这些插件，因为这会隐藏有用的 React 警告信息并使得构建速度变慢。

- Rollup

    为了最高效的 Rollup 生产构建，需要安装一些插件：

    ```sh
    # 如果你使用 npm
    npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
    
    # 如果你使用 Yarn
    yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
    ```

    为了创建生产构建，确保你添加了以下插件 **（顺序很重要）**：

    - [`replace`](https://github.com/rollup/rollup-plugin-replace) 插件确保环境被正确设置。
    - [`commonjs`](https://github.com/rollup/rollup-plugin-commonjs) 插件用于支持 CommonJS。
    - [`terser`](https://github.com/TrySound/rollup-plugin-terser) 插件用于压缩并生成最终的产物。

    ```json
    plugins: [
      // ...
      require('rollup-plugin-replace')({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      require('rollup-plugin-commonjs')(),
      require('rollup-plugin-terser')(),
      // ...
    ]
    ```

- Webpack

    > **注意：**
    >
    > 如果你使用了 Create React App，请跟随[上面的说明](https://zh-hans.reactjs.org/docs/optimizing-performance.html#create-react-app)进行操作。
    >  只有当你直接配置了 webpack 才需要参考以下内容。

    在生产模式下，Webpack v4+ 将默认对代码进行压缩：

    ```javascript
    const TerserPlugin = require('terser-webpack-plugin');
    
    module.exports = {
      mode: 'production',
      optimization: {
        minimizer: [new TerserPlugin({ /* additional options here */ })],
      },
    };
    ```

    

### 2.11 Portals

**Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。**

```jsx
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何[可渲染的 React 子元素](https://zh-hans.reactjs.org/docs/react-component.html#render)，例如一个元素，字符串或 fragment。第二个参数（`container`）是一个 DOM 元素。

#### 2.11.1 用法

通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点：

## 3. Hook

### 3.1 Hook 简介

***Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。**

```jsx
function Example() {
    const { useState } = React;
    const [count, setCount] = useState(0);
    const onClick = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={onClick}>Click Me!</button>
        </div>
    );
}

ReactDOM.render(<Example />, document.getElementById("root"));
```

> **注意**
>
> React 16.8.0 是第一个支持 Hook 的版本。升级时，请注意更新所有的 package，包括 React DOM。 React Native 从 [0.59 版本](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059)开始支持 Hook。

- **动机**

    Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，**你都可能对这些问题似曾相识**

    - **在组件中复用状态逻辑困难**

        React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 [render props](https://zh-hans.reactjs.org/docs/render-props.html) 和 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render  props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以[在 DevTools 过滤掉它们](https://github.com/facebook/react-devtools/pull/503)，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

        你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

        

    - **复杂组件变得难以理解**

        我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

        在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

        为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

    - **难以理解的 class**

        除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的[语法提案](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景

        另外，React 已经发布五年了，我们希望它能在下一个五年也与时俱进。就像 [Svelte](https://svelte.dev/)，[Angular](https://angular.io/)，[Glimmer](https://glimmerjs.com/)等其它的库展示的那样，组件[预编译](https://en.wikipedia.org/wiki/Ahead-of-time_compilation)会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 [Prepack](https://prepack.io/) 来试验 [component folding](https://github.com/facebook/react/issues/7323)，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class  不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

        为了解决这些问题，**Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

    - 

### 3.2 Hook 概览



