# TypeScrip 入门

## 0. 简介

> Typed JavaScript at Any Scale.
>  添加了类型系统的 JavaScript，适用于任何规模的项目。

它强调了 TypeScript 的两个最重要的特性——类型系统、适用于任何规模。

### 0.1 TypeScript 的特性

- **类型系统**

    从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。

    我们知道，JavaScript 是一门非常灵活的编程语言：

    - 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
    - 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
    - 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
    - 函数是 JavaScript 中的一等公民[[2\]](https://ts.xcatliu.com/introduction/what-is-typescript.html#link-2)，可以赋值给变量，也可以当作参数或返回值。

    这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军[[3\]](https://ts.xcatliu.com/introduction/what-is-typescript.html#link-3)；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

    而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

- **TypeScript 是静态类型**

- **弱类型**
- **适用于任何规模**
- **与标准同步发展**

### 0.2 安装 

- TypeScript 的命令行工具安装方法如下：

    ```bash
    npm install -g typescript
    ```

### 0.3 Hello TypeScript

将以下代码复制到 `hello.ts` 中：

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行

```bash
tsc hello.ts
```

这时候会生成一个编译好的文件 `hello.js`：

```javascript
function sayHello(person) {
    return "Hello, " + person;
}
var user = "Tom";
console.log(sayHello(user));
```

在 TypeScript 中，我们使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。

这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

如果我们需要保证运行时的参数类型，还是得手动对类型进行判断：

## 1. 基础

### 1.1 原始数据类型

原始数据类型包括：布尔值、数值、字符串、`null`、`undefined` 以及 ES6 中的新类型 [`Symbol`](http://es6.ruanyifeng.com/#docs/symbol) 和 ES10 中的新类型 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

- **布尔值**

    布尔值是最基础的数据类型，在 TypeScript 中，使用 `boolean` 定义布尔值类型：

    ```ts
    let isDone: boolean = false;
    
    // 编译通过
    // 后面约定，未强调编译错误的代码片段，默认为编译通过
    ```

    注意，使用构造函数 `Boolean` 创造的对象**不是**布尔值：

    ```ts
    let createdByNewBoolean: boolean = new Boolean(1);
    
    // Type 'Boolean' is not assignable to type 'boolean'.
    //   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
    ```

    事实上 `new Boolean()` 返回的是一个 `Boolean` 对象：

    ```ts
    let createdByNewBoolean: Boolean = new Boolean(1);
    ```

    直接调用 `Boolean` 也可以返回一个 `boolean` 类型：

    ```ts
    let createdByBoolean: boolean = Boolean(1);
    ```

    在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型（除了 `null` 和 `undefined`）一样，

- **数值**

    使用 `number` 定义数值类型：

    ```ts
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    // ES6 中的二进制表示法
    let binaryLiteral: number = 0b1010;
    // ES6 中的八进制表示法
    let octalLiteral: number = 0o744;
    let notANumber: number = NaN;
    let infinityNumber: number = Infinity;
    ```

    编译结果：

    ```js
    var decLiteral = 6;
    var hexLiteral = 0xf00d;
    // ES6 中的二进制表示法
    var binaryLiteral = 10;
    // ES6 中的八进制表示法
    var octalLiteral = 484;
    var notANumber = NaN;
    var infinityNumber = Infinity;
    ```

    其中 `0b1010` 和 `0o744` 是 [ES6 中的二进制和八进制表示法](http://es6.ruanyifeng.com/#docs/number#二进制和八进制表示法)，它们会被编译为十进制数字。

- **字符串**

    使用 `string` 定义字符串类型：

    ```ts
    let myName: string = 'Tom';
    let myAge: number = 25;
    
    // 模板字符串
    let sentence: string = `Hello, my name is ${myName}.
    I'll be ${myAge + 1} years old next month.`;
    ```

    编译结果：

    ```js
    var myName = 'Tom';
    var myAge = 25;
    // 模板字符串
    var sentence = "Hello, my name is " + myName + ".
    I'll be " + (myAge + 1) + " years old next month.";
    ```

    其中 ``` 用来定义 [ES6 中的模板字符串](http://es6.ruanyifeng.com/#docs/string#模板字符串)，`${expr}` 用来在模板字符串中嵌入表达式。

- **空值**

    JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：

    ```ts
    function alertName(): void {
        alert('My name is Tom');
    }
    ```

    声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`（只在 --strictNullChecks 未指定时）：

    ```ts
    let unusable: void = undefined;
    ```

- **Null 和 Undefined**

    在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：

    ```ts
    let u: undefined = undefined;
    let n: null = null;
    ```

    与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

    ```ts
    // 这样不会报错
    let num: number = undefined;
    ```

    ```ts
    // 这样也不会报错
    let u: undefined;
    let num: number = u;
    ```

    而 `void` 类型的变量不能赋值给 `number` 类型的变量：

    ```ts
    let u: void;
    let num: number = u;
    
    // Type 'void' is not assignable to type 'number'.
    ```

### 1.2 任意值

任意值（Any）用来表示允许赋值为任意类型。

- **什么是任意值类型**

    如果是一个普通类型，在赋值过程中改变类型是不被允许的：

    ```ts
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;
    
    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

    ![普通类型不能改变类型](https://s2.loli.net/2022/05/02/WBO4LorDdgGShkx.png)

    但如果是 `any` 类型，则允许被赋值为任意类型。

    ```ts
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
    ```

- **任意值的属性和方法**

    在任意值上访问任何属性都是允许的：

    ```ts
    let anyThing: any = 'hello';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName);
    ```

    也允许调用任何方法：

    ```ts
    let anyThing: any = 'Tom';
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
    anyThing.myName.setFirstName('Cat');
    ```

    可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**。

    > 回到 JS 的状态

- **未声明类型的变量**

    **变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**：

    ```ts
    let something;
    something = 'seven';
    something = 7;
    
    something.setName('Tom');
    ```

    等价于:

    ```ts
    let something: any;
    something = 'seven';
    something = 7;
    
    something.setName('Tom');
    ```

### 1.A Never

`never` 类型表示哪些永不存在的值的类型。例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是`never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使`any`也不可以赋值给`never`。

```typescript
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为 never
function fail() {
  return error("Something failed");
}

// 返回 never 的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```



### 1.3 类型推断

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**：

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 1.4 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

**访问联合类型的属性或方法**

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```typescript
function getLength(something: string | number[]): number {
  return something.length;
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

### 1.5 接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象](https://ts.xcatliu.com/advanced/class-and-interfaces.html#类实现接口)以外，也常用于对「对象的形状（Shape）」进行描述。

```typescript
interface Person {
  name: string;
  age: number;
}
let zxh: Person = {
  name: "zxh",
  age: 18,
};
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

接口一般首字母大写。[有的编程语言中会建议接口的名称加上 `I` 前缀](https://msdn.microsoft.com/en-us/library/8bc1fexb(v=vs.71).aspx)。

定义的变量比接口少了一些属性是不允许的：

```ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

多一些属性也是不允许的：

```ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见，**赋值的时候，变量的形状必须和接口的形状保持一致**。

**可选属性 使用 ?**

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

可选属性的含义是该属性可以不存在。

这时**仍然不允许添加未定义的属性**：

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

**任意属性**

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

**只读属性**

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**：

```ts
nterface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值。

第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了。

### 1.6 数组的类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

1. **[类型 + 方括号] 表示法**

    ```ts
    let fibonacci: number[] = [1, 1, 2, 3, 5];
    ```

    数组的项中**不允许**出现其他的类型：

    ```ts
    let fibonacci: number[] = [1, '1', 2, 3, 5];
    
    // Type 'string' is not assignable to type 'number'.
    ```

    数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

    ```ts
    let fibonacci: number[] = [1, 1, 2, 3, 5];
    fibonacci.push('8');
    
    // Argument of type '"8"' is not assignable to parameter of type 'number'.
    ```

2. **数组泛型**

    也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

    ```ts
    let fibonacci: Array<number> = [1, 1, 2, 3, 5];
    ```

3. **用接口表示数组**

    接口也可以用来描述数组：

    ```ts
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 1, 2, 3, 5];
    ```

    `NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

    虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。

    不过有一种情况例外，那就是它常用来表示类数组。

4. **类数组**

    类数组（Array-like Object）不是数组类型，比如 `arguments`：

    ```ts
    function sum() {
        let args: number[] = arguments;
    }
    
    // Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
    ```

    上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

    ```ts
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
    ```

    在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

    事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

    ```ts
    function sum() {
        let args: IArguments = arguments;
    }
    ```

    其中 `IArguments` 是 TypeScript 中定义好了的类型，它实际上就是：

    ```ts
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
    ```

5. **any 在数组中的应用**

    一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：

    ```typescript
    let list: any[] = ["hh", 11, undefined, null, {}, [], () => {}];
    ```

### 1.7 函数的类型

- **函数声明**

    在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

    ```js
    // 函数声明（Function Declaration）
    function sum(x, y) {
        return x + y;
    }
    
    // 函数表达式（Function Expression）
    let mySum = function (x, y) {
        return x + y;
    };
    ```

    一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

    ```ts
    function sum(x: number, y: number): number {
        return x + y;
    }
    ```

    注意，**输入多余的（或者少于要求的）参数，是不被允许的**：

    ```ts
    function sum(x: number, y: number): number {
        return x + y;
    }
    sum(1, 2, 3);
    
    // index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
    ```

    ```ts
    function sum(x: number, y: number): number {
        return x + y;
    }
    sum(1);
    
    // index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
    ```

- **函数表达式**

    如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

    ```ts
    let mySum = function (x: number, y: number): number {
        return x + y;
    };
    ```

    这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

    ```ts
    let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    };
    ```

    注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

    **在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。**

    在 ES6 中，`=>` 叫做箭头函数，应用十分广泛，可以参考 [ES6 中的箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)。

- **用接口定义函数的形状**

    我们也可以使用接口的方式来定义一个函数需要符合的形状：

    ```ts
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    
    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        return source.search(subString) !== -1;
    }
    ```

    采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

- **可选参数**

    与接口中的可选属性类似，我们用 `?` 表示可选的参数：

    ```ts
    function buildName(firstName: string, lastName?: string) {
        if (lastName) {
            return firstName + ' ' + lastName;
        } else {
            return firstName;
        }
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```

    需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

    ```ts
    function buildName(firstName?: string, lastName: string) {
        if (firstName) {
            return firstName + ' ' + lastName;
        } else {
            return lastName;
        }
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName(undefined, 'Tom');
    
    // index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
    ```

    

- **参数默认值**

    在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

    ```ts
    function buildName(firstName: string, lastName: string = 'Cat') {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```

    此时就不受「可选参数必须接在必需参数后面」的限制了：

    ```ts
    function buildName(firstName: string = 'Tom', lastName: string) {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let cat = buildName(undefined, 'Cat');
    ```

- **剩余参数**

    ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

    ```js
    function push(array, ...items) {
        items.forEach(function(item) {
            array.push(item);
        });
    }
    
    let a: any[] = [];
    push(a, 1, 2, 3);
    ```

    事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

    ```ts
    function push(array: any[], ...items: any[]) {
        items.forEach(function(item) {
            array.push(item);
        });
    }
    
    let a = [];
    push(a, 1, 2, 3);
    ```

    注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 [ES6 中的 rest 参数](http://es6.ruanyifeng.com/#docs/function#rest参数)。

- **重载**

    重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

    比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

    利用联合类型，我们可以这么实现：

    ```ts
    function reverse(x: number | string): number | string | void {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```

    **然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

    这时，我们可以使用重载定义多个 `reverse` 的函数类型：

    ```ts
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string | void {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```

    上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

    **注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面**



### 1.8 类型断言

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言（Type Assertion）可以用来手动指定一个值的类型。

- **语法**

    ```ts
    值 as 类型
    ```

    或

    ```ts
    <类型>值
    ```

    在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 `值 as 类型`。

    形如 `<Foo>` 的语法在 tsx 中表示的是一个 `ReactNode`，在 ts 中除了表示类型断言之外，也可能是表示一个[泛型](https://ts.xcatliu.com/advanced/generics.html)。

- **类型断言的用途**

    类型断言的常见用途有以下几种：

    - **将一个联合类型断言为其中一个类型**

        当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**：

        ```ts
        interface Cat {
            name: string;
            run(): void;
        }
        interface Fish {
            name: string;
            swim(): void;
        }
        
        function getName(animal: Cat | Fish) {
            return animal.name;
        }
        ```

        而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

        ```ts
        interface Cat {
            name: string;
            run(): void;
        }
        interface Fish {
            name: string;
            swim(): void;
        }
        
        function isFish(animal: Cat | Fish) {
            if (typeof animal.swim === 'function') {
                return true;
            }
            return false;
        }
        
        // index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
        //   Property 'swim' does not exist on type 'Cat'.
        ```

        上面的例子中，获取 `animal.swim` 的时候会报错。

        此时可以使用类型断言，将 `animal` 断言成 `Fish`：

        ```ts
        interface Cat {
            name: string;
            run(): void;
        }
        interface Fish {
            name: string;
            swim(): void;
        }
        
        function isFish(animal: Cat | Fish) {
            if (typeof (animal as Fish).swim === 'function') {
                return true;
            }
            return false;
        }
        ```

        这样就可以解决访问 `animal.swim` 时报错的问题了。

        需要注意的是，**类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误**，反而滥用类型断言可能会导致运行时错误：

        ```ts
        interface Cat {
            name: string;
            run(): void;
        }
        interface Fish {
            name: string;
            swim(): void;
        }
        
        function swim(animal: Cat | Fish) {
            (animal as Fish).swim();
        }
        
        const tom: Cat = {
            name: 'Tom',
            run() { console.log('run') }
        };
        swim(tom);
        // Uncaught TypeError: animal.swim is not a function`
        ```

        上面的例子编译时不会报错，但在运行时会报错：

        原因是 `(animal as Fish).swim()` 这段代码隐藏了 `animal` 可能为 `Cat` 的情况，将 `animal` 直接断言为 `Fish` 了，而 TypeScript 编译器信任了我们的断言，故在调用 `swim()` 时没有编译错误。

        可是 `swim` 函数接受的参数是 `Cat | Fish`，一旦传入的参数是 `Cat` 类型的变量，由于 `Cat` 上没有 `swim` 方法，就会导致运行时错误了。

        总之，使用类型断言时一定要格外小心，**尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误**。

    - **将一个父类断言为更加具体的子类**

        当类之间有继承关系时，类型断言也是很常见的：

        ```ts
        class ApiError extends Error {
            code: number = 0;
        }
        class HttpError extends Error {
            statusCode: number = 200;
        }
        
        function isApiError(error: Error) {
            if (typeof (error as ApiError).code === 'number') {
                return true;
            }
            return false;
        }
        ```

        上面的例子中，我们声明了函数 `isApiError`，它用来判断传入的参数是不是 `ApiError` 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 `Error`，这样的话这个函数就能接受 `Error` 或它的子类作为参数了。

        但是由于父类 `Error` 中没有 `code` 属性，故直接获取 `error.code` 会报错，需要使用类型断言获取 `(error as ApiError).code`。

        大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 `ApiError`，那就是使用 `instanceof`：

        ```ts
        class ApiError extends Error {
            code: number = 0;
        }
        class HttpError extends Error {
            statusCode: number = 200;
        }
        
        function isApiError(error: Error) {
            if (error instanceof ApiError) {
                return true;
            }
            return false;
        }
        ```

        上面的例子中，确实使用 `instanceof` 更加合适，因为 `ApiError` 是一个 JavaScript 的类，能够通过 `instanceof` 来判断 `error` 是否是它的实例。

        但是有的情况下 `ApiError` 和 `HttpError` 不是一个真正的类，**而只是一个 TypeScript 的接口（`interface`），接口是一个类型，不是一个真正的值，它在编译结果中会被删除**，当然就无法使用 `instanceof` 来做运行时判断了：

        ```ts
        interface ApiError extends Error {
            code: number;
        }
        interface HttpError extends Error {
            statusCode: number;
        }
        
        function isApiError(error: Error) {
            if (error instanceof ApiError) {
                return true;
            }
            return false;
        }
        
        // index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
        ```

        此时就只能用类型断言，通过判断是否存在 `code` 属性，来判断传入的参数是不是 `ApiError` 了：

        ```ts
        interface ApiError extends Error {
            code: number;
        }
        interface HttpError extends Error {
            statusCode: number;
        }
        
        function isApiError(error: Error) {
            if (typeof (error as ApiError).code === 'number') {
                return true;
            }
            return false;
        }
        ```

    - **将任何一个类型断言为 any**

        理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。

        当我们引用一个在此类型上不存在的属性或方法时，就会报错：

        ```ts
        const foo: number = 1;
        foo.length = 1;
        
        // index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
        ```

        上面的例子中，数字类型的变量 `foo` 上是没有 `length` 属性的，故 TypeScript 给出了相应的错误提示。

        这种错误提示显然是非常有用的。

        但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

        ```ts
        window.foo = 1;
        
        // index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
        ```

        上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

        此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

        ```ts
        (window as any).foo = 1;
        ```

        在 `any` 类型的变量上，访问任何属性都是允许的。

        需要注意的是，将一个变量断言为 `any` 可以说是解决 TypeScript 中类型问题的最后一个手段。

        **它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 `as any`。**

        上面的例子中，我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 `foo` 属性，`as any` 会更加方便。

        总之，**一方面不能滥用 `as any`，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**（这也是 [TypeScript 的设计理念](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)之一），才能发挥出 TypeScript 最大的价值。

    - **将 any 断言为一个具体的类型**

        在日常的开发中，我们不可避免的需要处理 `any` 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

        遇到 `any` 类型的变量时，我们可以选择无视它，任由它滋生更多的 `any`。

        我们也可以选择改进它，通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

        举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any`：

        ```ts
        function getCacheData(key: string): any {
            return (window as any).cache[key];
        }
        ```

        那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

        ```ts
        function getCacheData(key: string): any {
            return (window as any).cache[key];
        }
        
        interface Cat {
            name: string;
            run(): void;
        }
        
        const tom = getCacheData('tom') as Cat;
        tom.run();
        ```

        上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

    

- **类型断言的限制**

    从上面的例子中，我们可以总结出：

    - 联合类型可以被断言为其中一个类型
    - 父类可以被断言为子类
    - 任何类型都可以被断言为 any
    - any 可以被断言为任何类型

    那么类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？

    答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。

    **具体来说，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。**

    下面我们通过一个简化的例子，来理解类型断言的限制：

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat { // Cat 兼容 Animal
        name: string;
        run(): void;
    }
    
    let tom: Cat = {
        name: 'Tom',
        run: () => { console.log('run') }
    };
    let animal: Animal = tom;
    ```

    我们知道，TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。

    在上面的例子中，`Cat` 包含了 `Animal` 中的所有属性，除此之外，它还有一个额外的方法 `run`。TypeScript 并不关心 `Cat` 和 `Animal` 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 `Cat extends Animal` 是等价的：

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat extends Animal {
        run(): void;
    }
    ```

    那么也不难理解为什么 `Cat` 类型的 `tom` 可以赋值给 `Animal` 类型的 `animal` 了——就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量。

    我们把它换成 TypeScript 中更专业的说法，即：`Animal` 兼容 `Cat`。

    当 `Animal` 兼容 `Cat` 时，它们就可以互相进行类型断言了：

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat {
        name: string;
        run(): void;
    }
    
    function testAnimal(animal: Animal) {
        return (animal as Cat);
    }
    function testCat(cat: Cat) {
        return (cat as Animal);
    }
    ```

    这样的设计其实也很容易就能理解：

    - 允许 `animal as Cat` 是因为「父类可以被断言为子类」，这个前面已经学习过了
    - 允许 `cat as Animal` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

    需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，而实际上 TypeScript 在判断类型的兼容性时，比这种情况复杂很多，详细请参考[类型的兼容性（TODO)][]章节。

    总之，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

    同理，若 `B` 兼容 `A`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

    所以这也可以换一种说法：

    要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。

    综上所述：

    - 联合类型可以被断言为其中一个类型
    - 父类可以被断言为子类
    - 任何类型都可以被断言为 any
    - any 可以被断言为任何类型
    - 要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

    其实前四种情况都是最后一个的特例。

- **双重断言**

    既然：

    - 任何类型都可以被断言为 any
    - any 可以被断言为任何类型

    那么我们是不是可以使用双重断言 `as any as Foo` 来将任何一个类型断言为任何另一个类型呢？

    ```ts
    interface Cat {
        run(): void;
    }
    interface Fish {
        swim(): void;
    }
    
    function testCat(cat: Cat) {
        return (cat as any as Fish);
    }
    ```

    在上面的例子中，若直接使用 `cat as Fish` 肯定会报错，因为 `Cat` 和 `Fish` 互相都不兼容。

    但是若使用双重断言，则可以打破「要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可」的限制，将任何一个类型断言为任何另一个类型。

    若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。

    **除非迫不得已，千万别用双重断言。**

- **类型断言 vs 类型转换**

    类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：

    ```ts
    function toBoolean(something: any): boolean {
        return something as boolean;
    }
    
    toBoolean(1);
    // 返回值为 1
    ```

    在上面的例子中，将 `something` 断言为 `boolean` 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

    ```js
    function toBoolean(something) {
        return something;
    }
    
    toBoolean(1);
    // 返回值为 1
    ```

    所以类型断言不是类型转换，它不会真的影响到变量的类型。

    若要进行类型转换，需要直接调用类型转换的方法：

    ```ts
    function toBoolean(something: any): boolean {
        return Boolean(something);
    }
    
    toBoolean(1);
    // 返回值为 true
    ```

- **类型断言 vs 类型声明**

    ```ts
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom = getCacheData('tom') as Cat;
    tom.run();
    ```

    我们使用 `as Cat` 将 `any` 类型断言为了 `Cat` 类型。

    但实际上还有其他方式可以解决这个问题：

    ```ts
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom: Cat = getCacheData('tom');
    tom.run();
    ```

    上面的例子中，我们通过类型声明的方式，将 `tom` 声明为 `Cat`，然后再将 `any` 类型的 `getCacheData('tom')` 赋值给 `Cat` 类型的 `tom`。

    这和类型断言是非常相似的，而且产生的结果也几乎是一样的——`tom` 在接下来的代码中都变成了 `Cat` 类型。

    它们的区别，可以通过这个例子来理解：

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat {
        name: string;
        run(): void;
    }
    
    const animal: Animal = {
        name: 'tom'
    };
    let tom = animal as Cat;
    ```

    在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `animal` 断言为 `Cat` 赋值给 `tom`。

    但是若直接声明 `tom` 为 `Cat` 类型：

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat {
        name: string;
        run(): void;
    }
    
    const animal: Animal = {
        name: 'tom'
    };
    let tom: Cat = animal;
    
    // index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
    ```

    则会报错，不允许将 `animal` 赋值为 `Cat` 类型的 `tom`。

    这很容易理解，`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。

    深入的讲，它们的核心区别就在于：

    - `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
    - `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行

    但是 `Cat` 并不兼容 `Animal`。

    而在前一个例子中，由于 `getCacheData('tom')` 是 `any` 类型，`any` 兼容 `Cat`，`Cat` 也兼容 `any`，故

    ```ts
    const tom = getCacheData('tom') as Cat;
    ```

    等价于

    ```ts
    const tom: Cat = getCacheData('tom');
    ```

    知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。

    所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅。

- **类型断言 vs 泛型**

    ```ts
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom = getCacheData('tom') as Cat;
    tom.run();
    ```

    我们还有第三种方式可以解决这个问题，那就是泛型：

    ```ts
    function getCacheData<T>(key: string): T {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom = getCacheData<Cat>('tom');
    tom.run();
    ```

    通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

### 1.9 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

#### 1.9.1 新语法索引

- [`declare var`](https://ts.xcatliu.com/basics/declaration-files.html#declare-var) 声明全局变量
- [`declare function`](https://ts.xcatliu.com/basics/declaration-files.html#declare-function) 声明全局方法
- [`declare class`](https://ts.xcatliu.com/basics/declaration-files.html#declare-class) 声明全局类
- [`declare enum`](https://ts.xcatliu.com/basics/declaration-files.html#declare-enum) 声明全局枚举类型
- [`declare namespace`](https://ts.xcatliu.com/basics/declaration-files.html#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](https://ts.xcatliu.com/basics/declaration-files.html#interface-和-type) 声明全局类型
- [`export`](https://ts.xcatliu.com/basics/declaration-files.html#export) 导出变量
- [`export namespace`](https://ts.xcatliu.com/basics/declaration-files.html#export-namespace) 导出（含有子属性的）对象
- [`export default`](https://ts.xcatliu.com/basics/declaration-files.html#export-default) ES6 默认导出
- [`export =`](https://ts.xcatliu.com/basics/declaration-files.html#export-1) commonjs 导出模块
- [`export as namespace`](https://ts.xcatliu.com/basics/declaration-files.html#export-as-namespace) UMD 库声明全局变量
- [`declare global`](https://ts.xcatliu.com/basics/declaration-files.html#declare-global) 扩展全局变量
- [`declare module`](https://ts.xcatliu.com/basics/declaration-files.html#declare-module) 扩展模块
- [`/// `](https://ts.xcatliu.com/basics/declaration-files.html#san-xie-xian-zhi-ling) 三斜线指令

#### 1.9.2 什么是声明语句

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 jQuery，然后就可以使用全局变量 `$` 或 `jQuery` 了。

我们通常这样获取一个 `id` 是 `foo` 的元素：

```js
$('#foo');
// or
jQuery('#foo');
```

但是在 ts 中，编译器并不知道 `$` 或 `jQuery` 是什么东西[1](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/01-jquery)：

```ts
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

这时，我们需要使用 `declare var` 来定义它的类型[2](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/02-declare-var)：

```ts
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

上例中，`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

```js
jQuery('#foo');
```

除了 `declare var` 之外，还有其他很多种声明语句

#### 1.9.3 什么是声明文件

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件[3](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/03-jquery-d-ts)：

```ts
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
```

```ts
// src/index.ts

jQuery('#foo');
```

声明文件必需以 `.d.ts` 为后缀。

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

```autoit
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

这里只演示了全局变量这种模式的声明文件，假如是通过模块导入的方式使用第三方库的话，那么引入声明文件又是另一种方式了

- **第三方声明文件**

    当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

    我们可以直接下载下来使用，但是更推荐的是使用 `@types` 统一管理第三方库的声明文件。

    `@types` 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

    ```bash
    npm install @types/jquery --save-dev
    ```

    可以在[这个页面](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

#### 1.9.4 书写声明文件

全局变量是最简单的一种场景，之前举的例子就是通过 `<script>` 标签引入 jQuery，注入全局变量 `$` 和 `jQuery`。

使用全局变量的声明文件时，如果是以 `npm install @types/xxx --save-dev` 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 `src` 目录下（或者对应的源码目录下）：

```autoit
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

如果没有生效，可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

全局变量的声明文件主要有以下几种语法：

- [`declare var`](https://ts.xcatliu.com/basics/declaration-files.html#declare-var) 声明全局变量
- [`declare function`](https://ts.xcatliu.com/basics/declaration-files.html#declare-function) 声明全局方法
- [`declare class`](https://ts.xcatliu.com/basics/declaration-files.html#declare-class) 声明全局类
- [`declare enum`](https://ts.xcatliu.com/basics/declaration-files.html#declare-enum) 声明全局枚举类型
- [`declare namespace`](https://ts.xcatliu.com/basics/declaration-files.html#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](https://ts.xcatliu.com/basics/declaration-files.html#interface-he-type) 声明全局类型

##### 19.9.4.1 declare var

在所有的声明语句中，`declare var` 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 `declare let` 和 `declare const`，使用 `let` 与使用 `var` 没有什么区别：

```ts
// src/jQuery.d.ts

declare let jQuery: (selector: string) => any;
```

```ts
// src/index.ts

jQuery('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};
```

而当我们使用 `const` 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了[4](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/04-declare-const-jquery)：

```ts
// src/jQuery.d.ts

declare const jQuery: (selector: string) => any;

jQuery('#foo');
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
```

**一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 `const` 而不是 `var` 或 `let`。**

**需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现[5](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/05-declare-jquery-value)：**

```ts
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: An implementation cannot be declared in ambient contexts.
```

##### 1.9.4.2 declare function

`declare function` 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 `function` 来定义：

```ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
```

```ts
// src/index.ts

jQuery('#foo');
```

在函数类型的声明语句中，函数重载也是支持的[6](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/06-declare-function)：

```ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
```

```ts
// src/index.ts

jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});
```

##### 1.9.4.3 declare class

当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型[7](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/07-declare-class)：

```ts
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```

```ts
// src/index.ts

let cat = new Animal('Tom');
```

同样的，`declare class` 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 `sayHi` 方法的具体实现则会报错：

```ts
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi() {
        return `My name is ${this.name}`;
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
}
```

##### 1.9.4.4 declare enum

使用 `declare enum` 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下[8](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/08-declare-enum)：

```ts
// src/Directions.d.ts

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

```ts
// src/index.ts

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

与其他全局变量的类型声明一致，`declare enum` 仅用来定义类型，而不是具体的值。

`Directions.d.ts` 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：

```js
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

其中 `Directions` 是由第三方库定义好的全局变量。

##### 1.9.4.5 declare namespace

`namespace` 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 `module` 关键字表示内部模块。但由于后来 ES6 也使用了 `module` 关键字，ts 为了兼容 ES6，使用 `namespace` 替代了自己的 `module`，更名为命名空间。

随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 `namespace`，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 `namespace` 的使用了。

`namespace` 被淘汰了，但是在声明文件中，`declare namespace` 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

比如 `jQuery` 是一个全局变量，它是一个对象，提供了一个 `jQuery.ajax` 方法可以调用，那么我们就应该使用 `declare namespace jQuery` 来声明这个拥有多个子属性的全局变量。

```ts
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```

```ts

// src/index.ts

jQuery.ajax('/api/get_something');
```

注意，在 `declare namespace` 内部，我们直接使用 `function ajax` 来声明函数，而不是使用 `declare function ajax`。类似的，也可以使用 `const`, `class`, `enum` 等语句[9](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/09-declare-namespace)：

```ts
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
```

```ts
// src/index.ts

jQuery.ajax('/api/get_something');
console.log(jQuery.version);
const e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);
```

##### 1.9.4.6 嵌套的命名空间

如果对象拥有深层的层级，则需要用嵌套的 `namespace` 来声明深层的属性的类型[10](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/10-declare-namespace-nesting)：

```ts
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}
```

```ts
// src/index.ts

jQuery.ajax('/api/get_something');
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
```

假如 `jQuery` 下仅有 `fn` 这一个属性（没有 `ajax` 等其他属性或方法），则可以不需要嵌套 `namespace`[11](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/11-declare-namespace-dot)：

```ts
// src/jQuery.d.ts

declare namespace jQuery.fn {
    function extend(object: any): void;
}
```

```ts
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
```

##### 1.9.4.7 interface 和 type

除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 `interface` 或 `type` 来声明一个全局的接口或类型[12](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/12-interface)：

```ts
// src/jQuery.d.ts

interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void;
}
```

这样的话，在其他文件中也可以使用这个接口或类型了：

```ts
// src/index.ts

let settings: AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```

##### 1.9.4.8 防止命名冲突

暴露在最外层的 `interface` 或 `type` 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 `namespace` 下[13](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/13-avoid-name-conflict)：

```ts
// src/jQuery.d.ts

declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
```

注意，在使用这个 `interface` 的时候，也应该加上 `jQuery` 前缀：

```ts
// src/index.ts

let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```

##### 1.9.4.9 声明合并

假如 jQuery 既是一个函数，可以直接被调用 `jQuery('#foo')`，又是一个对象，拥有子属性 `jQuery.ajax()`（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来[14](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/14-declaration-merging)：

```ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```

```ts
// src/index.ts

jQuery('#foo');
jQuery.ajax('/api/get_something');
```

### 1.10 内置对象

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

#### 1.10.1 ECMAScript 内置对象

ECMAScript 标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

我们可以在 TypeScript 中将变量定义为这些类型：

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

更多的内置对象，可以查看 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

而他们的定义文件，则在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中

#### 1.10.2 DOM 和 BOM 内置对象

DOM 和 BOM 提供的内置对象有：

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

TypeScript 中会经常用到这些类型：

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

它们的定义文件同样在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

#### 1.10.3 TypeScript 核心库的定义文件

[TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：

```ts
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

上面的例子中，`Math.pow` 必须接受两个 `number` 类型的参数。事实上 `Math.pow` 的类型定义如下：

```ts
interface Math {
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    pow(x: number, y: number): number;
}
```

再举一个 DOM 中的例子：

```ts
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
});

// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.
```

上面的例子中，`addEventListener` 方法是在 TypeScript 核心库中定义的：

```ts
interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
}
```

所以 `e` 被推断成了 `MouseEvent`，而 `MouseEvent` 是没有 `targetCurrent` 属性的，所以报错了。

注意，TypeScript 核心库的定义中不包含 Node.js 部分。

#### 1.10.4 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## 2. 进阶

### 2.1 类型别名

类型别名用来给一个类型起个新名字。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

上例中，我们使用 `type` 创建类型别名。

类型别名常用于联合类型。

### 2.2 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

上例中，我们使用 `type` 定了一个字符串字面量类型 `EventNames`，它只能取三种字符串中的一种。

注意，**类型别名与字符串字面量类型都是使用 `type` 进行定义。**

### 2.3 元组

**数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。**

元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。

定义一对值分别为 `string` 和 `number` 的元组：

```ts
let tom: [string, number] = ['Tom', 25];
```

当赋值或访问一个已知索引的元素时，会得到正确的类型：

```ts
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);
```

也可以只赋值其中一项：

```ts
let tom: [string, number];
tom[0] = 'Tom';
```

但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

```ts
let tom: [string, number];
tom = ['Tom', 25];
```

```ts
let tom: [string, number];
tom = ['Tom'];

// Property '1' is missing in type '[string]' but required in type '[string, number]'.
```

**当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：**

```ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

### 2.4 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

枚举使用 `enum` 关键字来定义：

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

事实上，上面的例子会被编译为：

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

**手动赋值**

我们也可以给枚举项手动赋值：

```ts
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。

如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：

```ts
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

上面的例子中，递增到 `3` 的时候与前面的 `Sun` 的取值重复了，但是 TypeScript 并没有报错，导致 `Days[3]` 的值先是 `"Sun"`，而后又被 `"Wed"` 覆盖了。编译的结果是：

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 3] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

所以使用的时候需要注意，最好不要出现这种覆盖的情况。

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：

```ts
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
```

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 8] = "Mon";
    Days[Days["Tue"] = 9] = "Tue";
    Days[Days["Wed"] = 10] = "Wed";
    Days[Days["Thu"] = 11] = "Thu";
    Days[Days["Fri"] = 12] = "Fri";
    Days[Days["Sat"] = "S"] = "Sat";
})(Days || (Days = {}));
```

当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 `1`：

```ts
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

**常数项和计算所得项**

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

前面我们所举的例子都是常数项，一个典型的计算所得项的例子：

```ts
enum Color {Red, Green, Blue = "blue".length};
```

上面的例子中，`"blue".length` 就是一个计算所得项。

上面的例子不会报错，但是**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**：

```ts
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

**常数枚举**

**常数枚举是使用 `const enum` 定义的枚举类型**：

```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

上例的编译结果是：

```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

假如包含了计算成员，则会在编译阶段报错：

```ts
const enum Color {Red, Green, Blue = "blue".length};

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

**外部枚举**

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型：

```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

之前提到过，`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：

```js
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

外部枚举与声明语句一样，常出现在声明文件中。

同时使用 `declare` 和 `const` 也是可以的：

```ts
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译结果：

```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```