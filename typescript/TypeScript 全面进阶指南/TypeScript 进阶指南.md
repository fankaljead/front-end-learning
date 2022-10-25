# TypeScript 进阶指南

> **质疑**
>
> - TypeScript 限制了 JavaScript 的灵活性；
> - TypeScript 并不能提高应用程序的性能；
> - TypeScript 开发需要更多额外的类型代码。

JavaScript 一直以灵活性著称。在实际开发时，我们不需要确定一个变量的类型，就能直接访问可能并不存在的属性，所以无需为每一步操作都定义类型。在小型项目中，这种灵活性可以有效提高开发效率，帮助我们掌控全局。

但随着项目规模的增大，这些变量类型的数量也会成倍增加，你总有记错、遗漏的时候。此时，灵活性就变成了埋在项目内的定时炸弹。在《[Top 10 JavaScript errors from 1000+ projects](https://link.juejin.cn/?target=https%3A%2F%2Frollbar.com%2Fblog%2Ftop-10-javascript-errors%2F)》 中，最常见的错误就是 `Cannot read property 'xxx' of undefined`、`undefined is not a function` 等。这些错误就是我们过度依赖灵活性的后果，一旦它们被触发，就会导致你的页面白屏、卡死，甚至崩溃。

**要解决灵活性带来的隐患，我们需要的是类型。更准确地说，是项目开发时的类型检查能力。** TypeScript  通过易上手且功能强大的类型系统，为 JavaScript  提供了强大的类型检查能力。在类型的帮助下，我们无需实际运行代码，就能通过类型的流转观察到变量的值是如何改变的。同时，类型的标记也能帮助我们确保每一处访问、赋值与操作的类型是符合预期的，有效减少我们需要承受的心智负担。

由于类型的引入，**TypeScript 的确限制了 JavaScript 的灵活性，但也增强了项目代码的健壮性**，并且对于其他同属于灵活性的代表特性，如 this、原型链、闭包以及函数等，TypeScript 丝毫没有限制。

在最终编译时，TypeScript 又会将这些类型代码抹除，还给你可以直接放进浏览器里跑的、纯粹的 JavaScript 代码。因此，TypeScript 确实不能提高应用程序的性能，因为最终运行的仍然是 JavaScript。

总的来说，TypeScript 对开发效率的影响和项目的规模息息相关。在小项目中，TypeScript  确实不可避免地降低了项目的开发效率。但如果我们放眼于项目的整个生命周期，得益于严密的类型检查与如臂使指的类型推导，TypeScript  不仅避免了 JavaScript 灵活性可能会带来的隐患，还能让你在面对 Bug  时更快地定位问题，让程序跑得更稳定一些！从这个方面来说，TypeScript 对开发效率的提升是终身制的。

TypeScript 是由哪些部分组成的。相对严谨来说，TypeScript 由三个部分组成：**类型、语法与工程**。我们可以从这三个部分入手，来建立起一个全面、系统的学习路径。

- 首先是**类型能力**。它是最核心的部分，也是学习成本最高的部分。它为 JavaScript  中的变量、函数等概念提供了类型的标注，同时内置了一批类型工具，基于这些类型工具我们就能实现更复杂的类型描述，将类型关联起来。从最简单的类型开始，每学到一个新的类型能力就添加上去，思考它和已掌握部分的交相融合，以此一步步掌握整个类型系统。
- 接着是**语法部分**。TypeScript 提前支持了一些已经到达 Stage 3 / 4 阶段，或是比较重要的 TC39 提案，比如使用最多的可选链（`?.`）、空值合并（`??`）、装饰器等，这些语法都已经或即将成为 ECMAScript Next 的新成员。在 TypeScript  中使用这些新语法时，只需要简单的配置就能实现语法的降级，让编译后的代码可以运行在更低的浏览器或 Node  版本下。这一部分几乎没有学习成本，他们就像语言的 API，只需要多提醒自己去使用，及时查询官方文档就能熟悉了。
- 类型能力与新语法确实很棒，但浏览器不认怎么办？TypeScript 会在构建时被抹除类型代码与语法的降级。这一能力就是通过 TypeScript Compiler（tsc）实现的。tsc 以及 tsc 配置（TSConfig）是 TypeScript  工程层面的重要部分。除此以外，TypeScript 工程能力的另一重要体现就是，我们可以通过类型声明的方式，在 TypeScript  中愉快地使用 JavaScript 社区的大量 npm 包。

类型、语法、工程其实也代表了三个不同阶段使用 TypeScript 目的：**为 JavaScript 代码添加类型与类型检查来确保健壮性，提前使用新语法或新特性来简化代码，以及最终获得可用的 JavaScript 代码。因此，类型-语法-工程，也是学习 TypeScript 的最佳路径。**

## 1. 原始类型与对象类型

### 1.1 原始类型的类型标注

首先，我们来看 [JavaScript的内置原始类型](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FData_structures%23%E5%8E%9F%E5%A7%8B%E5%80%BC_primitive_values)。除了最常见的 `number / string / boolean / null / undefined`， ECMAScript 2015（ES6）、2020 (ES11) 又分别引入了 2 个新的原始类型：`symbol 与 bigint `。在 TypeScript 中它们都有对应的类型注解：

```typescript
// 原始类型的类型标注
const mname: string = "zxh";
const age: number = 24;
const male: boolean = true;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { mname, age, male };
const bgi1: bigint = 111n;
const bgi2: bigint = BigInt(111);
const symb1: symbol = Symbol("foo");
```

其中，除了 null 与 undefined 以外，余下的类型基本上可以完全对应到 JavaScript 中的数据类型概念，因此这里我们只对 null 与 undefined 展开介绍。

- **null 和 undefined**

    在 JavaScript 中，null 与 undefined 分别表示“**这里有值，但是个空值**”和“**这里没有值**”。而在 TypeScript 中，null 与 undefined 类型都是 **有具体意义的类型**。也就是说，它们作为类型时，表示的是一个有意义的具体类型值。这两者在没有开启 `strictNullChecks` 检查的情况下，会 **被视作其他类型的子类型**，比如 string 类型会被认为包含了 null 与 undefined 类型：

    ```typescript
    const tmp1: null = null;
    const tmp2: undefined = undefined;
    
    const tmp3: string = null; // 仅在关闭 strictNullChecks 时成立，下同
    const tmp4: string = undefined;
    ```

- **void**

    你是否看到过以下的 JavaScript 代码呢？

    ```html
    <a href="javascript:void(0)">清除缓存</a>
    ```

    这里的 `void(0)` 等价于 `void 0`，即 `void expression` 的语法。void 操作符会执行后面跟着的表达式并返回一个 undefined，如你可以使用它来执行一个立即执行函数（IIFE）：

    ```typescript
    void function iife() {
      console.log("Invoked!");
    }();
    ```

    能这么做是因为，void 操作符强制 **将后面的函数声明转化为了表达式**，因此整体其实相当于：`void((function iife(){})())`。

    事实上，TypeScript 的原始类型标注中也有 `void`，但与 JavaScript 中不同的是，这里的 `void` 用于描述一个内部没有 `return` 语句，或者没有显式 `return` 一个值的函数的返回值，如：

    ```typescript
    function func1() {}
    function func2() {
      return;
    }
    function func3() {
      return undefined;
    }
    ```

    在这里，`func1` 与 `func2` 的返回值类型都会被隐式推导为` void`，只有显式返回了 `undefined` 值的 `func3`  其返回值类型才被推导为了 undefined。**但在实际的代码执行中，func1 与 func2 的返回值均是 undefined。**

    > 虽然 `func3` 的返回值类型会被推导为 `undefined`，但是你仍然可以使用 `void` 类型进行标注，因为在类型层面 `func1、func2、func3` 都表示“没有返回一个有意义的值”。

    这里可能有点绕，你可以认为 `void` 表示一个空类型，而 `null` 与 `undefined` 都是一个具有意义的实际类型（注意与它们在  JavaScript 中的意义区分）。而 `undefined` 能够被赋值给 `void` 类型的变量，就像在 JavaScript  中一个没有返回值的函数会默认返回一个 `undefined` 。`null` 类型也可以，但需要在关闭 `strictNullChecks` 配置的情况下才能成立。

    ```typescript
    const voidVar1: void = undefined;
    
    const voidVar2: void = null; // 需要关闭 strictNullChecks
    ```

    

### 1.2 数组类型的类型标注

在 TypeScript 中有两种方式来声明一个数组类型：

```typescript
const arr1: string[] = [];

const arr2: Array<string> = [];
```

这两种方式是完全等价的，但其实更多是以前者为主，如果你将鼠标悬浮在 `arr2` 上，会发现它显示的类型签名是 `string[]`。数组是我们在日常开发大量使用的数据结构，但在某些情况下，使用 **元组（Tuple）** 来代替数组要更加妥当，比如一个数组中只存放固定长度的变量，但我们进行了超出长度地访问：

```typescript
const arr3: string[] = ["z", "x", "h"];
console.log(arr3[33]);
```

这种情况肯定是不符合预期的，因为我们能确定这个数组中只有三个成员，并希望在越界访问时给出类型报错。这时我们可以使用元组类型进行类型标注：

```typescript
const arr4: [string, string, string] = ["z", "x", "h"];
console.log(arr4[5]);
```

此时将会产生一个类型错误：***长度为“3”的元组类型“[string, string, string]”在索引“599“处没有元素***。除了同类型的元素以外，元组内部也可以声明多个与其位置强绑定的，不同类型的元素：

```typescript
const arr5: [string, number, boolean] = ["zxh", 24, true];
```

在这种情况下，对数组合法边界内的索引访问（即 `0、1、2`）将精确地获得对应位置上的类型。同时元组也支持了在某一个位置上的可选成员：

```typescript
const arr6: [string, number?, boolean?] = ["zxh"];
```

对于标记为可选的成员，在 `--strictNullCheckes` 配置下会被视为一个 `string | undefined` 的类型。此时元组的长度属性也会发生变化，比如上面的元组 arr6 ，其长度的类型为 `1 | 2 | 3`：

```typescript
type TupleLength = typeof arr6.length; // 1 | 2 | 3
```

也就是说，这个元组的长度可能为 1、2、3。

在 TypeScript 4.0 中，有了具名元组（[Labeled Tuple Elements](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fissues%2F28259)）的支持，使得我们可以为元组中的元素打上类似属性的标记：

```typescript
const arr7: [name: string, age: number, male: boolean] = ["zxh", 24, true];
```

实际上除了显式地越界访问，还可能存在隐式地越界访问，如通过解构赋值的形式：

```typescript
const arr1: string[] = [];

const [ele1, ele2, ...rest] = arr1;
```

对于数组，此时仍然无法检查出是否存在隐式访问，因为类型层面并不知道它到底有多少个元素。但对于元组，隐式的越界访问也能够被揪出来给一个警告：

```typescript
const arr5: [string, number, boolean] = ['linbudu', 599, true];

// 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
const [name, age, male, other] = arr5;
```

使用元组确实能帮助我们进一步提升 **数组结构的严谨性**，包括基于位置的类型标注、避免出现越界访问等等。除了通过数组类型提升数组结构的严谨性，TypeScript 中的对象类型也能帮助我们提升对象结构的严谨性。

### 1.3 对象的类型标注

类似于数组类型，在 TypeScript 中我们也需要特殊的类型标注来描述对象类型，即 interface ，你可以理解为它代表了这个对象对外提供的接口结构。

首先我们使用 `interface` 声明一个结构，然后使用这个结构来作为一个对象的类型标注即可：

```typescript
interface IDescription {
  name: string;
  age: number;
  male: boolean;
}

const zxh: IDescription = {
  name: "zxh",
  age: 24,
  male: true,
};
```

这里的“描述”指：

- 每一个属性的值必须 **一一对应** 到接口的属性类型
- 不能有多的属性，也不能有少的属性，包括直接在对象内部声明，或是 `obj1.other = 'xxx'` 这样属性访问赋值的形式

除了声明属性以及属性的类型以外，我们还可以对属性进行修饰，常见的修饰包括 **可选（Optional）** 与 **只读（Readonly）** 这两种。

#### 1.3.1 修饰接口属性

类似于上面的元组可选，在接口结构中同样通过 `?` 来标记一个属性为可选：

```typescript
interface IDescription {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj2: IDescription = {
  name: 'zxh',
  age: 24,
  male: true,
  // 无需实现 func 也是合法的
};
```

在这种情况下，即使你在 obj2 中定义了 male 属性，但当你访问 `obj2.male` 时，它的类型仍然会是 `boolean | undefined`，因为毕竟这是我们自己定义的类型嘛。

假设新增一个可选的函数类型属性，然后进行调用：`obj2.func()` ，此时将会产生一个类型报错：***不能调用可能是未定义的方法***。但可选属性标记不会影响你对这个属性进行赋值，如：

```typescript
obj2.male = false;
obj2.func = () => {};
```

即使你对可选属性进行了赋值，TypeScript 仍然会使用 **接口的描述为准** 进行类型检查，你可以使用类型断言、非空断言或可选链解决（别急，我们在后面会讲到）。

除了标记一个属性为可选以外，你还可以标记这个属性为只读：`readonly`。很多同学对这一关键字比较陌生，因为以往 JavaScript 中并没有这一类概念，它的作用是 **防止对象的属性被再次赋值**。

```typescript
interface IDescription {
  readonly name: string;
  age: number;
}

const obj3: IDescription = {
  name: 'zxh',
  age: 24,
};

// 无法分配到 "name" ，因为它是只读属性
obj3.name = "zzxh";
```

其实在数组与元组层面也有着只读的修饰，但与对象类型有着两处不同。

- 你 **只能将整个数组/元组标记为只读，而不能像对象那样标记某个属性为只读。**
- **一旦被标记为只读，那这个只读数组/元组的类型上，将不再具有 push、pop 等方法（即会修改原数组的方法）**，因此报错信息也将是**类型 xxx 上不存在属性“push”这种**。这一实现的本质是**只读数组与只读元组的类型实际上变成了 ReadonlyArray，而不再是 Array。**

#### 1.3.2 type 与 interface

很多同学更喜欢用 `type`（Type Alias，类型别名）来代替接口结构描述对象，推荐的方式是

- interface 用来描述 **对象、类的结构**
- 而类型别名用来 **将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。

但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。

#### 1.3.3 object、Object 以及 {}

`object`、`Object` 以及`{}`（一个空对象）这三者的使用可能也会让部分同学感到困惑，所以我也专门解释下。

首先是 `Object` 的使用。被 JavaScript 原型链折磨过的同学应该记得，原型链的顶端是 `Object` 以及  `Function`，这也就意味着所有的原始类型与对象类型最终都指向 `Object`，在 TypeScript 中就表现为 `Object` 包含了所有的类型：

```typescript
const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = "zxh";
const tmp5: Object = 55;
const tmp6: Object = { name: "zxh" };
const tmp7: Object = () => {};
const tmp8: Object = [];
```

和 `Object` 类似的还有 `Boolean、Number、String、Symbol`，这几个**装箱类型（Boxed Types）** 同样包含了一些超出预期的类型。以 `String` 为例，它同样包括 `undefined、null、void`，以及代表的 **拆箱类型（Unboxed Types）** `string`，但并不包括其他装箱类型对应的拆箱类型，如 `boolean` 与 基本对象类型，我们看以下的代码：

```typescript
const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'zxh';

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: 'zxh' }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X
```

**在任何情况下，你都不应该使用这些装箱类型。**

`object` 的引入就是为了解决对 `Object` 类型的错误使用，它代表 **所有非原始类型的类型，即数组、对象与函数类型这些**：

```typescript
const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = 'zxh';  // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'zxh' };
const tmp23: object = () => {};
const tmp24: object = [];
```

最后是`{}`，一个奇奇怪怪的空对象，如果你了解过字面量类型，可以认为`{}`就是一个对象字面量类型（对应到字符串字面量类型这样）。否则，你可以认为使用`{}`作为类型签名就是一个合法的，但 **内部无属性定义的空对象**，这类似于 `Object`（想想 `new Object()`），它意味着任何非 `null / undefined` 的值：

```typescript
const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = 'zxh';
const tmp29: {} = 599;
const tmp30: {} = { name: 'zxh' };
const tmp31: {} = () => {};
const tmp32: {} = [];
```

虽然能够将其作为变量的类型，但你实际上**无法对这个变量进行任何赋值操作**：

```typescript
const tmp30: {} = { name: 'zxh' };

tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
```

这是因为它就是纯洁的像一张白纸一样的空对象，上面没有任何的属性（除了 toString 这种与生俱来的）。在类型层级一节我们还会再次见到它，不过那个时候它已经被称为“万物的起源”了。

最后，为了更好地区分 `Object`、`object` 以及`{}`这三个具有迷惑性的类型，我们再做下总结：

- 在任何时候都 **不要，不要，不要使用** `Object` 以及类似的装箱类型。
- 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 `object`。但我更推荐进一步区分，也就是使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any`表示函数这样。
- 我们同样要避免使用`{}`。`{}`意味着任何非 `null / undefined` 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。

#### 1.3.4 unique symbol

**`Symbol` 在 JavaScript 中代表着一个唯一的值类型，它类似于字符串类型，可以作为对象的属性名，并用于避免错误修改 对象 /  Class 内部属性的情况。**

而在 TypeScript 中，`symbo`l 类型并不具有这一特性，一百个具有 `symbol` 类型的对象，它们的  `symbol` 类型指的都是 TypeScript 中的同一个类型。为了实现“独一无二”这个特性，TypeScript 中支持了 `unique  symbol` 这一类型声明，它是 `symbol` 类型的子类型，每一个 `unique symbol` 类型都是独一无二的。

```typescript
const uniqueSymbolFoo: unique symbol = Symbol("foo")

// 类型不兼容
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo
```

在 JavaScript 中，我们可以用 `Symbol.for` 方法来复用已创建的 `Symbol`，如 `Symbol.for("zxh")` 会首先查找全局是否已经有使用 `zxh` 作为 `key` 的 `Symbol` 注册，如果有，则返回这个 `Symbol`，否则才会创建新的 `Symbol `。

在 TypeScript 中，如果要引用已创建的 unique symbol 类型，则需要使用类型查询操作符 typeof ：

```typescript
declare const uniqueSymbolFoo: unique symbol;

const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo
```

## 2. 字面量类型与枚举

了解了原始类型与对象类型以后，我们已经能完成简单场景的类型标注了。但这还远远不够，我们还可以让这些类型标注更精确一些。比如，有一个接口结构，它描述了响应的消息结构：

```typescript
interface IRes {
  code: number;
  status: string;
  data: any;
}
```

在大多数情况下，这里的 `code` 与 `status` 实际值会来自于一组确定值的集合，比如 `code` 可能是 `10000 / 10001 /  50000`，`status` 可能是 `"success"` / `"failure"`。而上面的类型只给出了一个宽泛的 `number（string）`，此时我们既不能在访问 `code` 时获得精确的提示，也失去了 TypeScript 类型即文档的功能。

我们可以使用联合类型加上字面量类型，把上面的例子改写成这样：

```typescript
interface Res {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}
```

这个时候，我们就能在访问时获得精确地类型推导了。

### 2.1 字面量类型

最开始你可能觉得很神奇，`"success"` 不是一个值吗？为什么它也可以作为类型？在 TypeScript 中，这叫做 **字面量类型（Literal Types）**，它代表着比原始类型更精确的类型，同时也是原始类型的子类型（关于类型层级，我们会在后面详细了解）。

字面量类型主要包括 **字符串字面量类型**、**数字字面量类型**、**布尔字面量类型 **和 **对象字面量类型**，它们可以直接作为类型标注：

```typescript
const str: "zxh" = "zxh";
const num: 599 = 599;
const bool: true = true;
```

为什么说字面量类型比原始类型更精确？我们可以看这么个例子：

```typescript
// 报错！不能将类型“"linbudu599"”分配给类型“"linbudu"”。
const str1: "linbudu" = "linbudu599";

const str2: string = "linbudu";
const str3: string = "linbudu599";
```

上面的代码，原始类型的值可以包括任意的同类型值，而字面量类型要求的是 **值级别的字面量一致**。

单独使用字面量类型比较少见，因为单个字面量类型并没有什么实际意义。它通常和联合类型（即这里的 `|`）一起使用，表达一组字面量类型：

```typescript
interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "lin" | "bu" | "du"
}
```

### 2.2 联合类型

联合类型你可以理解为，它代表了**一组类型的可用集合**，只要最终赋值的类型属于联合类型的成员之一，就可以认为符合这个联合类型。联合类型对其成员并没有任何限制，除了上面这样对同一类型字面量的联合，我们还可以将各种类型混合到一起：

```typescript
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}
```

这里有几点需要注意的：

- 对于联合类型中的函数类型，需要使用括号`()`包裹起来
- 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型
- 你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中

联合类型的常用场景之一是通过多个对象类型的联合，来实现 **手动的互斥属性**，即这一属性如果有字段1，那就没有字段2：

```typescript
interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}
```

在这个例子中，`user` 属性会满足普通用户与 VIP 用户两种类型，这里 `vip`  属性的类型基于布尔字面量类型声明。我们在实际使用时可以通过判断此属性为 `true` ，确保接下来的类型推导都会将其类型收窄到 VIP  用户的类型（即联合类型的第一个分支）。这一能力的使用涉及类型守卫与类型控制流分析。

我们也可以通过类型别名来复用一组字面量联合类型：

```typescript
type Code = 10000 | 10001 | 50000;

type Status = "success" | "failure";
```

除了原始类型的字面量类型以外，对象类型也有着对应的字面量类型。

### 2.3 对象字面量类型

类似的，对象字面量类型就是一个对象类型的值。当然，这也就意味着这个对象的值全都为字面量值：

```typescript
interface Tmp {
  obj: {
    name: "zxh",
    age: 18
  }
}

const tmp: Tmp = {
  obj: {
    name: "zxh",
    age: 18
  }
}
```

如果要实现一个对象字面量类型，意味着完全的实现这个类型每一个属性的每一个值。对象字面量类型在实际开发中的使用较少，我们只需要了解。

总的来说，在需要更精确类型的情况下，我们可以使用字面量类型加上联合类型的方式，将类型从 `string` 这种宽泛的原始类型直接收窄到 `"resolved" | "pending" | "rejected"` 这种精确的字面量类型集合。

需要注意的是，**无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值**。它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。

如果说字面量类型是对原始类型的进一步扩展（对象字面量类型的使用较少），那么枚举在某些方面则可以理解为是对对象类型的扩展。

### 2.4 枚举类型

例如 `constants` 文件：

```javascript
export default {
  Home_Page_Url: "url1",
  Setting_Page_Url: "url2",
  Share_Page_Url: "url3",
}

// 或是这样：
export const PageUrl = {
  Home_Page_Url: "url1",
  Setting_Page_Url: "url2",
  Share_Page_Url: "url3",
}
```

如果把这段代码替换为枚举，会是如下的形式：

```typescript
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url;
```

这么做的好处非常明显。首先，你拥有了更好的类型提示。其次，这些常量被真正地 **约束在一个命名空间**下（上面的对象声明总是差点意思）。如果你没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增：

```typescript
enum Items {
  Foo, // 0
  Bar, // 1
  Baz // 2
}
```

在这个例子中，`Items.Foo` , `Items.Bar` , `Items.Baz`的值依次是 0，1，2 。

如果你只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增。

```typescript
enum Items {
  // 0 
  Foo,
  Bar = 599,
  // 600
  Baz
}
```

在数字型枚举中，你可以使用延迟求值的枚举值，比如函数：

```typescript
const returnNum = () => 100 + 499;

enum Items {
  Foo = returnNum(),
  Bar = 599,
  Baz
}
```

但要注意，延迟求值的枚举值是有条件的。

**如果你使用了延迟求值，那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后（如上例），或者放在第一位**：

```typescript
enum Items {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}
```

TypeScript 中也可以同时使用字符串枚举值和数字枚举值：

```typescript
enum Mixed {
  Num = 599,
  Str = "zxh"
}
```

枚举和对象的重要差异在于，**对象是单向映射的**，我们只能从键映射到键值。

而 **枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```typescript
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"
```

要了解这一现象的本质，我们需要来看一看枚举的编译产物，如以上的枚举会被编译为以下 JavaScript 代码：

```javascript
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
```

`obj[k] = v` 的返回值即是 v，因此这里的 `obj[obj[k] = v] = k` 本质上就是进行了 `obj[k] = v` 与 `obj[v] = k` 这样两次赋值。

但需要注意的是，**仅有值为数字的枚举成员才能够进行这样的双向枚举**，**字符串枚举成员仍然只会进行单次映射**：

```typescript
enum Items {
  Foo,
  Bar = "BarValue",
  Baz = "BazValue"
}

// 编译结果，只会进行 键-值 的单向映射
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items["Bar"] = "BarValue";
    Items["Baz"] = "BazValue";
})(Items || (Items = {}));
```

除了数字枚举与字符串枚举这种分类以外，其实还存在着普通枚举与常量枚举这种分类方式。

### 2.5 **常量枚举**

常量枚举和枚举相似，只是其声明多了一个 const：

```typescript
const enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
```

它和普通枚举的差异主要在访问性与编译产物。

对于常量枚举，你 **只能通过枚举成员访问枚举值**（而不能通过值访问成员）。同时，在编译产物中并不会存在一个额外的辅助对象（如上面的 `Items` 对象），对枚举成员的访问会被 **直接内联替换为枚举的值**。以上的代码会被编译为如下形式：

```javascript
const fooValue = 0 /* Foo */; // 0
```

> 实际上，常量枚举的表现、编译产物还受到配置项 `--isolatedModules` 以及 `--preserveConstEnums` 等的影响

## 3. 函数与 Class 中的类型

### 3.1 函数

#### 3.1.1 函数的类型签名

如果说变量的类型是描述了这个变量的值类型，那么函数的类型就是描述了**函数入参类型与函数返回值类型**，它们同样使用`:`的语法进行类型标注。我们直接看最简单的例子：

```typescript
function foo(name: string): number {
  return name.length;
}
```

在函数类型中同样存在着类型推导。比如在这个例子中，你可以不写返回值处的类型，它也能被正确推导为 `number` 类型。

在 JavaScript 中，我们称 `function name () {}` 这一声明函数的方式为**函数声明（\*Function Declaration\*）**。除了函数声明以外，我们还可以通过**函数表达式（\*Function Expression\*）**，即 `const foo = function(){}` 的形式声明一个函数。在表达式中进行类型声明的方式是这样的：

```typescript
const foo = function (name: string): number {
  return name.length
}
```

我们也可以像对变量进行类型标注那样，对 `foo` 这个变量进行类型声明：

```typescript
const foo: (name: string) => number = function (name) {
  return name.length
}
```

我们也可以像对变量进行类型标注那样，对 `foo` 这个变量进行类型声明：

```typescript
const foo: (name: string) => number = function (name) {
  return name.length
}
```

这里的 `(name: string) => number` 看起来很眼熟，对吧？

它是 ES6 的重要特性之一：箭头函数。但在这里，它其实是 TypeScript 中的 **函数类型签名**。而实际的箭头函数，我们的类型标注也是类似的：

```typescript
// 方式一
const foo = (name: string): number => {
  return name.length
}

// 方式二
const foo: (name: string) => number = (name) => {
  return name.length
}
```

在方式二的声明方式中，你会发现函数类型声明混合箭头函数声明时，代码的可读性会非常差。因此，一般不推荐这么使用，要么**直接在函数中进行参数和返回值的类型声明**，要么**使用类型别名将函数声明抽离出来**：

```typescript
type FuncFoo = (name: string) => number

const foo: FuncFoo = (name) => {
  return name.length
}
```

如果只是为了描述这个函数的类型结构，我们甚至可以使用 interface 来进行函数声明：

```typescript
interface FuncFooStruct {
  (name: string): number
}
```

这时的 interface 被称为 **Callable Interface**，看起来可能很奇怪，但我们可以这么认为，interface 就是用来描述一个类型结构的，而函数类型本质上也是一个结构固定的类型罢了。

#### 3.1.2 void 类型

在 TypeScript 中，一个没有返回值（即没有调用 `return` 语句）的函数，其返回类型应当被标记为 `void` 而不是 `undefined`，即使它实际的值是 `undefined`。

```typescript
// 没有调用 return 语句
function foo(): void { }

// 调用了 return 语句，但没有返回值
function bar(): void {
  return;
}
```

原因是：

**在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值。** 相比之下，`void` 类型就像是 JavaScript 中的 `null` 一样。因此在我们没有实际返回值时，使用 `void` 类型能更好地说明这个函数 **没有进行返回操作**。但在上面的第二个例子中，其实更好的方式是使用 `undefined` ：

```typescript
function bar(): undefined {
  return;
}
```

此时我们想表达的则是，这个函数**进行了返回操作，但没有返回实际的值**。

#### 3.1.3 可选参数与 rest 参数

在很多时候，我们会希望函数的参数可以更灵活，比如它不一定全都必传，当你不传入参数时函数会使用此参数的默认值。正如在对象类型中我们使用 `?` 描述一个可选属性一样，在函数类型中我们也使用 `?` 描述一个可选参数：

```typescript
// 在函数逻辑中注入可选参数默认值
function foo1(name: string, age?: number): number {
  const inputAge = age || 18; // 或使用 age ?? 18
  return name.length + inputAge
}

// 直接为可选参数声明默认值
function foo2(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge
}
```

需要注意的是，**可选参数必须位于必选参数之后**。毕竟在 JavaScript 中函数的入参是按照位置（形参），而不是按照参数名（名参）进行传递。当然，我们也可以直接将可选参数与默认值合并，但此时就不能够使用 `?` 了，因为既然都有默认值，那肯定是可选参数啦。

```typescript
function foo(name: string, age: number = 18): number {
  const inputAge = age || 18;
  return name.length + inputAge
}
```

在某些情况下，这里的可选参数类型也可以省略，如这里原始类型的情况可以直接从提供的默认值类型推导出来。但对于联合类型或对象类型的复杂情况，还是需要老老实实地进行标注。

对于 `rest` 参数的类型标注也比较简单，由于其实际上是一个数组，这里我们也应当使用数组类型进行标注：

> 对于 `any` 类型，你可以简单理解为它包含了一切可能的类型

```typescript
function foo(arg1: string, ...rest: any[]) { }
```

当然，也可以使用元组类型进行标注：

```typescript
function foo(arg1: string, ...rest: [number, boolean]) { }

foo("zxh", 24, true)
```

#### 3.1.4 重载

在某些逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型：

```typescript
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}
```

在这个实例中，函数的返回类型基于其入参 `bar` 的值，并且从其内部逻辑中我们知道，当 `bar` 为 `true`，返回值为 `string` 类型，否则为 `number` 类型。而这里的类型签名完全没有体现这一点，我们只知道它的返回值是这么个联合类型。

要想实现与入参关联的返回值类型，我们可以使用 TypeScript 提供的**函数重载签名（\*Overload Signature\*）**，将以上的例子使用重载改写：

```typescript
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number
```

这里我们的三个 `function func` 其实具有不同的意义：

- `function func(foo: number, bar: true): string`，重载签名一，传入 bar 的值为 true 时，函数返回值为 string 类型。
- `function func(foo: number, bar?: false): number`，重载签名二，不传入 bar，或传入 bar 的值为 false 时，函数返回值为 number 类型。
- `function func(foo: number, bar?: boolean): string | number`，函数的实现签名，会包含重载签名的所有可能情况。

基于重载签名，我们就实现了将入参类型和返回值类型的可能情况进行关联，获得了更精确的类型标注能力。

这里有一个需要注意的地方，拥有多个重载声明的函数在被调用时，是按照重载的声明顺序往下查找的。因此在第一个重载声明中，为了与逻辑中保持一致，即在 `bar` 为 `true` 时返回 `string` 类型，这里我们需要将第一个重载声明的 `bar` 声明为必选的字面量类型。

实际上，TypeScript 中的重载更像是伪重载，**它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上**。而在如 C++ 等语言中，重载体现在多个**名称一致但入参不同的函数实现上**，这才是更广义上的函数重载。

#### 3.1.5 异步函数、Generator 函数等类型签名

对于异步函数、Generator 函数、异步 Generator 函数的类型签名，其参数签名基本一致，而返回值类型则稍微有些区别：

```typescript
async function asyncFunc(): Promise<void> {}

function* genFunc(): Iterable<void> {}

async function* asyncGenFunc(): AsyncIterable<void> {}
```

其中，Generator 函数与异步 Generator 函数现在已经基本不再使用，这里仅做了解即可。

**而对于异步函数（即标记为 async 的函数），其返回值必定为一个 Promise 类型，而 Promise 内部包含的类型则通过泛型的形式书写，即 `Promise<T>`**。

### 3.2 Class

#### 3.2.1 类与类成员的类型签名

一个函数的主要结构即是参数、逻辑和返回值，对于逻辑的类型标注其实就是对普通代码的标注，所以我们只介绍了对参数以及返回值地类型标注。而到了 Class 中其实也一样，它的主要结构只有 **构造函数**、**属性**、**方法**和**访问符（\*Accessor\*）**，我们也只需要关注这三个部分即可。这里我要说明一点，有的同学可能认为装饰器也是 Class 的结构，但我个人认为它并不是 Class 携带的逻辑，不应该被归类在这里。

属性的类型标注类似于变量，而构造函数、方法、存取器的类型编标注类似于函数：

```typescript
class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(value: string) {
    this.prop = `${value}+A`
  }
}
```

唯一需要注意的是，`setter` 方法**不允许进行返回值的类型标注**，你可以理解为 `setter` 的返回值并不会被消费，它是一个只关注过程的函数。类的方法同样可以进行函数那样的重载，且语法基本一致，这里我们不再赘述。

就像函数可以通过 **函数声明** 与 **函数表达式** 创建一样，类也可以通过 **类声明** 和 **类表达式 **的方式创建。很明显上面的写法即是类声明，而使用类表达式的语法则是这样的：

```typescript
const Foo = class {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }
  
  // ...
}
```

#### 3.2.2 修饰符

在 TypeScript 中我们能够为 Class 成员添加这些修饰符：`public` / `private` / `protected` / `readonly`。除 readonly 以外，其他三位都属于访问性修饰符，而 readonly 属于操作性修饰符（就和 interface 中的 readonly 意义一致）。

这些修饰符应用的位置在成员命名前：

```typescript
class Foo {
  private prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`
  }
}
```

> 我们通常不会为构造函数添加修饰符，而是让它保持默认的 public。

- `public`：此类成员在**类、类的实例、子类**中都能被访问。
- `private`：此类成员仅能在 **类的内部 **被访问。
- `protected`：此类成员仅能在 **类与子类中** 被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即 **不允许再访问受保护的成员**。

- 当你不显式使用访问性修饰符，成员的访问性默认会被标记为 `public`。实际上，在上面的例子中，我们通过构造函数为类成员赋值的方式还是略显麻烦，需要声明类属性以及在构造函数中进行赋值。简单起见，我们可以 **在构造函数中对参数应用访问性修饰符**：

```typescript
class Foo {
  constructor(public arg1: string, private arg2: boolean) { }
}

new Foo("zxh", true)
```

此时，参数会被直接作为类的成员（即实例的属性），免去后续的手动赋值。

#### 3.2.3 静态成员

在 TypeScript 中，你可以使用 `static` 关键字来标识一个成员为静态成员：

```typescript
class Foo {
  static staticHandler() { }

  public instanceHandler() { }
}
```

不同于实例成员，在类的内部静态成员无法通过 `this` 来访问，需要通过 `Foo.staticHandler` 这种形式进行访问。我们可以查看编译到 ES5 及以下 `target` 的 JavaScript 代码（ES6 以上就原生支持静态成员了），来进一步了解它们的区别：

```javascript
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.staticHandler = function () { };
    Foo.prototype.instanceHandler = function () { };
    return Foo;
}());
```

从中我们可以看到，**静态成员直接被挂载在函数体上**，而 **实例成员挂载在原型上**，这就是二者的最重要差异：**静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）**。而原型对象上的实例成员则会 **沿着原型链进行传递**，也就是能够被继承。

而对于静态成员和实例成员的使用时机，其实并不需要非常刻意地划分。比如我会用 **类 + 静态成员** 来收敛变量与 utils 方法：

```typescript
class Utils {
  public static identifier = "linbudu";

  public static makeUHappy() {
    Utils.studyWithU();
    // ...
  }

  public static studyWithU() { }
}

Utils.makeUHappy();
```

#### 3.2.4 继承、实现、抽象类

既然说到 Class，那就一定离不开继承。与 JavaScript 一样，TypeScript 中也使用 extends 关键字来实现继承：

```typescript
class Base { }

class Derived extends Base { }
```

对于这里的两个类，比较严谨的称呼是 **基类（\*Base\*）** 与 **派生类（\*Derived\*）**。当然，如果你觉得叫父类与子类更容易理解也没问题。关于基类与派生类，我们需要了解的主要是 **派生类对基类成员的访问与覆盖操作**。

基类中的哪些成员能够被派生类访问，完全是由其访问性修饰符决定的。我们在上面其实已经介绍过，派生类中可以访问到使用 `public` 或 `protected` 修饰符的基类成员。除了访问以外，基类中的方法也可以在派生类中被覆盖，但我们仍然可以通过 `super` 访问到基类中的方法：

```typescript
class Base {
  print() { }
}

class Derived extends Base {
  print() {
    super.print()
    // ...
  }
}
```

在派生类中覆盖基类方法时，我们并不能确保派生类的这一方法能覆盖基类方法，万一基类中不存在这个方法呢？所以，TypeScript 4.3 新增了 `override` 关键字，来确保派生类尝试覆盖的方法一定在基类中存在定义：

```typescript
class Base {
  printWithLove() { }
}

class Derived extends Base {
  override print() {
    // ...
  }
}
```

在这里 TS 将会给出错误，因为**尝试覆盖的方法并未在基类中声明**。通过这一关键字我们就能确保首先这个方法在基类中存在，同时标识这个方法在派生类中被覆盖了。

除了基类与派生类以外，还有一个比较重要的概念：**抽象类**。抽象类是对类结构与方法的抽象，简单来说，**一个抽象类描述了一个类中应当有哪些成员（属性、方法等）**，**一个抽象方法描述了这一方法在实际实现中的结构**。我们知道类的方法和函数非常相似，包括结构，因此抽象方法其实描述的就是这个方法的**入参类型**与**返回值类型**。

抽象类使用 `abstract` 关键字声明：

```typescript
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string
}
```

注意，抽象类中的成员也需要使用 `abstract` 关键字才能被视为抽象类成员 (**不能被实例化**)，如这里的抽象方法。我们可以实现（`implements`）一个抽象类：

```typescript
class Foo implements AbsFoo {
  absProp: string = "zxh"

  get absGetter() {
    return "zxh"
  }

  absMethod(name: string) {
    return name
  }
}
```

此时，我们必须完全实现这个抽象类的每一个抽象成员。需要注意的是，在 TypeScript 中**无法声明静态的抽象成员**。

对于抽象类，它的本质就是描述类的结构。看到结构，你是否又想到了 `interface`？是的。`interface` 不仅可以声明函数结构，也可以声明类的结构：

```typescript
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string
}

class Foo implements FooStruct {
  absProp: string = "linbudu"

  get absGetter() {
    return "linbudu"
  }

  absMethod(name: string) {
    return name
  }
}
```

在这里，我们让类去实现了一个接口。这里接口的作用和抽象类一样，都是**描述这个类的结构**。除此以外，我们还可以使用 **Newable Interface** 来描述一个类的结构（类似于描述函数结构的 **Callable Interface**）：

```typescript
class Foo { }

interface FooStruct {
  new(): Foo
}

declare const NewableFoo: FooStruct;

const foo = new NewableFoo();
```

#### 3.2.5 私有构造函数

上面说到，我们通常不会对类的构造函数进行访问性修饰，如果我们一定要试试呢？

```typescript
class Foo {
  private constructor() { }
}
```

看起来好像没什么问题，但是当你想要实例化这个类时，一行美丽的操作就会出现：**类的构造函数被标记为私有，且只允许在类内部访问**。

那这就很奇怪了，我们要一个不能实例化的类有啥用？摆设吗？

还真不是，有些场景下私有构造函数确实有奇妙的用法，比如像我一样把类作为 utils 方法时，此时 Utils 类内部全部都是静态成员，我们也并不希望真的有人去实例化这个类。此时就可以使用私有构造函数来阻止它被错误地实例化：

```typescript
class Utils {
  public static identifier = "linbudu";
  
  private constructor(){}

  public static makeUHappy() {
  }
}
```

或者在一个类希望把实例化逻辑通过方法来实现，而不是通过 `new` 的形式时，也可以使用私有构造函数来达成目的。

### 3.3 SOLID原则

SOLID 原则是面向对象编程中的基本原则，它包括以下这些五项基本原则。

- S，**单一功能原则**，**一个类应该仅具有一种职责**，这也意味着只存在一种原因使得需要修改类的代码。如对于一个数据实体的操作，其读操作和写操作也应当被视为两种不同的职责，并被分配到两个类中。更进一步，对实体的业务逻辑和对实体的入库逻辑也都应该被拆分开来。

- O，**开放封闭原则**，**一个类应该是可扩展但不可修改的**。即假设我们的业务中支持通过微信、支付宝登录，原本在一个 `login` 方法中进行 `if else` 判断，假设后面又新增了抖音登录、美团登录，难道要再加 `else if` 分支（或 `switch case`）吗？
- L，**里式替换原则**，**一个派生类可以在程序的任何一处对其基类进行替换**。这也就意味着，子类完全继承了父类的一切，对父类进行了功能地扩展（而非收窄）。
- I，**接口分离原则**，**类的实现方应当只需要实现自己需要的那部分接口**。比如微信登录支持指纹识别，支付宝支持指纹识别和人脸识别，这个时候微信登录的实现类应该不需要实现人脸识别方法才对。这也就意味着我们提供的抽象类应当按照功能维度拆分成粒度更小的组成才对。
- D，**依赖倒置原则**，这是实现开闭原则的基础，它的核心思想即是**对功能的实现应该依赖于抽象层**，即不同的逻辑通过实现不同的抽象类。还是登录的例子，我们的登录提供方法应该基于共同的登录抽象类实现（`LoginHandler`），最终调用方法也基于这个抽象类，而不是在一个高阶登录方法中去依赖多个低阶登录提供方。

```typescript
enum LoginType {
  WeChat,
  TaoBao,
  TikTok,
  // ...
}

class Login {
  public static handler(type: LoginType) {
    if (type === LoginType.WeChat) { }
    else if (type === LoginType.TikTok) { }
    else if (type === LoginType.TaoBao) { }
    else {
      throw new Error("Invalid Login Type!")
    }
  }
}
```

当然不，基于开放封闭原则，我们应当将登录的基础逻辑抽离出来，不同的登录方式通过扩展这个基础类来实现自己的特殊逻辑。

```typescript
abstract class LoginHandler {
  abstract handler(): void
}

class WeChatLoginHandler implements LoginHandler {
  handler() { }
}

class TaoBaoLoginHandler implements LoginHandler {
  handler() { }
}

class TikTokLoginHandler implements LoginHandler {
  handler() { }
}

class Login {
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.TikTok]: new TikTokLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler(),

  }
  public static handler(type: LoginType) {
    Login.handlerMap[type].handler()
  }
}
```

## 4. 内置类型：Any, unknown, never 与类型断言

### 4.1 内置类型: any, unknown, never

#### 4.1.1 any

有些时候，我们的 TS 代码并不需要十分精确严格的类型标注。比如 `console.log` 方法就能够接受任意类型的参数，不管你是数组、字符串、对象或是其他的，统统来者不拒。那么，我们难道要把所有类型用联合类型串起来？

这当然不现实，为了能够表示 “任意类型”，TypeScript 中提供了一个内置类型 `any` ，来表示所谓的任意类型。此时我们就可以使用 any 作为参数的类型：

```typescript
log(message?: any, ...optionalParams: any[]): void
```

在这里，一个被标记为 `any` 类型的参数可以接受任意类型的值。除了 `message` 是 `any` 以外，`optionalParams` 作为一个 `rest` 参数，也使用 `any[]` 进行了标记，这就意味着你可以使用任意类型的任意数量类型来调用这个方法。除了显式的标记一个变量或参数为 `any`，在某些情况下你的变量/参数也会被隐式地推导为 `any`。比如使用 `let` 声明一个变量但不提供初始值，以及不为函数参数提供类型标注：

```typescript
// any
let foo;

// foo、bar 均为 any
function func(foo, bar){}
```

以上的函数声明在 tsconfig 中启用了 `noImplicitAny` 时会报错，你可以显式为这两个参数指定 any 类型，或者暂时关闭这一配置（不推荐）。而 `any` 类型的变量几乎无所不能，它可以在声明后再次接受任意类型的值，同时可以被赋值给任意其它类型的变量：

```typescript
// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar: any = "linbudu";

anyVar = false;
anyVar = "linbudu";
anyVar = {
  site: "juejin"
};

anyVar = () => { }

// 标记为具体类型的变量也可以接受任何 any 类型的值
const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;
```

你可以在 any 类型变量上任意地进行操作，包括赋值、访问、方法调用等等，此时可以认为类型推导与检查是被完全禁用的：

```typescript
let anyVar: any = null;

anyVar.foo.bar.baz();
anyVar[0][1][2].prop1;
```

**而 any 类型的主要意义:**

其实就是为了表示一个 **无拘无束的“任意类型”，它能兼容所有类型，也能够被所有类型兼容**。

这一作用其实也意味着类型世界给你开了一个外挂，无论什么时候，你都可以使用 `any` 类型跳过类型检查。当然，运行时出了问题就需要你自己负责了。

> `any` 的本质是类型系统中的顶级类型，即 Top Type，这是许多类型语言中的重要概念，
>
> anyscript ☺:)

`any` 类型的万能性也导致我们经常滥用它，比如类型不兼容了就 `any` 一下，类型不想写了也 any 一下，不确定可能会是啥类型还是 `any`  一下。此时的 TypeScript 就变成了令人诟病的 AnyScript。为了避免这一情况，我们要记住以下使用小 tips ：

- 如果是类型不兼容报错导致你使用 `any`，考虑用类型断言替代，我们下面就会开始介绍类型断言的作用。
- 如果是类型太复杂导致你不想全部声明而使用 `any`，考虑将这一处的类型去断言为你需要的最简类型。如你需要调用 `foo.bar.baz()`，就可以先将 `foo` 断言为一个具有 `bar` 方法的类型。
- 如果你是想表达一个未知类型，更合理的方式是使用 `unknown`。

#### 4.1.2 unknown

`unknown` 类型和 `any` 类型有些类似

- **一个 `unknown` 类型的变量可以再次赋值为任意其它类型**

- **但只能赋值给 `any` 与 `unknown` 类型的变量**：

```typescript
let unknownVar: unknown = "zxh";

unknownVar = false;
unknownVar = "zxh";
unknownVar = {
  site: "juejin"
};

unknownVar = () => { }

const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;
```

`unknown` 和 `any` 的一个主要差异体现在赋值给别的变量时

- `any` 就像是 **“我身化万千无处不在”** ，所有类型都把它当自己人。

- 而 `unknown` 就像是 **“我虽然身化万千，但我坚信我在未来的某一刻会得到一个确定的类型”** ，只有 `any` 和 `unknown` 自己把它当自己人。简单地说，`any` 放弃了所有的类型检查，而 `unknown` 并没有。这一点也体现在对 `unknown` 类型的变量进行属性访问时：

```typescript
let unknownVar: unknown;

unknownVar.foo(); // 报错：对象类型为 unknown
```

要对 `unknown` 类型进行属性访问，需要进行类型断言（别急，马上就讲类型断言！），即“虽然这是一个未知的类型，但我跟你保证它在这里就是这个类型！”：

```typescript
let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();
```

在类型未知的情况下，更推荐使用 `unknown`  标注。

这相当于你使用额外的心智负担保证了类型在各处的结构，后续重构为具体类型时也可以获得最初始的类型信息，同时还保证了类型检查的存在。当然，`unknown` 用起来很麻烦，一堆类型断言写起来可不太好看。归根结底，到底用哪个完全取决于你自己，毕竟语言只是工具嘛。

如果说，`any` 与 `unknown` 是比原始类型、对象类型等更广泛的类型，也就是说它们更上层一些，就像 `string` 字符串类型比 `'zxh'` 字符串字面量更上层一些，即 `any/unknown` -> 原始类型、对象类型 -> 字面量类型。那么，**是否存在比字面量类型更底层一些的类型**？

这里的上层与底层，其实即意味着包含类型信息的多少。`any`  类型包括了任意的类型，字符串类型包括任意的字符串字面量类型，而字面量类型只表示一个精确的值类型。如要还要更底层，也就是再少一些类型信息，那就只能什么都没有了。

而内置类型 `never` 就是这么一个“什么都没有”的类型。此前我们已经了解了另一个“什么都没有”的类型，`void`。但相比于 `void` ，`never` 还要更加空白一些。

#### 4.1.3 虚无的 never 类型

是不是有点不好理解？我们看一个联合类型的例子就能 get 到一些了。

```typescript
type UnionWithNever = "zxh" | 599 | true | void | never;
```

将鼠标悬浮在类型别名之上，你会发现这里显示的类型是`"linbudu" | 599 | true | void`。never 类型被直接无视掉了，而 void 仍然存在。这是因为，void 作为类型表示一个空类型，就像没有返回值的函数使用 void  来作为返回值类型标注一样，void 类型就像 JavaScript 中的 null 一样代表“这里有类型，但是个空类型”。

而 never 才是一个“什么都没有”的类型，它甚至不包括空的类型，严格来说，**never 类型不携带任何的类型信息**，因此会在联合类型中被直接移除，比如我们看 void 和 never 的类型兼容性：

```typescript
declare let v1: never;
declare let v2: void;

v1 = v2; // X 类型 void 不能赋值给类型 never

v2 = v1;
```

在编程语言的类型系统中，`never` 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**。和 `null、undefined` 一样，它是所有类型的子类型，但只有 `never` 类型的变量能够赋值给另一个 never 类型变量。

通常我们不会显式地声明一个 `never` 类型，它主要被类型检查所使用。但在某些情况下使用 `never` 确实是符合逻辑的，比如一个只负责抛出错误的函数：

```typescript
function justThrow(): never {
  throw new Error()
}
```

在类型流的分析中，一旦一个返回值类型为 `never` 的函数被调用，那么下方的代码都会被视为无效的代码（即无法执行到）：

```typescript
function justThrow(): never {
  throw new Error()
}

function foo (input:number){
  if(input > 1){
    justThrow();
    // 等同于 return 语句后的代码，即 Dead Code
    const name = "ZXH";
  }
}
```

我们也可以显式利用它来进行类型检查，即上面在联合类型中 `never` 类型神秘消失的原因。假设，我们需要对一个联合类型的每个类型分支进行不同处理：

```typescript
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
  console.log("bool!");
} else {
  throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}
```

如果我们希望这个变量的每一种类型都需要得到妥善处理，在最后可以抛出一个错误，但这是运行时才会生效的措施，是否能在类型检查时就分析出来？

实际上，由于 TypeScript 强大的类型分析能力，每经过一个 `if` 语句处理，`strOrNumOrBool` 的类型分支就会减少一个（因为已经被对应的 `typeof` 处理过）。而在最后的 `else` 代码块中，它的类型只剩下了 `never`  类型，即一个无法再细分、本质上并不存在的虚空类型。在这里，我们可以利用只有 `never` 类型能赋值给 `never`  类型这一点，来巧妙地分支处理检查：

```typescript
if (typeof strOrNumOrBool === "string") {
    // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  strOrNumOrBool === true;
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

假设某个粗心的同事新增了一个类型分支，`strOrNumOrBool` 变成了 `strOrNumOrBoolOrFunc`，却忘记新增对应的处理分支，此时在 `else` 代码块中就会出现将 `Function` 类型赋值给 `never` 类型变量的类型错误。这实际上就是利用了类型分析能力与 `never` 类型只能赋值给 `never` 类型这一点，来确保联合类型变量被妥善处理。

前面我们提到了主动使用 `never` 类型的两种方式，而 `never` 其实还会在某些情况下不请自来。比如说，你可能遇到过这样的类型错误：

```typescript
const arr = [];

arr.push("zxh"); // 类型“string”的参数不能赋给类型“never”的参数。
```

此时这个未标明类型的数组被推导为了 `never[]` 类型，这种情况仅会在你启用了 `strictNullChecks` 配置，同时禁用了 `noImplicitAny`  配置时才会出现。解决的办法也很简单，为这个数组声明一个具体类型即可。关于这两个配置的具体作用，我们会在后面有详细的介绍。

### 4.2 类型断言：警告编译器不准报错

**类型断言能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型。**

它其实就是一个将变量的已有类型更改为新指定类型的操作，它的基本语法是 `as NewType`，你可以将 `any / unknown` 类型断言到一个具体的类型：

```typescript
let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();
```

还可以 `as` 到 `any` 来为所欲为，跳过所有的类型检查：

```typescript
const str: string = "zxh";

(str as any).func().foo().prop;
```

也可以在联合类型中断言一个具体的分支：

```typescript
function foo(union: string | number) {
  if ((union as string).includes("zxh")) {
  }
    
  if ((union as number).toFixed() === "22") {
  }
}
```

但是类型断言的正确使用方式是，在 TypeScript 类型分析不正确或不符合预期时，将其断言为此处的正确类型：

```typescript
interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo
}

const {
  foo = {} as IFoo
} = obj
```

这里从 `{}` 字面量类型断言为了 `IFoo` 类型，即为解构赋值默认值进行了预期的类型断言。当然，更严谨的方式应该是定义为 `Partial<IFoo>` 类型，即 IFoo 的属性均为可选的。

除了使用 `as` 语法以外，你也可以使用 `<>` 语法。它虽然书写更简洁，但效果一致，只是在 TSX 中尖括号断言并不能很好地被分析出来。你也可以通过 TypeScript ESLint 提供的 [`consistent-type-assertions`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fconsistent-type-assertions.md) 规则来约束断言风格。

需要注意的是，类型断言应当是在迫不得己的情况下使用的。虽然说我们可以用类型断言纠正不正确的类型分析，但类型分析在大部分场景下还是可以智能地满足我们需求的。

总的来说，在实际场景中，还是 `as any` 这一种操作更多。但这也是让你的代码编程 AnyScript 的罪魁祸首之一，请务必小心使用。

### 4.3 双重断言

如果在使用类型断言时，原类型与断言类型之间差异过大，也就是指鹿为马太过离谱，离谱到了指鹿为霸王龙的程度，TypeScript 会给你一个类型报错：

```typescript
const str: string = "zxh";

// 从 X 类型 到 Y 类型的断言可能是错误的，blabla
(str as { handler: () => {} }).handler()
```

此时它会提醒你先断言到 unknown 类型，再断言到预期类型，就像这样：

```typescript
const str: string = "zxh";

(str as unknown as { handler: () => {} }).handler();

// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();
```

这是因为你的断言类型和原类型的差异太大，需要先断言到一个通用的类，即 `any / unknown`。这一通用类型包含了所有可能的类型，因此 **断言到它** 和 **从它断言到另一个类型** 差异不大。

### 4.4 非空断言 `!`

**非空断言其实是类型断言的简化，它使用 `!` 语法，即 `obj!.func()!.prop` 的形式标记前面的一个声明一定是非空的（实际上就是剔除了 `null` 和 `undefined` 类型）**，比如这个例子：

```typescript
declare const foo: {
  func?: () => ({
    prop?: number | null;
  })
};

foo.func().prop.toFixed();
```

```typescript
declare const foo: {
  func?: () => ({
    prop?: number | null;
  })
};

foo.func().prop.toFixed();
```

此时，`func` 在 `foo` 中不一定存在，`prop` 在 `func` 调用结果中不一定存在，且可能为 `null`，我们就会收获两个类型报错。如果不管三七二十一地坚持调用，想要解决掉类型报错就可以使用非空断言：

```typescript
foo.func!().prop!.toFixed();
```

其应用位置类似于可选链：

```typescript
foo.func?.().prop?.toFixed();
```

但不同的是，**非空断言的运行时仍然会保持调用链，因此在运行时可能会报错**。而可选链则会在某一个部分收到 `undefined` 或 `null` 时直接短路掉，不会再发生后面的调用。

非空断言的常见场景还有 `document.querySelector`、`Array.find` 方法等：

```typescript
const element = document.querySelector("#id")!;
const target = [1, 2, 3, 599].find(item => item === 599)!;
```

为什么说非空断言是类型断言的简写？因为上面的非空断言实际上等价于以下的类型断言操作：

```typescript
((foo.func as () => ({
  prop?: number;
}))().prop as number).toFixed();
```

可以通过 [`non-nullable-type-assertion-style`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fnon-nullable-type-assertion-style.md) 规则来检查代码中是否存在类型断言能够被简写为非空断言的情况。

类型断言还有一种用法是作为代码提示的辅助工具，比如对于以下这个稍微复杂的接口：

```typescript
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
```

假设你想要基于这个结构随便实现一个对象，你可能会使用类型标注：

```typescript
const obj: IStruct = {};
```

这个时候等待你的是一堆类型报错，你必须规规矩矩地实现整个接口结构才可以。但如果使用类型断言，我们可以在保留类型提示的前提下，不那么完整地实现这个结构：

```typescript
// 这个例子是不会报错的
const obj = <IStruct>{
  bar: {
    baz: {},
  },
};
```

## 5.类型工具

- 类型工具可以分成三类：
    - **操作符**
    - **关键字**
    - **专用语法**

- 按照使用目的来划分，类型工具可以分为两类：
    - **类型创建** 
    - **类型安全保护** 


### 5.1 类型别名

类型别名可以说是 TypeScript 类型编程中最重要的一个功能，从一个简单的函数类型别名，到让你眼花缭乱的类型体操，都离不开类型别名。虽然很重要，但它的使用却并不复杂：

```typescript
type A = string;
```

我们通过 `type` 关键字声明了一个类型别名 `A` ，同时它的类型等价于 `string` 类型。

**类型别名的作用主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用。**

比如抽离一组联合类型：

```typescript
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;
```

抽离一个函数类型：

```typescript
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => { };
const moveHandler: Handler = (e) => { };
const dragHandler: Handler = (e) => { };
```

声明一个对象类型，就像接口那样：

```typescript
type ObjType = {
  name: string;
  age: number;
}
```

看起来类型别名真的非常简单，不就是声明了一个变量让类型声明更简洁和易于拆分吗？如果真的只是把它作为类型别名，用来进行特定类型的抽离封装，那的确很简单。

然而，类型别名还能作为工具类型。**工具类同样基于类型别名，只是多了个泛型**。

如果你还不了解泛型也无需担心，现阶段我们只要了解它和类型别名相关的使用就可以了。至于更复杂的泛型使用场景，我们后面会详细了解。

在类型别名中，类型别名可以这么声明自己能够接受泛型（我称之为泛型坑位）。

一旦接受了泛型，我们就叫它工具类型：

```typescript
type Factory<T> = T | number | string;
```

虽然现在类型别名摇身一变成了工具类型，但它的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现 **更灵活的类型创建功能**。从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型。比如在上面这个工具类型中，我们就简单接受了一个泛型，然后把它作为联合类型的一个成员，返回了这个联合类型。

```typescript
const foo: Factory<boolean> = true;
```

当然，我们一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名：

```typescript
type FactoryWithBool = Factory<boolean>;

const foo: FactoryWithBool = true;
```

同时，泛型参数的名称（上面的 `T` ）也不是固定的。通常我们使用大写的 `T / K / U / V / M / O ...` 这种形式。如果为了可读性考虑，我们也可以写成大驼峰形式（即在驼峰命名的基础上，首字母也大写）的名称，比如：

```typescript
type Factory<NewType> = NewType | number | string;
```

声明一个简单、有实际意义的工具类型：

```typescript
type MaybeNull<T> = T | null;
```

这个工具类型会接受一个类型，并返回一个包括 `null` 的联合类型。这样一来，在实际使用时就可以确保你处理了可能为空值的属性读取与方法调用：

类似的还有 `MaybePromise、MaybeArray`。

```typescript
type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}
```

另外，类型别名中可以接受任意个泛型，以及为泛型指定约束、默认值等。

总之，对于工具类型来说，它的主要意义是 **基于传入的泛型进行各种类型操作**，得到一个新的类型。而这个类型操作的指代就非常非常广泛了，甚至说类型编程的大半难度都在这儿呢，这也是这本小册占据篇幅最多的部分。

### 5.2 联合类型与交叉类型

实际上，联合类型还有一个和它有点像的孪生兄弟：**交叉类型**。它和联合类型的使用位置一样，只不过符号是 `&`，即按位与运算符。

实际上，正如联合类型的符号是 `|`，它代表了按位或，即只需要符合联合类型中的一个类型，既可以认为实现了这个联合类型，如`A | B`，只需要实现 A 或 B 即可。

而代表着按位与的 `&` 则不同，你需要符合这里的所有类型，才可以说实现了这个交叉类型，即 `A & B`，**需要同时满足 A 与 B 两个类型 ** 才行。

我们声明一个交叉类型：

```typescript
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "zxh",
  age: 18
}
```

很明显这里的 `profile` 对象需要同时符合这两个对象的结构。从另外一个角度来看，`ProfileStruct` 其实就是一个新的，同时包含 `NameStruct` 和 `AgeStruct` 两个接口所有属性的类型。这里是对于对象类型的合并，那对于原始类型呢？

```typescript
type StrAndNum = string & number; // never
```

我们可以看到，它竟然变成 `never` 了！看起来很奇怪，但想想我们前面给出的定义，新的类型会同时符合交叉类型的所有成员，存在既是 `string`  又是 `number` 的类型吗？

当然不。实际上，这也是 `never` 这一 `BottomType` 的实际意义之一，描述 **根本不存在的类型** 。

对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并：

```typescript
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }
```

如果是两个联合类型组成的交叉类型呢？其实还是类似的思路，既然只需要实现一个联合类型成员就能认为是实现了这个联合类型，那么各实现两边联合类型中的一个就行了，也就是两边联合类型的交集：

```typescript
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string
```

总结一下:

交叉类型和联合类型的区别就是，**联合类型只需要符合成员之一即可（`||`），而交叉类型需要严格符合每一位成员（`&&`）。**

### 5.3 索引类型

索引类型指的不是某一个特定的类型工具，它其实包含三个部分：

- **索引签名类型**
- **索引类型查询 **
-  **索引类型访问**。

目前很多社区的学习教程并没有这一点进行说明，实际上这三者都是独立的类型工具。

唯一共同点是，**它们都通过索引的形式来进行类型操作**，但索引签名类型是 **声明**，后两者则是 **读取**。接下来，我们来依次介绍三个部分。

#### 5.3.1 索引签名类型

**索引签名类型主要指的是在接口或类型别名中**，通过以下语法来 **快速声明一个键值类型一致的类型结构**：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

type AllStringTypes = {
  [key: string]: string;
}
```

这时，即使你还没声明具体的属性，对于这些类型结构的属性访问也将全部被视为 string 类型：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

type PropType1 = AllStringTypes['zxh']; // string
type PropType2 = AllStringTypes['599']; // string
```

在这个例子中我们声明的键的类型为 `string`（`[key: string]`），这也意味着在实现这个类型结构的变量中 

**只能声明字符串类型的键**：

```typescript
interface AllStringTypes {
  [key: string]: string;
}

const foo: AllStringTypes = {
  "zxh": "599"
}
```

但由于 JavaScript 中，对于 `obj[prop]` 形式的访问会将**数字索引访问转换为字符串索引访问**，也就是说， `obj[599]` 和 `obj['599']` 的效果是一致的。

因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。类似的，`symbol` 类型也是如此：

```typescript
const foo: AllStringTypes = {
  "zxh": "599",
  599: "zxh",
  [Symbol("ddd")]: 'symbol',
}
```

索引签名类型也可以和具体的键值对类型声明并存，**但这时这些具体的键值类型也需要符合索引签名类型的声明**：

```typescript
interface AllStringTypes {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  propA: number;
  [key: string]: boolean;
}
```

这里的符合即指子类型，因此自然也包括联合类型：

```typescript
interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}
```

索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 `any` 的索引签名类型，以此来暂时支持 **对类型未明确属性的访问**，并在后续一点点补全类型：

```typescript
interface AnyTypeHere {
  [key: string]: any;
}

const foo: AnyTypeHere['zxh'] = 'any value';
```

#### 5.3.2 索引类型查询

 `keyof` 可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。

注意，**这里并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量**

```typescript
type Foo = {
  zxh: "zxh";
  24: 'age';
};

type FooKeysk = keyof Foo; // 'zxh' | 24
```

如果觉得不太好理解，我们可以写段伪代码来模拟 **“从键名到联合类型”** 的过程。

```typescript
type FooKeys = Object.keys(Foo).join(" | ");
```

除了应用在已知的对象类型结构上以外，你还可以直接 `keyof any` 来生产一个联合类型，它会由所有可用作对象键值的类型组成：`string | number | symbol`。也就是说，它是由无数字面量类型组成的，由此我们可以知道， **keyof 的产物必定是一个联合类型**。

#### 5.3.3 索引类型访问

在 JavaScript 中我们可以通过 `obj[expression]` 的方式来动态访问一个对象属性（即计算属性），`expression `表达式会先被执行，然后使用返回值来访问属性。而 TypeScript 中我们也可以通过类似的方式，只不过这里的 `expression` 要换成类型。接下来，我们来看个例子：

```typescript
interface NumberRecord {
  [key: string]: number;
}

type PropType = NumberRecord[string]; // number
```

这里，我们使用 `string` 这个类型来访问 `NumberRecord`。由于其内部声明了数字类型的索引签名，这里访问到的结果即是 `number` 类型。注意，其访问方式与返回值均是类型。

更直观的例子是通过字面量类型来进行索引类型访问：

```typescript
interface Foo {
  propA: number;
  propB: boolean;
}

type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean
```

看起来这里就是普通的值访问，但实际上这里的`'propA'`和`'propB'`都是 **字符串字面量类型**，**而不是一个 JavaScript 字符串值**。

索引类型查询的本质其实就是，**通过键的字面量类型（`'propA'`）访问这个键对应的键值类型（`number`）**。

看到这你肯定会想到，上面的 `keyof` 操作符能一次性获取这个对象所有的键的字面量类型，是否能用在这里？当然，这可是 TypeScript 啊。

```typescript
interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
```

使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型。

**索引类型查询、索引类型访问通常会和映射类型一起搭配使用**，前两者负责访问键，而映射类型在其基础上访问键值类型，我们在下面一个部分就会讲到。

注意，在未声明索引签名类型的情况下，我们不能使用 `NumberRecord[string]` 这种原始类型的访问方式，而只能通过键名的字面量类型来进行访问。

```typescript
interface Foo {
  propA: number;
}

// 类型“Foo”没有匹配的类型“string”的索引签名。
type PropAType = Foo[string]; 
```

### 5.4 映射类型：类型编程第一步

不同于索引类型包含好几个部分，映射类型指的就是一个确切的类型工具。看到映射这个词你应该能联想到 JavaScript 中数组的 `map` 方法，实际上也是如此，

映射类型的主要作用即是 **基于键名映射到键值类型**。概念不好理解，我们直接来看例子：

```typescript
type Stringify<T> = {
  [K in keyof T]: string;
};
```

这个工具类型会接受一个对象类型（假设我们只会这么用），使用 `keyof` 获得这个对象类型的键名组成字面量联合类型，然后通过映射类型（即这里的 `in` 关键字）将这个联合类型的每一个成员映射出来，并将其键值类型设置为 `string`。

具体使用的表现是这样的：

```typescript
interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于
interface StringifiedFoo {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
```

我们还是可以用伪代码的形式进行说明：

```typescript
const StringifiedFoo = {};
for (const k of Object.keys(Foo)){
  StringifiedFoo[k] = string;
}
```

看起来好像很奇怪，我们应该很少会需要把一个接口的所有属性类型映射到 `string` ？这有什么意义吗？别忘了，既然拿到了键，那键值类型其实也能拿到：

```typescript
type Clone<T> = {
  [K in keyof T]: T[K];
};
```

这里的 `T[K]` 其实就是上面说到的索引类型访问，我们使用键的字面量类型访问到了键值的类型，这里就相当于克隆了一个接口。需要注意的是，这里其实只有 `K in ` 属于映射类型的语法，`keyof T` 属于  `keyof` 操作符，`[K in keyof T]` 的 `[]` 属于索引签名类型，`T[K]` 属于索引类型访问。



| 类型工具                             | 创建新类型的方式                                             | 常见搭配           |
| ------------------------------------ | ------------------------------------------------------------ | ------------------ |
| 类型别名（Type Alias）               | 将一组类型/类型结构封装，作为一个新的类型                    | 联合类型、映射类型 |
| 工具类型（Tool Type）                | 在类型别名的基础上，基于泛型去动态创建新类型                 | 基本所有类型工具   |
| 联合类型（Union Type）               | 创建一组类型集合，满足其中一个类型即满足这个联合类型（`||`） | 类型别名、工具类型 |
| 交叉类型（Intersection Type）        | 创建一组类型集合，满足其中所有类型才满足映射联合类型（&&）   | 类型别名、工具类型 |
| 索引签名类型（Index Signature Type） | 声明一个拥有任意属性，键值类型一致的接口结构                 | 映射类型           |
| 索引类型查询（Indexed Type Query）   | 从一个接口结构，创建一个由其键名字符串字面量组成的联合类型   | 映射类型           |
| 索引类型访问（Indexed Access Type）  | 从一个接口结构，使用键名字符串字面量访问到对应的键值类型     | 类型别名、映射类型 |
| 映射类型  （Mapping Type）           | 从一个联合类型依次映射到其内部的每一个类型                   | 工具类型           |

### 5.5 类型查询操作符 `typeof`

TypeScript 存在两种功能不同的 `typeof` 操作符。

- 我们最常见的一种 `typeof` 操作符就是 JavaScript 中，用于检查变量类型的 `typeof` ，它会返回 `"string"` / `"number"` / `"object"` / `"undefined"` 等值。
- 而除此以外， TypeScript 还新增了用于类型查询的 `typeof` ，即 **Type Query Operator**，这个 `typeof` 返回的是一个 TypeScript 类型：

```typescript
const str = "zxh";

const obj = { name: "zxh" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str; // "zxh"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
```

你不仅可以直接在类型标注中使用 `typeof`，还能在工具类型中使用 `typeof`。

```typescript
const func = (input: string) => {
  return input.length > 10;
}

const func2: typeof func = (name: string) => {
  return name === 'zxh'
}
```

这里我们暂时不用深入了解 `ReturnType` 这个工具类型，只需要知道它会返回一个函数类型中返回值位置的类型：

```typescript
const func = (input: string) => {
  return input.length > 10;
}

// boolean
type FuncReturnType = ReturnType<typeof func>;
```

绝大部分情况下，`typeof` 返回的类型就是当你把鼠标悬浮在变量名上时出现的推导后的类型，并且是 **最窄的推导程度（即到字面量类型的级别）**。你也不必担心混用了这两种 `typeof`，在逻辑代码中使用的 `typeof` 一定会是 JavaScript 中的  `typeof`，而类型代码（如类型标注、类型别名中等）中的一定是类型查询的 `typeof`  。同时，为了更好地避免这种情况，也就是隔离类型层和逻辑层，类型查询操作符后是不允许使用表达式的：

```typescript
const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许表达式
let isValid: typeof isInputValid("zxh");
```

### 5.6 类型守卫

TypeScript 中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为 **类型的控制流分析**（也可以简单理解为类型推导）。

这么说有点抽象，我们可以想象有一条河流，它从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。在河流流动的过程中，如果遇到了有特定条件才能进入的河道（比如 `if else` 语句、`switch case` 语句等），那河流流过这里就会收集对应的信息，等到最后合并时，它们就会嚷着交流：**“我刚刚流过了一个只有字符串类型才能进入的代码分支！”** **“我刚刚流过了一个只有函数类型才能进入的代码分支！”**……就这样，它会把整个程序的类型信息都收集完毕。

```typescript
function foo (input: string | number) {
  if(typeof input === 'string') {}
  if(typeof input === 'number') {}
  // ...
}
```

我们在 `never` 类型一节中学到的也是如此。在类型控制流分析下，每流过一个 `if` 分支，后续联合类型的分支就少了一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支：

```typescript
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  // 一定是数字！
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  // 一定是布尔值！
  strOrNumOrBool === true;
} else {
  // 要是走到这里就说明有问题！
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

在这里，我们实际上通过 `if` 条件中的表达式进行了类型保护，即告知了流过这里的分析程序每个 `if` 语句代码块中变量会是何类型。这即是编程语言的类型能力中最重要的一部分：**与实际逻辑紧密关联的类型**。我们从逻辑中进行类型地推导，再反过来让类型为逻辑保驾护航。

前面我们说到，类型控制流分析就像一条河流一样流过，那 `if` 条件中的表达式要是现在被提取出来了怎么办？

```typescript
function isString(input: unknown): boolean {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    (input).replace("zxh", "zxh599")
  }
  if (typeof input === 'number') { }
  // ...
}
```

奇怪的事情发生了，我们只是把逻辑提取到了外面而已，如果 `isString` 返回了 `true`，那 `input` 肯定也是 `string` 类型啊？

想象类型控制流分析这条河流，刚流进 `if (isString(input))` 就戛然而止了。因为 `isString` 这个函数在另外一个地方，内部的判断逻辑并不在函数 `foo` 中。这里的类型控制流分析做不到跨函数上下文来进行类型的信息收集（但别的类型语言中可能是支持的）。

实际上，将判断逻辑封装起来提取到函数外部进行复用非常常见。

为了解决这一类型控制流分析的能力不足， TypeScript 引入了 **is 关键字**来显式地提供类型信息：

```typescript
function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    (input).replace("zxh", "zxh599")
  }
  if (typeof input === 'number') { }
  // ...
}
```

`isString` 函数称为类型守卫，在它的返回值中，我们不再使用 `boolean` 作为类型标注，而是使用 `input is string` 这么个奇怪的搭配，拆开来看它是这样的：

- `input` 函数的某个参数；
- `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 `true`，那么 `is` 关键字前这个入参的类型，就会 **被这个类型守卫调用方后续的类型控制流分析收集到**。

需要注意的是，类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查：

```typescript
function isString(input: unknown): input is number {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 报错，在这里变成了 number 类型
    (input).replace("zxh", "zxh24")
  }
  if (typeof input === 'number') { }
  // ...
}
```

**从这个角度来看，其实类型守卫有些类似于类型断言，但类型守卫更宽容，也更信任你一些。你指定什么类型，它就是什么类型。** 

除了使用简单的原始类型以外，我们还可以在类型守卫中使用对象类型、联合类型等，比如下面我开发时常用的两个守卫：

```typescript
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);
```

除了使用 `typeof` 以外，我们还可以使用许多类似的方式来进行类型保护，只要它能够在联合类型的类型成员中起到筛选作用。

#### 5.6.1 基于 `in` 和 `instanceof` 的类型保护

[`in` 操作符](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fin) 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 `key in object` 的方式来判断 `key` 是否存在于 `object` 或其原型链上（返回 `true` 说明存在）。

既然能起到区分作用，那么 TypeScript 中自然也可以用它来保护类型：

```typescript
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

这里的 `foo / bar`、`fooOnly / barOnly`、`shared` 属性们其实有着不同的意义。我们使用 `foo` 和 `bar` 来区分  `input` 联合类型，然后就可以在对应的分支代码块中正确访问到 `Foo` 和 `Bar` 独有的类型 `fooOnly / barOnly`。但是，如果用 `shared` 来区分，就会发现在分支代码块中 `input` 仍然是初始的联合类型：

```typescript
function handle(input: Foo | Bar) {
  if ('shared' in input) {
    // 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。
    input.fooOnly;
  } else {
    // 类型“never”上不存在属性“barOnly”。
    input.barOnly;
  }
}
```

这里需要注意的是，`Foo` 与 `Bar` 都满足 `'shared' in input` 这个条件。因此在 if 分支中， Foo 与 Bar 都会被保留，那在 `else` 分支中就只剩下 `never` 类型。

这个时候肯定有人想问，为什么 `shared` 不能用来区分？答案很明显，因为它同时存在两个类型中不具有辨识度。而 `foo / bar` 和 `fooOnly / barOnly` 是各个类型独有的属性，因此可以作为 **可辨识属性（Discriminant Property 或 Tagged Property）**。`Foo` 与 `Bar` 又因为存在这样具有区分能力的辨识属性，可以称为 **可辨识联合类型（Discriminated Unions 或 Tagged Union）**。虽然它们是一堆类型的联合体，但其中每一个类型都具有一个独一无二的，能让它鹤立鸡群的属性。

这个可辨识属性可以是结构层面的，比如结构 A 的属性 `prop` 是数组，而结构 B 的属性 `prop` 是对象，或者结构 A 中存在属性 `prop` 而结构 B 中不存在。

它甚至可以是共同属性的字面量类型差异：

```typescript
function ensureArray(input: number | number[]): number[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}

interface Foo {
  kind: 'foo';
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  kind: 'bar';
  diffType: number;
  barOnly: boolean;
  shared: number;
}

function handle1(input: Foo | Bar) {
  if (input.kind === 'foo') {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

如上例所示，对于同名但不同类型的属性，我们需要使用字面量类型的区分，并不能使用简单的 typeof：

```typescript
function handle2(input: Foo | Bar) {
  // 报错，并没有起到区分的作用，在两个代码块中都是 Foo | Bar
  if (typeof input.diffType === 'string') {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```

除此之外，JavaScript 中还存在一个功能类似于 `typeof` 与 `in` 的操作符：[instanceof](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof)，它判断的是原型级别的关系，如 `foo instanceof Base` 会沿着 `foo` 的原型链查找 `Base.prototype` 是否存在其上。当然，在 ES6 已经无处不在的今天，我们也可以简单地认为这是判断  `foo` 是否是 `Base` 类的实例。同样的，`instanceof` 也可以用来进行类型保护：

```typescript
class FooBase {}

class BarBase {}

class Foo extends FooBase {
  fooOnly() {}
}
class Bar extends BarBase {
  barOnly() {}
}

function handle(input: Foo | Bar) {
  if (input instanceof FooBase) {
    input.fooOnly();
  } else {
    input.barOnly();
  }
}
```

除了使用 `is` 关键字的类型守卫以外，其实还存在使用 `asserts` 关键字的类型断言守卫。

#### 5.6.2 类型断言守卫

如果你写过测试用例或者使用过 NodeJs 的 `assert` 模块，那对断言这个概念应该不陌生：

```typescript
import assert from 'assert';

let name: any = 'zxh';

assert(typeof name === 'number');

// number 类型
name.toFixed();
```

上面这段代码在运行时会抛出一个错误，因为 `assert` 接收到的表达式执行结果为 `false`。这其实也类似类型守卫的场景：如果断言 **不成立**，比如在这里意味着值的类型不为 `number`，那么在断言下方的代码就执行不到（相当于 Dead Code）。如果断言通过了，不管你最开始是什么类型，断言后的代码中就 **一定是符合断言的类型**，比如在这里就是 `number`。

**但断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型。** 

这里的抛出错误可能让你想到了 `never` 类型，但实际情况要更复杂一些，断言守卫并不会始终都抛出错误，所以它的返回值类型并不能简单地使用  `never` 类型。为此，TypeScript 3.7 版本专门引入了 `asserts` 关键字来进行断言场景下的类型守卫，比如前面 `assert`  方法的签名可以是这样的：

```typescript
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
```

这里使用的是 `asserts condition` ，而 `condition` 来自于实际逻辑！这也意味着，我们 **将 condition 这一逻辑层面的代码，作为了类型层面的判断依据**，相当于在返回值类型中使用一个逻辑表达式进行了类型标注。

举例来说，对于 `assert(typeof name === 'number');` 这么一个断言，如果函数成功返回，就说明其后续的代码中 `condition` 均成立，也就是 `name` 神奇地变成了一个 `number` 类型。

这里的 `condition` 甚至还可以结合使用 `is` 关键字来提供进一步的类型守卫能力：

```typescript
let name: any = 'zxh';

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!');
  }
}

assertIsNumber(name);

// number 类型！
name.toFixed();
```

在这种情况下，你无需再为断言守卫传入一个表达式，而是可以将这个判断用的表达式放进断言守卫的内部，来获得更独立地代码逻辑。

### 5.7 接口合并

接口和类型别名都能直接使用交叉类型。但除此以外，接口还能够使用继承进行合并，在继承时子接口可以声明同名属性，但并不能覆盖掉父接口中的此属性。**子接口中的属性类型需要能够兼容（extends）父接口中的属性类型**：

```typescript
interface Struct1 {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
  unionProp: string | number;
}

// 接口“Struct2”错误扩展接口“Struct1”。
interface Struct2 extends Struct1 {
  // “primitiveProp”的类型不兼容。不能将类型“number”分配给类型“string”。
  primitiveProp: number;
  // 属性“objectProp”的类型不兼容。
  objectProp: {
    age: number;
  };
  // 属性“unionProp”的类型不兼容。
  // 不能将类型“boolean”分配给类型“string | number”。
  unionProp: boolean;
}
```

类似的，如果你直接声明多个同名接口，虽然接口会进行合并，但这些同名属性的类型仍然需要兼容，此时的表现其实和显式扩展接口基本一致：

```typescript
interface Struct1 {
  primitiveProp: string;
}

interface Struct1 {
// 后续属性声明必须属于同一类型。
// 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。
  primitiveProp: number;
}
```

这也是接口和类型别名的重要差异之一。

那么接口和类型别名之间的合并呢？其实规则一致，如接口 **继承** 类型别名，和类型别名使用交叉类型 **合并** 接口：

```typescript
type Base = {
  name: string;
};

interface IDerived extends Base {
  // 报错！就像继承接口一样需要类型兼容
  name: number;
  age: number;
}

interface IBase {
  name: string;
}

// 合并后的 name 同样是 never 类型
type Derived = IBase & {
  name: number;
};
```

## 6. 泛型

### 6.1 类型别名中的泛型

类型别名如果声明了泛型坑位，那其实就 **等价于一个接受参数的函数**：

```typescript
type Factory<T> = T | number | string;
```

上面这个类型别名的本质就是一个函数，T 就是它的变量，返回值则是一个包含 `T` 的联合类型，我们可以写段伪代码来加深一下记忆：

```typescript
function Factory(typeArg){
  return [typeArg, number, string]
}
```

类型别名中的泛型大多是用来进行工具类型封装，比如我们在上一节的映射类型中学习的工具类型：

```typescript
type Stringify<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};
```

`Stringify` 会将一个对象类型的所有属性类型置为 `string` ，而 `Clone` 则会进行类型的完全复制。我们可以提前看一个 TypeScript 的内置工具类型实现：

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

工具类型 `Partial` 会将传入的对象类型复制一份，但会额外添加一个`?`，还记得这代表什么吗？可选，也就是说现在我们获得了一个属性均为可选的山寨版：

```typescript
interface IFoo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type PartialIFoo = Partial<IFoo>;

// 等价于
interface PartialIFoo {
  prop1?: string;
  prop2?: number;
  prop3?: boolean;
  prop4?: () => void;
}
```

类型别名与泛型的结合中，除了映射类型、索引类型等类型工具以外，还有一个非常重要的工具：条件类型。我们先来简单了解一下：

```typescript
type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2
```

在条件类型参与的情况下，通常泛型会被作为条件类型中的判断条件（`T extends Condition`，或者 `Type extends T`）以及返回值（即 `:` 两端的值），这也是我们筛选类型需要依赖的能力之一。

#### 6.1.1 泛型约束与默认值

像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定，比如：

```typescript
type Factory<T = boolean> = T | number | string;
```

这样在你调用时就可以不带任何参数了，默认会使用我们声明的默认值来填充。

```typescript
const foo: Factory = false;
```

伪代码帮助理解：

```typescript
function Factory(typeArg = boolean){
  return [typeArg, number, string]
}
```

除了声明默认值以外，泛型还能做到一样函数参数做不到的事：**泛型约束**。也就是说，你可以要求传入这个工具类型的泛型必须符合某些条件，否则你就拒绝进行后面的逻辑。在函数中，我们只能在逻辑中处理：

```typescript
function add(source: number, add: number){
  if(typeof source !== 'number' || typeof add !== 'number'){
    throw new Error("Invalid arguments!")
  }
  
  return source + add;
}
```

而在泛型中，我们可以 **使用 `extends` 关键字来约束传入的泛型参数必须符合要求**。关于 `extends`，`A extends B` 意味着 **A 是 B 的子类型**，这里我们暂时只需要了解非常简单的判断逻辑，也就是说 `A` 比 `B` 的类型更精确，或者说更复杂。具体来说，可以分为以下几类。

- 更精确，如 **字面量类型是对应原始类型的子类型**，即 `'zxh' extends string`，`24 extends number` 成立。类似的，**联合类型子集均为联合类型的子类型**，即 `1`、 `1 | 2` 是 `1 | 2 | 3 | 4` 的子类型。
- 更复杂，如 `{ name: string }` 是 `{}` 的子类型，因为在 `{}` 的基础上增加了额外的类型，基类与派生类（父类与子类）同理。

```typescript
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';
```

这个例子会根据传入的请求码判断请求是否成功，这意味着它只能处理数字字面量类型的参数，因此这里我们通过 `extends number` 来标明其类型约束，如果传入一个不合法的值，就会出现类型错误：

```typescript
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';


type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。
```

与此同时，如果我们想让这个类型别名可以无需显式传入泛型参数也能调用，并且默认情况下是成功地，这样就可以为这个泛型参数声明一个默认值：

```typescript
type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';

type Res4 = ResStatus; // "success"
```

在 TypeScript 中，泛型参数存在默认约束（在下面的函数泛型、Class 泛型中也是）。这个默认约束值在 TS 3.9 版本以前是 any，而在 3.9 版本以后则为 unknown。在 TypeScript ESLint 中，你可以使用 [**no-unnecessary-type-constraint**](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fno-unnecessary-type-constraint.md) 规则，来避免代码中声明了与默认约束相同的泛型约束。

#### 6.1.2 多泛型关联

我们不仅可以同时传入多个泛型参数，还可以让这几个泛型参数之间也存在联系。我们可以先看一个简单的场景，条件类型下的多泛型参数：

```typescript
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'zxh', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'zxh', boolean, 'passed!', 'rejected!'>;
```

这个例子表明:

**多泛型参数其实就像接受更多参数的函数，其内部的运行逻辑（类型操作）会更加抽象，表现在参数（泛型参数）需要进行的逻辑运算（类型操作）会更加复杂。**

上面我们说，**多个泛型参数之间的依赖，其实指的即是在后续泛型参数中，使用前面的泛型参数作为约束或默认值**：

```typescript
type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;
```

- 这个工具类型接受 1-3 个泛型参数。
- 第二、三个泛型参数的类型需要是 **首个泛型参数的子类型**。
- 当只传入一个泛型参数时，其第二个泛型参数会被赋值为此参数，而第三个则会赋值为第二个泛型参数，相当于 **均使用了这唯一传入的泛型参数**。
- 当传入两个泛型参数时，第三个泛型参数 **会默认赋值为第二个泛型参数的值**。

### 6.2 对象类型中的泛型

由于泛型提供了对类型结构的复用能力，我们也经常在对象类型结构中使用泛型。最常见的一个例子应该还是响应类型结构的泛型处理：

```typescript
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}
```

这个接口描述了一个通用的响应类型结构，预留出了实际响应数据的泛型坑位，然后在你的请求函数中就可以传入特定的响应类型了：

```typescript
interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {}

type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {}
```

而泛型嵌套的场景也非常常用，比如对存在分页结构的数据，我们也可以将其分页的响应结构抽离出来：

```typescript
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {}
```

这些结构看起来很复杂，但其实就是 **简单的泛型参数填充** 而已。就像我们会封装请求库、请求响应拦截器一样，对请求中的参数、响应中的数据的类型的封装其实也不应该落下。甚至在理想情况下，这些结构体封装应该在请求库封装一层中就被处理掉。

### 6.3 函数中的泛型

假设我们有这么一个函数，它可以接受多个类型的参数并进行对应处理，比如：

- 对于字符串，返回部分截取；
- 对于数字，返回它的 n 倍；
- 对于对象，修改它的属性并返回。

这个时候，我们要如何对函数进行类型声明？是 `any` 大法好？

```typescript
function handle(input: any): any {}
```

还是用联合类型来包括所有可能类型？

```typescript
function handle(input: string | number | {}): string | number | {} {}
```

第一种我们肯定要直接 pass，第二种虽然麻烦了一点，但似乎可以满足需要？但如果我们真的调用一下就知道不合适了。

```typescript
const shouldBeString = handle("zxh");
const shouldBeNumber = handle(599);
const shouldBeObject = handle({ name: "zxh" });
```

虽然我们约束了入参的类型，但返回值的类型并没有像我们预期的那样和入参关联起来，上面三个调用结果的类型仍然是一个宽泛的联合类型 `string | number | {}`。难道要用重载一个个声明可能的关联关系？

```typescript
function handle(input: string): string
function handle(input: number): number
function handle(input: {}): {}
function handle(input: string | number | {}): string | number | {} { }
```

如果再多一些复杂的情况，别说你愿不愿意补充每一种关联了，同事看到这样的代码都会质疑你的水平。这个时候，我们就该请出泛型了：

```typescript
function handle<T>(input: T): T {}
```

我们为函数声明了一个泛型参数 T，并将参数的类型与返回值类型指向这个泛型参数。这样，在这个函数接收到参数时，**T 会自动地被填充为这个参数的类型**。这也就意味着你不再需要预先确定参数的可能类型了，而 **在返回值与参数类型关联的情况下，也可以通过泛型参数来进行运算**。

在基于参数类型进行填充泛型时，其类型信息会被推断到尽可能精确的程度，如这里会 **推导到字面量类型而不是基础类型**。这是因为在直接传入一个值时，这个值是不会再被修改的，因此可以推导到最精确的程度。而如果你使用一个变量作为参数，那么只会使用这个变量标注的类型（在没有标注时，会使用推导出的类型）。

```typescript
function handle<T>(input: T): T {}

const author = "zxh"; // 使用 const 声明，被推导为 "zxh"

let authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "zxh"
handle(authorAge); // 填充为基础类型 number
```

你也可以将鼠标悬浮在表达式上，来查看填充的泛型信息：

![image-20221006104233439](https://i.imgur.com/Gtnm4No.png)

```typescript
function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);
```

函数中的泛型同样存在约束与默认值，比如上面的 handle 函数，现在我们希望做一些代码拆分，不再处理对象类型的情况了：

```typescript
function handle<T extends string | number>(input: T): T {}
```

而 swap 函数，现在我们只想处理数字元组的情况：

```typescript
function swap<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
  return [end, start];
}const handle = <T>(input: T): T => {}
```

而多泛型关联也是如此，比如 [lodash](https://www.lodashjs.com/) 的 `pick` 函数，这个函数首先接受一个对象，然后接受一个对象属性名组成的数组，并从这个对象中截取选择的属性部分：

```typescript
const object = { 'a': 1, 'b': '2', 'c': 3 };

_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

这个函数很明显需要在泛型层面声明关联，即数组中的元素只能来自于对象的属性名（组成的字面量联合类型！），因此我们可以这么写（部分简化）：

```typescript
pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;
```

这里 T 声明约束为对象类型，而 U 声明约束为 `keyof T`。同时对应的，其返回值类型中使用了 `Pick<T, U>` 这一工具类型，它与 `pick` 函数的作用一致，对一个对象结构进行裁剪

函数的泛型参数也会被内部的逻辑消费，如：

```typescript
function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}
```

对于箭头函数的泛型，其书写方式是这样的：

```typescript
const handle = <T>(input: T): T => {}
```

需要注意的是在 tsx 文件中泛型的尖括号可能会造成报错，编译器无法识别这是一个组件还是一个泛型，此时你可以让它长得更像泛型一些：

```typescript
const handle = <T extends any>(input: T): T => {}
```

函数的泛型是日常使用较多的一部分，更明显地体现了 **泛型在调用时被填充** 这一特性，而类型别名中，我们更多是手动传入泛型。这一差异的缘由其实就是它们的场景不同，我们通常使用类型别名来 **对已经确定的类型结构进行类型操作**，比如将一组确定的类型放置在一起。而在函数这种场景中，我们并不能确定泛型在实际运行时会被什么样的类型填充。

需要注意的是，不要为了用泛型而用泛型，就像这样：

```typescript
function handle<T>(arg: T): void {
  console.log(arg);
};
```

在这个函数中，泛型参数 T **没有被返回值消费，也没有被内部的逻辑消费**，这种情况下即使随着调用填充了泛型参数，也是没有意义的。因此这里你就完全可以用 any 来进行类型标注。

### 6.4 Class 中的泛型

Class 中的泛型和函数中的泛型非常类似，只不过函数中泛型参数的消费方是参数和返回值类型，Class 中的泛型消费方则是属性、方法、乃至装饰器等。同时 Class 内的方法还可以再声明自己独有的泛型参数。我们直接来看完整的示例：

```typescript
class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(element: TType): (TElementType | TType)[] {
    return [...this._list, element];
  }

  // 出队
  dequeue(): TElementType[] {
    this._list.shift();
    return this._list;
  }
}
```

其中，`enqueue` 方法的入参类型 `TType` 被约束为队列类型的子类型，而 `enqueueWithUnknownType` 方法中的 `TType` 类型参数则不会受此约束，它会在其被调用时再对应地填充，同时也会在返回值类型中被使用。

### 6.5 内置方法中的泛型

TypeScript 中为非常多的内置对象都预留了泛型坑位，如 `Promise` 中

```typescript
function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}
```

在你填充 `Promise` 的泛型以后，其内部的 `resolve` 方法也自动填充了泛型，而在 TypeScript 内部的 `Promise` 类型声明中同样是通过泛型实现：

```typescript
interface PromiseConstructor {
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

declare var Promise: PromiseConstructor;
```

还有数组 `Array<T>` 当中，其泛型参数代表数组的元素类型，几乎贯穿所有的数组方法：

```typescript
const arr: Array<number> = [1, 2, 3];

// 类型“string”的参数不能赋给类型“number”的参数。
arr.push('linbudu');
// 类型“string”的参数不能赋给类型“number”的参数。
arr.includes('linbudu');

// number | undefined
arr.find(() => false);

// 第一种 reduce
arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, 1);

// 第二种 reduce
// 报错：不能将 number 类型的值赋值给 never 类型
arr.reduce((prev, curr, idx, arr) => {
  return [...prev, curr]
}, []);
```

`reduce` 方法是相对特殊的一个，它的类型声明存在几种不同的重载：

- 当你不传入初始值时，泛型参数会从数组的元素类型中进行填充。
- 当你传入初始值时，如果初始值的类型与数组元素类型一致，则使用数组的元素类型进行填充。即这里第一个 `reduce` 调用。
- 当你传入一个非数组元素类型的初始值，比如这里的第二个 `reduce` 调用，`reduce` 的泛型参数会默认从这个初始值推导出的类型进行填充，如这里是 `never[]`。

其中第三种情况也就意味着**信息不足，无法推导出正确的类型**，我们可以手动传入泛型参数来解决：

```typescript
arr.reduce<number[]>((prev, curr, idx, arr) => {
  return prev;
}, []);
```

在 React 中，我们同样可以找到无处不在的泛型坑位：

```typescript
const [state, setState] = useState<number[]>([]);
// 不传入默认值，则类型为 number[] | undefined
const [state, setState] = useState<number[]>();

// 体现在 ref.current 上
const ref = useRef<number>();

const context =  createContext<ContextType>({});
```

## 7. 结构化类型系统

在 TypeScript 中，你可能遇见过以下这样“看起来不太对，但竟然能正常运行”的代码：

```typescript
class Cat {
  eat() { }
}

class Dog {
  eat() { }
}

function feedCat(cat: Cat) { }

feedCat(new Dog())
```

这里的 `feedCat` 函数明明需要的是一只猫，可为什么上传一只狗也可以呢？

实际上，这就是 TypeScript 的类型系统特性：**结构化类型系统**，也是我们这一节要学习的概念。我们会了解结构化类型系统的比较方式，对比另一种类型系统（**标称类型系统**）的工作方式，以及在 TypeScript 中去模拟另一种类型系统。

结构化类型系统的概念非常基础但十分重要，它不仅能让你明确类型比较的核心原理，从根上理解条件类型等类型工具，也能够在日常开发中帮你解决许多常见的类型报错。

### 7.1 结构化类型系统

首先回到我们开头提出的问题，如果我们为 `Cat` 类新增一个独特的方法，这个时候的表现才是符合预期的，即我们只能用真实的 `Cat` 类来进行调用：

```typescript
class Cat {
  meow() { }
  eat() { }
}

class Dog {
  eat() { }
}

function feedCat(cat: Cat) { }

// 报错！
feedCat(new Dog())
```

这是因为，TypeScript 比较两个类型并非通过类型的名称（即 `feedCat` 函数只能通过 Cat 类型调用），而是比较这两个类型上实际拥有的属性与方法。也就是说，这里实际上是比较 `Cat` 类型上的属性是否都存在于 Dog 类型上。

在我们最初的例子里，`Cat` 与 `Dog` 类型上的方法是一致的，所以它们虽然是两个名字不同的类型，但仍然被视为结构一致，这就是结构化类型系统的特性。你可能听过结构类型的别称 **鸭子类型（\*Duck Typing\*）**，这个名字来源于 **鸭子测试（\*Duck Test\*）**。其核心理念是，**如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子**。

也就说，鸭子类型中两个类型的关系是通过对象中的属性方法来判断的。比如最开始的 `Cat` 类型和 `Dog` 类型被视为同一个类型，而为 `Cat` 类型添加独特的方法之后就不再能被视为一个类型。但如果为 `Dog` 类型添加一个独特方法呢？

```typescript
class Cat {
  eat() { }
}

class Dog {
  bark() { }
  eat() { }
}

function feedCat(cat: Cat) { }

feedCat(new Dog())
```

这个时候为什么却没有类型报错了？这是因为，结构化类型系统认为 `Dog` 类型完全实现了 `Cat` 类型。至于额外的方法 `bark`，可以认为是 `Dog` 类型继承 `Cat` 类型后添加的新方法，即此时 `Dog` 类可以被认为是 `Cat` 类的子类。同样的，面向对象编程中的里氏替换原则也提到了鸭子测试：***如果它看起来像鸭子，叫起来也像鸭子，但是却需要电池才能工作，那么你的抽象很可能出错了。***

更进一步，在比较对象类型的属性时，同样会采用结构化类型系统进行判断。而对结构中的函数类型（即方法）进行比较时，同样存在类型的兼容性比较：

```typescript
class Cat {
  eat(): boolean {
    return true
  }
}

class Dog {
  eat(): number {
    return 599;
  }
}

function feedCat(cat: Cat) { }

// 报错！
feedCat(new Dog())
```

这就是结构化类型系统的核心理念，即 **基于类型结构进行判断类型兼容性**。

结构化类型系统在 C#、Python、Objective-C 等语言中都被广泛使用或支持。

严格来说，鸭子类型系统和结构化类型系统并不完全一致，结构化类型系统意味着 **基于完全的类型结构来判断类型兼容性**，而鸭子类型则只基于 **运行时访问的部分** 来决定。也就是说，如果我们调用了走、游泳、叫这三个方法，那么传入的类型只需要存在这几个方法即可（而不需要类型结构完全一致）。但由于 TypeScript 本身并不是在运行时进行类型检查（也做不到），同时官方文档中同样认为这两个概念是一致的（***One of TypeScript’s core principles is that type checking focuses on the  shape that values have. This is sometimes called “duck typing” or  “structural typing”.***）。因此在这里，我们可以直接认为鸭子类型与结构化类型是同一概念。

除了 **基于类型结构进行兼容性判断的结构化类型系统** 以外，还有一种 **基于类型名进行兼容性判断的类型系统**，标称类型系统。

### 7.2 标称类型系统

标称类型系统（**Nominal Typing System**）要求，两个可兼容的类型，**其名称必须是完全一致的**，比如以下代码：

```typescript
type USD = number;
type CNY = number;

const CNYCount: CNY = 200;
const USDCount: USD = 200;

function addCNY(source: CNY, input: CNY) {
  return source + input;
}

addCNY(CNYCount, USDCount)
```

在结构化类型系统中，USD 与 CNY （分别代表美元单位与人民币单位）被认为是两个完全一致的类型，因此在 `addCNY` 函数中可以传入 USD 类型的变量。这就很离谱了，人民币与美元这两个单位实际的意义并不一致，怎么能进行相加？

在标称类型系统中，CNY 与 USD 被认为是两个完全不同的类型，因此能够避免这一情况发生。在《编程与类型系统》一书中提到，类型的重要意义之一是 **限制了数据的可用操作与实际意义**，这一点在标称类型系统中的体现要更加明显。

比如，上面我们可以通过类型的结构，来让结构化类型系统认为两个类型具有父子类型关系，而对于标称类型系统，父子类型关系只能通过显式的继承来实现，称为 **标称子类型（Nominal Subtyping）**。

```typescript
class Cat { }
// 实现一只短毛猫！
class ShorthairCat extends Cat { }
```

C++、Java、Rust 等语言中都主要使用标称类型系统。

### 7.3 在 TypeScript 中模拟标称类型系统

**类型的重要意义之一是限制了数据的可用操作与实际意义**。这往往是通过类型附带的 **额外信息** 来实现的（类似于元数据），要在 TypeScript 中实现，其实我们也只需要为类型额外附加元数据即可，比如 CNY 与 USD，我们分别附加上它们的单位信息即可，但同时又需要保留原本的信息（即原本的 `number` 类型）。

我们可以通过交叉类型的方式来实现信息的附加：

```typescript
export declare class TagProtector<T extends string> {
  protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;
```

在这里我们使用 `TagProtector` 声明了一个具有 `protected` 属性的类，使用它来携带额外的信息，并和原本的类型合并到一起，就得到了 `Nominal` 工具类型。

有了 `Nominal` 这个工具类型，我们可以尝试来改进下上面的例子了：

```typescript
export type CNY = Nominal<number, 'CNY'>;

export type USD = Nominal<number, 'USD'>;

const CNYCount = 100 as CNY;

const USDCount = 100 as USD;

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY;
}

addCNY(CNYCount, CNYCount);

// 报错了！
addCNY(CNYCount, USDCount);
```

这一实现方式本质上只在类型层面做了数据的处理，在运行时无法进行进一步的限制。我们还可以从逻辑层面入手进一步确保安全性：

```typescript
class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}
```

相应的，现在使用方式也要进行变化：

```typescript
const CNYCount = new CNY(100);
const USDCount = new USD(100);

function addCNY(source: CNY, input: CNY) {
  return (source.value + input.value);
}

addCNY(CNYCount, CNYCount);
// 报错了！
addCNY(CNYCount, USDCount);
```

通过这种方式，我们可以在运行时添加更多的检查逻辑，同时在类型层面也得到了保障。

这两种方式的本质都是通过非公开（即 `private` / `protected` ）的额外属性实现了类型信息的附加，从而使得结构化类型系统将结构一致的两个类型也视为不兼容的。另外，在 type-fest 中也通过 [Opaque Type](https://link.juejin.cn?target=https%3A%2F%2Fcodemix.com%2Fopaque-types-in-javascript%2F) 支持了类似的功能，其实现如下：

```typescript
declare const tag: unique symbol;

declare type Tagged<Token> = {
    readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;
```

### 7.4 类型、类型系统与类型检查

对于类型、类型系统、类型检查，你可以认为它们是不同的概念。

- **类型**：限制了数据的可用操作、意义、允许的值的集合，总的来说就是 **访问限制** 与 **赋值限制**。在 TypeScript 中即是原始类型、对象类型、函数类型、字面量类型等基础类型，以及类型别名、联合类型等经过类型编程后得到的类型。
- **类型系统**：一组为变量、函数等结构分配、实施类型的规则，通过显式地指定或类型推导来分配类型。同时类型系统也定义了如何判断类型之间的兼容性：在 TypeScript 中即是结构化类型系统。
- **类型检查**：确保 **类型遵循类型系统下的类型兼容性**，对于静态类型语言，在 **编译时** 进行，而对于动态语言，则在 **运行时 **进行。TypeScript 就是在编译时进行类型检查的

一个需要注意的地方是，静态类型与动态类型指的是 **类型检查发生的时机**，并不等于这门语言的类型能力。比如 JavaScript 实际上是动态类型语言，它的类型检查发生在运行时。

另外一个静态类型与动态类型的重要区别体现在变量赋值时，如在 TypeScript 中无法给一个声明为 `number` 的变量使用字符串赋值，因为这个变量在声明时的类型就已经确定了。而在 JavaScript 中则没有这样的限制，你可以随时切换一个变量的类型。

另外，在编程语言中还有强类型、弱类型的概念，它们体现在对变量类型检查的程度，如在 JavaScript 中可以实现 `'1' - 1` 这样神奇的运算（通过隐式转换），这其实就是弱类型语言的显著特点之一。



## 8. 类型系统层级

类型层级一方面能帮助我们明确各种类型的层级与兼容性，而兼容性问题往往就是许多类型错误产生的原因。另一方面，类型层级也是我们后续学习条件类型必不可少的前置知识。

类型层级实际上指的是，**TypeScript 中所有类型的兼容关系，从最上面一层的 `any` 类型，到最底层的 `never` 类型。那么，从上至下的类型兼容关系到底长什么样呢？** 这一节，我们就从原始类型变量和字面量类型开始比较，分别向上、向下延伸，依次把这些类型串起来形成层级链，让你能够构建出 TypeScript 的整个类型体系。

### 8.1 判断类型兼容性的方式

如何直观地判断两个类型的兼容性，主要使用条件类型来判断类型兼容性，类似这样：

```typescript
type Result = 'zxh' extends string ? 1 : 2;
```

如果返回 1，则说明 `'zxh'` 为 string 的子类型。否则，说明不成立。但注意，不成立并不意味着 string 就是 `'zxh'` 的子类型了。还有一种备选的，通过赋值来进行兼容性检查的方式，其大致使用方式是这样的：

```typescript
declare let source: string;

declare let anyType: any;
declare let neverType: never;

anyType = source;

// 不能将类型“string”分配给类型“never”。
neverType = source;
```

对于变量 `a` = 变量 `b`，如果成立，意味着 `<变量 b 的类型> extends <变量 a 的类型>` 成立，即 **`b` 类型是 `a `类型的子类型**，在这里即是 `string extends never` ，这明显是不成立的。

觉得不好理解？那可以试着这么想，我们有一个“狗”类型的变量，还有两个分别是“柯基”类型与“橘猫”类型的变量。

- 狗 = 柯基，意味着将柯基作为狗，这是没问题的。
- 狗 = 橘猫，很明显不对，程序对“狗”这个变量的使用，都建立在它是一个“狗”类型的基础上，你给个猫，让后面咋办？

这两种判断方式并没有明显的区别，只在使用场景上略有差异。在需要判断多个类型的层级时，条件类型更为直观，而如果只是两个类型之间的兼容性判断时，使用类型声明则更好理解一些，你可以依据自己的习惯来进行选择。

### 8.2 从原始类型开始

了解了类型兼容性判断的方式后，我们就可以开始探讨类型层级了。首先，我们从原始类型、对象类型（后文统称为基础类型）和它们对应的字面量类型开始。

```typescript
type Result1 = "zxh" extends string ? 1 : 2;
type Result2 = 1 extends number ? 1 : 2;
type Result3 = true extends boolean ? 1 : 2;
type Result4 = { name: string } extends object ? 1 : 2;
type Result5 = { name: "zxh" } extends object ? 1 : 2;
type Result6 = [] extends object ? 1 : 2;
```

很明显，一个基础类型和它们对应的字面量类型必定存在父子类型关系。

严格来说，`object` 出现在这里并不恰当，因为它实际上代表着 **所有非原始类型的类型，即数组、对象与函数类型**，所以这里 `Result6` 成立的原因即是`[]`这个字面量类型也可以被认为是 `object` 的字面量类型。我们将结论简记为，**字面量类型 < 对应的原始类型**。

### 8.3 向上探索

#### 8.3.1 联合类型

在联合类型中，只需要符合其中一个类型，我们就可以认为实现了这个联合类型，用条件类型表达是这样的

```typescript
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2;
type Result8 = "zxh" extends "zxh" | "zzz" | "ddd" ? 1 : 2;
type Result9 = true extends true | false ? 1 : 2;
```

在这一层面上，并不需要联合类型的 **所有成员均为字面量类型**，或者 **字面量类型来自于同一基础类型** 这样的前提，只需要这个类型存在于联合类型中。

对于原始类型，联合类型的比较其实也是一致的：

```typescript
type Result10 = string extends string | false | number ? 1 : 2; // 1
```

结论：**字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型。**

而如果一个联合类型由同一个基础类型的类型字面量组成，那这个时候情况又有点不一样了。

```typescript
type Resutl11 = "r" | "g" | "b" extends string ? 1 : 2;
type Result12 = {} | (() => void) | [] extends object ? 1 : 2;
```

结论：**同一基础类型的字面量联合类型 < 此基础类型。**

合并一下结论，去掉比较特殊的情况，我们得到了这个最终结论：**字面量类型 < 包含此字面量类型的联合类型（同一基础类型） <  对应的原始类型**，即：

```typescript
// 2
type Result13 = "rgb" extends "rgb" | "22"
  ? "rbg" | "22" extends string
    ? 2
    : 1
  : 0;
```

对于这种嵌套的联合类型，我们这里直接观察最后一个条件语句的结果即可，因为如果所有条件语句都成立，那结果就是最后一个条件语句为真时的值。另外，由于联合类型实际上是一个比较特殊的存在，大部分类型都存在至少一个联合类型作为其父类型，因此在后面我们不会再体现联合类型。

现在，我们关注的类型变成了基础类型，即 `string` 与 `object` 这一类。

#### 8.3.2 装箱类型

在「原始类型与对象类型」一节中，我们已经讲到了 JavaScript 中装箱对象 `String` 在 TypeScript 中的体现： `String` 类型，以及在原型链顶端傲视群雄的 `Object` 对象与 `Object` 类型。

很明显，`string` 类型会是 `String` 类型的子类型，`String` 类型会是 `Object` 类型的子类型，那中间还有吗？还真有，而且你不一定能猜到。我们直接看从 `string` 到 `Object` 的类型层级：

```typescript
type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends Object ? 1 : 2; // 1
```

这里看着像是混进来一个很奇怪的东西，`{}` 不是 `object` 的字面量类型吗？为什么能在这里比较，并且 `String` 还是它的子类型？

假设我们把 `String` 看作一个普通的对象，上面存在一些方法，如：

```typescript
interface String {
  replace: // ...
  replaceAll: // ...
  startsWith: // ...
  endsWith: // ...
  includes: // ...
}
```

这个时候，是不是能看做 `String` 继承了 `{}` 这个空对象，然后自己实现了这些方法？当然可以！**在结构化类型系统的比较下，String 会被认为是 `{}` 的子类型**。这里从 `string < {} < object` 看起来构建了一个类型链，但实际上 `string extends object` 并不成立：

```typescript
type Tmp = string extends object ? 1 : 2; // 2
```

由于结构化类型系统这一特性的存在，我们能得到一些看起来矛盾的结论：

```typescript
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends {} ? 1 : 2; // 1

type Result17 = object extends Object ? 1 : 2; // 1
type Result20 = Object extends object ? 1 : 2; // 1

type Result19 = Object extends {} ? 1 : 2; // 1
type Result21 = {} extends Object ? 1 : 2; // 1
```

当然不，这里的 `{} extends ` 和 `extends {}` 实际上是两种完全不同的比较方式。

`{} extends object` 和 `{} extends Object` 意味着， `{}` 是 `object` 和 `Object` 的字面量类型，是从 **类型信息的层面 **出发的，即 **字面量类型在基础类型之上提供了更详细的类型信息**。

`object extends {}` 和 `Object extends {}` 则是从 **结构化类型系统的比较** 出发的，即 `{}` 作为一个一无所有的空对象，几乎可以被视作是所有类型的基类，万物的起源。如果混淆了这两种类型比较的方式，就可能会得到 `string extends object` 这样的错误结论。

而 `object extends Object` 和 `Object extends object` 这两者的情况就要特殊一些，它们是因为“系统设定”的问题，`Object` 包含了所有除 Top Type 以外的类型（基础类型、函数类型等），`object` 包含了所有非原始类型的类型，即数组、对象与函数类型，这就导致了你中有我、我中有你的神奇现象。

在这里，我们暂时只关注从类型信息层面出发的部分，即结论为：**原始类型 < 原始类型对应的装箱类型 < Object 类型。**

现在，我们关注的类型为 `Object` 。

#### 8.3.3 Top Type

再往上，我们就到达了类型层级的顶端（是不是很快），这里只有 `any` 和 `unknown` 这两兄弟。我们在[探秘内置类型：any、unknown 与 never](https://juejin.cn/book/7086408430491172901/section/7100487738020855811) 一节中已经了解，`any` 与 `unknown` 是系统中设定为 Top Type 的两个类型，它们无视一切因果律，是类型世界的规则产物。因此， `Object` 类型自然会是 `any` 与 `unknown` 类型的子类型。

```typescript
type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1
```

但如果我们把条件类型的两端对调一下呢？

```typescript
type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2
```

你会发现，any 竟然调过来，值竟然变成了 `1 | 2`？我们再多试几个看看：

```typescript
type Result26 = any extends 'zxh' ? 1 : 2; // 1 | 2
type Result27 = any extends string ? 1 : 2; // 1 | 2
type Result28 = any extends {} ? 1 : 2; // 1 | 2
type Result29 = any extends never ? 1 : 2; // 1 | 2
```

是不是感觉匪夷所思？实际上，还是因为“系统设定”的原因。`any` 代表了任何可能的类型，当我们使用 `any extends` 时，它包含了 “**让条件成立的一部分**”，以及 “**让条件不成立的一部分**”。而从实现上说，在 TypeScript 内部代码的条件类型处理中，如果接受判断的是 `any`，那么会直接 **返回条件类型结果组成的联合类型**。

因此 `any extends string` 并不能简单地认为等价于以下条件类型：

```typescript
type Result30 = ("I'm string!" | {}) extends string ? 1 : 2; // 2
```

这种情况下，由于联合类型的成员并非均是字符串字面量类型，条件显然不成立。

在前面学习 `any` 类型时，你可能也感受到了奇怪之处，在赋值给其他类型时，`any` 来者不拒，而 `unknown` 则只允许赋值给 `unknown` 类型和 `any` 类型，这也是由于“系统设定”的原因，即 **`any` 可以表达为任何类型**。你需要我赋值给这个变量？那我现在就是这个变量的子类型了，我是不是很乖巧？

另外，`any` 类型和 `unknown` 类型的比较也是互相成立的：

```typescript
type Result31 = any extends unknown ? 1 : 2;  // 1
type Result32 = unknown extends any ? 1 : 2;  // 1
```

虽然还是存在系统设定的部分，但我们仍然只关注类型信息层面的层级，即结论为：`**Object < any / unknown**`。而到这里，我们已经触及了类型世界的最高一层，接下来我们再回到字面量类型，只不过这一次我们要向下探索了。

### 8.4 向下探索

向下地探索其实就简单多了，首先我们能确认一定有个 `never` 类型，因为它代表了“虚无”的类型，一个根本不存在的类型。对于这样的类型，它会是任何类型的子类型，当然也包括字面量类型：

```typescript
type Result33 = never extends 'zxh' ? 1 : 2; // 1
```

但你可能又想到了一些特别的部分，比如 `null、undefined、void`。

```typescript
type Result34 = undefined extends 'zxh' ? 1 : 2; // 2
type Result35 = null extends 'zxh' ? 1 : 2; // 2
type Result36 = void extends 'zxh' ? 1 : 2; // 2
```

上面三种情况当然不应该成立。别忘了在 TypeScript 中，`void、undefined、null` 都是 **切实存在、有实际意义的类型**，它们和 `string、number、object` 并没有什么本质区别。

> 关闭 `--strictNullCheckes` 的情况下，`null` 会被视为 `string` 等类型的子类型。

因此，这里我们得到的结论是，**`never` < 字面量类型**。这就是类型世界的最底层，有点像我的世界那样，当你挖穿地面后，出现的是一片茫茫的空白与虚无。

那现在，我们可以开始组合整个类型层级了。

### 8.5 类型层级链

结合上面得到的结论，可以书写出这样一条类型层级链：

```typescript
type TypeChain = never extends "zxh"
  ? "zxh" extends "zxh" | "24"
    ? "zxh" | "24" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
```

其返回的结果为 8 ，也就意味着所有条件均成立。当然，结合上面的结构化类型系统与类型系统设定，我们还可以构造出一条更长的类型层级链：

```typescript
type VerboseTypeChain = never extends "zxh"
  ? "zxh" extends "zxh" | 24
    ? "zxh" | "24" extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8;
```

结果仍然为 8 。

### 8.6 其它场景

除了我们上面提到的类型比较，其实还存在着一些比较情况，我们稍作补充。

- 对于基类和派生类，通常情况下 **派生类会完全保留基类的结构**，而只是自己新增新的属性与方法。在结构化类型的比较下，其类型自然会存在子类型关系。更不用说派生类本身就是 `extends` 基类得到的。
- 联合类型的判断，前面我们只是判断联合类型的单个成员，那如果是多个成员呢？

```typescript
type Result36 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
```

实际上，对于联合类型地类型层级比较，我们只需要比较 **一个联合类型是否可被视为另一个联合类型的子集**，即**这个联合类型中所有成员在另一个联合类型中都能找到**。

- **数组和元组**

```typescript
type Result40 = [number, number] extends number[] ? 1 : 2; // 1
type Result41 = [number, string] extends number[] ? 1 : 2; // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2; // 1
type Result43 = [] extends number[] ? 1 : 2; // 1
type Result44 = [] extends unknown[] ? 1 : 2; // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2; // 1
type Result46 = any[] extends number[] ? 1 : 2; // 1
type Result47 = unknown[] extends number[] ? 1 : 2; // 2
type Result48 = never[] extends number[] ? 1 : 2; // 1
```

- 
    - 40，这个元组类型实际上能确定其内部成员全部为 number 类型，因此是 `number[]` 的子类型。而 41 中混入了别的类型元素，因此认为不成立。
    - 42混入了别的类型，但其判断条件为 `(number | string)[]` ，即其成员需要为 number 或 string 类型。
    - 43的成员是未确定的，等价于 `never[] extends number[]`，44 同理。
    - 45类似于41，即可能存在的元素类型是符合要求的。
    - 46、47，还记得身化万千的 `any` 类型和小心谨慎的 `unknown` 类型嘛？
    - 48，类似于 43、44，由于 `never` 类型本就位于最下方，这里显然成立。只不过 `never[]` 类型的数组也就无法再填充值了

![类型层级](https://i.imgur.com/33d6NYW.png)

## 9. 类型中的逻辑运算：条件类型与infer

> 需要反复多看

### 9.1 条件类型

条件类型的语法类似于我们平时常用的三元表达式，它的基本语法如下（伪代码）：

```typescript
ValueA === ValueB ? Result1 : Result2;
TypeA extends TypeB ? Result1 : Result2;
```

但需要注意的是，条件类型中使用 `extends` 判断类型的兼容性，而非判断类型的全等性。这是因为在类型层面中，对于能够进行赋值操作的两个变量，我们 **并不需要它们的类型完全相等，只需要具有兼容性**，而两个完全相同的类型，其 `extends` 自然也是成立的。

条件类型绝大部分场景下会和泛型一起使用，我们知道，泛型参数的实际类型会在实际调用时才被填充（类型别名中显式传入，或者函数中隐式提取），而条件类型在这一基础上，可以基于填充后的泛型参数做进一步的类型操作，比如这个例子：

```typescript
type LiteralType<T> = T extends string ? "string" : "other";

type Res1 = LiteralType<"zxh">; // "string"
type Res2 = LiteralType<599>; // "other"
```

同三元表达式可以嵌套一样，条件类型中也常见多层嵌套，如：

```typescript
export type LiteralType<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends null
	? "null"
	: T extends undefined
	? "undefined"
	: never;

type Res1 = LiteralType<"zxh">; // "string"
type Res2 = LiteralType<599>; // "number"
type Res3 = LiteralType<true>; // "boolean"
```

而在函数中，条件类型与泛型的搭配同样很常见。考考你，以下这个函数，我们应该如何标注它的返回值类型？

```typescript
function universalAdd<T extends number | bigint | string>(x: T, y: T) {
    return x + (y as any);
}
```

当我们调用这个函数时，由于两个参数都引用了泛型参数 T ，因此泛型会被填充为一个联合类型：

```typescript
universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("zxh", "599"); // T 填充为 zxh | 599
```

那么此时的返回值类型就需要从这个字面量联合类型中推导回其原本的基础类型。在类型层级一节中，我们知道 **同一基础类型的字面量联合类型，其可以被认为是此基础类型的子类型**，即 `599 | 1` 是 `number` 的子类型。

因此，我们可以使用嵌套的条件类型来进行字面量类型到基础类型地提取：

```typescript
function universalAdd<T extends number | bigint | string>(
	x: T,
	y: T
): LiteralToPrimitive<T> {
	return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
	? bigint
	: T extends string
	? string
	: never;

universalAdd("zxh", "599"); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint
```

条件类型还可以用来对更复杂的类型进行比较，比如函数类型：

```typescript
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;
```

在这里，我们的条件类型用于判断两个函数类型是否具有兼容性，而条件中并不限制参数类型，仅比较二者的返回值类型。

与此同时，存在泛型约束和条件类型两个 `extends` 可能会让你感到疑惑，但它们产生作用的时机完全不同

- 泛型约束要求你传入符合结构的类型参数，相当于 **参数校验**。
- 而条件类型使用类型参数进行条件判断（就像 `if else`），相当于 **实际内部逻辑**。

我们上面讲到的这些条件类型，本质上就是在泛型基于调用填充类型信息的基础上，新增了 **基于类型信息的条件判断**。看起来很不错，但你可能也发现了一个无法满足的场景：提取传入的类型信息。

### 9.2 infer 关键字

在上面的例子中，假如我们不再比较填充的函数类型是否是 `(...args: any[]) => string` 的子类型，而是要拿到其返回值类型呢？或者说，我们希望拿到填充的类型信息的一部分，而不是只是用它来做条件呢？

TypeScript 中支持通过 `infer` 关键字来 **在条件类型中提取类型的某一部分信息**，比如上面我们要提取函数返回值类型的话，可以这么放：

```typescript
type Func = (...args: any[]) => any;

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;
```

看起来是新朋友，其实还是老伙计。上面的代码其实表达了，当传入的类型参数满足 `T extends (...args: any[] ) => infer R` 这样一个结构（不用管 `infer R`，当它是 any 就行），返回 `infer R ` 位置的值，即 R。否则，返回 never。

`infer`是 `inference` 的缩写，意为推断，如 `infer R` 中 `R` 就表示 **待推断的类型**。

**`infer` 只能在条件类型中使用**，因为我们实际上仍然需要 **类型结构是一致的** 

比如上例中类型信息需要是一个函数类型结构，我们才能提取出它的返回值类型。如果连函数类型都不是，那我只会给你一个 `never` 。

这里的 **类型结构** 当然并不局限于函数类型结构，还可以是数组：

```typescript
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
```

由于我们声明的结构是一个仅有两个元素的元组，因此三个元素的元组就被认为是不符合类型结构了。但我们可以使用 rest 操作符来处理任意长度的情况：

```typescript
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;
```

是的，`infer` 甚至可以和 rest 操作符一样同时提取一组不定长的类型，而 `...any[]` 的用法是否也让你直呼神奇？上面的输入输出仍然都是数组，而实际上我们完全可以进行结构层面的转换。比如从数组到联合类型：

```typescript
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number
```

原理即是这里的 `[string, number]` 实际上等价于 `(string | number)[]`。

除了数组，`infer 结构也可以是接口：

```typescript
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never

type ReverseKeyValueResult1 = ReverseKeyValue<{ "key": "value" }>; // { "value": "key" }
```

在这里，为了体现 infer 作为类型工具的属性，我们结合了索引类型与映射类型，以及使用 `& string` 来确保属性名为 string 类型的小技巧。

为什么需要这个小技巧，如果不使用又会有什么问题呢？

```typescript
// 类型“V”不满足约束“string | number | symbol”。
type ReverseKeyValue<T extends Record<string, string>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V, K>
  : never;
```

明明约束已经声明了 V 的类型是 string，为什么还是报错了？

这是因为，泛型参数 V 的来源是从键值类型推导出来的，TypeScript 中这样对键值类型进行 infer 推导，将导致类型信息丢失，而不满足索引签名类型只允许 `string | number | symbol` 的要求。

还记得映射类型的判断条件吗？需要同时满足其两端的类型，我们使用 `V & string` 这一形式，就确保了最终符合条件的类型参数 V 一定会满足 `string | never` 这个类型，因此可以被视为合法的索引签名类型。

infer 结构还可以是 Promise 结构！

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取
```

就像条件类型可以嵌套一样，infer 关键字也经常被使用在嵌套的场景中，包括对类型结构深层信息地提取，以及对提取到类型信息的筛选等。比如上面的 PromiseValue，如果传入了一个嵌套的 Promise 类型就失效了：

```typescript
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层
```

这种时候我们就需要进行嵌套地提取了：

```typescript
type PromiseValue<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;
```

当然，在这时应该使用递归来处理任意嵌套深度：

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
```

条件类型在泛型的基础上支持了基于类型信息的动态条件判断，但无法直接消费填充类型信息，而 infer  关键字则为它补上了这一部分的能力，让我们可以进行更多奇妙的类型操作。

### 9.3 分布式条件类型

分布式条件类型听起来真的很高级，但这里和分布式和分布式服务并不是一回事。**分布式条件类型（\*Distributive Conditional Type\*），也称条件类型的分布式特性**，只不过是条件类型在满足一定情况下会执行的逻辑而已。我们来看一个例子：

```typescript
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;
```

这个例子可能让你感觉充满了疑惑，某些地方似乎和我们学习的知识并不一样？先不说这两个理论上应该执行结果一致的类型别名，为什么在 Res1 中诡异地返回了一个联合类型？

仔细观察这两个类型别名的差异你会发现，唯一的差异就是在 Res1 中，进行判断的联合类型被作为泛型参数传入给另一个独立的类型别名，而 Res2 中直接对这两者进行判断。

记住第一个差异：**是否通过泛型参数传入**。我们再看一个例子：

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res3 = Naked<number | boolean>;

// "N"
type Res4 = Wrapped<number | boolean>;
```

现在我们都是通过泛型参数传入了，但诡异的事情又发生了，为什么第一个还是个联合类型？第二个倒是好理解一些，元组的成员有可能是数字类型，显然不兼容于 `[boolean]`。再仔细观察这两个例子你会发现，它们唯一的差异是条件类型中的 **泛型参数是否被数组包裹 **了。

同时，你会发现在 Res3 的判断中，其联合类型的两个分支，恰好对应于分别使用 number 和 boolean 去作为条件类型判断时的结果。

把上面的线索理一下，其实我们就大致得到了**条件类型分布式起作用的条件**。

- 首先，**类型参数需要是一个联合类型** 。
- 其次，**类型参数需要通过泛型参数的方式传入**，**而不能直接在外部进行判断**（如 Res2 中）。
- 最后，**条件类型中的泛型参数不能被包裹**。

而条件类型分布式特性会产生的效果也很明显了，

即: **将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来**（如 Naked 中）。如果再严谨一些，其实我们就得到了官方的解释：

**对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。**（***Conditional types in which the checked type is a naked type parameter are called  distributive conditional types. Distributive conditional types are  automatically distributed over union types during instantiation.***）

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>;
```

写成伪代码其实就是这样的：

```typescript
const Res3 = [];

for(const input of [number, boolean]){
  if(input extends boolean){
    Res3.push("Y");
  } else {
    Res.push("N");
  }
}
```

而这里的裸类型参数，其实指的就是泛型参数是否完全裸露，我们上面使用数组包裹泛型参数只是其中一种方式，比如还可以这么做：

```typescript
export type NoDistribute<T> = T & {};

type Wrapped<T> = NoDistribute<T> extends [boolean] ? "Y" : "N";
```

需要注意的是，我们并不是只会通过裸露泛型参数，来确保分布式特性能够发生。在某些情况下，我们也会需要包裹泛型参数来禁用掉分布式特性。最常见的场景也许还是联合类型的判断，即我们不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性判断，就像在最初的 Res2 中那样：

```typescript
type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false
```

通过将参数与条件都包裹起来的方式，我们对联合类型的比较就变成了数组成员类型的比较，在此时就会严格遵守类型层级一文中联合类型的类型判断了（子集为其子类型）。

另外一种情况则是，当我们想判断一个类型是否为 never 时，也可以通过类似的手段：

```typescript
type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"zxh">; // false
```

这里的原因其实并不是因为分布式条件类型。我们此前在类型层级中了解过，当条件类型的判断参数为 any，会直接返回条件类型两个结果的联合类型。而在这里其实类似，**当通过泛型传入的参数为 never，则会直接返回 never。**

需要注意的是这里的 never 与 any 的情况并不完全相同

- any 在直接 **作为判断参数时**、**作为泛型参数时** 都会产生这一效果：

```typescript
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1
```

- 而 never 仅在作为泛型参数时才会产生：

```typescript
// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never
```

这里的 any、never 两种情况都不会实际地执行条件类型，而在这里我们通过包裹的方式让它不再是一个孤零零的 never，也就能够去执行判断了。

之所以分布式条件类型要这么设计，我个人理解主要是为了处理联合类型这种情况。就像我们到现在为止的伪代码都一直使用数组来表达联合类型一样，在类型世界中联合类型就像是一个集合一样。通过使用分布式条件类型，我们能轻易地进行集合之间的运算，比如交集：

```typescript
type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3
```

### 9.4 isAny 和 isUnknown

实现 `isAny` 和 `isUnknown` 稍微复杂一些，并且并不完全依赖分布式条件类型。

首先是 IsAny，上面已经提到我们并不能通过 `any extends Type` 这样的形式来判断一个类型是否是 any 。而是要利用 any 的另一个特性：身化万千：

```typescript
type IsAny<T> = 0 extends 1 & T ? true : false;
```

`0 extends 1` 必然是不成立的，而交叉类型 `1 & T` 也非常奇怪，它意味着同时符合字面量类型 1 和另一个类型 T 。在学习交叉类型时我们已经了解，对于 1 这样的字面量类型，只有传入其本身、对应的原始类型、包含其本身的联合类型，才能得到一个有意义的值，并且这个值一定只可能是它本身：

```typescript
type Tmp1 = 1 & (0 | 1); // 1
type Tmp2 = 1 & number; // 1
type Tmp3 = 1 & 1; // 1
```

这是因为交叉类型 **就像短板效应一样，其最终计算的类型是由最短的那根木板**，也就是最精确的那个类型决定的。这样看，无论如何 `0 extends 1` 都不会成立。

但作为代表任意类型的 any ，它的存在就像是开天辟地的基本规则一样，如果交叉类型的其中一个成员是 any，那短板效应就失效了，此时最终类型必然是 any 。

```typescript
type Tmp4 = 1 & any; // any
```

而对于 unknown 并不能享受到这个待遇，因为它并不是“身化万千”的：

```typescript
type Tmp5 = 1 & unknown; // 1
```

因此，我们并不能用这个方式来写 IsUnknown。其实现过程要更复杂一些，我们需要过滤掉其他全部的类型来只剩下 unknown 。这里直接看实现：

```typescript
type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;
```

首先过滤掉 never 类型，然后对于 `T extends unknown` 和 `unknown extends T`，只有 any 和 unknown 类型能够同时符合（还记得我们在类型层级一节进行的尝试吗？），如果再过滤掉 any，那肯定就只剩下 unknown 类型啦。

 IsUnknown 类型其实可以使用更简单的方式实现。利用 `unknown extends T` 时仅有 T 为 any 或 unknown 时成立这一点，我们可以直接将类型收窄到 any 与 unknown，然后在去掉 any 类型时，我们仍然可以利用上面的身化万千特性：

```typescript
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;
```



## 10. 工具类型

> **工具类型和类型编程并不完全等价**。虽然它是类型编程最常见的一种表现形式，但不能完全代表类型编程水平，如很多框架代码中，类型编程的复杂度也体现在**函数的重载与泛型约束**方面。但通过工具类型，我们能够更好地理解类型编程的本质。

### 10.1 工具类型的分类

内置的工具类型按照类型操作的不同，其实也可以大致划分为这么几类：

- 对属性的修饰，包括对象属性和数组元素的可选/必选、只读/可写。我们将这一类统称为**属性修饰工具类型**。
- 对既有类型的裁剪、拼接、转换等，比如使用对一个对象类型裁剪得到一个新的对象类型，将联合类型结构转换到交叉类型结构。我们将这一类统称为**结构工具类型**。
- 对集合（即联合类型）的处理，即交集、并集、差集、补集。我们将这一类统称为**集合工具类型**。
- 基于 infer 的模式匹配，即对一个既有类型特定位置类型的提取，比如提取函数类型签名中的返回值类型。我们将其统称为**模式匹配工具类型**。
- 模板字符串专属的工具类型，比如神奇地将一个对象类型中的所有属性名转换为大驼峰的形式。这一类当然就统称为**模板字符串工具类型**了。

### 10.2 属性修饰工具类型

这一部分的工具类型主要使用 **属性修饰**、**映射类型** 与 **索引类型** 相关（索引类型签名、索引类型访问、索引类型查询均有使用，因此这里直接用索引类型指代）。

在内置工具类型中，访问性修饰工具类型包括以下三位：

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

其中，Partial 与 Required 可以认为是一对工具类型，它们的功能是相反的，而在实现上，它们的唯一差异是在索引类型签名处的可选修饰符，Partial 是 `?`，即标记属性为可选，而 Required 则是 `-?`，相当于在原本属性上如果有 `?` 这个标记，则移除它。

如果你觉得不好记，其实 Partial 也可以使用 `+?` 来显式的表示添加可选标记：

```typescript
type Partial<T> = {
    [P in keyof T]+?: T[P];
};
```

需要注意的是，可选标记不等于修改此属性类型为 `原类型 | undefined` ，如以下的接口结构：

```typescript
interface Foo {
  optional: string | undefined;
  required: string;
}
```

如果你声明一个对象去实现这个接口，它仍然会要求你提供 optional 属性：

```typescript
interface Foo {
  optional: string | undefined;
  required: string;
}

// 类型 "{ required: string; }" 中缺少属性 "optional"，但类型 "Foo" 中需要该属性。
const foo1: Foo = {
  required: '1',
};

const foo2: Foo = {
  required: '1',
  optional: undefined
};
```

这是因为对于结构声明来说，一个属性是否必须提供仅取决于其是否携带可选标记。即使你使用 never 也无法标记这个属性为可选：

```typescript
interface Foo {
  optional: never;
  required: string;
}

const foo: Foo = {
  required: '1',
  // 不能将类型“string”分配给类型“never”。
  optional: '',
};
```

反而你会惊喜地发现你没法为这个属性声明值了，毕竟除本身以外没有类型可以赋值给 never 类型。

而类似 `+?`，Readonly 中也可以使用 `+readonly`：

```typescript
type Readonly<T> = {
    +readonly [P in keyof T]: T[P];
};
```

虽然 TypeScript 中并没有提供它的另一半，但参考 Required 其实我们很容易想到这么实现一个工具类型 Mutable，来将属性中的 readonly 修饰移除：

```typescript
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
```

### 10.3 结构工具类型

这一部分的工具类型主要使用 **条件类型** 以及 **映射类型**、**索引类型**。

结构工具类型其实又可以分为两类，**结构声明 **和 **结构处理**。

#### 10.3.1 结构声明

结构声明工具类型即快速声明一个结构，比如内置类型中的 Record：

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

其中，`K extends keyof any` 即为键的类型，这里使用 `extends keyof any` 标明，传入的 K 可以是单个类型，也可以是联合类型，而 T 即为属性的类型。

```typescript
// 键名均为字符串，键值类型未知
type Record1 = Record<string, unknown>;
// 键名均为字符串，键值类型任意
type Record2 = Record<string, any>;
// 键名为字符串或数字，键值类型任意
type Record3 = Record<string | number, any>;

// 使用下面两种来代替 object
type RecordRes4 = Record<string, unknown>;
type RecordRes5 = Record<string, any>;
```

其中，`Record<string, unknown>` 和 `Record<string, any>` 是日常使用较多的形式，通常我们使用这两者来代替 object 。

在一些工具类库源码中其实还存在类似的结构声明工具类型，如：

```typescript
type Dictionary<T> = {
  [index: string]: T;
};

type NumericDictionary<T> = {
  [index: number]: T;
};
```

Dictionary （字典）结构只需要一个作为属性类型的泛型参数即可。

而对于结构处理工具类型，在 TypeScript 中主要是 Pick、Omit 两位选手：

#### 10.3.2 结构处理

对于结构处理工具类型，在 TypeScript 中主要是 Pick、Omit 两位选手：

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

 `Pick` 接受两个泛型参数，T 即是我们会进行结构处理的原类型（一般是对象类型），而 K 则被约束为 T  类型的键名联合类型。由于泛型约束是立即填充推导的，即你为第一个泛型参数传入 Foo 类型以后，K 的约束条件会立刻被填充，因此在你输入 K  时会获得代码提示：

![image-20221007144024695](https://i.imgur.com/CuXTdez.png)

```typescript
type JobUnionType = "doctor" | "teacher" | "student";
interface Foo {
  name: string;
  age: number;
  job: JobUnionType;
}

type PickedFoo = Pick<Foo, "name" | "age">
```

然后 Pick 会将传入的联合类型作为需要保留的属性，使用这一联合类型配合映射类型，即上面的例子等价于：

```typescript
type Pick<T> = {
    [P in "name" | "age"]: T[P];
};
```

联合类型的成员会被依次映射，并通过索引类型访问来获取到它们原本的类型。

而对于 Omit 类型，看名字其实能 get 到它就是 Pick 的反向实现：**Pick 是保留这些传入的键**，比如从一个庞大的结构中选择少数字段保留，需要的是这些少数字段，而 **Omit 则是移除这些传入的键**，也就是从一个庞大的结构中剔除少数字段，需要的是剩余的多数部分。

但它的实现看起来有些奇怪：

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

首先我们发现，Omit 是基于 Pick 实现的，这也是 TypeScript 中成对工具类型的另一种实现方式。上面的 Partial 与 Required 使用类似的结构，**在关键位置使用一个相反操作来实现反向**，而这里的 Omit 类型则是基于 Pick 类型实现，也就是 **反向工具类型基于正向工具类型实现**。

首先接受的泛型参数类似，也是一个类型与联合类型（要剔除的属性），但是在将这个联合类型传入给 Pick 时多了一个 Exclude，这一工具类型属于工具类型，我们可以暂时理解为 `Exclude<A, B>` 的结果就是联合类型 A 中不存在于 B 中的部分：

```typescript
type Tmp1 = Exclude<1, 2>; // 1
type Tmp2 = Exclude<1 | 2, 2>; // 1
type Tmp3 = Exclude<1 | 2 | 3, 2 | 3>; // 1
type Tmp4 = Exclude<1 | 2 | 3, 2 | 4>; // 1 | 3
```

因此，在这里 `Exclude<keyof T, K>` 其实就是 T 的键名联合类型中剔除了 K 的部分，将其作为 Pick 的键名，就实现了剔除一部分类型的效果。

> **思考**
>
> - Pick 和 Omit 是基于键名的，如果我们需要 **基于键值类型** 呢？比如仅对函数类型的属性？
> - 除了将一个对象结构拆分为多个子结构外，对这些子结构的 **互斥处理** 也是结构工具类型需要解决的问题之一。**互斥处理** 指的是，假设你的对象存在三个属性 A、B、C ，其中 A 与 C 互斥，即 A 存在时不允许 C 存在。而 A 与 B 绑定，即 A 存在时 B 也必须存在，A 不存在时 B 也不允许存在。此时应该如何实现？

另外，你可能发现 Pick 会约束第二个参数的联合类型来自于对象属性，而 Omit 并不这么要求？官方团队的考量是，可能存在这么一种情况：

```typescript
type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>;
type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 这里就不能用严格 Omit 了
declare function combineSpread<T1, T2>(
  obj: T1,
  otherObj: T2,
  rest: Omit1<T1, keyof T2>
): void;

type Point3d = { x: number, y: number, z: number };

declare const p1: Point3d;

// 能够检测出错误，rest 中缺少了 y
combineSpread(p1, { x: 10 }, { z: 2 });
```

这里我们使用 `keyof Obj2` 去剔除 Obj1，此时如果声明约束反而不符合预期。

### 10.4 集合工具类型

这一部分的工具类型主要使用条件类型、条件类型分布式特性。

在开始集合类型前，我们不妨先聊一聊数学中的集合概念。对于两个集合来说，通常存在 **交集、并集、差集、补集** 这么几种情况，用图表示是这样的：

![数学中deji和](https://i.imgur.com/LrqivnW.png)

- **并集**，两个集合的合并，合并时重复的元素只会保留一份（这也是联合类型的表现行为）。
- **交集**，两个集合的相交部分，即同时存在于这两个集合内的元素组成的集合。
- **差集**，对于 A、B 两个集合来说，A 相对于 B 的差集即为 **A 中独有而 B 中不存在的元素** 的组成的集合，或者说 **A 中剔除了 B 中也存在的元素以后剩下的部分**。
- **补集**，补集是差集的特殊情况，此时**集合 B 为集合 A 的子集**，在这种情况下 **A 相对于 B 的补集** + **B** = **完整的集合 A**。

内置工具类型中提供了交集与差集的实现：

```typescript
type Extract<T, U> = T extends U ? T : never;

type Exclude<T, U> = T extends U ? never : T;
```

这里的具体实现其实就是条件类型的分布式特性，即当 T、U 都是联合类型（视为一个集合）时，T 的成员会依次被拿出来进行 `extends U ? T1 : T2 ` 的计算，然后将最终的结果再合并成联合类型。

比如对于交集 Extract ，其运行逻辑是这样的：

```typescript
type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2

type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never); // never
```

而差集 Exclude 也是类似，但需要注意的是，差集存在相对的概念，即 A 相对于 B 的差集与 B 相对于 A 的差集并不一定相同，而交集则一定相同。

为了便于理解，我们也将差集展开：

```typescript
type SetA = 1 | 2 | 3 | 5;

type SetB = 0 | 1 | 2 | 4;

type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4

type _AExcludeB =
  | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
  | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
  | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
  | (5 extends 0 | 1 | 2 | 4 ? never : 5); // 5

type _BExcludeA =
  | (0 extends 1 | 2 | 3 | 5 ? never : 0) // 0
  | (1 extends 1 | 2 | 3 | 5 ? never : 1) // never
  | (2 extends 1 | 2 | 3 | 5 ? never : 2) // never
  | (4 extends 1 | 2 | 3 | 5 ? never : 4); // 4
```

除了差集和交集，我们也可以很容易实现并集与补集，为了更好地建立印象，这里我们使用集合相关的命名：

```typescript
// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;
```

补集基于差集实现，我们只需要约束**集合 B 为集合 A 的子集**即可。

内置工具类型中还有一个场景比较明确的集合工具类型：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type _NonNullable<T> = Difference<T, null | undefined>
```

很明显，它的本质就是集合 T 相对于 `null | undefined` 的差集，因此我们可以用之前的差集来进行实现。

在基于分布式条件类型的工具类型中，其实也存在着正反工具类型，但 **并不都是简单地替换条件类型结果的两端**，如交集与补集就只是简单调换了结果，但二者作用却 **完全不同**。

联合类型中会自动合并相同的元素，因此我们可以默认这里指的类型集合全部都是类似 Set 那样的结构，不存在重复元素。

>  **思考**
>
> - 目前为止我们的集合类型都停留在一维的层面，即联合类型之间的集合运算。如果现在我们要处理 **对象类型结构的集合运算** 呢？
> - 在处理对象类型结构运算时，可能存在不同的需求，比如合并时，我们可能希望 **保留原属性或替换原属性**，可能希望 **替换原属性的同时并不追加新的属性** 进来（即仅使用新的对象类型中的属性值覆盖原本对象类型中的同名属性值），此时要如何灵活地处理这些情况？

### 10.5 模式匹配工具类型

这一部分的工具类型主要使用**条件类型**与 **infer 关键字**。

在条件类型一节中我们已经差不多了解了 infer 关键字的使用，而更严格地说 infer 其实代表了一种 **模式匹配（pattern matching）** 的思路，如正则表达式、Glob 中等都体现了这一概念。

首先是对函数类型签名的模式匹配：

```typescript
type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any;
```

根据 infer 的位置不同，我们就能够获取到不同位置的类型，在函数这里则是参数类型与返回值类型。

我们还可以更进一步，比如只匹配第一个参数类型：

```typescript
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number

type BarFirstParameter = FirstParameter<FuncBar>; // string
```

除了对函数类型进行模式匹配，内置工具类型中还有一组对 Class 进行模式匹配的工具类型：

```typescript
type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;
```

Class 的通用类型签名可能看起来比较奇怪，但实际上它就是声明了可实例化（new）与可抽象（abstract）罢了。我们也可以使用接口来进行声明：

```typescript
export interface ClassType<TInstanceType = any> {
    new (...args: any[]): TInstanceType;
}
```

对 Class 的模式匹配思路类似于函数，或者说这是一个通用的思路，即基于放置位置的匹配。放在参数部分，那就是构造函数的参数类型，放在返回值部分，那当然就是 Class 的实例类型了。

> **思考**
>
> - infer 和条件类型的搭配看起来会有奇效，比如在哪些场景？比如随着条件类型的嵌套每个分支会提取不同位置的 infer ？
> - infer 在某些特殊位置下应该如何处理？比如上面我们写了第一个参数类型，不妨试着来写写**最后一个参数类型**？

### 10.6 infer 约束

在某些时候，我们可能对 infer 提取的类型值有些要求，比如我只想要数组第一个为字符串的成员，如果第一个成员不是字符串，那我就不要了。

先写一个提取数组第一个成员的工具类型：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P
  : never;
```

加上对提取字符串的条件类型：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string
    ? P
    : never
  : never;
```

试用一下：

```typescript
type Tmp1 = FirstArrayItemType<[599, 'zxh']>; // never
type Tmp2 = FirstArrayItemType<['zxh', 599]>; // 'zxh'
type Tmp3 = FirstArrayItemType<['zxh']>; // 'zxh'
```

看起来好像能满足需求，但程序员总是精益求精的。泛型可以声明约束，只允许传入特定的类型，那 infer 中能否也添加约束，只提取特定的类型？

TypeScript 4.7 就支持了 infer 约束功能来实现 **对特定类型地提取**，比如上面的例子可以改写为这样：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer P extends string, ...any[]]
  ? P
  : never;
```

实际上，infer + 约束的场景是非常常见的，尤其是在某些连续嵌套的情况下，一层层的 infer 提取再筛选会严重地影响代码的可读性，而 infer 约束这一功能无疑带来了更简洁直观的类型编程代码。

## 11. 反方向类型推导

### 11.1 无处不在的上下文类型

最常见的例子：

```typescript
window.onerror = (event, source, line, col, err) => {};
```

在这个例子里，虽然我们并没有为 onerror 的各个参数声明类型，但是它们也已经获得了正确的类型。

当然你肯定能猜到，这是因为 onerror 的类型声明已经内置了：

```typescript
interface Handler {
  // 简化
  onerror: OnErrorEventHandlerNonNull;
}

interface OnErrorEventHandlerNonNull {
    (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error): any;
}
```

我们自己实现一个函数签名，其实也是一样的效果：

```typescript
type CustomHandler = (name: string, age: number) => boolean;

// 也推导出了参数类型
const handler: CustomHandler = (arg1, arg2) => true;
```

除了参数类型，返回值类型同样会纳入管控：

```typescript
declare const struct: {
  handler: CustomHandler;
};
// 不能将类型“void”分配给类型“boolean”。
struct.handler = (name, age) => {};
```

当然，不仅是箭头函数，函数表达式也是一样的效果，这里就不做展开了。

在这里，参数的类型基于其上下文类型中的参数类型位置来进行匹配，`arg1` 对应到 `name` ，所以是 `string` 类型，`arg2` 对应到 `age`，所以是 `number` 类型。这就是上下文类型的核心理念：**基于位置的类型推导**。同时，相对于我们上面提到的基于开发者输入进行的类型推导，上下文类型更像是 **反方向的类型推导**，也就是 **基于已定义的类型来规范开发者的使用**。

在上下文类型中，我们实现的表达式可以只使用更少的参数，而不能使用更多，这还是因为上下文类型基于位置的匹配，一旦参数个数超过定义的数量，那就没法进行匹配了。

```typescript
// 正常
window.onerror = (event) => {};
// 报错
window.onerror = (event, source, line, col, err, extra) => {};
```

上下文类型也可以进行”嵌套“情况下的类型推导，如以下这个例子：

```typescript
declare let func: (raw: number) => (input: string) => any;

// raw → number
func = (raw) => {
  // input → string
  return (input) => {};
};
```

在某些情况下，上下文类型的推导能力也会失效，比如这里我们使用一个由函数类型组成的联合类型：

```typescript
class Foo {
  foo!: number;
}

class Bar extends Foo {
  bar!: number;
}

let f1: { (input: Foo): void } | { (input: Bar): void };
// 参数“input”隐式具有“any”类型。
f1 = (input) => {}; // y :any
```

我们预期的结果是 input 被推导为 `Foo | Bar` 类型，也就是所有符合结构的函数类型的参数，但却失败了。这是因为 TypeScript 中的上下文类型目前暂时不支持这一判断方式（而不是这不属于上下文类型的能力范畴）。

你可以直接使用一个联合类型参数的函数签名：

```typescript
let f2: { (input: Foo | Bar): void };
// Foo | Bar
f2 = (input) => {}; // y :any
```

而如果联合类型中将这两个类型再嵌套一层，此时上下文类型反而正常了：

```typescript
let f3:
  | { (raw: number): (input: Foo) => void }
  | { (raw: number): (input: Bar) => void };

// raw → number
f3 = (raw) => {
  // input → Bar
  return (input) => {};
};
```

这里被推导为 Bar 的原因，其实还和我们此前了解的协变、逆变有关。任何接收 Foo 类型参数的地方，都可以接收一个 Bar 类型参数，因此推导到 Bar 类型要更加安全。

### 11.2 void 返回值类型下的特殊情况

上下文类型同样会推导并约束函数的返回值类型，但存在这么个特殊的情况，当内置函数类型的返回值类型为 void 时：

```typescript
type CustomHandler = (name: string, age: number) => void;

const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => 'zxh';
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;
```

你会发现这个时候，我们的函数实现返回值类型变成了五花八门的样子，而且还都不会报错？同样的，这也是一条世界底层的规则，**上下文类型对于 void 返回值类型的函数，并不会真的要求它啥都不能返回**。然而，虽然这些函数实现可以返回任意类型的值，但 **对于调用结果的类型，仍然是 void**：

```typescript
const result1 = handler1("zx", 23);
const result2 = handler2("zx", 23);
const result3 = handler3("zx", 23);
const result4 = handler4("zx", 23);
```

看起来这是一种很奇怪的、错误的行为，但实际上，我们日常开发中的很多代码都需要这一“不正确的”行为才不会报错，比如以下这个例子：

```typescript
const arr: number[] = [];
const list: number[] = [1, 2, 3];

list.forEach((item) => arr.push(item));
```

这是我们常用的简写方式，然而，`push` 方法的返回值是一个 `number` 类型（`push` 后数组的长度），而 `forEach`  的上下文类型声明中要求返回值是 `void` 类型。如果此时 `void` 类型真的不允许任何返回值，那这里我们就需要多套一个代码块才能确保类型符合了。

但这真的是有必要的吗？对于一个 void 类型的函数，我们真的会去消费它的返回值吗？既然不会，那么它想返回什么，全凭它乐意就好了。我们还可以用另一种方式来描述这个概念：你可以 **将返回值非 void 类型的函数（`() => list.push()`）作为返回值类型为 void 类型（`arr.forEach`）的函数类型参数**。

### 11.3 将更少参数的函数赋值给具有更多参数的函数类型

在上面的例子中，我们看到了这么一段代码：

```typescript
const arr: number[] = [];
const list: number[] = [1, 2, 3];

list.forEach((item) => arr.push(item));
```

在 forEach 的函数中，我们会消费 list 的每一个成员。但我们有时也会遇到并不实际消费数组成员的情况：

```typescript
list.forEach(() => arr.push(otherFactory));
```

这个时候，我们实际上就是在 **将更少参数的函数赋值给具有更多参数的函数类型**！

再看一个更明显的例子：

```typescript
function handler(arg: string) {
  console.log(arg);
}

function useHandler(callback: (arg1: string, arg2: number) => void) {
  callback('zxh', 599);
}

useHandler(handler);
```

`handler` 函数的类型签名很明显与 `useHandler` 函数的 `callback`  类型签名并不一致，但这里却没有报错。从实用意义的角度来看，如果我们需要类型签名完全一致，那么就需要为 `handler` 再声明一个额外的对应到  `arg2` 的参数，然而我们的 `handler` 代码里实际上并没有去消费第二个参数。这实际上在 JavaScript 中也是我们经常使用的方式：**即使用更少入参的函数来作为一个预期更多入参函数参数的实现**。

## 12. 函数类型：协变与逆变的比较

- [Covariance & Contravariance in typescript](https://dev.to/codeoz/how-i-understand-covariance-contravariance-in-typescript-2766)

### 12.0 Covariance & Contravariance

- **Covariance** accept `subtype` and does not accept `supertype`
- **Contravariance** accept `supertype` and does not accept `subtype`
- **Bivariance** accept both `supertype` and `subtype`

**argument type need to be `contravariant` and function types need to be `covariant` in their return types.**

> Convariance vs Contravariance

**函数类型有类型层级吗？** 如果有，它的类型层级又是怎么样的？比如，下面这几个函数类型之间的兼容性如何？

```typescript
type FooFunc = () => string;
type BarFunc = () => "literal types";
type BazFunc = (input: string) => number;
```

### 12.1 如何比较函数的签名类型

首先要明确的是，我们不会使用函数类型去和其他类型（如对象类型）比较，因为这并没有意义，本文中只会对两个函数类型进行比较。

来看示例，给出三个具有层级关系的类，分别代表动物、狗、柯基。

```typescript
class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}
```

对于一个接受 Dog 类型并返回 Dog 类型的函数，我们可以这样表示：

```typescript
type DogFactory = (args: Dog) => Dog;
```

简化为：`Dog -> Dog` 的表达形式。

对于函数类型比较，实际上我们要比较的即是参数类型与返回值类型（也只能是这俩位置的类型）。对于 `Animal、Dog、Corgi` 这三个类，如果将它们分别可重复地放置在参数类型与返回值类型处（相当于排列组合），就可以得到以下这些函数签名类型：

- `Animal -> Animal`
- `Animal -> Dog`
- `Animal -> Corgi`
- `Dog -> Dog`
- `Dog -> Animal`
- `Dog -> Corgi`
- `Corgi -> Animal`
- `Corgi -> Dog`
- `Corgi -> Corgi`

直接比较完整的函数类型并不符合我们的思维直觉，因此我们需要引入一个辅助函数：它接收一个 `Dog -> Dog` 类型的参数：

```typescript
function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}
```

对于函数参数，实际上类似于我们在类型系统层级时讲到的：

**如果一个值能够被赋值给某个类型的变量，那么可以认为这个值的类型为此变量类型的子类型**。

如一个简单接受 Dog 类型参数的函数：

```typescript
function makeDogBark(dog: Dog) {
  dog.bark();
}
```

它在调用时只可能接受 Dog 类型或 Dog 类型的子类型，而不能接受 Dog 类型的父类型：

```typescript
makeDogBark(new Corgi()); // 没问题
makeDogBark(new Animal()); // 不行
```

相对严谨地说，这是因为派生类（即子类）会保留基类的属性与方法，因此说其与基类兼容，但基类并不能未卜先知的拥有子类的方法。相对地说，因为我们要让这只狗汪汪两声，柯基、柴犬、德牧都会，但如果你传个牛进来，这我就很难办了啊。

> **里氏替换原则：子类可以扩展父类的功能，但不能改变父类原有的功能，子类型（subtype）必须能够替换掉他们的基类型（base type）。**

回到这个函数，这个函数会实例化一只狗狗，并传入 Factory（就像宠物美容），然后让它叫唤两声。实际上，这个函数同时约束了此类型的参数与返回值。首先，我只会传入一只正常的狗狗，但它不一定是什么品种。其次，你返回的必须也是一只狗狗，我并不在意它是什么品种。

对于这两条约束依次进行检查：

- 对于 `Animal/Dog/Corgi -> Animal` 类型，无论它的参数类型是什么，它的返回值类型都是不满足条件的。因为它返回的不一定是合法的狗狗，即我们说它不是 `Dog -> Dog` 的子类型。
- 对于 `Corgi -> Corgi` 与 `Corgi -> Dog`，其返回值满足了条件，但是参数类型又不满足了。这两个类型需要接受 Corgi 类型，可能内部需要它腿短的这个特性。但我们可没说一定会传入柯基，如果我们传个德牧，程序可能就崩溃了。
- 对于 `Dog -> Corgi`、`Animal -> Corgi`、`Animal -> Dog`，首先它们的参数类型正确的满足了约束，能接受一只狗狗。其次，它们的返回值类型也一定会能汪汪汪。

而实际上，如果我们去掉了包含 `Dog` 类型的例子，会发现只剩下 `Animal -> Corgi` 了，也即是说，`(Animal → Corgi) ≼ (Dog → Dog)` 成立（`A ≼ B` 意为 A 为 B 的子类型）。

观察以上排除方式的结论：

- 参数类型 **允许** 为 Dog 的父类型，**不允许** 为 Dog 的子类型。
- 返回值类型 **允许** 为 Dog 的子类型，**不允许** 为 Dog 的父类型。

你是否 get 到了什么？这里用来比较的两个函数类型，其实就是把具有父子关系的类型放置在参数位置以及返回值位置上，**最终函数类型的关系直接取决于类型的父子关系。** “取决于”也就意味着，其中有规律可循。那么这个时候，我们就可以引入协变与逆变的概念了。

### 12.2 协变与逆变

前面得到的结论是，考虑 `Corgi ≼ Dog ≼ Animal`，当有函数类型 `Dog -> Dog`，仅有 `(Animal → Corgi) ≼ (Dog → Dog)` 成立（即能被视作此函数的子类型，）。这里的参数类型与返回值类型实际上可以各自独立出来看：

考虑 `Corgi ≼ Dog`，假设我们对其进行返回值类型的函数签名类型包装，则有 `(T → Corgi) ≼ (T → Dog)`，也即是说，在我需要狗狗的地方，柯基都是可用的。即不考虑参数类型的情况，在包装为函数签名的返回值类型后，其子类型层级关系保持一致。

考虑 `Dog ≼ Animal`，如果换成参数类型的函数签名类型包装，则有 `(Animal -> T) ≼ (Dog -> T)`，也即是说，在我需要条件满足是动物时，狗狗都是可用的。即不考虑返回值类型的情况，在包装为函数签名的参数类型后，其子类型层级关系发生了逆转。

实际上，这就是 TypeScript 中的 **协变（** ***covariance*** **）** 与**逆变（** ***contravariance*** **）** 在函数签名类型中的表现形式。

这两个单词最初来自于几何学领域中：

**随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变。**

用 TypeScript 的思路进行转换，即如果有 `A ≼ B` ，

- 协变意味着 `Wrapper<A> ≼ Wrapper<B>`，
- 而逆变意味着 `Wrapper<B> ≼ Wrapper<A>`。

而在这里的示例中，**变化（Wrapper）即指从单个类型到函数类型的包装过程**，我们可以使用工具类型来实现独立的包装类型（独立指对参数类型与返回值类型）：

```typescript
type AsFuncArgType<T> = (arg: T) => void;
type AsFuncReturnType<T> = (arg: unknown) => T;
```

再使用这两个包装类型演示我们上面的例子：

```typescript
// 1 成立：(T -> Corgi) ≼ (T -> Dog) 协变
type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

// 2 不成立：(Dog -> T) ≼ (Animal -> T) 逆变
type CheckArgType = AsFuncArgType<Dog> extends AsFuncArgType<Animal> ? 1 : 2;
```

进行一个总结：

- **函数类型的参数类型使用子类型逆变的方式确定是否成立，**
- **而返回值类型使用子类型协变的方式确定**。

学习了函数类型的比较以及协变逆变的知识以后，你已经了解了如何通过“公式”来确定函数类型之间的兼容性关系，但实际上，基于协变逆变地检查并不是始终启用的（毕竟 TypeScript 在严格检查全关与全开的情况下，简直像是两门语言），我们需要通过配置来开启。

### 12.3 TSConfig 中的 StrictFunctionTypes

如果你曾经翻过 tsconfig 配置，你可能会注意到 [strictFunctionTypes](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Ftsconfig%23strictFunctionTypes) 这一项配置，但它在文档中的描述其实相对简略了些：**在比较两个函数类型是否兼容时，将对函数参数进行更严格的检查**（*When enabled, this flag causes functions parameters to be checked more correctly*），而实际上，这里的更严格指的即是 **对函数参数类型启用逆变检查**，很自然的我们会产生一些疑惑：

- 如果启用了这个配置才是逆变检查，那么原来是什么样的？
- 在实际场景中的逆变检查又是什么样的？

还是以我们的三个类为例，首先是一个函数以及两个函数类型签名：

```typescript
function fn(dog: Dog) {
  dog.bark();
}

type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;
```

我们通过赋值的方式来实现对函数类型的比较：

```typescript
const func1: CorgiFunc = fn;
const func2: AnimalFunc = fn;
```

> 如果赋值成立，说明 fn 的类型是 `CorgiFunc` / `AnimalFunc` 的子类型

这两个赋值实际上等价于：

- `(Dog -> T) ≼ (Corgi -> T)`
- `(Dog -> T) ≼ (Animal -> T)`

结合上面所学，我们很明显能够发现第二种应当是不成立的。但在禁用了 `strictFunctionTypes` 的情况下，TypeScript 并不会抛出错误。这是因为，在默认情况下，对函数参数的检查采用 **双变（** ***bivariant*** **）** ，**即逆变与协变都被认为是可接受的**。

在 TypeScript ESLint 中，有这么一条规则：[method-signature-style](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fmethod-signature-style.md)，它的意图是约束在接口中声明方法时，需要使用 **property** 而非 **method** 形式：

```typescript
// method 声明
interface T1 {
  func(arg: string): number;
}

// property 声明
interface T2 {
  func: (arg: string) => number;
}
```

进行如此约束的原因即，对于 property 声明，才能在开启严格函数类型检查的情况下享受到 **基于逆变的参数类型检查**。

对于 method 声明（以及构造函数声明），其无法享受到这一更严格的检查的原因则是对于如 Array 这样的内置定义，我们希望它的函数方法就是以协变的方式进行检查，举个栗子，`Dog[] ≼ Animal[]` 是否成立？

- 我们并不能简单的比较 Dog 与 Animal，而是要将它们视为两个完整的类型比较，即 `Dog[]` 的每一个成员（属性、方法）是否都能对应的赋值给 `Animal[]` ？
- `Dog[].push ≼ Animal[].push` 是否成立？
- 由 push 方法的类型签名进一步推导，`Dog -> void ≼ Animal -> void` 是否成立？
- `Dog -> void ≼ Animal -> void`在逆变的情况下意味着 `Animal ≼ Dog`，而这很明显是不对的！
- 简单来说， `Dog -> void ≼ Animal -> void` 是否成立本身就为 `Dog[] ≼ Animal[]` 提供了一个前提答案。

因此，如果 TypeScript 在此时仍然强制使用参数逆变的规则进行检查，那么 `Dog[] ≼ Animal[]` 就无法成立，也就意味着无法将 Dog 赋值给 Animal，这不就前后矛盾了吗？所以在大部分情况下，我们确实希望方法参数类型的检查可以是 **双变** 的，这也是为什么它们的声明中类型结构使用 method 方式来声明：

```typescript
interface Array<T> {
    push(...items: T[]): number;
}
```

### 12.4 联合类型与兄弟类型下的比较

在上面我们只关注了显式的父子类型关系，实际上在类型层级中还有隐式的父子类型关系（联合类型）以及兄弟类型（同一基类的两个派生类）。对于隐式的父子类型其可以仍然沿用显式的父子类型协变与逆变判断，但对于兄弟类型，比如 Dog 与 Cat，需要注意的是它们根本就**不满足逆变与协变的发生条件（父子类型）**，因此 `(Cat -> void) ≼ (Dog -> void)` （或者反过来）无论在严格检查与默认情况下均不成立。

### 12.5 非函数签名包装类型的变换

我们在最开始一直以函数体作为包装类型来作为协变与逆变的转变前提，后面虽然提到了使用数组的作为包装类型（`Dog[]`）的，但只是一笔带过，重点还是在函数体方面。现在，如果我们就是要考虑类似数组这种包装类型呢？比如直接一个简单的笼子 Cage ？

先不考虑 Cage 内部的实现，只知道它同时只能放一个物种的动物，`Cage<Dog>` 能被作为 `Cage<Animal>` 的子类型吗？对于这一类型的比较，我们可以直接用实际场景来代入：

- 假设我需要一笼动物，但并不会对它们进行除了读以外的操作，那么你给我一笼狗我也是没问题的，但你不能给我一笼植物。也就意味着，此时 List 是 readonly 的，而 `Cage<Dog> ≼ Cage<Animal>` 成立。**即在不可变的 Wrapper 中，我们允许其遵循协变。**
- 假设我需要一笼动物，并且会在其中新增其他物种，比如兔子啊王八，这个时候你给我一笼兔子就不行了，因为这个笼子只能放狗，放兔子进行可能会变异（？）。也就意味着，此时 List 是 writable 的，而 `Cage<Dog>` `Cage<Rabit>` `Cage<Turtle>` 彼此之间是互斥的，我们称为 **不变（\*invariant\*）**，用来放狗的笼子绝不能用来放兔子，即无法进行分配。
- 如果我们再修改下规则，现在一个笼子可以放任意物种的动物，狗和兔子可以放一个笼子里，这个时候任意的笼子都可以放任意的物种，放狗的可以放兔子，放兔子的也可以放狗，即可以互相分配，我们称之为**双变（\*Bivariant\*）**。

也就是说，包装类型的表现与我们实际需要的效果是紧密关联的。



## 13. 类型编程与类型体操

> 在学习 TypeScript 时，很多同学可能会遇到这些疑惑：
>
> - 这些额外的类型代码，以及类型编程，对实际项目开发的帮助在哪里？我真的需要精通它们吗？
> - 这些工具类型看起来真的好烧脑，并且它们并不能让我的网页运行得更快，让我的 Node 服务并发更高，让我的网页 PV / UV 数据更喜人，我为什么需要了解它们？
> - TypeScript 的学习曲线是怎么样的？是否存在一个比较平衡的阶段，让我的投入产出比最大化？

### 13.1 从类型编程到类型体操

你可能会注意到，上面我用了“类型编程”和“类型体操”这两个不同的词。这是因为我通常把 TS 中的类型操作分为这两类。

- 对于类型编程，它是 **对实际开发中真的有帮助的类型操作**，下限非常之低，比如其实我们就是简单地用个泛型，这也属于类型编程。而它的上限也很高，比如底层框架中让人眼花缭乱的操作。但我们不需要用一个具体的界限来进行划分，只需要知道，只要是真的对实际开发有帮助的类型操作，无论实现多么复杂，都能被归类于类型编程当中。

- 那么类型体操又是什么样的？在此之前，你可能看到过基于 TypeScript 类型实现的四则远算、斐波那契数列、象棋、Lisp  编译器这一类令人叹为观止的操作，这些就属于类型体操。但请注意，这个词并不是贬义的，相反，大部分类型体操的作者都是编程功底十分深厚的大牛，他们发明这些体操的意图并不是为了炫技，只是为了展示给萌新们新世界的大门，我个人也非常佩服能写出如此高阶类型运算的大佬们。这些体操虽然对实际项目开发的意义非常有限，但却可以从另外一个角度让你认识到 TypeScript 类型系统的图灵完备，以及在高手手里所表现出来的精妙技巧。

但是，如果你因为看不懂这些体操，或者想不出更炫酷的体操而感到焦虑，那就需要警醒一下了——**类型体操绝不代表你的 TS 水平**。我看到过很多因为掌握了各种类型体操表演引以为豪的同学，其中有相当一部分人在实际业务开发中，仍然是各种 any 与复制粘贴。这就是非常严重的本末倒置，你学习 TypeScript ，是为了帅气的体操还是为了更高质量的代码呢？

如果你掌握了所有的类型体操，你就能写好所有的业务代码吗？答案显然是否定的。类型体操就像是五年高考三年模拟，只要你愿意花时间，对着答案总是能看明白的，但你看完就能保证做出数学压轴题的最后一小问吗？类型体操绝不应当被作为 TS 水平的度量衡，在绝大多数情况下，我们对于 TypeScript 相关的技巧，都应该秉持着从实用性出发的角度来看待。类似的，还有盯着  TypeScript 源码读，类型编程还没入门就去刷 Type Challenges  等等误区，当你发现学习进度慢得感人，掉发进度快得吓人，真的不会怀疑人生吗？



TypeScript  带来了哪些帮助？太多啦，我只讲一个社区中还没见过有人提的点。我们书写的类型实际上也是逻辑，只不过是类型世界的逻辑，并且不存在于运行时。在我们书写实际的代码逻辑时，这些类型逻辑就像是飞机起飞前的预检（preflight）一样，**在你的代码还没运行时就能够发现其中隐藏的错误。稳定性、代码质量、严谨性、可读性等等**，其实本质都是这一能力。它们的确不能让你的页面性能更好或是业务数据更棒，但却能避免潜在的严重问题，比如白屏和塞满错误监控的 `Cannot read property of undefined`。

对于 TypeScript 来说最重要的，其实是与 JavaScript 的紧密结合，类型能力是添加在 JavaScript  之上的，也就意味着我们不需要学习一门全新的编程语言来获得类型检查。同时，我们可以说它的学习曲线是相对平缓的，因为并不需要学习太长时间就能写出还过得去的 TypeScript 代码。但它的边际成本是明显递增的，也就是说，假如你最开始只需要花 3 个单位的精力和时间，就能提升 10  个单位的类型覆盖程度（用来衡量 TypeScript 代码质量的指标之一），后面可能需要花 10 个单位的精力和时间才能再提升 1  个单位的类型覆盖。

但你真的需要如此高的类型覆盖程度，以及愿意花如此多的精力时间吗？我的建议是，在你优化 TypeScript 代码的过程中，如果感到边际成本明显提升，重构工作开始有些吃力，那你很可能已经达到了一个临界值，也是该停下来的时候了。

- 而对于 TypeScript  的学习曲线，自然也存在着这么一个平衡点，它标志着你的投入精力和获得回报达成了相对的平衡，再继续投入更多精力也无法看到明显的效果。你是否要问，这本小册中是否也存在着这么个平衡点？当然也是，只不过是几乎全本的内容（笑）。相信我，这本小册中基本都是你现在或未来会需要的技能点。只有 Compiler API  部分稍显复杂，但我们也会讲得有趣好玩一些。而对你自己来说，这个平衡点其实可以非常灵活，随着你的学习深入，TypeScript  技能不断提升，将会越来越渴望更多的知识，那平衡点不就越来越高了？

### 13.2 Type Chanllenges

[Type Challenge ](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges) 是 antfu （Vue 团队成员，以及 Vite、Vitest、Nuxt 等知名开源项目的团队成员或作者）的作品，其中搜集了许多类型编程的题目，并且贴心地按照难易程度分为了 easy、medium、hard 三个等级。



## 14. 内置工具类型进阶

### 14.1 属性修饰

属性修饰工具类型的进阶主要分为这么几个方向：

- 深层的属性修饰；
- 基于已知属性的部分修饰，以及基于属性类型的部分修饰。

#### 14.1.1 深层属性修饰

前面的 `infer` 递归工具类型

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
```

可以看到，此时我们只是在条件类型成立时，再次调用了这个工具类型而已。在某一次递归到条件类型不成立时，就会直接返回这个类型值。那么对于 Partial、Required，其实我们也可以进行这样地处理：

```typescript
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

简单起见，我们直接使用了 object 作为泛型约束与条件，这意味着也有可能传入函数、数组等类型。但毕竟我们对这个类型知根知底，就可以假设只会传入对象结构，因此也只需要对对象类型进行处理了。

为了更直观地验证它的效果，我们使用 [tsd](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftsd) 这一工具类型单元测试库来进行验证，效果大概是这样：

```typescript
import { expectType } from 'tsd';

type DeepPartialStruct = DeepPartial<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;

expectType<DeepPartialStruct>({
  foo: 'bar',
  nested: {},
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {},
  },
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {
      nestedBarFoo: undefined,
    },
  },
});
```

在 expectType 的泛型坑位中传入一个类型，然后再传入一个值，就可以验证这个值是否符合泛型类型了。

类似的，我们还可以实现其他进行递归属性修饰的工具类型，展示如下：

```typescript
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// 也可以记作 DeepImmutable
export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};
```

另外，在内置工具类型一节的结构工具类型中，存在一个从联合类型中剔除 `null | undefined` 的工具类型 NonNullable：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

在对象结构中我们也常声明类型为 `string | null` 的形式，代表了“**这里有值，但可能是空值**”。此时，我们也可以将其等价为一种属性修饰（Nullable 属性，前面则是 Optional / Readonly 属性）。因此，我们也可以像访问性修饰工具类型那样，实现一个  DeepNonNullable 来递归剔除所有属性的 null 与 undefined：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

export type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};
```

当然，就像 Partial 与 Required 的关系一样，DeepNonNullable 也有自己的另一半：DeepNullable：

```typescript
export type Nullable<T> = T | null;

export type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};
```

>  需要注意的是，DeepNullable 和 DeepNonNullable 需要在开启 `--strictNullChecks` 下才能正常工作。

#### 14.1.2 已知属性进行部分修改

如果我们要让一个对象的三个已知属性为可选的，那只要把这个对象拆成 A、B 两个对象结构，分别由三个属性和其他属性组成。然后让对象 A 的属性全部变为可选的，和另外一个对象 B 组合起来，不就行了吗？

拆开来描述一下这句话，看看这里都用到了哪些知识：

- 拆分对象结构，那不就是内置工具类型一节中讲到的**结构工具类型**，即 Pick 与 Omit？
- 三个属性的对象全部变为可选，那不就是属性修饰？岂不是可以直接用上面刚学到的**递归属性修饰**？
- 组合两个对象类型，也就意味着得到一个同时符合这两个对象类型的新结构，那不就是**交叉类型**？

分析出了需要用到的工具和方法，那执行起来就简单多了。这也是使用最广泛的一种类型编程思路：**将复杂的工具类型，拆解为由基础工具类型、类型工具的组合**。

直接来看基于已知属性的部分修饰，MarkPropsAsOptional 会将一个对象的部分属性标记为可选：

```typescript
export type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Partial<Pick<T, K>> & Omit<T, K>;
```

T 为需要处理的对象类型，而 K 为需要标记为可选的属性。由于此时 K 必须为 T 内部的属性，因此我们将其约束为 `keyof  T`，即对象属性组成的字面量联合类型。同时为了让它能够直接代替掉 `Partial`，我们为其指定默认值也为 `keyof  T`，这样在不传入第二个泛型参数时，它的表现就和 `Partial` 一致，即全量的属性可选。

而其组成中，`Partial<Pick<T, K>>` 为需要标记为可选的属性组成的对象子结构，`Omit<T, K>` 则为不需要处理的部分，使用交叉类型将其组合即可。验证效果：

```typescript
type MarkPropsAsOptionalStruct = MarkPropsAsOptional<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar'
>;
```

![image-20221007185122965](https://i.imgur.com/qilKSt8.png)

这可不好看出来具体效果。此时我们可以引入一个辅助的工具类型，我称其为 Flatten，对于这种交叉类型的结构，Flatten 能够将它展平为单层的对象结构。而它的实现也很简单，就是复制一下结构罢了：

```typescript
export type Flatten<T> = { [K in keyof T]: T[K] };

export type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Partial<Pick<T, K>> & Omit<T, K>>;
```

![image-20221007185403791](https://i.imgur.com/wddf0DE.png)

> 这里可以使用 `DeepPartial<Pick<T, K>>`，来把这些属性标记为深层的可选状态。

而对于按照值类型的部分修饰，比如标记所有函数类型属性为可选，其实和这里是一样的思路：**拆分-处理-组合**，只不过我们此前使用基于键名裁剪的 Pick、Omit，现在我们需要基于键值类型裁剪的 PickByValueType、OmitByValueType 了。而在接下来的结构工具类型进阶中，我们会了解到如何 **基于键值类型去裁剪结构**。

### 14.2 结构工具类型

前面对结构工具类型主要给出了两个进阶方向：

- 基于键值类型的 Pick 与 Omit；
- 子结构的互斥处理。

#### 14.2.1 基于键值类型的 Pick 和 Omit

首先是基于键值类型的 Pick 与 Omit，我们就称之为 PickByValueType 好了。它的实现方式其实还是类似部分属性修饰中那样，将对象拆分为两个部分，处理完毕再组装。只不过，现在我们无法预先确定要拆分的属性了，而是需要 **基于期望的类型去拿到所有此类型的属性名**，如想 Pick 出所有函数类型的值，那就要先拿到所有的函数类型属性名。先来一个 FunctionKeys 工具类型：

```typescript
type FuncStruct = (...args: any[]) => any;

type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];
```

`{}[keyof T]` 这个写法我们是第一次见，但我们可以拆开来看，先看看前面的 `{ [K in keyof T]: T[K] extends FuncStruct ? K : never; }` 部分，为何在条件类型成立时它返回了键名 K，而非索引类型查询 `T[K]` ？

```typescript
type Tmp<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
};

type Res = Tmp<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;

type ResEqual = {
  foo: 'foo';
  bar: 'bar';
  baz: never;
};
```

在 `Res`（等价于 `ResEqual`）中，我们获得了一个**属性名-属性名字面量类型**的结构，对于非函数类型的属性，其值为 `never`。然后，我们加上 `[keyof T]` 这一索引类型查询 + `keyof` 操作符的组合：

```typescript
type WhatWillWeGet = Res[keyof Res]; // "foo" | "bar"
```

我们神奇地获得了所有函数类型的属性名！这又是如何实现的呢？其实就是我们此前学习过的，当索引类型查询中使用了一个联合类型时，它会使用类似分布式条件类型的方式，将这个联合类型的成员依次进行访问，然后再最终组合起来，上面的例子可以这么简化：

```typescript
type WhatWillWeGetEqual1 = Res["foo" | "bar" | "baz"];
type WhatWillWeGetEqual2 = Res["foo"] | Res["bar"] | Res["baz"];
type WhatWillWeGetEqual3 = "foo" | "bar" | never;
```

通过这一方式，我们就能够获取到符合预期类型的属性名了。如果希望抽象“基于键值类型查找属性”名这么个逻辑，我们就需要对 FunctionKeys 的逻辑进行封装，即 **将预期类型也作为泛型参数**，由外部传入：

```typescript
type FuncStruct = (...args: any[]) => any;

type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];

type FunctionKeys<T extends object> = ExpectedPropKeys<T, FuncStruct>;

expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
>('foo');

expectType<
  FunctionKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
  // 报错，因为 baz 不是函数类型属性
>('baz');
```

注意，为了避免可选属性对条件类型语句造成干扰，这里我们使用 `-?` 移除了所有可选标记。

既然我们现在可以拿到对应类型的属性名，那么把这些属性交给 Pick，不就可以得到由这些属性组成的子结构了？

```typescript
export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;

expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: 'linbudu',
});

expectType<
  PickByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  foo: 'zxjh',
  bar: 24,
});
```

OmitByValueType 也是类似的，我们只需要一个和 ExpectedPropKeys 作用相反的工具类型即可，比如来个 FilteredPropKeys，只需要调换条件类型语句结果的两端即可：

```typescript
type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
  bar: 599,
});

expectType<
  OmitByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  baz: true,
});
```

或者，如果你想把 ExpectedPropKeys 和 FilteredPropKeys 合并在一起，其实也很简单，只是需要引入第三个泛型参数来控制返回结果：

```typescript
type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
  ? Resolved
  : Rejected;

export type ValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean
> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, true>
>;

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, false>
>;
```

看起来好像很完美，但这里基于条件类型的比较是否让你想到了某个特殊情况？即在联合类型的情况下，`1 | 2 extends 1 | 2 | 3`（通过泛型参数传入）  会被视为是合法的，这是由于分布式条件类型的存在。而有时我们希望对联合类型的比较是全等的比较，还记得我们说怎么禁用分布式条件类型吗？让它不满足裸类型参数这一条即可：

```typescript
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";
```

在这里我们也只需要简单进行改动即可：

```typescript
type StrictConditional<Value, Condition, Resolved, Rejected> = [Value] extends [
  Condition
]
  ? Resolved
  : Rejected;
```

看起来好像没问题，但这里其实不够完美！比如下面这种情况：

```typescript
type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false>; // true
```

当条件不再是一个简单的单体类型，而是一个联合类型时，我们使用数组的方式就产生问题了。因为 `Array<1 | 2> extends Array<1 | 2 | 3>` 就是合法的，**第一个数组中的可能元素类型均被第二个数组的元素类型包含了，无论如何都是其子类型**。

那么现在应该怎么办？其实只要反过来看，既然 `Array<1 | 2> extends Array<1 | 2 | 3>` 成立，那么 `Array<1 | 2 | 3> extends Array<1 | 2>` 肯定是不成立的，我们只要再加一个反方向的比较即可：

```typescript
type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [
  A
] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback;
```

在这种情况下 Value 和 Condition 的界限就比较模糊了，我们只是在比较两个类型是否严格相等，并没有值和表达式的概念了，因此就使用 A、B 来简称。

此时结果就符合预期了，需要联合类型完全一致：

```typescript
type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false>; // false
type Res2 = StrictConditional<1 | 2 | 3, 1 | 2, true, false, false>; // false
type Res3 = StrictConditional<1 | 2, 1 | 2, true, false>; // true
```

应用到 TypeFilter 中：

```typescript
export type StrictValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean = true
> = {
  [Key in keyof T]-?: StrictConditional<
    ValueType,
    T[Key],
    // 为了避免嵌套太多工具类型，这里就不使用 Conditional 了
    Positive extends true ? Key : never,
    Positive extends true ? never : Key,
    Positive extends true ? never : Key
  >;
}[keyof T];

export type StrictPickByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType>
>;

expectType<
  StrictPickByValueType<{ foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 }, 1 | 2>
>({
  bar: 1,
});

export type StrictOmitByValueType<T extends object, ValueType> = Pick<
  T,
  StrictValueTypeFilter<T, ValueType, false>
>;

expectType<
  StrictOmitByValueType<{ foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 }, 1 | 2>
>({
  foo: 1,
  baz: 3,
});
```

需要注意的是，由于 StrictOmitByValueType 需要的是**不符合类型的属性**，因此这里 StrictConditional 的 Fallback 泛型参数也需要传入 Key （即第五个参数中的 `Positive extends true ? never : Key`），同时整体应当基于 Pick 来实现。

对于基于属性类型的结构工具类型就到这里，这一部分可能需要你先稍微放慢速度，好好理解一番。因为并不完全是我们此前了解到的知识，比如分布式条件类型中，我们并没有说到条件为联合类型时可能出现的问题。这是因为脱离实际使用去讲，很难建立并加深你对这一场景的印象，但我想现在你已经深刻记住它了。

#### 14.2.2 基于结构的互斥工具类型

接下来是 **基于结构的互斥工具类型**。想象这样一个场景，假设我们有一个用于描述用户信息的对象结构，除了共有的一些基础结构以外，VIP  用户和普通用户、游客这三种类型的用户各自拥有一些独特的字段，如 vipExpires 代表 VIP 过期时间，仅属于 VIP  用户，promotionUsed 代表已领取过体验券，属于普通用户，而 refererType 代表跳转来源，属于游客。

先来看看如何声明一个接口，它要么拥有 vipExpires，要么拥有 promotionUsed 字段，而不能同时拥有这两个字段。你可能会首先想到使用联合类型？

```typescript
interface VIP {
  vipExpires: number;
}

interface CommonUser {
  promotionUsed: boolean;
}

type User = VIP | CommonUser;
```

很遗憾，这种方式并不会约束“不能同时拥有”这个条件：

```typescript
const user1: User = {
  vipExpires: 599,
  promotionUsed: false,
};
```

为了表示不能同时拥有，实际上我们应该使用 never 类型来标记一个属性。这里我们直接看完整的实现：

```typescript
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type XORUser = XOR<VIP, CommonUser>;

expectType<XORUser>({
  vipExpires: 0,
});

expectType<XORUser>({
  promotionUsed: false,
});

// 报错，至少需要一个
// @ts-expect-error
expectType<XORUser>({
});

// 报错，不允许同时拥有
// @ts-expect-error
expectType<XORUser>({
  promotionUsed: false,
  vipExpires: 0,
});
```

对 Without 做进一步展开可以看到，它其实就是将声明了一个不变的原属性+为 never 的其他属性的接口：

```typescript
// {
//    vipExpires?: never;
// }
type Tmp1 = Flatten<Without<VIP, CommonUser>>;
// {
//    vipExpires?: never;
//    promotionUsed: boolean;
// }
type Tmp2 = Flatten<Tmp1 & CommonUser>;
```

再通过联合类型的合并，这样一来 XORUser 就满足了“至少实现 VIP / CommonUser 这两个接口中的一个”，“不能同时实现 VIP / CommonUser ”这两个条件。如果加上游客类型实现三个互斥属性，也只需要额外嵌套一层：

```typescript
interface Visitor {
  refererType: RefererType;
}

// 联合类型会自动合并重复的部分
type XORUser = XOR<VIP, XOR<CommonUser, Visitor>>;
```

我们还可以使用互斥类型实现绑定效果，即要么同时拥有 A、B 属性，要么一个属性都没有：

```typescript
type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;

// 没有 foo、bar
expectType<XORStruct>({});

// 同时拥有 foo、bar
expectType<XORStruct>({
  foo: 'linbudu',
  bar: 599,
});
```

### 14.3 集合工具类型

在集合工具类型中我们给到的进阶方向，其实就是从一维原始类型集合，扩展二维的对象类型，在对象类型之间进行交并补差集的运算，以及对同名属性的各种处理情况。

对于对象类型的交并补差集，我们仍然沿用“降级”的处理思路，把它简化为可以用基础工具类型处理的问题即可。在这里，对象类型的交并补差集基本上可以降维到对象属性名集合的交并补差集问题，比如交集就是两个对象属性名的交集，使用属性名的交集访问其中一个对象，就可以获得对象之间的交集结构（不考虑同名属性冲突下）。

前面的一维集合：

```typescript
// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;
```

对应地实现对象属性名的版本：

```typescript
// 使用更精确的对象类型描述结构
export type PlainObjectType = Record<string, any>;

// 属性名并集
export type ObjectKeysConcurrence<
  T extends PlainObjectType,
  U extends PlainObjectType
> = keyof T | keyof U;

// 属性名交集
export type ObjectKeysIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Intersection<keyof T, keyof U>;

// 属性名差集
export type ObjectKeysDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Difference<keyof T, keyof U>;

// 属性名补集
export type ObjectKeysComplement<
  T extends U,
  U extends PlainObjectType
> = Complement<keyof T, keyof U>;
```

对于交集、补集、差集，我们可以直接使用属性名的集合来实现对象层面的版本：

```typescript
export type ObjectIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysIntersection<T, U>>;

export type ObjectDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysDifference<T, U>>;

export type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysComplement<T, U>
>;
```

需要注意的是在 `ObjectKeysComplement` 与 `ObjectComplement` 中，`T extends U` 意味着 T 是 U 的子类型，但在属性组成的集合类型中却相反，**U 的属性联合类型是 T 的属性联合类型的子类型**，因为既然 T 是 U 的子类型，那很显然 T 所拥有的的属性会更多嘛。

而对于并集，就不能简单使用属性名并集版本了，因为使用联合类型实现，我们并不能控制**同名属性的优先级**，比如我到底是保持原对象属性类型呢，还是使用新对象属性类型？

还记得我们在 MarkPropsAsOptional、PickByValueType 中使用的方式吗？将一个对象拆分成数个子结构，处理各个子结构，再将它们合并。那么对于合并两个对象的情况，其实就是两个对象各自特有的部分加上同名属性组成的部分。

对于 T、U 两个对象，假设以 U 的同名属性类型优先，思路会是这样的：

- T 比 U 多的部分：T 相对于 U 的差集，`ObjectDifference<T, U>`
- U 比 T 多的部分：U 相对于 T 的差集，`ObjectDifference<U, T>`
- T 与 U 的交集，由于 U 的优先级更高，在交集处理中将 U 作为原集合， T 作为后传入的集合，`ObjectIntersection<U, T>`

我们就得到了 Merge：

```typescript
type Merge<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;
```

如果要保证原对象优先级更高，那么只需要在交集处理中将 T 视为原集合，U 作为后传入的集合：

```typescript
type Assign<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 T 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<T, U> & ObjectDifference<U, T>;
```

除了简单粗暴地完全合并以外，我们还可以实现不完全的并集，即使用对象 U 的属性类型覆盖对象 T 中的同名属性类型，但**不会将 U 独特的部分**合并过来：

```typescript
type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高（逆并集）)
> = ObjectDifference<T, U> & ObjectIntersection<U, T>;
```

### 14.4 模式匹配工具类型

在内置工具类型一节中，我们对模式匹配工具类型的进阶方向其实只有深层嵌套这么一种，特殊位置的 infer 处理其实大部分时候也是通过深层嵌套实现，比如此前我们实现了提取函数的首个参数类型：

```typescript
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;
```

要提取最后一个参数类型则可以这样：

```typescript
type FunctionType = (...args: any) => any;

type LastParameter<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer Q]
    ? Q
    : never
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FuncBaz = (arg1: string, arg2: boolean) => void;

type FooLastParameter = LastParameter<FuncFoo>; // number
type BarLastParameter = LastParameter<FuncBar>; // string
type BazLastParameter = LastParameter<FuncBaz>; // boolean
```

这也是模式匹配中常用的一种方法，通过 infer 提取到某一个结构，然后再对这个结构进行 infer 提取。

我们在此前曾经讲到一个提取 Promise 内部值类型的工具类型 PromiseValue， TypeScript 内置工具类型中也存在这么一个作用的工具类型，并且它的实现要更为严谨：

```typescript
type Awaited<T> = T extends null | undefined
  ? T 
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any 
    ? Awaited<V>
    : never
  : T;
```

首先你会发现，在这里 `Awaited` 并非通过 `Promise<infer V>` 来提取函数类型，而是通过 `Promise.then` 方法提取，首先提取到 then 方法中的函数类型，再通过这个函数类型的首个参数来提取出实际的值。

更严谨地来说，`PromiseValue` 和 `Awaited` 并不应该放在一起比较，前者就只想提取 `Promise<void>` 这样结构的内部类型，后者则像在类型的层面执行了 `await Promise.then()` 之后的返回值类型。同样的，这里也用到了 infer 伴随结构转化的例子。

### 14.5 RequiredKeys、OptionalKeys

在属性修饰工具类型中我们只实现了 `FunctionKeys`，它的实现相对简单，因为只需要判断类型即可。那如果，我们要获取一个接口中所有可选或必选的属性呢？现在没法通过类型判断，要怎么去收集属性？

> 这一部分的实际意义不大

首先是 `RequiredKeys` ，我们可以通过一个很巧妙的方式判断一个属性是否是必选的，先看一个例子：

```typescript
type Tmp1 = {} extends { prop: number } ? "Y" : "N"; // "N"
type Tmp2 = {} extends { prop?: number } ? "Y" : "N"; // "Y"
```

在类型层级一节中我们已经了解，此时 TypeScript 会使用基于结构化类型的比较，也就意味着由于 `{ prop: number }` 可以视为继承自 `{}` ，`{} extends { prop: number }` 是不满足条件的。但是，如果这里的 prop 是可选的，那就不一样了！由于 `{ prop?: number }` 也可以是一个空的接口结构，那么 `{} extends { prop?: number }` 就可以认为是满足的。

因此，我们可以这么实现：

```typescript
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

### 14.6 MutableKeys、ImmutableKeys

`MutableKeys` 和 `ImmutableKeys` 则要更加复杂一些，因为 `readonly` 修饰符无法简单地通过结构化类型比较，我们需要一个能对只读这一特性进行判断的辅助工具类型，直接看例子再讲解：

```typescript
type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
```

在这里，`<T>() => T extends X ? 1 : 2` 和 `<T>() => T extends Y ? 1 : 2` 这两个函数结构实际上起辅助作用，内部的条件类型并不会真的进行运算。我们实际上是借助这一辅助结构判断类型 X 与 Y 的全等性，这一全等性就包括了 readonly 修饰符与可选性等。

我们基于其实现 MutableKeys 和 ImmutableKeys：

```typescript
export type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

expectType<MutableKeys<{ a: string; readonly b: string }>>('a');
expectNotType<MutableKeys<{ a: string; readonly b: string }>>('b');

export type ImmutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

expectType<ImmutableKeys<{ a: string; readonly b: string }>>('b');
expectNotType<ImmutableKeys<{ a: string; readonly b: string }>>('a');
```

在 MutableKeys 中，我们传入本次映射的单个属性组成的接口结构，以及这一结构去除了 readonly  的版本，如果前后两个接口结构被判定为全等，那就说明这一次映射的属性不是只读的。在 ImmutableKeys  中也是，但我们调换了符合条件类型时的正反结果位置。



## 15. 模板字符串类型

> 模板字符串类型，其实也完全可以映射到 JavaScript 中的概念——模板字符串。

### 15.1 模板字符串类型的基础使用

最简单的例子：

```typescript
type World = 'World';

// "Hello World"
type Greeting = `Hello ${World}`;
```

这里的 `Greeting` 就是一个模板字符串类型，它内部通过与 JavaScript 中模板字符串相同的语法（`${}`），使用了另一个类型别名 `World`，其最终的类型就是 **将两个字符串类型值组装在一起返回**。

除了使用确定的类型别名以外，模板字符串类型当然也支持通过泛型参数传入。需要注意的是，并不是所有值都能被作为模板插槽：

```typescript
type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

type Greet1 = Greet<"zxh">; // "Hello zxh"
type Greet2 = Greet<599>; // "Hello 599"
type Greet3 = Greet<true>; // "Hello true"
type Greet4 = Greet<null>; // "Hello null"
type Greet5 = Greet<undefined>; // "Hello undefined"
type Greet6 = Greet<0x1fffffffffffff>; // "Hello 9007199254740991"
```

目前有效的类型只有 `string | number | boolean | null | undefined | bigint` 这几个。正如上面的例子所示，这些类型在最终的字符串结果中都会被转换为字符串字面量类型，即使是 null 与 undefined。

当然，你也可以直接为插槽传入一个类型而非类型别名：

```typescript
type Greeting = `Hello ${string}`;
```

在这种情况下，`Greeting` 类型并不会变成 `Hello string`，而是保持原样。这也意味着它并没有实际意义，此时就是一个无法改变的模板字符串类型，但所有 `Hello `开头的字面量类型都会被视为 `Hello ${string}` 的子类型，如 `Hello zxh`、`Hello TypeScript` 。

很明显，**模板字符串类型的主要目的即是增强字符串字面量类型的灵活性，进一步增强类型和逻辑代码的关联**。通过模板字符串类型你可以这样声明你的版本号：

```typescript
type Version = `${number}.${number}.${number}`;

const v1: Version = '1.1.0';

// X 类型 "1.0" 不能赋值给类型 `${number}.${number}.${number}`
const v2: Version = '1.0';
```

而在需要声明大量存在关联的字符串字面量类型时，模板字符串类型也能在减少代码的同时获得更好的类型保障。举例来说，当我们需要声明以下字符串类型时：

```typescript
type SKU =
  | 'iphone-16G-official'
  | 'xiaomi-16G-official'
  | 'honor-16G-official'
  | 'iphone-16G-second-hand'
  | 'xiaomi-16G-second-hand'
  | 'honor-16G-second-hand'
  | 'iphone-64G-official'
  | 'xiaomi-64G-official'
  | 'honor-64G-official'
  | 'iphone-64G-second-hand'
  | 'xiaomi-64G-second-hand'
  | 'honor-64G-second-hand';
```

随着商品、内存数、货品类型的增加，我们可能需要成几何倍地新增。但如果使用模板字符串类型，我们可以利用其 **自动分发的特性** 来实现简便而又严谨的声明：

```typescript
type Brand = "iphone" | "xiaomi" | "meizu";
type Memory = "128G" | "256G";
type ItemType = "official" | "second-hand";

type SKKU = `${Brand}-${Memory}-${ItemType}`;
```

在插槽中传入联合类型，然后你就会发现，所有的联合类型排列组合都已经自动组合完毕了：

![image-20221010154851774](https://i.imgur.com/rw6XI25.png)

通过这种方式，我们不仅不需要再手动声明一大堆工具类型，同时也获得了逻辑层面的保障：它会忠实地将 **所有插槽中的联合类型与剩余的字符串部分进行依次的排列组合**。

除了直接在插槽中传递联合类型，通过泛型传入联合类型时同样会有分发过程：

```typescript
type SizeRecord<Size extends string> = `${Size}-Record`;

type Size = 'Small' | 'Middle' | 'Large';

// "Small-Record" | "Middle-Record" | "Huge-Record"
type UnionSizeRecord = SizeRecord<Size>;
```

模板字符串类型和字符串字面量类型实在太过相似，我们很容易想到它和字符串类型之间的类型兼容性是怎样的。

### 15.2 模板字符串类型的类型表现

实际上，由于模板字符串类型最终的产物还是字符串字面量类型，因此只要插槽位置的类型匹配，字符串字面量类型就可以被认为是模板字符串类型的子类型，比如我们上面的版本号：

```typescript
declare let v1: `${number}.${number}.${number}`;
declare let v2: '1.2.4';

v1 = v2;
```

如果反过来，`v2 = v1` 很显然是不成立的，因为 v1 还包含了 `100.0.0` 等等情况。同样的，模板字符串类型和模板字符串也拥有着紧密的关联：

```typescript
const greet = (to: string): `Hello ${string}` => {
  return `Hello ${to}`;
};
```

这个例子进一步体现了类型与值的紧密关联，通过模板字符串类型，现在我们能够进行更精确地类型描述了。而作为基础类型能力，模板字符串类型和其他类型工具也有着奇妙的组合作用，比如索引类型和映射类型。

### 15.3 结合索引类型与映射类型

说到模板字符串插槽中传入联合类型的自动分发特性时，你可能会想到我们此前接触的一个能够生成联合类型的工具：索引类型查询操作符 keyof。基于 **keyof + 模板字符串类型**，我们可以基于已有的对象类型来实现精确到字面量的类型推导：

```typescript
interface Foo {
  name: string;
  age: number;
  job: Job;
}

type ChangeListener = {
  on: (change: `${keyof Foo}Changed`) => void;
};

declare let listener: ChangeListener;

// 提示并约束为 "nameChanged" | "ageChanged" | "jobChanged"
listener.on('');
```

在需要基于已有的对象类型进行字面量层面的变更时，我们现在能够放心地将这部分类型约束也交给模板字符串类型了。而除了索引类型，模板字符串类型也和映射类型有着奇妙的化学反应。

为了与映射类型实现更好的协作，TS 在引入模板字符串类型时支持了一个叫做 **重映射（\*Remapping\*）** 的新语法，基于模板字符串类型与重映射，我们可以实现一个此前无法想象的新功能：**在映射键名时基于原键名做修改**。

我们可以使用映射类型很容易复制一个接口：

```typescript
type Copy<T extends object> = {
  [K in keyof T]: T[K];
};
```

然而，如果我们想要在复制时小小的修改下键名要怎么做？比如从 `name` 到 `modified_name` ？修改键值类型我们都很熟练了，但要修改键名，我们就需要本节的新朋友搭把手才可以。

我们直接看如何基于重映射来修改键名：

```typescript
type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${string & K}`]: T[K];
};

interface Foo {
  name: string;
  age: number;
}

// {
//   modified_name: string;
//   modified_age: number;
// }
type CopiedFoo = CopyWithRename<Foo>;
```

这里我们其实就是通过 `as` 语法，将映射的键名作为变量，映射到一个新的字符串类型。需要注意的是，由于对象的合法键名类型包括了 symbol，而模板字符串类型插槽中并不支持 symbol 类型。因此我们使用 `string & K` 来确保了最终交由模板插槽的值，一定会是合法的 string 类型。

我们也可以通过伪代码来帮助理解：

```typescript
const Copied = {};
for (const K in Object.keys(T)){
  const Key = `modified_${K}`;
  Copied[Key] = T[K];
}
```

而重映射并不是模板字符串类型的唯一伴生伙伴，为了迎接这位新成员，TS 还隆重地为它准备了一些特殊的工具类型，以此让它能够快速和各位前辈大哥平起平坐。

### 15.4 专用工具类型

这些工具类型专用于字符串字面量类型，包括 **Uppercase**、**Lowercase**、**Capitalize** 与 **Uncapitalize**，看名字就能知道它们的作用：字符串大写、字符串小写、首字母大写与首字母小写：

```typescript
type Heavy<T extends string> = `${Uppercase<T>}`;
type Respect<T extends string> = `${Capitalize<T>}`;

type HeavyName = Heavy<'zxh'>; // "ZXH"
type RespectName = Respect<'zxh'>; // "Zxh"
```

上面的重映射部分，我们成功将键名从 `name` 修改成了 `modified_name` 的形式，如果要修改成我们更习惯的小驼峰形式呢？此时我们就可以使用上  Capitalize 工具类型了：

```typescript
type CopyWithRename<T extends object> = {
  [K in keyof T as `modified${Capitalize<string & K>}`]: T[K];
};

// {
//   modifiedName: string;
//   modifiedAge: number;
// }
type CopiedFoo = CopyWithRename<Foo>;
```

实际上，这是 TypeScript 中首次引入了 **能直接改变类型本身含义** 的工具类型。你肯定对它们的内部实现非常有兴趣，然而当你跳转到源码定义时却会发现它们的定义是这样的：

```typescript
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

`intrinsic` 代表了这一工具类型由 TypeScript 内部进行实现，如果我们去看内部的源码，会发现更神奇的部分：

```typescript
function applyStringMapping(symbol: Symbol, str: string) {
  switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
    case IntrinsicTypeKind.Uppercase: return str.toUpperCase();
    case IntrinsicTypeKind.Lowercase: return str.toLowerCase();
    case IntrinsicTypeKind.Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
    case IntrinsicTypeKind.Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}
```

你会发现，在这里字符串字面量类型被作为一个字符串值一样进行处理，这些工具类型通过调用了字符串的 toUpperCase  等原生方法实现。而按照这个趋势来看，在未来我们很有可能实现对字面量类型的更多操作，甚至以后我们能直接调用 Lodash  来处理字符串类型也说不定。

也正是由于目前这些实现需要在 TypeScript 内部实现，而无法通过类型编程达到，在类型编程范式归类中我们并没有包括这一部分。但模板字符串类型却可以和部分范式产生奇妙的化学反应，比如模式匹配工具类型。

### 15.5 模板字符串类型与模式匹配

**模式匹配工具类型的核心理念就是对符合约束的某个类型结构，提取其某一个位置的类型**，比如函数结构中的参数与返回值类型。而如果我们将一个字符串类型视为一个结构，就能够在其中也应用模式匹配相关的能力，而我们此前所缺少的就是模板字符串类型的能力。

模板插槽不仅可以声明一个占位的坑，也可以声明一个要提取的部分，我们来看一个例子：

```typescript
type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str;
```

我们一共在两处使用了模板字符串类型。首先是在约束部分，我们希望传入的字符串字面量类型是 `"Tom Hardy"` `"Lin Budu"` 这样的形式。注意，这里的空格也需要严格遵循，因为 **它也是一个字面量类型的一部分**。对于符合这样约束的类型，我们使用 **模板插槽 + infer 关键字** 提取了其空格旁的两个部分（即名与姓）。然后在条件类型中，我们将 infer 提取出来的值，再次使用模板插槽注入到了新的字符串类型中。

```typescript
type ReversedTomHardy = ReverseName<"Tom hardy">;
type ReversedZxh = ReverseName<"Zhou Xianghui">;
```

除了显式使用 infer 进行模式匹配操作以外，由于模板字符串的灵活性，我们甚至可以直接声明一个泛型来进行模式匹配操作：

```typescript
declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;

handler(`Guess who is zxh`);
handler(`Guess who is `);
handler(`Guess who was `);
handler(``);
```

### 15.6 基于重映射的 PickByValueType

我们在这一节了解了重映射这一能力，它使得我们可以在映射类型中去修改映射后的键名，而如果映射后的键名变成了 `never` ，那么这个属性将不会出现在最终的接口结构中。也就是说，我们也可以基于重映射来实现 **结构处理** 工具类型，比如说 `PickByValueType` ：

```typescript
type PickByValueType<T extends object, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K]
}
```

我们在重映射中再次进行了条件类型判断，并在其成立时才重映射到原键名，否则只返回一个 never。类似的，我们也可以实现 OmitByType 等等。

这也是 TypeScript 的更新中经常会出现的一个有趣现象，新版本的能力有时可以让我们大大简化类型编程中的操作，除了上面基于重映射实现的结构处理，我们此前也了解了基于 infer extends 来简化模式匹配类型中的结果过滤。



## 16. 模板字符串工具类型进阶

### 16.1 Trim、Includes

最简单的模式匹配只有一层条件类型语句，也就意味着我们不需要对模式匹配的结果做结构转换等操作。对比到字符串类型变量的方法，也就是 trim（trimLeft、trimRight）、includes、startsWith 与 endsWith。

我们从比较有代表性的 includes 看起，对应实现一个类型层面的版本：**判断传入的字符串字面量类型中是否含有某个字符串**：

```typescript
type Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;
```

在 Include 类型中，我们在 Search 前后声明了两个 infer 插槽，但实际上并不消费 R1 与 R2，而只是判断字符串是否可以被划分为**要搜索的部分 + 其他部分**。来验证一下实际效果：

```typescript
type IncludeRes1 = Include<'zxh', 'z'>; // true
type IncludeRes2 = Include<'zxh', 'zz'>; // false
type IncludeRes3 = Include<'zxh', ''>; // true
type IncludeRes4 = Include<' ', ''>; // true
type IncludeRes5 = Include<'', ''>; // false
```

在 IncludeRes4 中，我们发现对于空字符串 `''` 需要进行特殊的处理，`''.includes('')` 也应当是成立的，就像实际字符串中进行判断一样。我们希望尽可能贴近原本字符串方法的表现，因此我们需要新增额外处理：

```typescript
type _Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;

type Include<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _Include<Str, Search>;
```

当字符串 Str 为空字符串时，我们判断 Search 是否是空字符串来直接决定返回结果，因为很明显 `''.includes('linbudu')` 是不成立的。在 Str 不为空字符串时，我们才会真的进行 Include 的判断。

在 Str 与 Search 均为空字符串的情况下，我们直接返回 true，否则我们才进行模式匹配。

而提到模板字符串类型中的空字符串，我们会想到 trim 三兄弟：去除起始部分空格的 trimStart，去除结尾部分空格的 trimEnd，以及开头结尾空格一起去的 trim。基于模式匹配的思路我们还是很容易进行对应的类型实现：

```typescript
// trimStart
type TrimLeft<V extends string> = V extends ` ${infer R}` ? R : V;

// trimEnd
type TrimRight<V extends string> = V extends `${infer R} ` ? R : V;

// trim
type Trim<V extends string> = TrimLeft<TrimRight<V>>;
```

聪明的你肯定会想到，我们的字符串边缘可能不止有一个空格！而这里的实现只能去掉一个，操作很简单，我们递归一下就好了：

```typescript
type TrimLeft<Str extends string> = Str extends ` ${infer R}` ? TrimLeft<R> : Str;

type TrimRight<Str extends string> = Str extends `${infer R} ` ? TrimRight<R> : Str;

type Trim<Str extends string> = TrimLeft<TrimRight<Str>>;
```

这样，在字符串的两边不包含空格时，递归就会停止，从而返回一致“干净”的字符串。

而类型版本的 StartsWith 与 EndsWith 两个工具类型，和 Include 的实现非常接近，我们直接看其中 StartsWith 的最终实现与验证：

```typescript
type _StartsWith<
  Str extends string,
  Search extends string
> = Str extends `${Search}${infer _R}` ? true : false;

type StartsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : _StartsWith<Str, Search>
  : _StartsWith<Str, Search>;

type StartsWithRes1 = StartsWith<'zxh', 'z'>; // true
type StartsWithRes2 = StartsWith<'zxh', ''>; // true
type StartsWithRes3 = StartsWith<'zxh', ' '>; // false
type StartsWithRes4 = StartsWith<'', ''>; // true
type StartsWithRes5 = StartsWith<' ', ''>; // true
```

### 16.2 结构转换: Replace、Split、Join

看起来 Replace 好像是挺复杂的实现？但仔细想想它和 Include 其实没有啥区别，Include 判断是 **否能将字符串字面量划分为目标部分与其他部分**，那 Replace 不是只需要 **将目标部分替换为新的部分，按照原本的结构组合好** 就行了吗？就像我们在对象层面的集合类型中学习的那样，**一切复杂的工具类型最终都可以转换为数个简单工具类型的组合**。

在 Include 实现中，我们有两个纯做结构判断的 infer 插槽，现在它们也能真正的派上用场了：

```typescript
export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? `${Head}${Replacement}${Tail}`
  : Str;
```

既然这两个插槽派上了用场，我们就需要给它们正式点的名字。Head 与 Tail 这两个名字我们后面还会常常见到，它们就表示开头与结尾的匹配部分。

这里我们其实是先判断字符串字面量中是否包含 Search 部分（就像 Include 那样），在包含也就是结构符合时，将匹配得到的 Head 与 Tail 部分夹上 Replacement，我们就实现了一个类型版本的 Replace：

```typescript
type ReplaceRes1 = Replace<"aa bb cc aaa dd", "aa", "$">;
type ReplaceRes2 = Replace<"aa bb cc aaa dd", "a", "@$">;
type ReplaceRes3 = Replace<"aa bb cc aaa dd", "a", "">;
```

然而，你应该遇到过需要全量替换的场景，也就是 ECMAScript 2021 的 replaceAll 方法。那我们能否在类型层面也实现一个 replaceAll？当然没问题，只需要再请出我们的老朋友——递归：

```typescript
export type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
  : Str;
```

如果你更喜欢将这两个类型合并在一起，再通过选项来控制是否进行全量替换，其实也很简单，在结构工具类型中我们就试过引入类型层面的选项控制，这里也是类似：

```typescript
export type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
  ShouldReplaceAll extends boolean = false
> = Input extends `${infer Head}${Search}${infer Tail}`
  ? ShouldReplaceAll extends true
    ? Replace<
        `${Head}${Replacement}${Tail}`,
        Search,
        Replacement,
        ShouldReplaceAll
      >
    : `${Head}${Replacement}${Tail}`
  : Input;
```

除了 replace 与 replaceAll，在字符串类型值中还有一个常用的方法：split ，它会将字符串按照确定的分隔符拆分成一个数组。在类型层面，我们也可以实现 Split，毕竟“分隔符”这个词就在强烈暗示你，它 **一定是符合某种结构的字面量类型**。比如最简单的，假设我们所有的字符串都是 `"A-B-C"` 这个结构，那就可以这么拆分：

```typescript
export type Split<Str extends string> =
  Str extends `${infer Head}-${infer Body}-${infer Tail}`
    ? [Head, Body, Tail]
    : [];

type SplitRes1 = Split<'z-x-h'>; // ["z", "x", "h"]
```

当然，真实情况肯定不会这么简单，分隔符与字符串长度都是不确定的。但有着模式匹配与递归，没什么能难得倒我们，管你多长的字符串，我直接一个递归：

```typescript
export type Split<
  Str extends string,
  Delimiter extends string
> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str];

// ["zxh", "24", "fe"]
type SplitRes1 = Split<'zxh,24,fe', ','>;

// ["zxh", "599", "fe"]
type SplitRes2 = Split<'zxh 599 fe', ' '>;
```

这里有两种情况需要注意。第一种，存在多处分割时，Split  类型进行到最后一次，即无法再分割时，需要直接将最后一部分给返回。第二种，对于空字符串作为分隔符，其表现为将字符串字面量按字母进行拆分（SplitRes3），这同样与 Split 方法的实际表现一致。

在实际情况中，我们的字符串可能包含了多种可能的分隔符，即这里的 Delimiter 可以是一个联合类型 `"_" | "-" | " "` 。在这种情况下，模板字符串中的模式匹配也能够生效，它会使用这里的多个分隔符依次进行判断，并在判断到其中一种就立刻成立：

```typescript
type Delimiters = '-' | '_' | ' ';

// ["z", "x", "h"]
type SplitRes4 = Split<'z_x_h', Delimiters>;
```

但需要注意的是，我们并不能在一个字符串中混用多种分隔符，在这种情况下由于联合类型在插槽中的排列组合特性，我们会得到一个诡异的结果：

```typescript
type SplitRes4 = Split<"hello-world|color", "-" | "|">;
```

![image-20221011134405486](https://i.imgur.com/2AL1zWv.png)

实际上，每次只能依据一种分隔符进行拆分才是符合预期的。在正常的变量命名中，通常只会使用一种分隔方式，如 `module-my_super_module-beta` 这个命名中，实际上只有 `-` 是分隔符。确实使用了多种具有实际意义的分隔符时，我们应该进行多次拆分，如  CSS 的 BEM 命名方式（`Block__Element--Modifier`）下，我们经常会这么写类名：`footer__button--danger`。此时，我们就应当先按照 `__` 拆出 Block，再按照 `--` 拆出 Modifier。

> 另外，基于 Split 类型我们还可以获取字符串长度：
>
> ```typescript
> export type StrLength<T extends string> = Split<Trim<T>, ''>['length'];
> 
> type StrLengthRes1 = StrLength<'zxh'>; // 3
> type StrLengthRes2 = StrLength<'hello world'>; // 11
> type StrLengthRes3 = StrLength<''>; // 0
> type StrLengthRes4 = StrLength<' '>; // 0
> ```
>
> 这是因为即使是在类型层面，元祖类型的长度也会是一个有实际意义的值。

Split 方法是 **将字符串按分隔符拆分成一个数组**，而 Join 方法则是 **将一个数组中的所有字符串按照分隔符组装成一个字符串**。我们只需要通过递归依次取出每一个字符串单元，使用模板插槽组装即可：

```typescript
export type Join<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;
```

> 这里的 Rest 类型无法被正确地推导，因此使用了 // @ts-expect-error 来忽略错误。

看起来似乎没啥问题，我们来试一下？

```typescript
// `z-x-h-${string}`
type JoinRes1 = Join<['z', 'x', 'h'], '-'>;
```

这个条件很明显不会成立，因此它返回了 string 类型，而这个 string 类型我们的本义是用来兜底：**如果 Join 无法拼接一个列表，那至少要返回一个 string 类型**。

要解决这种情况，我们只需要额外处理一下空数组的情况：

```typescript
// `z-x-h-`
type JoinRes2 = Join<['z', 'x', 'h'], '-'>;
```

实际上，在进行到最后一项数组成员时（即 `['du']`），我们的递归过程就应当被提前阻止。这里产生一个多余的 `'-'` 的原因，其实就是让这仅有一项的数组还进行了一次分隔符拼接。

因此我们也需要处理只剩下最后一项的情况：

```typescript
export type Join<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends []
  ? ''
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;

// `z-x-h`
type JoinRes3 = Join<['z', 'x', 'h'], '-'>;
```

看起来简单的 Join 类型，我们却连续实现了三次才完成。Split 类型其实也是，如果不提前考虑到各种情况，很难注意到在最后一次递归需要的特殊处理。这也是类型编程中常见的一个情景，**一个工具类型有时需要多次改进、多种边界情况处理，才能称为“可用”，尤其是在递归的情况下**。

在模板字符串进阶类型的最后一部分，我们要来实现字符串的 Case 处理。这也是模板字符串类型中相对最为复杂的一部分，我们基本上是在对上面的模式匹配、递归、结构转换等概念做一次全面的结合应用。

### 16.4 Case 转换

在上一节，我们已经了解了 TypeScript 内置的 Lowercase、Capitalize 等工具类型，知道它们是在内部实现的层面支持了字符串值的变换。其实基于这些工具类型，我们完全可以实现几乎所有常见的 Case，如 Camel Case（`'linBuDu'`）、Snake Case（`'lin_bu_du'`）、Delimiter Case（按照指定分隔符划分，如 `'lin~bu~du'` `'lin>bu>du'` 等，也包括 Snake Case）。

首先需要明确的一点是，对于字符串，无论是值还是字面量类型，我们并没有办法去智能拆分，比如  mynameislinbudu，在不注入判断逻辑的情况下，计算机并不知道如何进行分词。如果是已经具有了一种 case 的字符串，比如  my_name_is_linbudu，此时我们要拆分就容易多了。拆分其实就是 Case 转换的基础，我们本节介绍的 Case 转换一定是建立在 **传入字符串已经拥有了一种 case** 的情况。

我们先以 CamelCase 为最终产物，了解如何从 SnakeCase 转换到 CamelCase，也就是下划线转小驼峰。

```typescript
// 如何实现？
expectType<SnakeCase2CamelCase<'foo_bar_baz'>>('fooBarBaz');
```

看这清晰明确的结构，不用模式匹配简直暴殄天物，我们需要做的就是按照 `_` 进行结构匹配，然后将除了首个字符串单元（在这里即是 `foo` ）以外的后续部分都转为首字母大写。至于怎么转，当然是贴心内置的 Capitalize 了。

我们直接来看实现，由于这部分会有大量的结果验证，我们再次请出 expectType：

```typescript
type SnakeCase2CamelCase<S extends string> =
  S extends `${infer Head}${'_'}${infer Rest}`
    ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
    : S;

expectType<SnakeCase2CamelCase<'foo_bar_baz'>>('fooBarBaz');
```

解决了 SnakeCase ，稍微举一反三，你会发现 KebabCase（中划线，如 `"lin-bu-du"`）其实也解决了，不就是换个分隔符的事？

```typescript
type KebabCase2CamelCase<S extends string> =
  S extends `${infer Head}${'-'}${infer Rest}`
    ? `${Head}${KebabCase2CamelCase<Capitalize<Rest>>}`
    : S;

expectType<KebabCase2CamelCase<'foo-bar-baz'>>('fooBarBaz');
```

SnakeCase 和 KebabCase 的唯一区别就是模式匹配的分隔符，身为封装工程师，我们肯定要把分隔符的能力进行抽象，支持任意的分隔符：

```typescript
type DelimiterCase2CamelCase<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Rest}`
  ? `${Head}${DelimiterCase2CamelCase<Capitalize<Rest>, Delimiter>}`
  : S;
```

来验证一下效果：

```typescript
expectType<DelimiterCase2CamelCase<'foo-bar-baz', '-'>>('fooBarBaz');
expectType<DelimiterCase2CamelCase<'foo~bar~baz', '~'>>('fooBarBaz');
expectType<DelimiterCase2CamelCase<'foo bar baz', ' '>>('fooBarBaz');
```

到这里，我们支持了一个能够通过传入分隔符解决任意 Delimiter Case 转 Camel Case，看起来可以功成身退了。但这里还存在非常大的优化空间，比如我们还能让它自动处理分隔符。通常的变量命名只会使用 `_` 和 `-` 作为分隔符，加上字面量中可能存在的空格，也就是我们希望自动处理 `"_" | "-" | " "` 这三个分隔符。

```typescript
type WordDelimiter = '-' | '_' | ' ';

type DelimiterCase2CamelCaseAuto<S extends string> =
  S extends `${infer Head}${infer Delimiter}${infer Rest}`
    ? Delimiter extends WordDelimiter
      ? `${Head}${DelimiterCase2CamelCaseAuto<Capitalize<Rest>>}`
      : S
    : S;
```

如果你真觉得这能够工作，我的建议是再回到上一部分重新来过。对于这种连续的 infer 插槽，其匹配策略是尽可能为前面的每个插槽匹配一个字符，然后将所有剩下的部分都交给最后一个插槽。如 `"lin-bu-du"` 在上面会匹配为 `l` `i` `n-budu`。

因此要实现一个自动分割的版本，我们还需要一些额外的工作，但思路仍然是一致的：**按照分隔符拆分**，对除首个字符串以外的字符单元进行首字母大写处理以及组装。在 Delimiter Case 中，我们通过可确定的分隔符直接使用递归模式匹配拆分，如果分隔符并不确定的情况下我们应该怎么做？

我们在上面讲到的 Split 类型，其实就能很好地满足我们的需要：

```typescript
type Delimiters = '-' | '_' | ' ';

// ["z", "x", "h"]
type SplitRes4 = Split<'z_x_h', Delimiters>;
```

也就是说，我们可以使用 Split 将字符串拆分成数组，然后在数组中去处理第一项以外的其他成员：

```typescript
export type CamelCase<K extends string> = CamelCaseStringArray<
  Split<K, Delimiters>
>;
```

而 CamelCaseStringArray 这个类型，我们希望它能够将 `['lin', 'bu', 'du']` 转化为 `['lin', 'Bu', 'Du']`。也就是说这个数组可以分为两个部分，无需处理的第一项和全部首字母大写的其余项：

```typescript
type CamelCaseStringArray<Words extends string[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${First}${CapitalizeStringArray<Rest>}`
  : never;
```

在数组中进行模式匹配时，我们为何也使用了看似多余的 infer 插槽？这是因为我们的 First 会直接传入给插槽，通过 infer 插槽匹配，能够确保最终 infer First 得到的 infer 值一定会是字符串类型。

由于这里的 First 和 Rest 被视为两种不同的结构，因此我们需要再声明一个 CapitalizeStringArray 类型，它的作用就是将 **递归地将数组中所有的字符串单元转化为首字母大写形式**：

```typescript
type CapitalizeStringArray<Words extends any[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${Capitalize<First>}${CapitalizeStringArray<Rest>}`
  : '';
```

这样我们就得到了一个初具雏形的 Camel Case 智能版：

```typescript
type Delimiters = '-' | '_' | ' ';

type CapitalizeStringArray<Words extends any[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${Capitalize<First>}${CapitalizeStringArray<Rest>}`
  : '';

type CamelCaseStringArray<Words extends string[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? `${First}${CapitalizeStringArray<Rest>}`
  : never;

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

type CamelCase<K extends string> = CamelCaseStringArray<
  Split<K, Delimiters>
>;
```

来验证一下效果：

```typescript
expectType<CamelCase<'foo-bar-baz'>>('fooBarBaz');
expectType<CamelCase<'foo bar baz'>>('fooBarBaz');
expectType<CamelCase<'foo_bar_baz'>>('fooBarBaz');
```

CamelCase 这个类型确实有一定复杂度，但它本质上仍然是数个基础工具类型与概念的组合，包括模板字符串类型、infer  插槽与模式匹配结合、Rest infer  等等。同时，我们并没有想一口气把它实现出来，而是先整理了思路（拆分、转换、重组），确定了能够依赖的基础工具类型（Split），才一步步实现了它。

这里的 Camel Case 其实还有一些需要改进的地方，比如首字母大写的 `Foo-bar-baz` 和全大写的 `'FOO-BAR-BAZ'` ，也需要转化为小驼峰形式的 `fooBarBaz` 。

这里我放上 Type Fest 中 Camel Case 的最终实现，基本上处理了绝大部分的边界情况：

```typescript
export type PlainObjectType = Record<string, any>;

export type WordSeparators = '-' | '_' | ' ';

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

type CapitalizeStringArray<Words extends readonly any[], Prev> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? First extends undefined
    ? ''
    : First extends ''
    ? CapitalizeStringArray<Rest, Prev>
    : `${Prev extends '' ? First : Capitalize<First>}${CapitalizeStringArray<
        Rest,
        First
      >}`
  : '';

type CamelCaseStringArray<Words extends readonly string[]> = Words extends [
  `${infer First}`,
  ...infer Rest
]
  ? Uncapitalize<`${First}${CapitalizeStringArray<Rest, First>}`>
  : never;

export type CamelCase<K extends string> = CamelCaseStringArray<
  Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
>;
```

另外，虽然 Camel Case 只是对一维字符串字面量进行的转换，但由于我们上一节讲到的重映射能力，它也可以被应用到对象类型层面：

```typescript
export type CamelCasedProperties<T extends PlainObjectType> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends object
    ? CamelCasedProperties<T[K]>
    : T[K];
};

expectType<
  CamelCasedProperties<{ foo_bar: string; foo_baz: { nested_foo: string } }>
>({
  fooBar: '',
  fooBaz: {
    nestedFoo: '',
  },
});
```



## 17. 工程层面的类型能力

### 17.1 类型检查指令

在前端世界的许多工具中，其实都提供了 **行内注释（Inline Comments）** 的能力，用于支持在某一处特定代码**使用特殊的配置来覆盖掉全局配置**。最常见的即是 ESLint 与 Prettier 提供的禁用检查能力，如 `/* eslint-disable-next-lint */`、`<!-- prettier-ignore -->` 等。TypeScript 中同样提供了数个行内注释（这里我们称为类型指令），来进行单行代码或单文件级别的配置能力。这些指令均以 `// @ts-` 开头 ，我们依次来介绍。

#### 17.1.1 ts-ignore 和 ts-expect-error

`ts-ignore` 应该是使用最为广泛的一个类型指令了，它的作用就是直接禁用掉对下一行代码的类型检查：

```typescript
// @ts-ignore
const name: string = 599;
```

基本上所有的类型报错都可以通过这个指令来解决，但由于它本质是上 ignore 而不是 disable，也就意味着如果下一行代码并没有问题，那使用 ignore 反而就是一个错误了。因此 TypeScript 随后又引入了一个更严格版本的 ignore，即 `ts-expect-error`，它只有在**下一行代码真的存在错误时**才能被使用，否则它会给出一个错误：

```typescript
// @ts-expect-error
const name: string = 599;

// @ts-expect-error 错误使用此指令，报错
const age: number = 599;
```

那这两个功能相同的指令应该如何取舍？我的建议是 **在所有地方都不要使用 ts-ignore**，直接把这个指令打入冷宫封存起来。原因在上面我们也说了，对于这类 ignore 指令，本来就应当确保**下一行真的存在错误时**才去使用。

这两个指令只能对单行代码生效，但如果我们有非常多的类型报错要处理（比如正在将一个 JavaScript 文件迁移到 TypeScript），难道要一个个为所有报错的地方都添加上禁用检查指令？当然不，正如 ESLint 中可以使用 `/* eslint-disable-next-line */` 禁用下一行代码检查，也可以使用 `/* eslint-disable */` 禁用整个文件检查一样， TypeScript 中也提供了对整个文件生效的类型指令：`ts-check` 与 `ts-nocheck`。

#### 17.1.2 ts-check 与 ts-nocheck

我们首先来看 ts-nocheck ，你可以把它理解为一个作用于整个文件的 ignore 指令，使用了 ts-nocheck 指令的 TS 文件将不再接受类型检查：

```typescript
// @ts-nocheck 以下代码均不会抛出错误
const name: string = 599;
const age: number = 'linbudu';
```

那么 `ts-check` 呢？这看起来是一个多余的指令，因为默认情况下 TS  文件不是就会被检查吗？实际上，这两个指令还可以用在 JS 文件中。要明白这一点，首先我们要知道，TypeScript 并不是只能检查 TS  文件，对于 JS 文件它也可以通过类型推导与 JSDoc 的方式进行不完全的类型检查。

```javascript
// JavaScript 文件
let myAge = 18;

// 使用 JSDoc 标注变量类型
/** @type {string} */
let myName;

class Foo {
  prop = 599;
}
```

在上面的代码中，声明了初始值的 myAge 与 `Foo.prop` 都能被推导出其类型，而无初始值的 myName 也可以通过 JSDoc 标注的方式来显式地标注类型。

但我们知道 JavaScript 是弱类型语言，表现之一即是变量可以 **被赋值为与初始值类型不一致的值**，比如上面的例子进一步改写：

```javascript
let myAge = 18;
myAge = "90"; // 与初始值类型不同

/** @type {string} */
let myName;
myName = 599; // 与 JSDoc 标注类型不同
```

我们的赋值操作在类型层面显然是不成立的，但我们是在 JavaScript 文件中，因此这里并不会有类型报错。如果希望在 JS 文件中也能享受到类型检查，此时 `ts-check` 指令就可以登场了：

```javascript
// @ts-check
/** @type {string} */
const myName = 599; // 报错！

let myAge = 18;
myAge = '200'; // 报错！
```

这里我们的 `ts-check` 指令为 JavaScript 文件也带来了类型检查，而我们同时还可以使用 `ts-expect-error` 指令来忽略掉单行的代码检查：

```javascript
// @ts-check
/** @type {string} */
// @ts-expect-error
const myName = 599; // OK

let myAge = 18;
// @ts-expect-error
myAge = '200'; // OK
```

而 `ts-nocheck` 在 JS 文件中的作用和 TS 文件其实也一致，即禁用掉对当前文件的检查。如果我们希望开启对所有 JavaScript 文件的检查，只是忽略掉其中少数呢？此时我们在 TSConfig 中启用 `checkJs` 配置，来开启**对所有包含的 JS 文件的类型检查**，然后使用 `ts-nocheck` 来忽略掉其中少数的 JS 文件。

除了类型指令以外，在实际项目开发中还有一个你会经常打交道的概念：类型声明。

### 17.2 类型声明

类型声明，实际上就是 `declare` 语法：

```typescript
declare var f1: () => void;

declare interface Foo {
  prop: string;
}

declare function foo(input: Foo): Foo;

declare class Foo {}
```

我们可以直接访问这些声明：

```typescript
declare let otherProp: Foo['prop'];
```

但不能为这些声明变量赋值：

```typescript
// × 不允许在环境上下文中使用初始值
declare let result = foo();

// √ Foo
declare let result: ReturnType<typeof foo>;
```

这些类型声明就像我们在 TypeScript 中的类型标注一样，会存放着特定的类型信息，同时由于它们并不具有实际逻辑，我们可以很方便地使用类型声明来进行类型兼容性的比较、工具类型的声明与测试等等。

除了手动书写这些声明文件，更常见的情况是你的 TypeScript 代码在编译后生成声明文件：

```typescript
// 源代码
const handler = (input: string): boolean => {
  return input.length > 5;
}

interface Foo {
  name: string;
  age: number;
}

const foo: Foo = {
  name: "zxh",
  age: 18
}

class FooCls {
  prop!: string;
}
```

这段代码在编译后会生成一个 `.js` 文件和一个 `.d.ts` 文件，而后者即是类型声明文件：

```typescript
// 生成的类型定义
declare const handler: (input: string) => boolean;

interface Foo {
    name: string;
    age: number;
}

declare const foo: Foo;

declare class FooCls {
    prop: string;
}
```

这样一来，如果别的文件或是别的项目导入了这段代码，它们就能够从这些类型声明获得对应部分的类型，这也是类型声明的核心作用：**将类型独立于 `.js` 文件进行存储**。别人在使用你的代码时，就能够获得这些额外的类型信息。同时，如果你在使用别人没有携带类型声明的 `.js` 文件，也可以通过类型声明进行类型补全，我们在后面还会了解更多。

### 17.3 让类型定义覆盖项目

> 在开始学习下面的内容前，不妨先想想你是否遇到过这么几个场景？
>
> - 想要使用一个 npm 包，但它发布的时间太早，根本没有携带类型定义，于是你的项目里就出现了这么一处没有被类型覆盖的地方。
> - 你想要在代码里导入一些非代码文件，反正 Webpack 会帮你处理，但是可恶的 TS 又报错了？
> - 这个项目在运行时动态注入了一些全局变量（如 `window.errorReporter`），你想要在代码里直接这样访问，却发现类型又报错了...

这些问题都可以通过类型声明来解决，这也是它的核心能力：**通过额外的类型声明文件，在核心代码文件以外去提供对类型的进一步补全**。类型声明文件，即 `.d.ts` 结尾的文件，它会自动地被 TS 加载到环境中，实现对应部分代码的类型补全。

声明文件中并不包含实际的代码逻辑，它做的事只有一件：**为 TypeScript 类型检查与推导提供额外的类型信息**，而使用的语法仍然是 TypeScript 的 declare 关键字，只不过现在我们要进一步学习其它打开方式了。

要详细学习声明文件与 declare 关键字，我们不妨先来看看如何解决上面的问题。首先是无类型定义的 npm 包，我们可以通过 declare module 的方式来提供其类型：

```typescript
import foo from 'pkg';

const res = foo.handler();
```

这里的 pkg 是一个没有类型定义的 npm 包（实际并不存在），我们来看如何为它添加类型提示。

```typescript
declare module 'pkg' {
  const handler: () => boolean;
}
```

现在我们的 res 就具有了 boolean 类型！`declare module 'pkg'` 会为默认导入 `foo` 添加一个具有 handler 的类型，虽然这里的 `pkg` 根本不存在。我们也可以在 `declare module` 中使用默认导出：

```typescript
declare module 'pkg2' {
  const handler: () => boolean;
  export default handler;
}

import bar from 'pkg2';

bar();
```

>  在 `'pkg'` 的类型声明中，你也可以使用 `export const` ，效果是一致的，但由于对 `'pkg2'` 我们使用了默认导入，因此必须要有一个 `export default`。

除了为缺失类型的模块声明类型以外，使用类型声明我们还可以为非代码文件，如图片、CSS文件等声明类型。

对于非代码文件，比如说 markdown 文件，假设我们希望导入一个 `.md` 文件，由于其本质和 npm 包一样是一条导入语句，因此我们可以类似地使用 declare module 语法：

```typescript
// index.ts
import raw from './note.md';

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);

// declare.d.ts
declare module '*.md' {
  const raw: string;
  export default raw;
}
```

对于非代码文件的导入，更常见的其实是 `.css`、`.module.css`、`.png` 这一类，但基本语法都相似，我们在后面还会见到更多。

总结一下，`declare module` 通常用于为没有提供类型定义的库进行类型的补全，以及为非代码文件提供基本类型定义。但在实际使用中，如果一个库没有内置类型定义，TypeScript 也会提示你，是否要安装 `@types/xxx` 这样的包。那这个包又是什么？

#### 17.3.1 DefinitelyTyped

简单来说，`@types/` 开头的这一类 npm 包均属于 [DefinitelyTyped](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped) ，它是 TypeScript 维护的，专用于为社区存在的 **无类型定义的 JavaScript 库**添加类型支持，常见的有 `@types/react` `@types/lodash` 等等。通过 DefinitelyTyped 来提供类型定义的包常见的有几种情况，如 Lodash 这样的库仍然有大量 JavaScript  项目使用，将类型定义内置在里面不一定是所有人都需要的，反而会影响包的体积。还有像 React 这种不是用纯 JavaScript /  TypeScript 书写的库，需要自己来手写类型声明（React 是用 Flow 写的，这是一门同样为 JavaScript  添加类型的语言，或者说语法）。

举例来说，只要你安装了 `@types/react`，TypeScript 会自动将其加载到环境中（实际上所有 `@types/` 下的包都会自动被加载），并作为 react 模块内部 API 的声明。但这些类型定义并不一定都是通过 `declare module`，我们下面介绍的命名空间 namespace 其实也可以实现一样的能力。

先来看 `@types/node` 中与 `@types/react` 中分别是如何进行类型声明的：

```typescript
// @types/node
declare module 'fs' { 
    export function readFileSync(/** 省略 */): Buffer;
}

// @types/react
declare namespace React {
    function useState<S>(): [S, Dispatch<SetStateAction<S>>];
}
```

可以看到，`@types/node` 中仍然使用 `declare module` 的方式为 `fs` 这个内置模块声明了类型，而 `@types/react` 则使用的是我们没见过的 `declare namespace` 。别担心，我们会在后面详细介绍。

回到上面的最后一个问题，如果第三方库并不是通过导出来使用，而是直接在全局注入了变量，如 CDN 引入与某些监控埋点 SDK 的引入，我们需要通过 `window.xxx` 的方式访问，而类型声明很显然并不存在。此时我们仍然可以通过类型声明，但不再是通过 `declare module` 了。

#### 17.3.2 扩展已有的类型定义

对全局变量的声明，还是以 window 为例，实际上我们如果 Ctrl + 点击代码中的 window，会发现它已经有类型声明了：

```typescript
declare var window: Window & typeof globalThis;

interface Window {
  // ...
}
```

这行代码来自于  `lib.dom.d.ts` 文件，它定义了对浏览器文档对象模型的类型声明，这就是 TypeScript 提供的内置类型，也是“出厂自带”的类型检查能力的依据。类似的，还有内置的 `lib.es2021.d.ts` 这种文件定义了对 ECMAScript 每个版本的类型声明新增或改动等等。

我们要做的，实际上就是在内置类型声明的基础之上，再新增一部分属性。而别忘了，在 JavaScript 中当你访问全局变量时，是可以直接忽略 `window` 的：

```typescript
onerror = () => {};
```

反过来，在类型声明中，如果我们直接声明一个变量，那就相当于将它声明在了全局空间中：

```typescript
// 类型声明
declare const errorReporter: (err: any) => void;

// 实际使用
errorReporter("err!");
```

而如果我们就是想将它显式的添加到已有的 `Window` 接口中呢？在接口一节中我们其实已经了解到，如果你有多个同名接口，那么**这些接口实际上是会被合并的**，这一特性在类型声明中也是如此。因此，我们再声明一个 Window 接口即可：

```typescript
interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}

window.userTracker("click!")
```

类似的，我们也可以扩展来自 `@types/` 包的类型定义：

```typescript
declare module 'fs' {
  export function bump(): void;
}

import { bump } from 'fs';
```

总结一下这两个部分，TypeScript 通过 DefinitelyTyped ，也就是 `@types/` 系列的 npm 包来为无类型定义的 JavaScript npm 包提供类型支持，这些类型定义 的 npm 包内部其实就是数个 `.d.ts` 这样的声明文件。

而这些声明文件主要通过 declare / namespace  的语法进行类型的描述，我们可以通过项目内额外的声明文件，来实现为非代码文件的导入，或者是全局变量添加上类型声明。而对于多个类型声明文件，如果我们想复用某一个已定义的类型呢？此时三斜线指令就该登场了。

#### 17.3.3 三斜线指令

三斜线指令就像是声明文件中的导入语句一样，它的作用就是 **声明当前的文件依赖的其他类型声明**。而这里的“其他类型声明”包括了 TS 内置类型声明（`lib.d.ts`）、三方库的类型声明以及你自己提供的类型声明文件等。

三斜线指令本质上就是一个自闭合的 XML 标签，其语法大致如下：

```typescript
/// <reference path="./other.d.ts" />
/// <reference types="node" />
/// <reference lib="dom" />
```

**需要注意的是，三斜线指令必须被放置在文件的顶部才能生效**。

这里的三条指令作用其实都是声明当前文件依赖的外部类型声明，只不过使用的方式不同：分别使用了 `path、types、lib` 这三个不同属性，我们来依次解析。

- 使用 path 的 reference 指令，其 path 属性的值为一个 **相对路径**，指向你项目内的其他声明文件。而在编译时，TS 会沿着 path 指定的路径不断深入寻找，最深的那个没有其他依赖的声明文件会被最先加载。

```typescript
// @types/node 中的示例
/// <reference path="fs.d.ts" />
```

- 使用 types 的 reference 指令，其 types 的值是 **一个包名**，也就是你想引入的 `@types/` 声明，如上面的例子中我们实际上是在声明当前文件对 `@types/node` 的依赖。而如果你的代码文件（`.ts`）中声明了对某一个包的类型导入，那么在编译产生的声明文件（`.d.ts`）中会自动包含引用它的指令。

```typescript
/// <reference types="node" />
```

- 使用 lib 的 reference 指令类似于 types，只不过这里 lib 导入的是 TypeScript 内置的类型声明，如下面的例子我们声明了对 `lib.dom.d.ts` 的依赖：

```typescript
// vite/client.d.ts
/// <reference lib="dom" />
```

而如果我们使用 `/// <reference lib="esnext.promise" />`，那么将依赖的就是 `lib.esnext.promise.d.ts` 文件。

这三种指令的目的都是引入当前文件所依赖的其他类型声明，只不过适用场景不同而已。

如果说三斜线指令的作用就像导入语句一样，那么命名空间（namespace）就像一个模块文件一样，将一组强相关的逻辑收拢到一个命名空间内部。

#### 17.3.4 命名空间

假设一个场景，我们的项目里需要接入多个平台的支付 SDK，最开始只有微信支付和支付宝：

```typescript
class WeChatPaySDK {}

class ALiPaySDK {}
```

然后又多了美团支付、虚拟货币支付（比如 Q 币）、信用卡支付等等：

```typescript
class WeChatPaySDK {}

class ALiPaySDK {}

class MeiTuanPaySDK {}

class CreditCardPaySDK {}

class QQCoinPaySDK {}
```

随着业务的不断发展，项目中可能需要引入越来越多的支付 SDK，甚至还有比特币和以太坊，此时将这些所有的支付都放在一个文件内未免过于杂乱了。这些支付方式其实大致可以分成两种：现实货币与虚拟货币。此时我们就可以使用命名空间来区分这两类 SDK：

```typescript
export namespace RealCurrency {
  export class WeChatPaySDK {}

  export class ALiPaySDK {}

  export class MeiTuanPaySDK {}

  export class CreditCardPaySDK {}
}

export namespace VirtualCurrency {
  export class QQCoinPaySDK {}

  export class BitCoinPaySDK {}

  export class ETHPaySDK {}
}
```

> 注意，这里的代码是在 `.ts` 文件中的，此时它是具有实际逻辑意义的，也不能和类型混作一谈。

而命名空间的使用类似于枚举：

```typescript
const weChatPaySDK = new RealCurrency.WeChatPaySDK();
```

唯一需要注意的是，命名空间内部实际上就像是一个独立的代码文件，因此其中的变量需要导出以后，才能通过 `RealCurrency.WeChatPaySDK` 这样的形式访问。

如果你开始学习前端的时间较早，一定会觉得命名空间的编译产物很眼熟——它就像是上古时期里使用的伪模块化方案：

```js
export var RealCurrency;
(function (RealCurrency) {
    class WeChatPaySDK {
    }
    RealCurrency.WeChatPaySDK = WeChatPaySDK;
    class ALiPaySDK {
    }
    RealCurrency.ALiPaySDK = ALiPaySDK;
    class MeiTuanPaySDK {
    }
    RealCurrency.MeiTuanPaySDK = MeiTuanPaySDK;
    class CreditCardPaySDK {
    }
    RealCurrency.CreditCardPaySDK = CreditCardPaySDK;
})(RealCurrency || (RealCurrency = {}));
```

实际上，命名空间的作用也正是实现简单的模块化功能，在 TypeScript 中引入它时（[1.5 版本](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Frelease-notes%2Ftypescript-1-5.html%23namespace-keyword)），前端的模块化方案还处于混沌时期。

命名空间的内部还可以再嵌套命名空间，比如在虚拟货币中再新增区块链货币一类，此时嵌套的命名空间也需要被导出：

```typescript
export namespace VirtualCurrency {
  export class QQCoinPaySDK {}

  export namespace BlockChainCurrency {
    export class BitCoinPaySDK {}

    export class ETHPaySDK {}
  }
}

const ethPaySDK = new VirtualCurrency.BlockChainCurrency.ETHPaySDK();
```

类似于类型声明中的同名接口合并，命名空间也可以进行合并，但需要通过三斜线指令来声明导入。

```typescript
// animal.ts
namespace Animal {
  export namespace ProtectedAnimals {}
}

// dog.ts
/// <reference path="animal.ts" />
namespace Animal {
  export namespace Dog {
    export function bark() {}
  }
}

// corgi.ts
/// <reference path="dog.ts" />
namespace Animal {
  export namespace Dog {
    export namespace Corgi {
      export function corgiBark() {}
    }
  }
}
```

实际使用时需要导入全部的依赖文件：

```typescript
/// <reference path="animal.ts" />
/// <reference path="dog.ts" />
/// <reference path="corgi.ts" />

Animal.Dog.Corgi.corgiBark();
```

除了在 `.ts` 文件中使用以外，命名空间也可以在声明文件中使用，即 `declare namespace`：

```typescript
declare namespace Animal {
  export interface Dog {}

  export interface Cat {}
}

declare let dog: Animal.Dog;
declare let cat: Animal.Cat;
```

但如果你在 `@types/` 系列的包下，想要通过 namespace 进行模块的声明，还需要注意将其导出，然后才会加载到对应的模块下。以 `@types/react` 为例：

```typescript
export = React;
export as namespace React;
declare namespace React {
  // 省略了不必要的类型标注
  function useState<S>(initialState): [];
}
```

首先我们声明了一个命名空间 React，然后使用 `export = React` 将它导出了，这样我们就能够在从 react 中导入方法时，获得命名空间内部的类型声明，如 useState。

从这一个角度来看，`declare namespace` 其实就类似于普通的 `declare` 语法，只是内部的类型我们不再需要使用 `declare` 关键字（比如我们直接在 namespace 内部 `function useState(): []` 即可）。

而还有一行 `export as namespace React` ，它的作用是在启用了 `--allowUmdGlobalAccess` 配置的情况下，允许将这个模块作为全局变量使用（也就是不导入直接使用），这一特性同样也适用于通过 CDN 资源导入模块时的变量类型声明。

除了这两处 namespace 使用，React 中还利用 namespace 合并的特性，在全局的命名空间中注入了一些类型：

```typescript
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}
```

这也是为什么我们可以在全局使用 `JSX.Element` 作为类型标注。

除了类型声明中的导入——三斜线指令，以及类型声明中的模块——命名空间以外，TypeScript 还允许你将这些类型去导入到代码文件中。

#### 17.3.5 仅类型导入

在 TypeScript 中，当我们导入一个类型时其实并不需要额外的操作，和导入一个实际值是完全一样的：

```typescript
// foo.ts
export const Foo = () => {};

export type FooType = any;

// index.ts
import { Foo, FooType } from "./foo";
```

虽然类型导入和值导入存在于同一条导入语句中，在编译后的 JS 代码里还是只会有值导入存在，同时在编译的过程中，值与类型所在的内存空间也是分开的。

在这里我们只能通过名称来区分值和类型，但为每一个类型都加一个 Type 后缀也太奇怪了。实际上，我们可以更好地区分值导入和类型导入，只需要通过 `import type` 语法即可：

这样会造成导入语句数量激增，如果你想同时保持较少的导入语句数量又想区分值和类型导入，也可以使用同一导入语句内的方式（需要 4.6 版本以后才支持）：

```typescript
import { Foo, type FooType } from "./foo";
```

这实际上是我个人编码习惯的一部分，即 **对导入语句块的规范整理**。在大型项目中一个文件顶部有几十条导入语句是非常常见的，它们可能来自第三方库、UI库、项目内工具方法、样式文件、类型，项目内工具方法可能又分成 constants、hooks、utils、config  等等。如果将这些所有类型的导入都混乱地堆放在一起，对于后续的维护无疑是灾难。因此，我通常会将这些导入按照实际意义进行组织，顺序大致是这样：

- 一般最上面会是 React；
- 第三方 UI 组件，然后是项目内封装的其他组件；
- 第三方工具库，然后是项目内封装的工具方法，具体 hooks 和 utils 等分类的顺序可以按照自己偏好来；
- 类型导入，包括第三方库的类型导入、项目内的类型导入等；
- 样式文件，`CSS-IN-JS` 方案的组件应该被放在第二条中其他组件部分。

示例如下：

```typescript
import { useEffect } from 'react';

import { Button, Dialog } from 'ui';
import { ChildComp } from './child';

import { store } from '@/store'
import { useCookie } from '@/hooks/useCookie';
import { SOME_CONSTANTS } from '@/utils/constants';

import type { FC } from 'react';
import type { Foo } from '@/typings/foo';
import type { Shared } from '@/typings/shared';

import styles from './index.module.scss';
```

### 17.4 通过JSDoc 在 JS 文件中获得类型提示

在上面我们提到了可以在 JS 文件中通过 JSDoc 来标注变量类型，而既然有了类型标注，那么自然也能享受到像 TS 文件中一样的类型提示了。但这里我们需要使用更强大一些的 JSDoc 能力：在 `@type {}` 中使用导入语句！

以拥有海量配置项的 Webpack 为例：

```javascript
/** @type {import("webpack").Configuration} */
const config = {};

module.exports = config;
```

此时你会发现已经拥有了如臂使指的类型提示：

![image-20221011150620417](https://i.imgur.com/Rnq80dr.png)

类似的，也可以直接进行导出：

```javascript
module.exports = /** @type { import('webpack').Configuration } */ ({});
```

当然，Webpack 本身也支持通过 ts 文件进行配置，在使用 TS 进行配置时，一种方式是简单地使用它提供的类型作为一个对象的标注。而目前更常见的一种方式其实是框架内部提供 `defineConfig` 这样的方法，让你能直接获得类型提示，如 Vite 中的做法：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

## 18. React 中使用TypeScript：内置类型和泛型坑位

React 和 TypeScript 能进行非常紧密而自然的协作，毕竟 tsx 文件本质上也是一个 ts 文件，因此可以直接享受到  TypeScript 的类型检查能力。也因此，在 React 中使用 TypeScript 并没有非常复杂的地方，我们主要关注三个方面：**组件声明**、**泛型坑位**与**内置类型定义**，对于 React + TypeScript 的工程规范

**组件声明** 指的是我们声明一个 React 组件的方式。如何结合 TypeScript 来进行组件属性、返回元素的有效性检查？这些组件声明方式都存在哪些特殊用法？需要注意的是，我们只会介绍函数式组件相关，而不会有 Class 组件出现。

**泛型坑位** 即 React API  中预留出的泛型坑位，就像我们在前面学习的一样，这些泛型可以通过输入一个值来隐式推导，也可以直接显式声明来约束后续的值输入。而内置类型定义则主要是事件信息的类型定义以及内置工具类型两个部分，比如，在你的 onClick 函数中应当如何为参数声明类型？onChange 函数呢？

### 18.1 项目初始化

使用 Vite 来进行项目搭建，在终端输入以下代码：

```bash
npx create-vite
```

输入项目名，选择 `react-ts` 模板即可。最终的项目结构是这样的：

```bash
├── index.html
├── package.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── favicon.svg
│   ├── index.css
│   ├── logo.svg
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

当然，你也可以使用 Create-React-App、Parcel 等工具进行项目搭建，对于 Create-React-App 运行：

```bash
npm i create-react-app -g
create-react-app your-project --template=typescript
```

> 本质上，Vite、Create-React-App、Parcel 代表了三种不同思路的 Bundler，分别是基于浏览器 ESM 支持的 Bundleless 、大而全的 Webpack 以及零配置的 Parcel 。

### 18.2 项目配置

先不急着开始，我们先观察基于 Vite 创建的初始项目里都包含了哪些配置。

首先是依赖，可以看到在 devDependencies 中包含了 `@types/react` 与 `@types/react-dom` 。对于 `@types` 包的作用我们在前面一节已经了解过，TypeScript 会自动加载 `node_modules/@types` 下的类型定义来在全局使用。而除了这一点，当我们从 react 中导出一个类型：

```typescript
import { FC } from "react";
import type { FC } from "react";
```

实际上这个类型也来自于 `@types/react` 。接着是项目内的 `vite-env.d.ts` 声明文件，我们会发现它只有短短的一行：

```typescript
/// <reference types="vite/client" />
```

三斜线指令的作用我们在前面一节了解过，现在我们就看看 `vite/client` 中都包含了什么：

```typescript
/// <reference lib="dom" />
/// <reference path="./types/importMeta.d.ts" />

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
// ...

// CSS
declare module '*.css' {
  const css: string
  export default css
}
declare module '*.scss' {
  const css: string
  export default css
}
// ...


// Built-in asset types
// see `src/constants.ts`

// images
declare module '*.jpg' {
  const src: string
  export default src
}
// ...

// fonts
declare module '*.woff' {
  const src: string
  export default src
}

// ...
```

你会发现，其实这里面包含的就是对于非实际代码文件导入的类型定义，包括了 CSS Modules、图片、视频等类型，通过这里的类型封装，在你导入这些文件时就也能获得基本的类型保障。

三斜线指令并不是导入类型的唯一方式，我们前面也提到了，可以使用 import 的方式来导入类型：

```typescript
// vite-env.d.ts
import * as ViteClientEnv from 'vite/client';
// 或使用 import type
import type * as ViteClientEnv from 'vite/client';
```

类型定义包与类型声明其实就是这个脚手架所进行的额外工作，也是在日常开发中我们会重度依赖的部分。而除了这两者以外还有 tsconfig.json 相关配置，我们会在后面有专门的一节进行分析。

接下来，我们就开始学习如何在 React 中优雅地使用 TypeScript 。

### 18.3 组件声明

首先我们来想想，在 React 中如何声明一个（函数）组件。最简单的方式肯定是直接声明一个函数：

```tsx
const Container = () => {
  return <p>zxh</p>;
};
```

对于组件的 props 类型，我们可以就像在函数中标注参数类型一样：

```typescript
export interface IContainerProps {
  visible: boolean;
  controller: () => void;
}

const Container = (props: IContainerProps) => {
  return <p>zxh</p>;
};
```

属性默认值（defaultProps）也可以通过参数默认值的形式非常自然地进行声明：

```typescript
const Container = ({
  visible = false,
  controller = () => {},
}: IContainerProps) => {
  return <p>zxh</p>;
};
```

这么做看起来很朴素，但 TypeScript 仍然能把返回值类型推导出来，以上函数的类型可以被正确地推导为 `() => JSX.Element`。

但这样只能说明它是一个函数，并不能从类型层面上标明它是一个 React 组件，也无法约束它必须返回一个合法的组件。我们可以加上显式的类型标注来确保它返回一个有效组件：

```typescript
const Container = (): JSX.Element => {
  return <p>zxh</p>;
};
```

> JSX  是一个命名空间，来自于 `@types/react`。

除了这种方式， React 中还提供了 FC 这一类型来支持更精确的类型声明：

```tsx
import React from 'react';

export interface IContainerProps {
  visible: boolean;
  controller: () => void;
}

const Container: React.FC<IContainerProps> = ({
  visible = false,
  controller = () => {},
}: IContainerProps) => {
  return <p>zxh</p>;
};
```

FC 是 FunctionComponent 的缩写，而 FunctionComponent 同样被作为一个类型导出，其使用方式是一致的，接受的唯一泛型参数即为这个组件的属性类型。

> 其实还存在 StatelessComponent 、SFC 这两个同样指函数组件，使用方式也和 FC 一致的类型，但已经不推荐使用。

我们来看 FC 的声明是什么样的：

```typescript
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

可以看到，代表着属性类型的泛型参数 P 实际上就是直接传给了类型别名 PropsWithChildren ，而它其实就是为 Props 新增了一个 children 属性：

```typescript
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
```

也就是说我们连这个组件的 children 都约束了：

```tsx
const App = () => {
  return (
    <Container visible controller={() => {}}>
      <p>TypeScript + React!</p>
    </Container>
  );
};
```

但如果我们并不想这个组件接受 children，正如上面这个组件并没有消费 `props.children` ，此时应该怎么做？这就要说到，为什么在更严格的场景下其实不推荐使用 FC 了，请参考扩展阅读部分。

### 18.4 组件泛型

使用简单函数和使用 FC 的重要差异之一就在于，使用 FC 时你无法再使用组件泛型。组件泛型即指，为你的组件属性再次添加一个泛型，比如这样：

```tsx
import { PropsWithChildren } from 'react';

interface ICellProps<TData> {
  // 
  field: keyof TData;
}

const Cell = <T extends Record<string, any>>(
  props: PropsWithChildren<ICellProps<T>>
) => {
  return <p></p>;
};

interface IDataStruct {
  name: string;
  age: number;
}

const App = () => {
  return (
    <>
      <Cell<IDataStruct> field='name'></Cell>
      <Cell<IDataStruct> field='age'></Cell>
    </>
  );
};
```

在 Cell 组件中，其 field 属性在接口结构中约束为 `keyof TData`，如在 App 中使用时我们基于 IDataStruct 进行约束，此时 Cell 组件的 field 属性就 **只能传入 name 与 age 两个值**。也就是说，我们可以为这个组件显式声明泛型参数，来获得填充属性时的类型提示与检查。

但很明显，使用 FC 我们并不能做到这一点。

### 18.5 泛型坑位

常见的泛型坑位主要还是来自于日常使用最多的 Hooks

#### 18.5.1 useState

首先是 useState，可以由输入值隐式推导或者显式传入泛型：

```tsx
const Container = () => {
  // 推导为 string 类型
  const [state1, setState1] = useState('zxh');
  // 此时类型为 string | undefined
  const [state2, setState2] = useState<string>();
};
```

需要注意的是在显式传入泛型时，如果像上面的例子一样没有提供初始值，那么 state2 的类型实际上会是 `string | undefined`，这是因为在 useState 声明中对是否提供初始值的两种情况做了区分重载：

```typescript
// 提供了默认值
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

// 没有提供默认值
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```

另外一个常见的场景是对于在初始阶段是一个空对象的状态，你可能会使用断言来这么做：

```typescript
const [data, setData] = useState<IData>({} as IData);
```

这么做的坏处在于，后续的调用方中会认为这是一个完整实现了 IData 结构的对象，可能会出现遗漏的未赋值属性，此时你也可以使用 Partial 类型标记它为可选：

```typescript
const [data, setData] = useState<Partial<IData>>({});
```

如果你需要消费 useState 返回值的类型，可以搭配 ReturnType：

```typescript
// 相当于 useState(0) 的返回值类型
type State = ReturnType<typeof useState<number>>;
```

#### 18.5.2 useCallback 和 useMemo

然后是 useCallback 与 useMemo，它们的泛型参数分别表示包裹的函数和计算产物，使用方式类似，也分为 **隐式推导** 与 **显式提供** 两种：

```typescript
const Container = () => {
  // 泛型推导为 (input: number) => boolean
  const handler1 = useCallback((input: number) => {
    return input > 599;
  }, []);

  // 显式提供为 (input: number, compare: boolean) => boolean
  const handler2 = useCallback<(input: number, compare: boolean) => boolean>(
    (input: number) => {
      return input > 599;
    },
    []
  );
  
  // 推导为 string
  const result1 = useMemo(() => {
    return 'some-expensive-process';
  }, []);

  // 显式提供
  const result2 = useMemo<{ name?: string }>(() => {
    return {};
  }, []);
};
```

通常情况下，我们不会主动为 `useCallback` 提供泛型参数，因为其传入的函数往往已经确定。而为 `useMemo` 提供泛型参数则要常见一些，因为我们可能希望通过这种方式来约束 `useMemo` 最后的返回值。

#### 18.5.3 useReducer

`useReducer` 可以被视为更复杂一些的 `useState`，它们关注的都是数据的变化。不同的是 `useReducer` 中只能由  `reducer` 按照特定的 `action` 来修改数据，但 `useState` 则可以随意修改。`useReducer` 有三个泛型坑位，分别为

- `reducer` 函数的类型签名
- 数据的结构
- 初始值的计算函数

```typescript
import { useReducer } from 'react';

const initialState = { count: 0 };

type Actions =
  | {
      type: 'inc';
      payload: {
        count: number;
        max?: number;
      };
    }
  | {
      type: 'dec';
      payload: {
        count: number;
        min?: number;
      };
    };

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case 'inc':
      return {
        count: action.payload.max
          ? Math.min(state.count + action.payload.count, action.payload.max)
          : state.count + action.payload.count,
      };
    case 'dec':
      return {
        count: action.payload.min
          ? Math.max(state.count + action.payload.count, action.payload.min)
          : state.count - action.payload.count,
      };
    default:
      throw new Error('Unexpected Action Received.');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button
        onClick={() =>
          dispatch({ type: 'dec', payload: { count: 599, min: 0 } })
        }
      >
        -(min: 0)
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'inc',
            payload: {
              count: 599,
              max: 599,
            },
          })
        }
      >
        +(max: 599)
      </button>
    </>
  );
}
```

在上面的例子中，useReducer 的泛型参数分别被填充为 reducer 函数的类型签名，以及其初始状态：

```typescript
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;

function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```

分析一下这里的填充：R 被填充为了一整个函数类型，而 `ReducerState<R>` 实际上就是提取了 reducer 中代表 state 的参数，即状态的类型，在这里即是 `{ count: number }` 这么一个结构。

需要注意的是，在 reducer 中其实也应用了我们此前提到过的**可辨识联合类型概念**，这里的 `action.type` 即为可辨识属性，通过 type 判断，我们就能在每一个 case 语句中获得联合类型对应分支的类型。

#### 18.5.4 useRef 与 useImperativeHandle

useRef 的常见使用场景主要包括两种，存储一个 DOM 元素引用和持久化保存一个值。这两者情况对应的类型其实也是不同的：

```typescript
onst Container = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<number>(599);

  const operateRef = () => {
    domRef.current?.getBoundingClientRect();
    valueRef.current += 1;
  };

  return (
    <div ref={domRef}>
      <p>zxh</p>
    </div>
  );
};
```

对于 domRef，此时其类型（current）会被推断为 `RefObject<HTMLDivElement>`，而 valueRef 的值类型则为 `MutableRefObject<number>`，这是完全符合预期的。因为我们并不会去修改挂载了 DOM 引用的 ref，而确实会修改值引用的 ref ，所以后者会是 Mutable 的。

然而实际上，这一差异并不是通过判断是否被应用在了 DOM 引用来实现的（也不需要做到如此智能），从 useRef 的类型定义可以看出，对于初始值为 null 的 useRef，其类型均会被推导为 RefObject：

```typescript
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

> HTMLDivElement 这一类型来自于 TypeScript 内置，在使用 ref 来引用 DOM  元素时，你应当使用尽可能精确的元素类型，如 HTMLInputElement、HTMLIFrameElement 等，而不是  HTMLElement 这样宽泛的定义，因为这些精确元素定义的内部封装了更加具体的类型定义，包括 HTML 属性、事件入参等。

对于 `useImperativeHandle` ，可能很多同学并不熟悉，可以参考 [useRef 三兄弟](https://juejin.cn/post/6888616874171432973) 这篇文章来了解具体使用。简单地说，这个 hook 接受一个 ref 、一个函数、一个依赖数组。这个函数的返回值会被挂载到 ref 上，常见的使用方式是用于实现**父组件调用子组件方法**：子组件将自己的方法挂载到 ref 后，父组件就可以通过 ref 来调用此方法。

我们来看具体的例子而后依次讲解：

```typescript
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

interface IRefPayload {
  controller: () => void;
}

const Parent = () => {
  const childRef = useRef<IRefPayload>(null);

  const invokeController = () => {
    childRef.current?.controller();
  };

  return (
    <>
      <Child ref={childRef} />
      <button onClick={invokeController}>invoke controller!</button>
    </>
  );
};

interface IChildPropStruct {}

interface IExtendedRefPayload extends IRefPayload {
  disposer: () => void;
}

const Child = forwardRef<IRefPayload, IChildPropStruct>((props, ref) => {
  const internalController = () => {
    console.log('Internal Controller!');
  };

  useImperativeHandle<IRefPayload, IExtendedRefPayload>(
    ref,
    () => {
      return {
        controller: internalController,
        disposer: () => {},
      };
    },
    []
  );

  return <p></p>;
});
```

- IRefPayload 描述了我们将会在 ref 上挂载的对象结构。
- 在函数组件中，接受 ref 的函数组件（子组件）需要被 forwardRef 包裹才能正确接收到 ref 对象，其接受两个泛型参数，分别为 ref 的类型与此组件的属性类型。
- useImperativeHandle 中传入了 ref 以及一个返回两个方法的函数，它具有两个泛型参数，分别从传入的 ref 以及函数的返回值类型中进行类型推导。在这里我们显式传入了与推导不一致的第二个泛型参数，以此提供了额外的返回值类型检查。

useImperativeHandle 并非常用的 hook，但在某些场景下也确实有奇效。

除了以上介绍的这些 hooks 以外，还有 useContext、useEffect 等常用的 hooks，但它们或是过于简单或是不存在泛型坑位。

### 18.6 常用内置类型定义

除了上面介绍的泛型坑位以外，在 React 中想要用好 TypeScript 的另一个关键因素就是使用 `@types/react` 提供的类型定义，最常见的就是事件类型，比如输入框值变化时的 ChangeEvent 和鼠标事件通用的 MouseEvent：

```typescript
import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

const Container = () => {
  const [v, setV] = useState('linbudu');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <input value={v} onChange={handleChange} />
      <button onClick={handleClick}>Click me!</button>
    </>
  );
};
```

需要注意的是，ChangeEvent 和 MouseEvent 上还具有一个泛型坑位，用于指定发生此事件的元素类型，我们可以在这里进一步传入 **HTMLButtonElement** 这样更精确的元素类型获得更严格的类型检查。

除了使用 ChangeEvent 作为参数类型，React 还提供了整个函数的类型签名，如 ChangeEventHandler：

```typescript
const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {};
```

由于上下文类型的存在，此时就无需再为 e 声明类型了，它会自动被推导为 `ChangeEvent<HTMLInputElement>` 。

类似的事件定义还有非常多，如 FormEvent、TouchEvent、DragEvent 等，但无需对所有定义都了解，在实际用到时再去导入即可。需要注意的是，由于 InputEvent [并非在所有浏览器都得到了支持](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FInputEvent)，因此并不存在对应的类型定义，你可以使用 KeyboardEvent 来代替。

除了这些事件类型以外，还有一个常见的类型是在你声明组件属性中的样式时会用到的，那就是 CSSProperties ，它描述了所有的 CSS 属性及对应的属性值类型，你也可以直接用它来检查 CSS 样式时的值：

```typescript
import type { CSSProperties } from 'react';

export interface IContainerProps {
  style: CSSProperties;
}

const css: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const Container = ({ style }: IContainerProps) => {
  return <p style={style}>林不渡！</p>;
};
```

### 18.7 其他内置类型

#### 18.7.1 ComponentProps

当你基于原生 HTML 元素去封装组件时，通常会需要将这个原生元素的所有 HTML 属性都保留下来作为组件的属性，此时你肯定不能一个个声明所有属性，那么就可以使用 ComponentProps 来提取出一个元素上所有的属性：

```typescript
import type { ComponentProps } from 'react';

interface IButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'large';
  link?: boolean;
}
const Button = (props: IButtonProps) => {
  return <button {...props} >{props.children}</button>;
};
```

除了对原生 DOM 元素使用以外，这一用法在使用组件库时也有奇效，比如组件库只导出了这个组件而没有导出这个组件的属性类型定义，而我们又需要基于这个组件进行定制封装，此时就可以使用 ComponentProps 去提取它的属性类型：

```typescript
import { Button } from "ui-lib";
import type { ComponentProps } from 'react';

interface IButtonProps extends ComponentProps<Button> {
  display: boolean;
}
const EnhancedButton = (props: IButtonProps) => {
  return <Button {...props} >{props.children}</Button>;
};
```

> 由于 React 中 ref 的存在，有些时候我们会希望区分组件使用 ref 和没使用 ref 的情况，此时可以使用内置类型  ComponentPropsWithRef 或 ComponentPropsWithoutRef ，其使用方式与 ComponentProps  一致。

ComponentProps 也可以用来提取一个 React 组件的属性类型，其内部实现对 HTML 元素和 React 组件这两种情况也做了区分：

```typescript
type ComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> =
  // React 组件
  T extends JSXElementConstructor<infer P>
    ? P
    : // HTML 元素
    T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {};
```

#### 18.7.2 ReactElement 与 ReactNode

ReactElement 与 ReactNode 这两个类型：

```typescript
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
}
```

ReactElement 是 createElement、cloneElement 等 factory 方法的返回值类型，它本质上指的是一个有效的 JSX 元素，即 `JSX.Element`。而 ReactNode 可以认为包含了 ReactElement ，它还包含 null、undefined 以及 ReactFragment 等一些特殊的部分，其类型定义如下：

```typescript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

### 18.8 其他工程实践

#### 18.8.1 项目中的类型声明文件

在实际应用中使用 TypeScript 进行开发时，我们往往需要大量的类型代码，而如何存放这些类型代码，其实就需要预先有一个明确的规范。目前我使用的方式是，在项目中使用一个专门的文件夹存放类型代码，其中又按照这些类型的作用进行了划分，其分布大致是这样的：

```text
PROJECT
├── src
│   ├── types
│   │   ├── shared.ts
│   │   ├── [biz].ts
│   │   ├── request.ts
│   │   ├── tool.ts
│   ├── typings.d.ts
└── tsconfig.json
```

`shared.ts`，被其他类型定义所使用的类型，如简单的联合类型封装、简单的结构工具类型等。

`[biz].ts`，与业务逻辑对应的类型定义，比如 `user.ts` `module.ts` 等，推荐的方式是在中大型项目中尽可能按照业务模型来进行细粒度的拆分。

`request.ts`，请求相关的类型定义，推荐的方式是定义响应结构体，然后使用 biz 中的业务逻辑类型定义进行填充：

```typescript
import type { Status } from "./shared";

export interface IRequestStruct<TData = never> {
    status: Status;
    code: number;
    data: TData;
}

export interface IPaginationRequestStruct<TData = never> {
    status: Status;
    curPage: number;
    totalCount: number;
    hasNextPage: boolean;
    data: TData[];
}
```

实际使用时：

实际使用时：

```typescript
import type { IPaginationRequestStruct } from "@/types/request";
import type { IUserProfile } from "@/types/user";

export function fetchUserList: Promise<IPaginationRequestStruct<IUserProfile>> {}
```

- 通过这种方式，你的类型代定义之间就能够建立起清晰的、和业务逻辑一致的引用关系。
- `tool.ts`，工具类型定义，一般是推荐把比较通用的工具类型抽离到专门的工具类型库中，这里只存放使用场景特殊的部分。
- `typings.d.ts`，全局的类型声明，包括非代码文件的导入、无类型 npm 包的类型声明、全局变量的类型定义等等，你也可以进一步拆分为 `env.d.ts` `runtime.d.ts` `module.d.ts` 等数个各司其职的声明文件。

在实际场景中，这一规范的粒度并不一定能够满足你的需要，但你仍然可以按照这一思路进行类型定义的梳理和妥善放置。另外，我们并不需要将所有的类型定义都专门放到这个文件夹里，比如仅被组件自身消费的类型就应该使用就近原则，直接和组件代码一起即可。

#### 18.8.2 组件与组件类型

在 React  父子组件中一个常见的场景是，父组件导入各个子组件，传递属性时会进行额外的数据处理，其结果的类型被这多个子组件共享，而这个类型又仅被父子组件消费，不应当放在全局的类型定义中。此时我推荐的方式是，将这个类型定义在父组件中，子组件使用仅类型导入去导入这个类型，由于值空间与类型空间是隔离的，因此我们并不需要担心循环引用：

```typescript
// Parent.tsx

import { ChildA } from "./ChildA";
import { ChildB } from "./ChildB";
import { ChildC } from "./ChildC";

//  被多个子组件消费的类型
export interface ISpecialDataStruct {}

const Parent = () => {
  const data: ISpecialDataStruct = {};

  return (
    <>
    <ChildA inputA={data} />
    <ChildB inputB={data} />
    <ChildC inputC={data} />
    </>
  )
}

// ChildA.tsx
import type { ISpecialDataStruct } from "./parent";

interface IAProp {
  inputA: ISpecialDataStruct;
}

export const ChildA: FC<IAProp> = (props) => {
  // ...
}
```

### 18.9 FC 并不是完美的

在前面组件声明部分我们已经了解了使用函数声明组件，以及使用 FC 声明组件的两种形式，也明确了主要差异：

- 函数声明组件需要额外的返回值类型标注（`JSX.Element`）才能校验组件合法，并且可以再使用组件泛型来进一步确保类型安全。
- FC 可以简化函数的声明，但是无法使用组件泛型。

在这一部分，我们再来了解下这两者更多的差异，以及为什么说 FC 并不是完美的 （举例来说，在 Create-React-App 的最新模板代码里，已经不再使用 FC 了）。

我们再来看一看 FC 的类型定义：

```typescript
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
}
```

你会发现 FC 的属性中是默认包含了 children 这一属性的（对应到 Vue 中则是插槽 slot 的概念），但并不是所有时候我们的组件都会包含一个 children：

```typescript
const App = () => {
  return (
    <>
      <ContainerWithoutChildren />
      <ContainerWithChildren>linbudu</ContainerWithChildren>
    </>
  );
};
```

如果你为 ContainerWithoutChildren 也传入了 children，虽然不会报错，但这个 children 实际上并不会渲染出来。

如果想让代码尽可能精准，实际上我们应该区分这两种情况，即组件是否会接受 children 并消费。而在 FC 中并没有进行区分，因此  React 中又提供了 VFC，即 VoidFunctionComponent ，它和 FC 的区别就在于属性中不包含 children：

```typescript
type VFC<P = {}> = VoidFunctionComponent<P>;

interface VoidFunctionComponent<P = {}> {
  (props: P, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

> 在 `@types/react` 18 版本后， FC 内部不再隐式包含 children 属性，因此 VFC 也就不再推荐使用。

在组件库中还有一个常见场景，即我们使用组件同时作为命名空间，如 `Table.Column`，`Form.Item` 这样，如果使用 FC，你需要使用交叉类型补充上这些命名空间内的子组件：

```typescript
import * as React from 'react';

const Table: React.FC<{}> & {
  Column: React.FC<IColumnProps>;
} = () => {
  return <></>;
};

interface IColumnProps {}

const Column: React.FC<IColumnProps> = () => {
  return <></>;
};

Table.Column = Column;
```

但对于简单函数来说就不需要如此：

```typescript
const Table = (): JSX.Element => {
  return <></>;
};

interface IColumnProps {}

const Column = (props: IColumnProps): JSX.Element => {
  return <></>;
};

Table.Column = Column;
```

在这种情况下我们并不需要通过额外的类型标注，因为我们就只是简单地把一个组件挂到这个组件的属性上。

总的来说，FC 并不是在所有场景都能完美胜任的，当然除了上面提到的缺点以外，FC 也是有着一定优点的，如它还提供了  defaultProps、displayName 等一系列合法的 React 属性声明。而我的意见则是不使用  FC，直接使用简单函数和返回值标注的方式，这样一来你的函数组件就能够完全享受到作为一个函数的额外能力，包括但不限于泛型等等。

## 19. 使用 ESlint 来约束 TypeScript 代码

> 关于 ESLint  是什么，我想应该没有过多介绍的必要，即使你没有主动了解过它，也一定被动接触过。它带给你的印象并不一定很好，有可能是满屏的红色波浪线，也可能是成千上万条的报错输出。但你可能也很享受经过 ESLint 检查与格式化后工工整整的代码，那简直叫一个赏心悦目。
>
> 对于 ESLint ，我认为它就是现代前端工程必备的一样工具，无论是简单的寥寥几行配置，还是精心挑选了最适合自己或者团队风格的规则集，它都是不可缺少的一环。ESLint 的作用其实可以划分为两个部分：**风格统一**与**代码优化**。
>
> 风格统一不必多说，单双引号、缩进、逗号等编码风格的统一十分有必要，看到一会单引号一会双引号的代码，很难不怀疑作者的代码水平。而代码优化则就是一个比较宽泛的概念了，它可以指**让你的代码更简洁**，比如不允许未使用的变量，也可以指**让你的代码更严谨**，比如不允许未声明的全局变量。很多人可能存在一个误区，即认为 ESLint 只会要求减少代码，但实际上在很多场景，尤其是在 TypeScript 场景下，很多时候 ESLint 反而会要求你写**更多的代码**，如要求你为函数的返回值显式声明类型等等。
>
> 实际上，这也是 Lint 工具的核心功能，我们后面会介绍的 Prettier 也是（但 Prettier 只关心风格统一部分），我们希望通过一种**自动化的、存在确定规范**的方式，来提升项目中的代码质量。接下来，我们会了解如何配置 ESLint，如何进一步提升工程的约束能力，以及 TypeScript ESLint 下的规则集介绍。

### 19.1 基本的ESLint配置

最简单的方式就是通过 ESLint 自带的初始化功能，然后回答一系列问题即可。

```bash
npx eslint --init
npm init @eslint/config
```

![image-20221013124357884](https://i.imgur.com/7ljNrGg.png)

如果你选择了使用 TypeScript，它会自动为你安装 `@typescript-eslint/` 一系列工具。比如上面我们最终安装了这些依赖：

![image-20221013124437334](https://i.imgur.com/e2xXLXS.png)

对于已有 ESLint 配置的项目，如果要配置 TypeScript ESLint 其实也很简单，安装以下依赖：

```bash
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```

然后更改你的 ESLint 配置：

```typescript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    // ...其他已有的配置
    'plugin:@typescript-eslint/recommended',
  ],
};
```

由于部分 TS ESLint 的规则和 ESLint 中基础的规则有冲突，我们需要修改配置文件的规则，最终的基本示例如下：

```js
module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

> Indent 这条规则有一个需要注意的地方，其配置项还可以是 `'tab'` `'space'` 等，如果你把上面的 2 改成 `'tab'`，大概率项目中会出现巨量报错，如 *Expected indentation of 1 tab but found 2 spaces*。这是因为 Tab 和 Space 并不是等价的，也和你的编辑器配置有关。而我们这里的 2 ，其具体意义为 2 spaces。

完成配置后，我们需要确定接受 ESLint 检查的项目文件，我个人的习惯是只让 ESLint 检查核心代码文件，包括 js/jsx，ts/tsx 文件。因此我们需要忽略掉部分文件，创建 `.eslintignore` 文件：

```ini
*.json
*.html
*rc.js
*.svg
*.css
```

在 package.json 中的 scripts 中添加以下命令：

```json
{
  "scripts": {
    "eslint": "eslint src/** --ext .js, .jsx, .ts, .tsx --cache",
    "eslint:fix": "npm run eslint -- --fix"
  },
}
```

`npm run eslint` 即是仅检查，而 `eslint:fix` 则是检查同时尽可能修复错误。这样我们就完成了基础的 TypeScript ESLint 配置。但在实际项目中，光靠 ESLint 可没法确保代码质量。

### 19.2 配置 Prettier 与 Git Hooks

通常在实际项目开发时，我们并不会仅仅使用 ESLint，还有一系列辅助的工具。比如我们可以同时使用 Prettier 与  ESLint，以及使用 Git Hooks 与 Lint Staged 确保项目代码在提交前被格式化过。这一部分我们就来介绍在 ESLint  基础上再添加 Prettier 与 Git Hooks。

首先是 Prettier，它同样是代码格式化工具，但和 ESLint 并不完全等价。除 JS/TS 代码文件以外，Prettier 也支持 CSS、Less 这样的样式文件，DSL 声明如 HTML、GraphQL 等等。我个人的习惯是将除核心代码文件以外的部分，如  JSON、HTML、MarkDown 等全交给 Prettier 进行格式化。

对于 JS/TS 文件，Prettier 与 ESLint 的核心差异在于它并不包括 `no-xxx`（不允许某些语法），`prefer-xxx`（对于多种功能一致的语法，推荐使用其中某一种）这些**涉及具体代码逻辑**的规则，而是专注于 indent、quote、comma（逗号）、printWidth（每行允许的字符串长度） 等规则。

首先安装 Prettier，如果你想要让 Prettier 也参与格式化代码文件，还需要安装 eslint-config-prettier ，这一配置包禁用了部分 ESLint 中会与 Prettier 产生冲突的规则。

```bash
npm install prettier eslint-config-prettier --save-dev
yarn add prettier eslint-config-prettier --save-dev
pnpm install prettier eslint-config-prettier --save-dev
```

创建 Prettier 配置文件 .prettierrc.js，我们选择一小部分常用的：

```js
module.exports = {
  // 单行最多 80 字符
  printWidth: 80,
  // 一个 Tab 缩进 2 个空格
  tabWidth: 2,
  // 每一行结尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 在对象属性中，仅在必要时才使用引号，如 "prop-foo"
  quoteProps: "as-needed",
  // 在 jsx 中使用双引号
  jsxSingleQuote: false,
  // 使用 es5 风格的尾缀逗号，即数组和对象的最后一项成员后也需要逗号
  trailingComma: "es5",
  // 大括号内首尾需要空格
  bracketSpacing: true,
  // HTML 标签（以及 JSX，Vue 模板等）的反尖括号 > 需要换行
  bracketSameLine: false,
  // 箭头函数仅有一个参数时也需要括号，如 (arg) => {}
  // 使用 crlf 作为换行符
  endOfLine: "crlf",
};
```

关于更多配置，参见 [Prettier 配置](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html)。

同时为了避免和 ESLint 冲突，我们还需要通过 `eslint-config-prettier` 禁用掉部分 ESLint 规则，修改 ESLint 配置：

```js
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 新增这一行
  ],
};
```

创建忽略文件 .prettierignore：

```init
build
dist
out
# 如果你不希望 prettier 检查代码文件的话
# *.ts
# *.tsx
# *.jsx
# *.js
```

同时更新 NPM Scripts：

```json
{
  "scripts": {
    "eslint": "eslint src/** --no-error-on-unmatched-pattern --ext .js, .jsx, .ts, .tsx --cache",
    "eslint:fix": "npm run eslint -- --fix",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write .",
    "lint": "npm run eslint && npm run prettier",
    "lint:fix": "npm run eslint:fix && npm run prettier:fix"
  },
}
```

类似的，`npm run prettier` 是仅检查，而 `prettier:fix` 才是进入修改。同时我们还增加了 `lint` 和 `lint:fix` 来一次性执行两个工具。

即使配置了 ESLint 和 Prettier，还是可能出现每个人提交代码都不一样的情况。这是因为这些 scripts  需要手动执行，非常容易忘记或者绕过去。而如果我们能让所有开发同学每次提交代码时都自动执行一次格式化，就能确保所有人成功提交上去的代码风格一致。

要实现这一能力，我们需要 Git Hooks 与 Lint Staged。

首先是 Git Hooks，它和 React Hooks 可不一样，它更贴近生命周期的概念，即在某一个操作前后执行的额外逻辑。如我们要实现在 commit 前格式化，就可以使用 `pre-commit` 这个钩子，如果钩子执行失败，就不会真地执行 commit 。常用的 Git Hooks 还有 `commit-msg`（可以用于检查 commit 信息是否规范，如需要符合 `feat(core): enhancement` 这种格式）、`pre-push`以及在服务端 Git 仓库执行的 `pre-receive`、`update`、 `post-receive` 等。

直接写 Git Hooks 不太优雅，我们可以通过 [Husky](https://link.juejin.cn?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F) 来实现相对简便的配置。关于各种初始化方式，你可以阅读文档了解更多，我们这里只介绍自动安装的方式：

```bash
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

这样做只是安装了 Huksy 以及配置了相关环境，我们实际上还没有添加 Git Hooks。Huksy 也提供了快速创建的方式，我们直接把后面要执行的命令先添加进来：

```bash
npx husky add .husky/pre-commit './node_modules/.bin/lint-staged'
```

现在你应该拥有了一个 .huksy 文件夹，以及内部的 pre-commit 文件：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

./node_modules/.bin/lint-staged
```

可以看到，我们实际上要执行的就是 lint-staged 这个命令，而 Lint Staged 的作用即是**找出你添加到暂存区（git add）的文件，然后执行对应的 lint**，接着我们来学习如何将它添加到项目里。

首先还是安装：

```bash
npm install --save-dev lint-staged
yarn add --save-dev lint-staged
pnpm install --save-dev lint-staged
```

然后在 package.json 中新增这段配置：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --cache --fix",
      "prettier --write --list-different"
    ],
    "*.{json,md,html,css,scss,sass,less,styl}": [
      "prettier --write --list-different"
    ]
  },
}
```

这段配置的大意是，对于暂存区的核心代码文件，先使用 ESLint 格式化，再使用 Prettier 格式化，而对于其他文件，统一使用 Prettier 进行格式化。现在你可以试着提交一次了：

![image-20221013124544055](https://i.imgur.com/97rGYFT.png)

加上 Prettier、Git Hooks 与 Lint Staged 后，我们的项目约束才能说基本搞定了。虽然 Git Hooks 也可以通过 `git commit -m 'xx' --no-verify`  这种方式绕过去，但至少现在我们有办法让大家提交的代码都一致了，不用再被格式化导致的冲突折磨了。但我们并不应该满足于知道如何配置，也需要理解这些配置的原理，以及内部都包含了什么。比如，Husky 是如何简化 Git Hooks 配置的？Lint Staged 是如何工作的？

在接下来，我们会介绍一批 TypeScript 下的 ESLint 规则，了解它们的作用，以及我们为什么需要这些规则。

### 19.3 TypeScript 下的 ESLint 规则集推荐

在前面我们只是介绍了如何配置 ESLint 相关的工程，还没有具体介绍 TypeScript 下应使用哪些 ESLint  规则。为了帮助你更好地挑选适用于自己需要的规则，接下来我们会来介绍一批推荐使用的 TypeScript ESLint  规则，包括其意图（如何约束代码）与配置等。我也简单对这些规则做了分类：基础版与进阶版，基础版为约束程度较低的规则，而进阶版则较为严格。

如果你想直接使用现成的配置，我也将下面介绍的规则发布到了 npm，首先安装配置集：

```typescript
npm i eslint-config-ts-ruleset --save--dev
yarn add eslint-config-ts-ruleset --save--dev
pnpm i eslint-config-ts-ruleset --save--dev
```

然后在 ESLint 配置中启用：

```javascript
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 基础规则
    'ts-ruleset',
    // 严格规则
    'ts-ruleset/strict',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
```

TypeScript ESLint 规则主要由四个部分组成：

- 仅在 ESLint 约束基础上支持了 TypeScript 语法解析，如缩进 indent、单双引号 quote、逗号 comma 等，这些规则我们不会做额外介绍，因为已经被包含在  `'plugin:@typescript-eslint/recommended'` 中
- 对语法的统一约束，比如类型断言有 as 和尖括号两种，可以通过规则来约束只能使用一种断言语法。以及对于某些对实际逻辑无影响，可加可不加的语法约束，如 for 循环和 `for...of` 的比较 。
- 对类型标注的约束，如禁止某些类型被用于进行标注，以及在函数返回值处要求你显式标注类型等
- 对能力的约束，如对于仅类型导入、类型声明的约束，以及非空断言、常量断言等功能的使用

基础部分的规则多是简单的语法检查和类型检查，因此我们就不做讲解。接下来我们会来了解的是严格规则组内的规则，我们进一步将其划分为**一般严格**与**较为严格**。

#### 19.3.1 一般严格要求组

## 20. 全链路 TypeScript 工具库

## 21. TypeScript 和 ECMAScript

## 22. 装饰器与反射元数据

### 22.1 装饰器

> 装饰器语法在 Python、Java 等语言中都能见到，但在 JavaScript  中并没有被大量使用。一方面是因为，装饰器其实还不能被称为 JavaScript 的一部分，另一方面则是它对应用场景有着一定要求，比如只能使用在  Class 上，而 Class 并不是 JavaScript 中大量使用的语法。
>
> 至于为什么说装饰器还不是 JavaScript 的一部分，我们会在扩展阅读中介绍更多。这一节我们只关注 TypeScript 中的装饰器，从基础语法到不同种类的装饰器，从反射到反射元数据，再到基于这些概念实现依赖注入、IoC 容器等等。



- 首先我们需要明确的是，**装饰器的本质其实就是一个函数**，只不过它的入参是提前确定好的。

- 同时，TypeScript 中的装饰器目前 **只能在类以及类成员上使用**。

装饰器通过 `@` 语法来使用：

```typescript
function Deco() { }

@Deco
class Foo {}
```

这样的装饰器只能起到固定的功能，我们实际上使用更多的是 Decorator Factory，即装饰器工厂的形式：

```typescript
function Deco() { 
  return () => {}
}

@Deco()
class Foo {}
```

在这种情况下，程序执行时会先执行 `Deco()` ，再用内部返回的函数作为装饰器的实际逻辑。这样，我们就可以通过入参来灵活地调整装饰器的作用。接下来，我们就来学习一下 TypeScript 中的装饰器是如何使用的，它们分别有什么作用？

TypeScript 中的装饰器可以分为

- **类装饰器**
- **方法装饰器**
- **属性装饰器**
- **访问符装饰器**
- **参数装饰器**

五种，最常见的主要还是 **类装饰器、方法装饰器以及属性装饰器**。

#### 22.1.1 类装饰器

**类装饰器是直接作用在类上的装饰器，它在执行时的入参只有一个，那就是这个类本身（而不是类的原型对象）。** 

因此，我们可以通过类装饰器来覆盖类的属性与方法，如果你在类装饰器中返回一个新的类，它甚至可以篡改掉整个类的实现。

```typescript
function AddMethod(): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceMethod = () => {
      console.log("lets add a new instance method");
    };
    target.newStaticMethod = () => {
      console.log("lets add a new static method");
    };
  };
}

function AddProperty(value: string): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceProperty = value;
    target.newStaticProperty = `static ${value}`;
  };
}

@AddProperty("zxh")
@AddMethod()
class Foo {
  a = 1;
}
```

这里，我们通过 TypeScript 内置的 `ClassDecorator`  类型定义来进行类型标注，由于类装饰器只有一个参数，我们也不想使用过多的类型代码，这里我就直接 `any` 了。我们的函数返回了一个  `ClassDecorator` ，因此这个装饰器就是一个 `Decorator Factory`，在实际执行时需要以 `@Deco()` 的形式调用。

在 `AddMethod` 与 `AddProperty` 方法中，我们分别在` target`、`target.prototype` 上添加了方法与属性，还记得 ES6 中 Class 的本质仍然是基于原型的吗？在这里 `target` 上的属性实际上是 **静态成员**，也就是其实例上不会获得的方法，而 `target.prototype` 上的属性才是会随着继承与实例化过程被传递的 **实例成员**。

```typescript
const foo: any = new Foo();

foo.newInstanceMethod();
(<any>Foo).newStaticMethod();

console.log(foo.newInstanceProperty);
console.log((<any>Foo).newStaticProperty);
```

```bash
Let's add a new instance method!
Let's add a new static method!
zxh
static zxh
```

我们在这里调用的方法并没有直接在 Foo 中定义，而是通过装饰器来强行添加！我们也可以在装饰中返回一个子类：

```typescript
const OverrideBar = (target: any) => {
  return class extends target {
    print() {}
    overridedPrint() {
      console.log('This is Overrided Bar!');
    }
  };
};

@OverrideBar
class Bar {
  print() {
    console.log('This is Bar!');
  }
}

// 被覆盖了，现在是一个空方法
new Bar().print();

// This is Overrided Bar!
(<any>new Bar()).overridedPrint();
```

在 React Class 组件时代，其实你会发现有许多功能也是通过装饰器实现的。如 Mobx 的 `@observer` 与 `@observable`，React-Redux 的 `@connect` 等。

#### 22.1.2 方法装饰器

方法装饰器的入参包括 **类的原型**、**方法名** 以及 **方法的属性描述符**（PropertyDescriptor），而通过属性描述符你可以控制这个方法的内部实现（即 value）、可变性（即 writable）等信息。

能拿到原本实现，也就意味着，我们可以在执行原本方法的同时，插入一段新的逻辑，比如计算这个方法的执行耗时：

```typescript
function ComputeProfiler(): MethodDecorator {
  const start = new Date();
  return (
    _target,
    methodIdentifier,
    decriptor: TypedPropertyDescriptor<any>
  ) => {
    const originalMethodImpl = decriptor.value!;
    decriptor.value = async function (...args: unknown[]) {
      const res = await originalMethodImpl(this, args);
      const end = new Date();
      console.log(
        `${String(methodIdentifier)} Time:`,
        end.getTime() - start.getTime()
      );

      return res;
    };
  };
}

class Foooo {
  @ComputeProfiler()
  async fetch() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("res");
      }, 3000);
    });
  }
}

(async () => {
  console.log(await new Foooo().fetch());
})();
```

```text
fetch Time:  3003
RES
```

需要注意的是，方法装饰器的 target 是**类的原型而非类本身**。

> 运算 `x!` 产生一个不包含 `null` 和 `undefined` 的 `x` 的值。
>
> ```typescript
> function sayHello(hello: string | undefined) {
>   const hi1 = hello!.toLowerCase() // OK
>   const hi2 = hello.toLowerCase() // Error: Object is possibly 'undefined'
> }
> ```

#### 22.1.3 访问符装饰器

访问符装饰器并不常见，甚至访问符对于部分同学来说也是陌生的，但它其实就是 `get value(){}` 与 `set value(v)=>{}` 这样的方法，其中 getter 在你访问这个属性 `value` 时触发，而 setter 在你对 `value` 进行赋值时触发。访问符装饰器本质上仍然是方法装饰器，它们使用的类型定义也相同。

需要注意的是，**访问符装饰器只能同时应用在一对 `getter / setter` 的其中一个，即要么装饰 `getter` 要么装饰 `setter` 。** 这是因为，不论你是装饰哪一个，装饰器入参中的属性描述符都会包括 `getter` 与 `setter` 方法：

```typescript
function HajackSetter(val: string): MethodDecorator {
  return (target, methodIdentifier, descriptor: any) => {
    const originalSetter = descriptor.set;
    descriptor.set = function (newValue: string) {
      const composed = `Raw: ${newValue}, Actual: ${val}-${newValue}`;
      originalSetter.call(this, composed);
      console.log(`HijackSetter: ${composed}`);
    };

    descriptor.get = function () {
      return val;
    };
  };
}

class Baz {
  _value!: string;

  get value() {
    return this._value;
  }

  @HajackSetter("Z_X_H")
  set value(input: string) {
    this._value = input;
  }
}

const baz = new Baz();
baz.value = "zxh";
```

在这个例子中，我们通过装饰器劫持了 setter ，在执行原本的 setter 方法修改了其参数。同时，我们也可以在这里去劫持 getter（`descriptor.get`），这样一来在读取这个值时，会直接返回一个我们固定好的值，而非其实际的值（如被 setter 更新过的）

#### 22.1.4 属性装饰器

属性装饰器在独立使用时能力非常有限，它的入参只有 **类的原型** 与 **属性名称**，返回值会被忽略，但你仍然可以通过 **直接在类的原型上赋值** 来修改属性：

```typescript
function ModifyNickName(): PropertyDecorator {
  return (target: any, propertyIdentifier) => {
    target[propertyIdentifier] = "zxh";
    target["otherName"] = "fankaljead";
  };
}

class Bax {
  @ModifyNickName()
  nickName!: string;
  constructor() {}
}

console.log(new Bax().nickName); // zxh
// @ts-expect-error
console.log(new Bax().otherName); // fankaljead
```

我们在原型对象上强行写入了属性，但这种方法实际上过于 hack，在后面我们会了解如何通过委托的方式来为一个属性注入值。

#### 22.1.5 参数装饰器

参数装饰器包括了构造函数的参数装饰器与方法的参数装饰器，它的入参包括 **类的原型**、**参数名** 与 **参数在函数参数中的索引值（即第几个参数）**，如果只是单独使用，它的作用同样非常有限。

```typescript
function CheckParam(): ParameterDecorator {
  return (target, paramIdentifier, index) => {
    console.log(target, paramIdentifier, index);
  };
}

class Faa {
  handler(@CheckParam() input: string) {
    console.log(input);
  }
}

// {} handler 0
const faa = new Faa();
faa.handler("zxh");
```

#### 22.1.6 装饰器的执行机制

装饰器的执行机制中主要包括 **执行时机**、**执行原理** 以及 **执行顺序** 这三个概念。

##### 22.1.6.1 执行时机

首先是 **执行时机**，还记得我们在最开始说的吗？**装饰器的本质就是一个函数，因此只要在类上定义了它，即使不去实例化这个类或者读取静态成员，它也会正常执行。**很多时候，其实我们也并不会实例化具有装饰器的类，而是通过反射元数据的能力来消费，这一点我们后面会讲到。而装饰器的执行原理，我们可以通过编译后的代码来了解：

```typescript
@Cls()
class Foo {
  constructor(@Param() init?: string) { }

  @Prop()
  prop!: string

  @Method()
  handler(@Param() input: string) {

  }
}
```

这一段代码编译的产物会是这样的（经过简化）：

```javascript
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Cls() {
    return (target) => { };
}
function Method() {
    return (target) => { };
}
function Prop() {
    return (target) => {
    };
}
function Param() {
    return (target) => { };
}
let Foo = class Foo {
    constructor(init) {
        this.prop = 'linbudu';
    }
    handler(input) {
    }
    static staticHandler(input) {
    }
};
Foo.staticProp = 'static linbudu';
__decorate([
    Prop(),
    __metadata("design:type", String)
], Foo.prototype, "prop", void 0);
__decorate([
    Method(),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Foo.prototype, "handler", null);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Foo, "staticProp", void 0);
__decorate([
    Method(),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Foo, "staticHandler", null);
Foo = __decorate([
    Cls(),
    __param(0, Param()),
    __metadata("design:paramtypes", [String])
], Foo);
const foo = new Foo();
```

这里的 `__decorate` 方法，其实就是通过实际入参来判断当前到底执行的是哪种装饰器，然后执行对应的装饰逻辑。而观察这个方法调用时的入参，我们会再次观察到这些装饰器的不同入参：**方法与属性装饰器是类的原型对象**，而 **类装饰器才能获得这个类本身作为入参**。而属性装饰器应用时，这个属性还未被初始化（属性需要实例化才会有值），这也是为什么它无法像方法装饰器那样获取到值。

可以看到，上面的装饰器顺序依次是 **实例上的属性、方法、方法参数**，然后是 **静态的属性、方法、方法参数**，最后是 **类以及类构造函数参数**。

而从这一编译结果中，我们还能观察到不同类型装饰器的 **执行顺序**。首先是实例上的属性、方法、方法参数，然后是静态的属性、方法、方法参数，最后是类以及类构造函数参数。而装饰器的 **应用顺序** 则略有不同，**方法参数装饰器会先于方法装饰器应用**（`__param(0, Param())`）。

> 关于执行顺序与应用顺序，执行是 **装饰器求值得到最终装饰器表达式** 的过程，而应用则是 **最终装饰器逻辑代码执行** 的过程：
>
> ```typescript
> function deco() {
>   // 执行
>   return () => {
>     // 应用
>   }
> }
> ```

实际上，对于实例与静态的属性、方法装饰器而言，它们的执行与应用顺序其实 **取决于它们定义的位置**，你可以在上面的例子里把方法定义在属性之前，就会发现执行顺序变成了**方法**-**方法参数**-**属性**，即先定义先执行。

在 TypeScript 官方文档中对应用顺序给出了详细的定义：

1. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个实例成员。
2. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个静态成员。
3. *参数装饰器*应用到构造函数。
4. *类装饰器*应用到类。

最后，我们再看一个例子，来更深刻地了解执行顺序与应用顺序：

```typescript
function Deco(identifier: string): any {
  console.log(`${identifier} 执行`);
  return function () {
    console.log(`${identifier} 应用`);
  };
}

@Deco('类装饰器')
class Foo {
  constructor(@Deco('构造函数参数装饰器') name: string) {}

  @Deco('实例属性装饰器')
  prop?: number;

  @Deco('实例方法装饰器')
  handler(@Deco('实例方法参数装饰器') args: any) {}
}
```

以上的代码输出是这样的：

```text
实例属性装饰器 执行
实例属性装饰器 应用
实例方法装饰器 执行
实例方法参数装饰器 执行
实例方法参数装饰器 应用
实例方法装饰器 应用
类装饰器 执行
构造函数参数装饰器 执行
构造函数参数装饰器 应用
类装饰器 应用
```

执行顺序就不再赘述，这里我们主要关注应用顺序。顺序大致是**实例属性-实例方法参数-构造函数参数-类**，好像不对，不是说参数装饰器先应用吗？这是因为在这个例子中，我们是先定义属性和属性装饰器的，因此属性装饰器会先应用。如果方法在前，可不就是方法参数装饰器先应用？

你会发现，类装饰器是最后应用的。也就是说，如果我们在方法装饰器中标记某些信息，最终的类装饰器是可以消费到，并且基于此信息对类或类的实例进行某些操作的。如标记为 `@Deprecated` 的方法，我们在最终的类装饰器中可以将这些方法实现替换为一个报错！而标记这些信息的方法则有很多，最简单的如，在全局声明一个 Map，类作为 Key，这些信息作为 Value 也是可以的。当然，后面我们会说到如何使用更好的方式实现。

##### 22.1.6.2 多个同类装饰器的执行顺序

另外，我们也可以使用多个同种装饰器，比如一个类上可以有好多个类装饰器：

```typescript
@Deprecated()
@User()
@Internal
@Provide()
class Foo {}
```

这种情况下，这些装饰器的执行顺序又是怎样的？其顺序分为两步。首先，**由上至下** 依次对装饰器的表达式求值，得到装饰器的实现，`@Internal` 中实现即为 Internal 方法，而 `@Provide()` 中实现则需要进行一次求值。

然后，这些装饰器的具体实现才会 **从下往上** 调用，如这里是 `Provide、Internal、User、Deprecated` 的顺序。从这个角度来看，甚至有点像洋葱模型：

```typescript
function Foo(): MethodDecorator {
  console.log('foo in');
  return (target, propertyKey, descriptor) => {
    console.log('foo out');
  };
}

function Bar(): MethodDecorator {
  console.log('bar in');
  return (target, propertyKey, descriptor) => {
    console.log('bar out');
  };
}

const Baz: MethodDecorator = () => {
  console.log('baz apply');
};

class User {
  @Foo()
  @Bar()
  @Baz
  method() {}
}

// foo in
// bar in
// baz apply
// bar out
// foo out
```

类似的，如果一个方法中的多个参数均存在装饰器，那么同样是 `Parma1 in` - `Param2 in ` - `Param2 out` - `Param1 out` 的顺序，也就是 **后面参数的装饰器逻辑** 反而先执行。

**但我们通常不会在同种装饰器中进行存在依赖关系的操作。** 对于属性、参数装饰器来说，我们通常只进行信息注册，委托别人处理。对于方法装饰器来说，我们最多只进行方法执行前后的逻辑注入。而这些过程都应当是彼此独立的。

那么，这里的委托又如何实现呢？这时候我们就要介绍一位新朋友了：**反射（Reflect）**。你可能很早就认识，但没怎么接触过。

### 22.2 反射 Reflect

Reflect 在 ES6 中被首次引入，它主要是为了配合 Proxy 保留一份方法原始的实现逻辑，如以下来自阮一峰老师的 ES6  标准入门中 [Reflect](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Freflect) 一节的代码：

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

Proxy 将修改这个对象的 set 方法，但我们可以通过 `Reflect.set` 方法获得原本的默认实现（不会被修改），先执行完默认实现逻辑再添加自己的额外逻辑。

Proxy 上的这些方法会一一对应到 Reflect 中（或者说 Reflect 中只有 Proxy 上方法的对应实现），如  `defineProperty、deleteProperty、apply、get、set、has` 等等。这些方法其实也可以在别的对象上找到，如 `Object.defineProperty`、`Function.prototype.apply` 等等，因此 Reflect 其实也起到了方法收拢的作用。

如果你有 Java、Go 等语言的基础，一定会反驳说反射才不是用来干这个的呢。别急，我们才刚要开始介绍。

上面的 Proxy 对象的 set 方法是运行时才实际执行的，也就是说我们通过反射，在**运行时去修改了程序的行为**。这就是反射的核心要素：**在程序运行时去检查以及修改程序行为**，比如在代码运行时通过 `Reflect.construct` 实例化一个类，通过 `Reflect.setPrototypeOf` 修改对象原型指向，这些其实都属于反射 API 。

> 此前 JavaScript 中的反射 API 散落在各个顶级对象的命名空间下，因此我们需要 Reflect 来进行一次统一。

比如通过反射来实例化一个类：

```typescript
// 普通情况
const foo = new Foo()
foo.hello()

// 基于反射
const foo = Reflect.construct(Foo)
const hello = Reflect.get(foo, 'hello')
Reflect.apply(hello, foo, [])
```

我们的主要内容和反射并没有太大的关系，下面要介绍的反射元数据才是本节的重量级角色。但你仍然需要铭记

反射的核心理念：**在程序运行时去检查以及修改程序行为**。

#### 22.2.1 反射元数据 Reflect Metadata

不同于反射，**反射元数据（Reflect Metadata）** 这一提案虽然同样很早就被提出，但至今都未真正的成为 ECMAScript 的一部分，原因在于元数据和装饰器提案的联系非常紧密，随着装饰器提案迟迟不能推进，元数据当然也无法独自向前。因此，想要使用反射元数据，你还需要安装 [reflect-metadata](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frbuckton%2Freflect-metadata) ，并在入口文件中的顶部 `import "reflect-metadata"` 。

反射元数据提案（即 `"reflect-metadata"` 包）为顶级对象 Reflect 新增了一批专用于元数据读写的 API，如 `Reflect.defineMetadata`、`Reflect.getMetadata` 等。那么元数据又是什么？你可以将元数据理解为**用于描述数据的数据**，如某个方法的参数信息、返回值信息就可称为该方法的元数据。

那么元数据又存储在哪里？提案中专门说明了这一点，为类或类属性添加了元数据后，构造函数（或是构造函数的原型，根据静态成员还是实例成员决定）会具有 `[[Metadata]]` 属性，该属性内部包含一个 Map 结构，键为属性键，值为元数据键值对。也就是说，**静态成员的元数据信息存储于构造函数**，而**实例成员的元数据信息存储于构造函数的原型上**。

我们来简单使用下元数据的注册与提取：

```typescript
import 'reflect-metadata';

class Foo {
  handler() {}
}

Reflect.defineMetadata('class:key', 'class metadata', Foo);
Reflect.defineMetadata('method:key', 'handler metadata', Foo, 'handler');
Reflect.defineMetadata(
  'proto:method:key',
  'proto handler metadata',
  Foo.prototype,
  'handler'
);
```

`defineMetadata` 的入参包括元数据 Key、元数据 Value、目标类 Target  以及一个可选的属性，在这里我们的三个调用分别是在 `Foo、Foo.handler` 以及 `Foo.prototype`  上注册元数据。而提取则可以通过` getMetadata` 方法：

```typescript
/ [ 'class:key' ]
console.log(Reflect.getMetadataKeys(Foo));
// ['method:key']
console.log(Reflect.getMetadataKeys(Foo, 'handler'));
// ['proto:method:key'];
console.log(Reflect.getMetadataKeys(Foo.prototype, 'handler'));

// class metadata
console.log(Reflect.getMetadata('class:key', Foo));
// handler metadata
console.log(Reflect.getMetadata('method:key', Foo, 'handler'));
// proto handler metadata
console.log(Reflect.getMetadata('proto:method:key', Foo.prototype, 'handler'));
```

实际上，反射元数据正是我们实现属性装饰器中提到的“委托”能力的基础。我们在属性装饰器中去注册一个元数据，然后在真正实例化这个类时，就可以拿到类原型上的元数据，以此对实例化完毕的类再进行额外操作。比如说，我先通过元数据说明，这个属性需要获得变量 a 的值，在实例化时，我们发现有这个元数据，就会对应进行赋值操作。

正是考虑到这一点，反射元数据中直接就内置了基于装饰器的调用方式：

```typescript
@Reflect.metadata('class:key', 'METADATA_IN_CLASS')
class Foo {
  @Reflect.metadata('prop:key', 'METADATA_IN_PROPERTY')
  public prop: string = 'zxh';

  @Reflect.metadata('method:key', 'METADATA_IN_METHOD')
  public handler(): void {}
}
```

`@Reflect.metadata` 装饰器会基于应用的位置进行实际的逻辑调用，如在类上装饰时以类作为 target 进行注册，而在静态成员与实例成员中分别使用构造函数、构造函数原型。

```typescript
const foo = new Foo();

// METADATA_IN_CLASS
console.log(Reflect.getMetadata('class:key', Foo));
// undefined
console.log(Reflect.getMetadata('class:key', Foo.prototype));

// METADATA_IN_METHOD
console.log(Reflect.getMetadata('method:key', Foo.prototype, 'handler'));
// METADATA_IN_METHOD
console.log(Reflect.getMetadata('method:key', foo, 'handler'));

// METADATA_IN_PROPERTY
console.log(Reflect.getMetadata('prop:key', Foo.prototype, 'prop'));
// METADATA_IN_PROPERTY
console.log(Reflect.getMetadata('prop:key', foo, 'prop'));
```

看起来我们现在拥有了实现委托的基本能力，但实际上这还不够。所有的元数据都需要我们提前定义好，如果我们希望直接用一些已有的信息作为元数据呢？比如下面这个例子：

```typescript
class UserService {
  @InjectModel()
  userModel: UserModel;
}
```

我希望将 userModel 属性的类型 UserModel 作为一个元数据信息注入，同时我不会为 `@InjectModel()` 装饰器提供任何信息，那我们就束手无策了吗？

还记得我们在介绍反射概念时说的，**反射允许程序去检视自身**，而属性类型作为程序的一部分，也应当是能被反射收集的。为了实现这一目的，反射元数据提案中还内置了基于类型的元数据，你可以通过 `design:type`、`design:paramtypes` 以及 `design:returntype` 这三个内置的元数据 Key，获取到类与类成员的类型、参数类型、返回值类型：

```typescript
import 'reflect-metadata';

function DefineType(type: Object) {
  return Reflect.metadata('design:type', type);
}
function DefineParamTypes(...types: Object[]) {
  return Reflect.metadata('design:paramtypes', types);
}
function DefineReturnType(type: Object) {
  return Reflect.metadata('design:returntype', type);
}

@DefineParamTypes(String, Number)
class Foo {
  @DefineType(String)
  get name() {
    return 'linbudu';
  }

  @DefineType(Function)
  @DefineParamTypes(Number, Number)
  @DefineReturnType(Number)
  add(source: number, input: number): number {
    return source + input;
  }
}

const foo = new Foo();
// [ [Function: Number], [Function: Number] ]
const paramTypes = Reflect.getMetadata('design:paramtypes', foo, 'add');
// [Function: Number]
const returnTypes = Reflect.getMetadata('design:returntype', foo, 'add');
// [Function: String]
const type = Reflect.getMetadata('design:type', foo, 'name');
```

需要注意的是，这一提案实际上并不依赖 TypeScript ，这些类型信息来自于运行时，而非我们的类型标注。同时这些内置元数据取出的值是装箱类型对象，如 String、Number 等。

TypeScript 为其进行了额外的支持，然后我们才可以获取到类型标注所对应的元数据，如：

```typescript
class Bar {
  @DefineType(Foo)
  prop!: Foo;
}

const bar = new Bar();
// [class Foo]
const type2 = Reflect.getMetadata('design:type', bar, 'prop');
```

这也是为什么我们需要启用 `emitDecoratorMetadata` 配置的原因之一。上面的装饰器执行机制代码中我们看到了编译后的装饰器代码，而启用 `emitDecoratorMetadata` 后，产物中会多出这些代码：

```js
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

__decorate([
    Prop(),
    __metadata("design:type", String) // 新增
], Foo.prototype, "prop", void 0);

__decorate([
    Method(),
    __param(0, Param()),
    __metadata("design:type", Function), // 新增
    __metadata("design:paramtypes", [String]), // 新增
    __metadata("design:returntype", void 0) // 新增
], Foo.prototype, "handler", null);

Foo = __decorate([
    Cls(),
    __param(0, Param()),
    __metadata("design:paramtypes", [String]) // 新增
], Foo);
```

有了装饰器、反射元数据以及内置的基于类型的元数据信息，我们就可以实现“委托”的能力了。以看似平平无奇的属性装饰器为例，我们使用元数据来实现基于装饰器的属性校验。

在这个例子里，我们会实现两种校验逻辑，对必填属性（Required）与属性类型的校验（String / Number / Boolean），其基本使用方式如下：

```typescript
class User {
  @Required()
  name!: string;

  @ValueType(TypeValidation.Number)
  age!: number;
}

const user = new User();
// @ts-expect-error
user.age = '18';
```

我们会将 user 实例传递给校验方法，在这里应当给出两处错误：没有提供必填属性 name，以及 age 属性的类型不符。

如果理解了元数据的作用，那我们的思路就很明确了，装饰器将元数据附加到属性或类上，然后校验方法中遍历属性读取这些元数据，再对比类型是否匹配即可。

首先是 Required ，我们肯定下意识是这么写：

```typescript
function Required(): PropertyDecorator {
  return (target, prop) => {
    Reflect.defineMetadata("required", true, target, prop);
  };
}
```

也就是在这个属性上定义了一个名为 required 的元数据。但你是否想过，如果实例中根本就没有这个属性呢？就像上面的 user 一样，那这里的元数据不就丢失了？

要解决这一问题，其实只需要将元数据定义在类上即可。我们用一个专门描述必填属性的元数据，存储这个类内部所有的必填属性即可：

```typescript
const requiredMetadataKey = Symbol('requiredKeys');

function Required(): PropertyDecorator {
  return (target, prop) => {
    const existRequiredKeys: string[] =
      Reflect.getMetadata(requiredMetadataKey, target) ?? [];

    Reflect.defineMetadata(
      requiredMetadataKey,
      [...existRequiredKeys, prop],
      target
    );
  };
}
```

而对于属性的校验其实就简单了，由于对类型的校验逻辑可以归到一起，我们就使用**装饰器工厂 + 入参**的形式来注入对应的元数据信息，这次我们只需要在属性层面注入元数据即可：

```typescript
enum TypeValidation {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

const validationMetadataKey = Symbol('expectedType');

function ValueType(type: TypeValidation): PropertyDecorator {
  return (target, prop) => {
    Reflect.defineMetadata(validationMetadataKey, type, target, prop);
  };
}
```

然后就是校验逻辑了，我们需要一个额外的 validator 方法：

```typescript
function validator(entity: any) {}

console.log(validator(user));
```

如果校验完全通过，那这一方法的返回值则是一个空数组，否则的话内部会存有报错信息。首先是对于必填属性的校验，我们需要取出注册在类上的，描述必填属性的元数据，再检查这些必填属性是否都存在了：

```typescript
function validator(entity: any) {
  const clsName = entity.constructor.name;
  const messages: string[] = [];
  // 先检查所有必填属性
  const requiredKeys: string[] = Reflect.getMetadata(
    requiredMetadataKey,
    entity
  );

  // 基于反射拿到所有存在的属性
  const existKeys = Reflect.ownKeys(entity);

  for (const key of requiredKeys) {
    if (!existKeys.includes(key)) {
      messages.push(`${clsName}.${key} should be required.`);
      // throw new Error(`${key} is required!`);
    }
  }

  return messages;
}
```

然后是对属性类型的校验，我们的 TypeValidation 枚举中，枚举值就是 `typeof` 的返回值，因此这里直接使用即可：

```typescript
function validator(entity: any) {
  // ...
  // 接着基于定义在属性上的元数据校验属性类型
  for (const key of existKeys) {
    const expectedType: string = Reflect.getMetadata(
      validationMetadataKey,
      entity,
      key
    );

    if (!expectedType) continue;

    // 枚举也是对象，因此 Object.values 同样可以生效（只不过也会包括键名）
    // @ts-expect-error
    if (Object.values(TypeValidation).includes(expectedType)) {
      const actualType = typeof entity[key];
      if (actualType !== expectedType) {
        messages.push(
          `expect ${entity.constructor.name}.${String(
            key
          )} to be ${expectedType}, but got ${actualType}.`
        );
        // throw new Error(`${String(key)} is not ${expectedType}!`);
      }
    }
  }
  return messages;
}
```

最终的输出会是这样的：

```css
[  'User.name should be required.',  'expect User.age to be number, but got string.']
```

除了这两种校验，你也可以通过元数据的帮助来实现更复杂的校验逻辑。如 MinLength、MaxLength、Min、Max 甚至 Email、IP 这样，对属性值内容的校验。思路仍然还是那么简单明了：**注册元数据，消费元数据**。



## 23. 控制反转与依赖注入

### 23.1 控制反转与依赖注入

控制反转即 **Inversion of Control**，它是面向对象编程中的一种设计模式，可以用来很好地解耦代码。

> 由于控制反转出现的时间较晚，因而没有被包括在四人组的设计模式一书当中，但它仍然是一种设计模式。

假设我们存在多个具有依赖关系的类，可能会想当然这么写：

```typescript
import { A } from './modA';
import { B } from './modB';

class C {
  constructor() {
    this.a = new A();
    this.b = new B();
  }
}
```

现在一共只有三个类，倒还没问题，如果随着开发这些类的数量与依赖关系复杂度暴涨，C 依赖 A B，D 依赖 A C，F 依赖 B C D...，再加上每个类需要实例化的参数可能又有所不同，此时再去手动维护这些依赖关系与实例化过程就是灾难了。

而控制反转模式则能够很好地解决这一问题，它引入了一个容器的概念，内部自动地维护了这些类的依赖关系，当我们需要一个类的时候，它会帮我们把这个类内部依赖的实例都填充好，我们直接用就行

```typescript
class F {
  constructor() {
    this.d = Container.get(D);
  }
}
```

此时，我们的实例 D 已经完成了对 A、C 的依赖填充，C 也完成了 A、B 的依赖填充，也就是说所有复杂的依赖关系都被处理完毕了。

这一模式就叫做 **控制反转**。我们此前手动维护关系的模式则成为 **控制正转**。举个例子，当我们想要处对象时，会上 Soul 这样的交友平台一个一个找，择偶条件是由我自己决定的，这就叫 **控制正转**。现在我觉得这样太麻烦了，直接把自己的介绍、择偶条件上传到世纪佳缘，如果有人认为我不错，就会主动向我发起聊天，而这就是 **控制反转**。

控制反转的实现方式主要有两种，**依赖查找** 与 **依赖注入**。它们的本质其实均是 **将依赖关系的维护与创建独立出来**。

其中依赖查找在 JavaScript 中并不多见，它其实就是将实例化的过程放到了另外一个新的 Factory 方法中：

```typescript
class Factory {
  static produce(key: string) {
    // ...
  }
}

class F {
  constructor() {
    this.d = Factory.produce("D");
  }
}
```

在这里，我们的 Factory 类会按照传入的 key 去查找目标对象，然后再进行实例化与赋值过程。而依赖注入的代码则是这样的：

```typescript
@Provide()
class F {
  @Inject()
  d: D;
}
```

可以看到这里我们不需要手动进行赋值，只需要声明这个属性，然后使用装饰器标明它需要被注入一个值即可。

这里的 Provide 即标明这个类需要被注册到容器中，如果别的地方需要这个类 F 时，其内部的 d 属性需要被注入一个 D 的实例，而 D 的实例又需要 A、C 的实例等等。这一系列的过程是完全交给容器的，我们需要做的就只是用装饰器简单标明下依赖关系即可。

很明显，相比于依赖查找，依赖注入使用起来更加简洁，几乎不需要额外的业务代码，即不需要一个额外的 Factory 方法去维护实例化逻辑，但其依赖逻辑要更加黑盒。

而装饰器如何实现依赖注入，我想其实你也能 get 到，不就是我们上面所说的元数据吗？比如在属性中通过 Inject 装饰器注册一份元数据，告诉容器这个类的哪些属性需要被注入，然后容器会在内部存储的类里面对应地进行查找。

在部分前端框架中同样大量使用了基于装饰器的依赖注入体系，如 Angular、Nest、MidwayJS 等，目前来看在 NodeJs  框架中的使用要更为常见。如 Nest 与 Midway  中基于装饰器实现了路由、生命周期、模块、中间件与拦截器等等功能，举例来说，基于装饰器的路由可能是这么写的：

```typescript
@Controller('/user')
class UserController {
  @Get('/list')
  async userList() {}

  @Post('/add')
  async addUser() {}
}
```

这么个路由声明意味着，`GET /user/list` 时会调用 userList 方法，而 `POST /user/add` 时则会调用 addUser 方法。

学习了依赖注入之后，其实我们也可以来自己实现一个装饰器路由体系！

### 23.2 基于依赖注入的路由实现

我们的最终目的就是实现上面基于装饰器的路由能力，以及启动一个 Node Server 来完成对这个路由的承接。

分析一下我们需要哪些能力？最重要的就是把每个方法对应的请求路径、请求方法和具体实现绑定起来，也就是在 `GET /user/list` 时，我们需要调用 `userList` 方法，并将返回值作为响应。那么，在方法的装饰器 `GET` `POST` 上，我们就可以将请求方法、请求路径、方法名、方法实现等信息注册为元数据，然后通过一个统一的提取手段来将它们组装起来。

```typescript
export enum METADATA_KEY {
  METHOD = 'ioc:method',
  PATH = 'ioc:path',
  MIDDLEWARE = 'ioc:middleware',
}

export enum REQUEST_METHOD {
  GET = 'ioc:get',
  POST = 'ioc:post',
}

export const methodDecoratorFactory = (method: string) => {
  return (path: string): MethodDecorator => {
    return (_target, _key, descriptor) => {
      // 在方法实现上注册 ioc:method - 请求方法 的元数据
      Reflect.defineMetadata(METADATA_KEY.METHOD, method, descriptor.value!);
      // 在方法实现上注册 ioc:path - 请求路径 的元数据
      Reflect.defineMetadata(METADATA_KEY.PATH, path, descriptor.value!);
    };
  };
};

export const Get = methodDecoratorFactory(REQUEST_METHOD.GET);
export const Post = methodDecoratorFactory(REQUEST_METHOD.POST);
```

这样一来，`@Get("/list")` 其实就是注册了 `ioc:method - ioc:get`，`ioc:path - "list"` 这样的两对元数据，分别标识了请求方法与请求路径。需要注意的是，我们是在方法体上去注册的，这样在最终处理时，可以**通过这个类的原型拿到方法体**，继而获得注册的元数据。

Controller 中就简单一些了，我们只需要拿到它的请求路径信息，然后拼接在这个类中所有请求方法的请求路径前即可：

```typescript
export const Controller = (path?: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY.PATH, path ?? '', target);
  };
};
```

在最后信息组装时，我们需要做这么几步：

- 获取根路径，即 Controller 装饰器的入参
- 获取这个类实例的原型对象
- 在原型对象上基于方法名获得方法体，继而拿到定义的请求路径、请求方法、请求实现

来看实际代码：

```typescript
type AsyncFunc = (...args: any[]) => Promise<any>;

interface ICollected {
  path: string;
  requestMethod: string;
  requestHandler: AsyncFunc;
}

export const routerFactory = <T extends object>(ins: T): ICollected[] => {
  const prototype = Reflect.getPrototypeOf(ins) as any;

  const rootPath = <string>(
    Reflect.getMetadata(METADATA_KEY.PATH, prototype.constructor)
  );

  const methods = <string[]>(
    Reflect.ownKeys(prototype).filter((item) => item !== 'constructor')
  );

  const collected = methods.map((m) => {
    const requestHandler = prototype[m];
    const path = <string>Reflect.getMetadata(METADATA_KEY.PATH, requestHandler);

    const requestMethod = <string>(
      Reflect.getMetadata(METADATA_KEY.METHOD, requestHandler).replace(
        'ioc:',
        ''
      )
    );

    return {
      path: `${rootPath}${path}`,
      requestMethod,
      requestHandler,
    };
  });
  return collected;
};
```

对于开始我们给出的路由使用方法，收集到的最终信息是这样的：

```json
[
  {
    path: '/user/list',
    requestMethod: 'get',
    requestHandler: [AsyncFunction: userList]
  },
  {
    path: '/user/add',
    requestMethod: 'post',
    requestHandler: [AsyncFunction: addUser]
  }
]
```

现在我们就要来使用一个真正的 Node 服务来检验一下了，直接使用内置的 HTTP 模块启动一个服务器：

```typescript
import http from 'http';

http
  .createServer((req, res) => {})
  .listen(3000)
  .on('listening', () => {
    console.log('Server ready at http://localhost:3000 \n');
  });
```

接下来我们需要做的，就是在 createServer 内去依据请求路径与请求方法调用对应的实现了。我们会遍历收集到的信息，查看是否有某一个对象的路径与请求方法都匹配上了，如果有，就调用这个方法返回：

```typescript
http
  .createServer((req, res) => {
    for (const info of collected) {
      if (
        req.url === info.path &&
        req.method === info.requestMethod.toLocaleUpperCase()
      ) {
        info.requestHandler().then((data) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data));
        });
      }
    }
  })
  .listen(3000)
  .on('listening', () => {
    console.log('Server ready at http://localhost:3000 \n');
    console.log('GET /user/list at http://localhost:3000/user/list \n');
    console.log('POST /user/add at http://localhost:3000/user/add \n');
  });
```

在 Controller 中新增简单的方法返回：

```typescript
@Controller('/user')
class UserController {
  @Get('/list')
  async userList() {
    return {
      success: true,
      code: 10000,
      data: [
        {
          name: 'linbudu',
          age: 18,
        },
        {
          name: '林不渡',
          age: 28,
        },
      ],
    };
  }

  @Post('/add')
  async addUser() {
    return {
      success: true,
      code: 10000,
    };
  }
}
```

访问 [http://localhost:3000/user/list](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Flist) 来试一下：

![image-20221014192543825](https://i.imgur.com/dd29d5P.png)

成功了！是不是还有点小激动？你还可以试着加上同样基于装饰器的中间件、拦截器等机制，思路仍然是一致的：**注册**、**提取**、**组装**以及**匹配调用**。

实际上，在 Nest 这一类框架中，通常会通过完整的容器机制来进行元数据的注册与提取，如 `routerFactory(new UserController())` 这一过程，其实就是在你从容器中取出这个类时就已经自动完成了的。那么，我们要如何实现一个如此贴心的容器？

### 23.3 实现一个建议的 IoC 容器

实现一个简单的 IoC 容器可以很好地帮助我们总结装饰器、依赖注入、元数据的相关知识，以及理解“控制反转”的本质。

关于这个容器，我们最终想实现的使用方式是这样的：

```typescript
@Provide()
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide()
class Car {
  @Inject()
  driver!: Driver;

  run() {
    this.driver.adapt('Car');
  }
}

const car = Container.get(Car);

car.run(); // 驱动已生效于 Car ！
```

先来梳理一下思路，要实现这么个效果，首先我们需要一个容器，即控制反转中提到的**独立的控制方**，我们的 Car 依赖于驱动 Driver，这个容器会帮我们完成 Driver 注入到 Car  内的操作。那这个容器如何知道有哪些类需要被提前实例化呢？我们使用一个 Provide 装饰器，被其标记的 Class  会自动被容器收集。然后在需要使用这些类实例的地方，使用 Inject 装饰器声明这里需要哪个实例，容器就会自动地将这个属性注入进来。

#### 23.3.1 不适用元数据实现

这里有一个比较复杂的地方，在存储一个类和注入一个类时，我们需要有一个标识符，才能实现一一对应的注入方式。在上面的例子里我们的  Provide 和 Inject  装饰器都是使用无参数调用的，这样的话标识符从何而来？你可能会想到使用内置的元数据信息！的确是这样，但是为了降低学习成本，我们先来了解如何不使用元数据来实现这个 IoC 容器，也就是我们能够这么使用：

```typescript
@Provide('DriverService')
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide('Car')
class Car {
  @Inject('DriverService')
  driver!: Driver;

  run() {
    this.driver.adapt('Car');
  }
}

const car = Container.get<Car>('Car')!;

car.run();
```

这样的话就就简单多了，我们只需要基于字符串来存储、查找、注入一个类就好了。

首先我们创建一个容器，很明显，它需要一个 Map 来以字符串-类的方式存储这些信息，以及 get 与 set 方法：

```typescript
type ClassStruct<T = any> = new (...args: any[]) => T;

class Container {
  private static services: Map<string, ClassStruct> = new Map();
  
  public static set(key: string, value: ClassStruct): void {}

  public static get<T = any>(key: string): T | undefined {}

  private constructor() {}
}
```

我们使用私有构造函数来避免这个类被错误地实例化，毕竟它其实只是用来将这些逻辑收拢到一起。

然后就像我们前面说的，Provide 和 Inject 装饰器需要进行存储与注入工作：

```typescript
function Provide(key: string): ClassDecorator {
  return (Target) => {
    Container.set(key, Target as unknown as ClassStruct);
  };
}

function Inject(key: string): PropertyDecorator {
  return (target, propertyKey) => {
   
  };
}
```

Provide 倒简单，但 Inject  就有些麻烦了，我们在前面提到属性装饰器是无法对类的属性进行操作的，因此我们这里只能使用委托的方式。也就是说，我们先告诉容器有哪些属性需要进行注入，以及需要注入的类的标识符，等我们从容器中去取这个类的时候，容器会帮我们处理这些。

因此容器中需要再增加一个 Map，它的键与键值均为字符串类型：

```typescript
class Container {
  public static propertyRegistry: Map<string, string> = new Map();
  
}
```

这样在 Inject 中，我们需要做的就是注册信息：

```typescript
function Inject(key: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key
    );
  };
}
```

需要注意的是，这里我们注册的是 `Car:driver` - `DriverService` 的形式，以此来同时保存这个属性所在的类名称。

接下来，我们需要做的就是 get 与 set 方法了。set 方法简单，直接注册 services 就好：

```typescript
class Container {
  public static set(key: string, value: ClassStruct): void {
    Container.services.set(key, value);
  }
}
```

get 方法就要复杂一些了，它需要在我们取出一个类（`Container.get('Car')`）时，帮我们实例化这个类以及注入这个类内部声明的依赖（`DriverService`）。整理一下具体步骤：

- 使用传入的标识符在容器内查找这个类是否已经注册，如果有则进行下一步，没有就返回 undefined。
- 对于已注册的类，首先将其实例化，然后检查 `propertyRegistry` ，查看这个类内部是否声明了对外部的依赖？
- 将这些外部依赖的类从容器中取出（同样通过 get 方法），然后实例化。
- 将这些实例传递给对应的属性。

我们的大致实现如下：

```typescript
class Container {
    public static get<T = any>(key: ServiceKey): T | undefined {
    // 检查是否注册
    const Cons = Container.services.get(key);

    if (!Cons) {
      return undefined;
    }

    // 实例化这个类
    const ins = new Cons();

    // 遍历注册信息
    for (const info of Container.propertyRegistry) {
      // 注入标识符与要注入类的标识符
      const [injectKey, serviceKey] = info;
      // 拆分为 Class 名与属性名
      const [classKey, propKey] = injectKey.split(':');

      // 如果不是这个类，就跳过
      if (classKey !== Cons.name) continue;

      // 取出需要注入的类，这里拿到的是已经实例化的
      const target = Container.get(serviceKey);

      if (target) {
        // 赋值给对应的属性
        ins[propKey] = target;
      }
    }

    return ins;
  }
}
```

来试着调用，会发现已经成功了：

![image-20221015132546853](https://i.imgur.com/16wsKWs.png)

每次传入字符串的实现肯定不够优雅，我们在使用 Nest、Angular 等框架时，也并不会经常使用字符串作为标识符来实现依赖注入。

可是，如果不使用字符串，我们要用什么来作为标识符呢？聪明的你肯定想到了，可以使用内置的元数据来作为标识符，比如在这种情况下：

```typescript
@Provide()
class Car {
  @Inject()
  driver!: Driver;

  run() {
    this.driver.adapt('Car');
  }
}
```

对于 driver 属性，我们就可以使用它的类型标注 Driver 来作为标识符。那接下来我们来改写上面的容器实现。

#### 23.3.2 基于内置元数据实现

其实最难的一部分我们已经解决了，即如何存储并对应地进行注入，现在要做的不过是升级优化一下，支持在不传入标识符时使用内置元数据作为标识符。首先对 Provide 和 Inject 做改造：

```typescript
function Provide(key?: string): ClassDecorator {
  return (Target) => {
    Container.set(key ?? Target.name, Target as unknown as ClassStruct);
    Container.set(Target, Target as unknown as ClassStruct);
  };
}

function Inject(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata('design:type', target, propertyKey)
    );
  };
}
```

在 Inject 中，我们支持了在不传入标识符时，使用 `Reflect.getMetadata('design:type', target, propertyKey)` 作为默认的标识符，这里的元数据是一个完整的类，即 Class Driver 。

对应的，为了支持使用 Class 作为标识符进行查找，在 Provide 装饰器中我们需要确保也使用 Class 作为标识符来存储一份：

```typescript
function Provide(key?: string): ClassDecorator {
  return (Target) => {
    Container.set(key ?? Target.name, Target as unknown as ClassStruct);
    // 不论是否传入 key，都使用 Class 作为 key 注册一份
    Container.set(Target, Target as unknown as ClassStruct);
  };
}
```

然后就没了！我们并不需要修改 Container 的逻辑，只需要调整类型即可：

```typescript
type ServiceKey<T = any> = string | ClassStruct<T> | Function;

class Container {
  private static services: Map<ServiceKey, ClassStruct> = new Map();

  public static propertyRegistry: Map<string, string> = new Map();

  public static set(key: ServiceKey, value: ClassStruct): void {}

  public static get<T = any>(key: ServiceKey): T | undefined {}
  private constructor() {}
}
```

现在我们可以同时使用 `@Inject()` 与 `@Inject('DriverService')` 这两种方式来实现注入了，来最后测试一下：

```typescript
@Provide('DriverService')
class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide()
class Fuel {
  fill(consumer: string) {
    console.log(`\n === 燃料已填充完毕 ${consumer}！===`);
  }
}

@Provide()
class Car {
  @Inject()
  driver!: Driver;

  @Inject()
  fule!: Fuel;

  run() {
    this.fule.fill('Car');
    this.driver.adapt('Car');
  }
}

@Provide()
class Bus {
  @Inject('DriverService')
  driver!: Driver;

  @Inject('Fuel')
  fule!: Fuel;

  run() {
    this.fule.fill('Bus');
    this.driver.adapt('Bus');
  }
}

const car = Container.get(Car)!;
const bus = Container.get(Bus)!;

car.run();
bus.run();
```

![image-20221015132751272](https://i.imgur.com/rfFswlA.png)

学习完这一节后，请你试着把上一部分的装饰器路由体系也基于这个简单的容器重新实现与改善，如新增对 Service 层与中间件层的注入：

```typescript
// 如何设计入参？
function logMiddleware() {
    // 中间件逻辑在何时执行？
}

@Controller('/user')
class UserController {
  constructor(@Inject() private userService: UserService) {}
  
  @Middleware(logMiddleware)
  @Get('/list')
  async userList() {
    return await this.userService.all();
  }

  @Post('/add')
  async addUser(user: User) {
    return await this.userService.create(user);
  }
}
```

### 23.4 类型严格的装饰器

在这一节的代码中，我们并没有特别关注类型的严格性。实际上装饰器的类型定义也是如此：

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
```

这些类型定义使用的是非常宽泛的类型， 并没有进行对应的约束。而如果将这些类型进行约束，实际上我们就可以实现一个类型严格的装饰器。如我们希望装饰器 `@OnlyFoo` 只能在 Foo 及其子类上应用，此时就可以通过约束 target 的类型实现：

```typescript
type ClassStruct<T = any> = new (...args: any[]) => T;

type RestrictedClassDecorator<TClass extends object> = (
  target: ClassStruct<TClass>
) => ClassStruct<TClass> | void;

function OnlyFoo(): RestrictedClassDecorator<Foo> {
  return (target: ClassStruct<Foo>) => {};
}

function OnlyBar(): RestrictedClassDecorator<Bar> {
  return (target: ClassStruct<Bar>) => {};
}
```

来实际使用一下：

```typescript
@OnlyFoo()
// 装饰器函数返回类型“void | ClassStruct<Bar>”不可分配到类型“void | typeof Foo”
@OnlyBar()
class Foo {
  foo!: string;
}

@OnlyFoo()
class DerivedFoo extends Foo {
  foo!: string;
}

// 装饰器函数返回类型“void | ClassStruct<Foo>”不可分配到类型“void | typeof Bar”。
@OnlyFoo()
@OnlyBar()
class Bar {
  bar!: string;
}
```

类似的，我们还可以实现约束方法装饰器只能在同步或异步函数上调用：

```typescript
type AsyncFunc = (...args: any[]) => Promise<any>;

type OnlyAsyncMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncFunc>
) => void;

function OnlyAsyncFunc(): OnlyAsyncMethodDecorator {
  return (target, propKey, descriptor) => {};
}

class Foo {
  // 类型“TypedPropertyDescriptor<() => void>”的参数不能赋给类型“TypedPropertyDescriptor<AsyncFunc>”的参数。
  @OnlyAsyncFunc()
  handler() {}

  @OnlyAsyncFunc()
  async asyncHandler() {}
}
```

以及属性装饰器只用应用在特定类型的属性上：

```typescript
type LiteralPropertyDecorator = (
  target: Object,
  propertyKey: 'linbudu'
) => void;

function OnlyLiteralProperty(): LiteralPropertyDecorator {
  return (target, propertyKey) => {};
}

type PickByValueType<T, Value> = {
  [Key in keyof T]: T[Key] extends Value ? Key : never;
}[keyof T];

type StringTypePropertyDecorator = <T extends object>(
  target: T,
  propertyKey: PickByValueType<T, string>
) => void;

function OnlyStringTypeProperty(): StringTypePropertyDecorator {
  return (target, propertyKey) => {};
}

class Foo {
  @OnlyStringTypeProperty()
  str!: string;

  // 类型“"bool"”的参数不能赋给类型“PickByValueType<Foo, string>”的参数。
  @OnlyStringTypeProperty()
  bool: boolean = true;

  @OnlyLiteralProperty()
  linbudu!: 'linbudu';
}
```

这里比较巧妙的是，由于我们只能获取到被装饰的属性名，无法直接获取到其类型，因此通过此前我们学习过的 PickByValueType 工具类型，将这个类上所有符合类型的属性名都提取了出来（作为字面量类型），然后使用这一字面量类型作为类型约束。
