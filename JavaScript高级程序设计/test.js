// 默认原型

// function SuperType() {
//     this.property = true;
// }

// SuperType.prototype.getSuperValue = function() {
//     return this.property;
// }; 

// function SubType() {
//     this.subproperty = false;
// }

// SubType.prototype = new SuperType();

// SubType.prototype.getSuperValue = function() {
//     return this.subproperty;
// }

// let instance = new SubType();
// console.log(instance.getSuperValue());

// console.log(instance instanceof Object);
// console.log(instance instanceof SuperType);
// console.log(instance instanceof SubType);


// 盗用构造函数
// function SuperType() {
//     this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {
//     SuperType.call(this);
// }

// SubType.prototype = new SuperType();

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);

// let instance2 = new SubType();
// console.log(instance2.colors);


// 盗用构造函数 传递参数
// function SuperType(name) {
//     this.name = name;
// }

// SuperType.prototype.sayName = function() {
//     console.log(this.name);
// }

// function SubType(name, age) {
//     SuperType.call(this, name);
//     this.age = age;
// }

// SubType.prototype = new SuperType();

// let instance = new SubType('冬篱的川', 23);
// instance.sayName();
// console.log(instance);


// 组合继承
// function SuperType(name) {
//     this.name = name;
//     this.colors = ['red', 'blue', 'green'];
// }

// SuperType.prototype.sayName = function() {
//     console.log(this.name);
// }

// function SubType(name, age) {
//     // 继承属性
//     SuperType.call(this, name);

//     this.age = age;
// }

// SubType.prototype = new SuperType();

// SubType.prototype.sayAge = function() {
//     console.log(this.age);
// }

// let instance1 = new SubType('冬篱的川', 23);
// instance1.colors.push('black');
// console.log(instance1.colors);
// instance1.sayName();
// instance1.sayAge();

// let instance2 = new SubType('冬篱', 22);
// console.log(instance2.colors);
// instance2.sayName();
// instance2.sayAge();


// 原型式继承
// function object(o) {
//     function F() {}
//     F.prototype = o;
//     return new F();
// }


// let person = {
//     name: '冬篱的川',
//     age: 23,
//     friends: ['Shelby', 'Court', 'Van']
// };

// let anotherPerson = object(person);
// anotherPerson.name = '冬篱';
// anotherPerson.friends.push('Rob');

// let anotherPerson2 = object(person);
// anotherPerson2.name = 'Linda';
// anotherPerson2.friends.push('Barbie');

// console.log(person.friends);


// Object.create
// let person = {
//     name: '冬篱的川',
//     age: 23,
//     friends: ['Shelby', 'Court', 'Van']
// };

// let anotherPerson = Object.create(person);
// anotherPerson.name = '冬篱';
// anotherPerson.friends.push('Rob');

// let anotherPerson2 = Object.create(person);
// anotherPerson2.name = 'Linda';
// anotherPerson2.friends.push('Barbie');

// console.log(person.friends);   


// 寄生式继承
// function createAnother(original) {
//     let clone = Object.create(original);
//     clone.sayHi = function() {
//         console.log('hi');
//     };

//     return clone;
// }

// let person = {
//     name: 'Nicholas',
//     friends: ['Shelby', 'Court', 'Van']
// };

// let anotherPerson = createAnother(person);
// anotherPerson.sayHi();
// console.log(anotherPerson.name);


// 寄生式组合继承
// function inheritPrototype(subType, superType) {
//     let prototype = Object.create(superType.prototype);
//     prototype.constructor = subType;
//     subType.prototype = prototype
// }

// function SuperType(name) {
//     this.name = name;
//     this.colors = ['red' ,'blue', 'green'];
// }

// SuperType.prototype.sayName = function() {
//     console.log(this.name);
// }

// function SubType(name, age) {
//     SuperType.call(this, name);
//     this.age = age;
// }

// inheritPrototype(SubType, SuperType);

// SubType.prototype.sayAge = function() {
//     console.log(this.age);
// }


// class Person {
//     constructor(override) {
//         this.foo = 'foo';
//         if (override) {
//             return {
//                 bar: 'bar'
//             };
//         }
//     }
// }

// let p1 = new Person();
// let p2 = new Person(true);

// console.log(p1);
// console.log(p1 instanceof Person);

// console.log(p2);
// console.log(p2 instanceof Person);

// console.log(Person.name);


// 类的定义
// class Foo {}

// class Bar {
//     constructor() {}
// }

// class Baz {
//     get MyBaz() {}
// }

// class Qux {
//     static myQux() {

//     }
// }


// class Person {}

// let p1 = new Person();

// let p2 = new p1.constructor();

// class Person {}

// console.log(Person);
// console.log(typeof Person);


// class Person {}

// let p1 = new Person();
// console.log(p1.constructor == Person);
// console.log(p1 instanceof Person);
// console.log(p1 instanceof Person.constructor);

// let p2 = new Person.constructor();
// console.log(p2.constructor == Person);
// console.log(p2 instanceof Person);
// console.log(p2 instanceof Person.constructor);

// 实例成员
// class Person {
//     constructor() {
//         this.name = new String('Jack');
//         this.sayName = () => console.log(this.name);
//         this.nicknames = ['Jake', 'J-Dog'];
//     }
// }

// let p1 = new Person();
// let p2 = new Person();

// console.log(p1.name === p2.name);
// console.log(p1.sayName === p2.sayName);
// console.log(p1.nicknames === p2.nicknames);  


// class Person {
//     constructor() {
//         this.locate = () => console.log('instance');
//     }
//     locate() {
//         console.log('prototype');
//     }

//     set name(newValue) {
//         this.name_ = newValue;
//     }

//     get name() {
//         return this.name_
//     }
// }

// let p = new Person();
// p.name = 'Joy';
// console.log(p.name_);
// p.locate();

// Person.prototype.locate();


// class Vehicle {
//     identityPrototype(id) {
//         console.log(id, this);
//     }
//     static identifyClass(id) {
//         console.log(id, this);
//     }
// }

// class Bus extends Vehicle {}

// let v = new Vehicle();
// let b = new Bus();

// b.identityPrototype('bus');
// v.identityPrototype('vehicle');

// Bus.identifyClass('bus');
// Vehicle.identifyClass('vehicle');


// class Vehicle {}

// class Car extends Vehicle {}

// class Bus extends Vehicle {
//     constructor() {
//         super();
//     }
// }

// class Van extends Vehicle {
//     constructor() {
//         return {};
//     }
// }

// console.log(new Van() instanceof Van);



// 抽象基类
// class Vehicle {
//     constructor() {
//         console.log(new.target);
//         if (new.target === Vehicle) {
//             throw new Error('Vehicle canot be directly instantiated');
//         }
//         if (!this.foo) {
//             throw new Error('Inheriting class must define foo()');
//         }

//         console.log('success');
//     }
// }

// class Bus extends Vehicle {
//     // foo() {}
// }

// new Bus();

// new Vehicle();


// 
// class Vehicle {}

// let FooMixin = (SuperClass) => class extends SuperClass {
//     foo() {
//         console.log('foo');
//     }
// };

// let BarMixin = (SuperClass) => class extends SuperClass {
//     bar() {
//         console.log('bar');
//     }
// };

// let BazMixin = (SuperClass) => class extends SuperClass {
//     baz() {
//         console.log('baz');
//     }
// };

// class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) {}

// let b = new Bus();
// b.foo();
// b.bar();
// b.baz();


// 9 代理与反射
// 创建空代理
// const target = {
//     id: 'target'
// };

// const handler = {};

// const proxy = new Proxy(target, handler);

// console.log(target.id);
// console.log(proxy.id);

// target.id = 'foot';
// console.log(target.id);
// console.log(proxy.id);

// console.log(target.hasOwnProperty('id'));
// console.log(proxy.hasOwnProperty('id'));

// console.log(target == proxy);



// 定义 get() 捕获器
// const target = {
//     foo: 'bar'
// };

// const handler = {
//     get() {
//         return 'handler override';
//     }
// }

// const proxy = new Proxy(target, handler);

// console.log(target.foo);
// console.log(proxy.foo);

// console.log(target['foo']);
// console.log(proxy['foo']);

// console.log(Object.create(target)['foo']);
// console.log(Object.create(proxy)['foo']);


// 使用 Reflect 重建原始行为
// const target = {
//     foo: 'bar'
// };

// const handler = {
//     // get() {
//     //     return Reflect.get(...arguments);
//     // }

//     get: Reflect.get
// }

// const proxy = new Proxy(target, handler);

// console.log(proxy.foo);
// console.log(target.foo);



// 创建可以捕获所有方法，转发给空代理
// const target = {
//     foo: 'bar'
// };

// const proxy = new Proxy(target, Reflect);

// console.log(proxy.foo);
// console.log(target.foo);


// Reflect 使用实例
// const target = {
//     foo: 'bar',
//     baz: 'qux'
// };

// const handler = {
//     get(trapTarget, property, receiver) {
//         let decoration = '';
//         if (property === 'foo') {
//             decoration = '!!!';
//         }

//         return Reflect.get(...arguments) + decoration;
//     }
// }

// const proxy = new Proxy(target, handler);

// console.log(proxy.foo); // bar!!!
// console.log(target.foo); // bar

// console.log(proxy.baz); // qux
// console.log(target.baz); // qux


// 捕获器不变式
// const target = {};
// Object.defineProperty(target, 'foo', {
//     configurable: false,
//     writable: false,
//     value: 'bar'
// });

// const handler = {
//     get() {
//         return 'qux';
//     }
// };

// const proxy = new Proxy(target, handler);

// console.log(proxy.foo);


// 撤销代理 revocable() 方法
// const target = {
//     foo: 'bar'
// };

// const handler = {
//     get() {
//         return 'intercepted';
//     }
// };

// const { proxy, revoke } = Proxy.revocable(target, handler);

// console.log(proxy.foo);
// console.log(target.foo);

// revoke(); // 撤销代理

// console.log(proxy.foo);


// 状态标记
// const o = {};

// if (Reflect.deleteProperty(o, 'foo', {value: 'bar'})) {
//     console.log('success');
// } else {
//     console.log('failure');
// }



// 替代一些操作符
// let p = {
//     name: '冬篱的川',
//     age: 23
// };

// console.log(Reflect.get(p, 'name'));
// console.log(Reflect.set(p, 'age', 22));
// console.log(Reflect.get(p, 'age'));


// 代理的代理
// const target = {
//     foo: 'bar'
// };

// const firstProxy = new Proxy(target, {
//     get() {
//         console.log('first proxy');
//         return Reflect.get(...arguments);
//     }
// });

// const secondProxy = new Proxy(firstProxy, {
//     get() {
//         console.log('second proxy');
//         return Reflect.get(...arguments);
//     }
// });

// console.log(secondProxy.foo);


// 第 10 章 函数
// 几种声明方式
// function sum1(num1, num2) {
//     retuarn num1 + num2;
// }

// let sum2 = function(num1, num3) {
//     return num1 + num2;
// };

// let sum3 = (num1, num2) => {
//     return num1 + num2;
// };

// let sum4 = new Function("num1", "num2", "return num1 + num2");


// 箭头函数



// 默认参数值
// function makeKing(name = 'Henry') {
//     name = 'Louis';
//     return `name = ${name}\narguments[0] = ${arguments[0]}`;
// }

// console.log(makeKing());
// console.log(makeKing('Louis'));


// 默认参数初始化顺序
// function makeKing(name = 'Henry', numerals = name) {
//     return `King ${name} ${numerals}`;
// }

// console.log(makeKing());


// 扩展参数
// function getSum() {
//     let sum = 0;
//     for (let i = 0; i < arguments.length; ++i) {
//         sum += arguments[i];
//     }

//     return sum;
// }

// let values = [1, 2, 3, 4];

// console.log(getSum.apply(null, values)); // 10
// console.log(getSum(-1, ...values)); // 9
// console.log(getSum(...values, 5)); // 15
// console.log(getSum(-1, ...values, 5)); // 14
// console.log(getSum(...values, ...[5, 6, 7])); // 28


// arguments 按照调用函数传入的参数接收每一个值
// let values = [1, 2, 3, 4];

// function countArguments() {
//     console.log(arguments.length);
// }

// countArguments(-1, ...values); // 5
// countArguments(...values, 5); // 5
// countArguments(-1, ...values, 5); // 6
// countArguments(...values, ...[5, 6, 7]); // 7


// 收集参数
// function getSum(...values) {
//     return values.reduce((x, y) => x + y, 0);
// }

// console.log(getSum(1, 2, 3)); // 6


// 函数声明和函数表达式
// console.log(sum1(10, 10));
// function sum1(num1, num2) {
//     return num1 + num2;
// }

// console.log(sum2(10, 10));
// let sum2 = function(num1, num2) {
//     return num1 + num2;
// }


// 函数作为值
// function createComparisonFunction(propertyName) {
//     return function(o1, o2) {
//         let v1 = o1[propertyName];
//         let v2 = o2[propertyName];

//         if (v1 < v2) {
//             return -1;
//         } else if (v1 > v2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     };
// }

// let data = [
//     { name: 'Zachary', age: 28 },
//     { name: 'Nicholas', age: 29 }
// ];

// data.sort(createComparisonFunction('name'));
// console.log(data);

// data.sort(createComparisonFunction('age'));
// console.log(data);


// arguments
// 阶乘函数
// function factorial(num) {
//     if (num <= 1) {
//         return 1;
//     } else {
//         // return num * factorial(num - 1);
//         return num * arguments.callee(num - 1);
//     }
// }


// this
// color = 'red';

// let o = {
//     color: 'blue'
// };

// function sayColor() {
//     console.log(this.color);
// }

// sayColor(); // 'red'

// o.sayColor = sayColor;
// o.sayColor(); // 'blue'


// 箭头函数中的 this
// function King() {
//     this.royaltyName = 'Henry';

//     setTimeout(() => console.log(this.royaltyName), 1000);
// }

// function Queen() {
//     this.royaltyName = 'Elizabeth';

//     setTimeout(function() {console.log(this.royaltyName); }, 1000);
// }

// new King(); // 'Henry'
// new Queen(); // undefined


// caller
// function outer() {
//     inner();
// }

// function inner() {
//     // console.log(inner.caller);
//     console.log(arguments.callee.caller);
// }

// outer();


// new.target
// function King() {
//     if (!new.target) {
//         throw 'King must be instantiated using new'
//     } 
//     console.log('King instantiated using new');
// }

// new King();
// King();


// apply
// function sum(n1, n2) {
//     return n1 + n2;
// }

// function callSum1(n1, n2) {
//     return sum.apply(this, arguments);
// }

// function callSum2(n1, n2) {
//     return sum.apply(this, [n1, n2]);
// }

// console.log(callSum1(10, 12)); // 22
// console.log(callSum2(10, 12)); // 22


// call
// color = 'red';
// let o = {
//     color: 'blue'
// };

// function sayColor() {
//     console.log(this.color);
// }

// sayColor();

// sayColor.call(this);
// sayColor.call(globalThis);
// sayColor.call(o);


// bind()
// color = 'red';
// let o = {
//     color: 'blue'
// };

// function sayColor() {
//     console.log(this.color);
// }

// let ob = sayColor.bind(o);
// ob();
// console.log(ob === sayColor);


// function count() {
//     let count = 0;
//     return function() {
//         return ++count;
//     }
// }

// let c = count();
// console.log(c());
// console.log(c());
// console.log(c());

// let x = function() {

// }

// for (var i = 0; i < 5; ++i) {
//     console.log(i);
// }
// console.log(i);


// this 对象
// identity = 'The Window';
// let o = {
//     identity: 'My Object',
//     getIdentityFunc() {
//         // return function() {
//         return () => {
//             return this.identity;
//         };
//     },
//     getIdentity() {
//         return this.identity;
//     }
// }

// console.log(o.getIdentity());
// console.log(o.getIdentityFunc()());


// identity = 'The Window';
// let o = {
//     identity: 'My Object',
//     getIdentity() {
//         return this.identity;
//     }
// }

// console.log(o.getIdentity());
// console.log((o.getIdentity)());
// console.log((o.getIdentity = o.getIdentity)());


// 私有变量
// 构造函数特权方法
// function MyObject() {
//     // 私有变量
//     let privateVariable = 10;

//     // 私有函数
//     function privateFunction() {
//         return false;
//     }

//     // 特权方法
//     this.publicMethod = function() {
//         privateVariable++;
//         return privateFunction();
//     }
// }


// 静态私有变量
// (function() {
//     // 私有变量
//     let privateVariable = 10;
//     // 私有函数
//     function privateFunction() {
//         return false;
//     }

//     // 构造函数
//     MyObject = function() {};

//     // 共有和特权方法
//     MyObject.prototype.publicMethod = function() {
//         privateVariable++;
//         return privateFunction();
//     };
// })();


// 单例模式
// let singleton = {
//     name: 1,
//     method() {}
// }

// 模块模式
// let singleton = function() {
//     let privateVariable = 10;
//     function privateFunction() {
//         return false;
//     }
//     return {
//         publicProperty: true,
//         publicMethod() {
//             privateVariable++;
//             return privateFunction();
//         }
//     }
// }


// 第11章 期约与异步编程
// 11.1 异步编程
// function double(value) {
//     setTimeout(() => setTimeout(console.log, 0, value * 2), 1000);
// }

// double(3);


// 返回异步值
// function double(value, callback) {
//     setTimeout(() => callback(value * 2), 1000);
// }

// double(3, (x) => console.log(`I was given: ${x}`));


// 失败处理
// function double(value, success, failure) {
//     setTimeout(() => {
//         try {
//             if (typeof value !== 'number') {
//                 throw 'Must provide number as first argument';  
//             }
//             success(2 * value);
//         } catch (e) {
//             failure(e);
//         }
//     }, 1000);
// }

// const successCallback = (x) => console.log(`Success: ${x}`);

// const failureCallback = (x) => console.log(`Failure: ${x}`);

// double(3, successCallback, failureCallback);
// double('3', successCallback, failureCallback);


// 异步嵌套回调
// function double(value, success, failure) {
//     setTimeout(() => {
//         try {
//             if (typeof value !== 'number') {
//                 throw 'Must provide number as first argument';
//             }
//             success(2 * value);
//         } catch (e) {
//             failure(e);
//         }
//     }, 1000);  
// }

// const successCallback = (x) => {
//     double(x, (y) => console.log(`Success: ${y}`));
// };

// const failureCallback = (e) => {
//     console.log(`Failure: ${e}`);
// };

// double(3, successCallback, failureCallback);



// 期约
// let p1 = new Promise((resolve, reject) => resolve());
// setTimeout(console.log, 0, p1);

// let p2 = new Promise((resolve, reject) => reject());
// setTimeout(console.log, 0, p2);


// new Promise(() => setTimeout(console.log, 0, 'executor'));
// setTimeout(console.log, 0, 'promise initialized')


// Thenable 接口
// function onResolved(id) {
//     setTimeout(console.log, 0, id, 'resolved');
// }

// function onRejected(id) {
//     setTimeout(console.log, 0, id, 'rejected');
// }

// let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
// let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// p1.then(() => onResolved('p1'), 
//         () => onRejected('p1'));

// p2.then(() => onResolved('p2'), 
// () => onRejected('p2'));


// 
// let p = new Promise(
//     (resolve, reject) => {
//         setTimeout(resolve, 1000);
//     }
// )

// setTimeout(console.log, 0, p);


// setTimeout(
//     console.log,
//     0,
//     Promise.resolve(4, 5, 6)
// );


// setTimeout(
//     console.log,
//     0,
//     Promise.reject(Promise.resolve())
// );


// function onResolved(id) {
//     setTimeout(
//         console.log,
//         0,
//         id,
//         'resolved'
//     );
// }

// function onRejected(id) {
//     setTimeout(
//         console.log,
//         0,
//         id,
//         'rejected'
//     );
// }

// let p1 = new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             resolve,
//             3000
//         );
//     }
// )

// let p2 = new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             reject,
//             3000
//         );
//     }
// )

// p1.then(
//     () => {
//         onResolved('p1');
//     },
//     () => {
//         onRejected('p1');
//     }
// )

// p2.then(
//     () => {
//         onResolved('p2');
//     },
//     () => {
//         onRejected('p2');
//     }
// )


// let p = Promise.reject();
// let onRejected = function(e) {
//     setTimeout(
//         console.log,
//         0,
//         'rejected'
//     );
// };

// p.then(
//     null,
//     onRejected
// );

// p.catch(onRejected);


// let p = Promise.resolve();

// p.then(
//     () => {
//         console.log('onResolved handler');
//     }
// );

// console.log('then() returns');



// let synchronousResolve;

// let p = new Promise(
//     (resolve) => {
//         synchronousResolve = function() {
//             console.log('1: invoking resolve()');
//             resolve();
//             console.log('2: resolve() returns');
//         };
//     }
// );

// p.then(
//     () => {
//         console.log('4: then() handler executes');
//     }
// );

// synchronousResolve();

// console.log('3: synchronousResolve returns');



// let p1 = Promise.resolve();
// p1.then(
//     () => {
//         console.log('p1.then() onResolved');
//     }
// );
// console.log('p1.then() returns');

// let p2 = Promise.reject();
// p2.then(
//     null,
//     () => {
//         console.log('p2.then() onRejected');
//     }
// );
// console.log('p2.then() returns');

// let p3 = Promise.reject();
// p3.catch(
//     () => {
//         console.log('p3.catch() onRejected');
//     }
// );
// console.log('p3.catch() returns');

// let p4 = Promise.resolve();
// p4.finally(
//     () => {
//         console.log('p4.finally() onFinally');
//     }
// );
// console.log('p4.finally() returns');



// let p1 = Promise.resolve();
// let p2 = Promise.reject();

// p1.then(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             1
//         );
//     }
// );

// p1.then(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             2
//         );
//     }
// );

// p2.then(
//     null,
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             3
//         )
//     }
// );

// p2.then(
//     null,
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             4
//         )
//     }
// );

// p2.catch(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             5
//         )
//     }
// );

// p2.catch(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             6
//         )
//     }
// );

// p2.finally(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             7
//         )
//     }
// );

// p2.finally(
//     () => {
//         setTimeout(
//             console.log,
//             0,
//             8
//         )
//     }
// );


// let p1 = new Promise(
//     (resolve, reject) => {
//         resolve('foo');
//     }
// );
// p1.then(
//     (value) => {
//         console.log(value);
//     }
// );

// let p2 = new Promise(
//     (resolve, reject) => {
//         reject('bar');
//     }
// );
// p2.catch(
//     (reason) => {
//         console.log(reason);
//     }
// );


// let p1 = new Promise(
//     (resolve, reject) => {
//         reject(Error('foo'));
//     }
// );

// let p2 = new Promise(
//     (resolve, reject) => {
//         throw Error('foo');
//     }
// );

// let p3 = Promise.resolve().then(
//     () => {
//         throw Error('foo');
//     }
// );

// let p4 = Promise.reject(Error('foo'));

// setTimeout(console.log, 0, p1);
// setTimeout(console.log, 0, p2);
// setTimeout(console.log, 0, p3);
// setTimeout(console.log, 0, p4);


// 异步错误处理
// new Promise(
//     (resolve, reject) => {
//         console.log('begin asynchronous execution');
//         reject(Error('bar'));
//     }
// ).catch(
//     (e) => {
//         console.log('caught error', e);
//     }
// ).then(
//     () => {
//         console.log('continue asynchronous execution');
//     }
// );


// function delayedResolve(str) {
//     return new Promise(
//         (resolve, reject) => {
//             console.log(str);
//             setTimeout(resolve, 1000);
//         }
//     );
// }

// delayedResolve('p1 executor')
//     .then(() => delayedResolve('p2 executor'))
//     .then(() => delayedResolve('p3 executor'))
//     .then(() => delayedResolve('p4 executor'))


//     A
//    / \
//   B   C
//  / \ / \
// D  E F  G

// let A = new Promise(
//     (resolve, reject) => {
//         console.log('A');
//         resolve();
//     }
// );
// let B = A.then(() => console.log('B'))
// let C = A.then(() => console.log('C'))

// B.then(() => console.log('D'))
// B.then(() => console.log('E'))
// C.then(() => console.log('F'))
// C.then(() => console.log('G'))


// Promise.all()
// let p1 = Promise.all(
//     [
//         Promise.resolve(),
//         Promise.resolve()
//     ]
// );

// let p2 = Promise.all([3, 4]); // 自动转换

// let p3 = Promise.all([]); // 等价于 Promise.resolve()

// let p4 = Promise.all(); // 无效的语法


// let p = Promise.all([
//     Promise.resolve(),
//     new Promise(
//         (resolve, reject) => {
//             setTimeout(resolve, 1000);
//         }
//     )
// ]);

// setTimeout(console.log, 0, p);

// p.then(
//     () => {
//         setTimeout(console.log, 0, 'all() resolved');
//     }
// );


// let p = Promise.all([
//     Promise.resolve(1),
//     Promise.resolve(),
//     Promise.resolve(3)
// ]);

// p.then(
//     (values) => {
//         setTimeout(
//             console.log,
//             0,
//             values
//         );
//     }
// );


// let p1 = Promise.race([
//     Promise.resolve(3),
//     new Promise(
//         (resolve, reject) => {
//             setTimeout(reject, 1000);
//         }
//     )
// ]);
// setTimeout(console.log, 0, p1);

// let p2 = Promise.race([
//     Promise.reject(4),
//     new Promise(
//         (resolve, reject) => {
//             setTimeout(resolve, 1000);
//         }
//     )
// ]);
// setTimeout(console.log, 0, p2);

// let p3 = Promise.race([
//     Promise.resolve(5),
//     Promise.resolve(6),
//     Promise.resolve(7)
// ]);
// setTimeout(console.log, 0, p3);


// function addTwo(x) { return x + 2;}
// function addThree(x) { return x + 3;}
// function addFive(x) { return x + 5;}
// function addTen(x) { return addFive(addThree(addTwo(x)));}

// function addTen(x) {
//     return Promise.resolve(x)
//         .then(addTwo)
//         .then(addThree)
//         .then(addFive);
// }

// function addTen2(x) {
//     return [addTwo, addThree, addFive]
//         .reduce(
//             (promise, fn) => promise.then(fn),
//             Promise.resolve(x)
//         )
// }

// function compose(...fns) {
//     return (x) => fns.reduce(
//         (promise, fn) => promise.then(fn),
//         Promise.resolve(x)
//     );
// }

// let addTen3 = compose(addTwo, addThree, addFive);

// addTen(8).then(console.log);
// addTen2(8).then(console.log);
// addTen3(8).then(console.log);


// // async
// async function foo() {}

// let bar = async function() {};

// let baz = async () => {};

// class Qux {
//     async qux() {}
// }


// async function foo() {
//     console.log(1);
// }

// foo();
// console.log(2);


// async function foo() {
//     console.log(1);

//     // return 3;
//     return Promise.resolve(3);
// }

// foo().then(console.log);

// console.log(2);


// 返回一个原始值
// async function foo() {
//     return 'foo';
// }
// foo().then(console.log);

// // 返回一个没有实现 thenable 接口的对象
// async function bar() {
//     return ['bar'];
// }
// bar().then(console.log);

// 返回一个实现了 thenable 对象的非期约对象
// async function baz() {
//     const thenable = {
//         then(callback) {
//             callback('baz');
//         }
//     };
//     return thenable;
// }
// baz().then(console.log);

// // 返回一个期约
// async function qux() {
//     return Promise.resolve('qux');
// }
// qux().then(console.log);

// // 在异步函数中抛出错误 返回拒绝的期约
// async function quz() {
//     console.log(1);
//     throw 3;
// }
// quz().catch(console.log);
// console.log(2);


// async function foo() {
//     console.log(await Promise.resolve('foo'));
// }
// foo();

// async function bar() {
//     return await Promise.resolve('bar');
// }
// bar().then(console.log);

// async function baz() {
//     await new Promise(
//         (resolve, reject) => {
//             setTimeout(resolve, 1000);
//         }
//     );
//     console.log('baz');
// }
// baz();


// async function foo() {
//     console.log(await Promise.resolve('foo'));
// }

// async function bar() {
//     console.log(await 'bar');
// }

// async function baz() {
//     console.log('baz');
// }

// foo();
// bar();
// baz();


// async function foo() {
//     console.log(2);
//     await null;
//     console.log(4);
// }
// console.log(1);
// foo();
// console.log(3);


// async function foo() {
//     console.log(2);
//     console.log(await Promise.resolve(8));
//     console.log(9);
// }

// async function bar() {
//     console.log(4);
//     console.log(await 6);
//     console.log(7);
// }

// console.log(1);
// foo();
// console.log(3);
// bar();
// console.log(5);


// 实现 sleep
// async function sleep(delay) {
//     return new Promise(
//         (resolve) => {
//             setTimeout(resolve, delay);
//         }
//     );
// }

// async function foo() {
//     const t0 = Date.now();
//     await sleep(1500);
//     console.log(Date.now() - t0);
// }
// foo();


// async function randomDelay(id) {
//     const delay = Math.random() * 1000;
//     return new Promise(
//         (resolve) => {
//             setTimeout(
//                 () => {
//                     console.log(`${id} finished`);
//                     resolve();
//                 },
//                 delay
//             );
//         }
//     );
// }

// async function foo() {
//     const t0 = Date.now();
//     for (let i = 0; i < 5; ++i) {
//         await randomDelay(i);
//     }

//     console.log(`${Date.now() - t0}ms elapsed`);
// }
// foo();

// async function foo2() {
//     const t0 = Date.now();

//     const p0 = randomDelay(0);
//     const p1 = randomDelay(1);
//     const p2 = randomDelay(2);
//     const p3 = randomDelay(3);
//     const p4 = randomDelay(4);

//     await p0;
//     await p1;
//     await p2;
//     await p3;
//     await p4;

//     console.log(`${Date.now() - t0}ms elapsed`);
// }
// foo2();


// async function addTwo(x) { 
//     console.log(`addTwo: x=${x}`);
//     return x + 2;
// }
// async function addThree(x) { 
//     console.log(`addThree: x=${x}`);
//     return x + 3;
// }
// async function addFive(x) { 
//     console.log(`addFive: x=${x}`);
//     return x + 5;
// }

// async function addTen(x) {
//     for (const fn of [addTwo, addThree, addFive]) {
//         x = await fn(x);
//     }
//     return x;
// }
// addTen(9).then(console.log);


// 第 24 章 网络请求与远程资源
// XMLHttpRequest
// let xhr = XMLHttpRequest();

// Fetch
// let r = fetch('https://www.baidu.com');

// r.then(
//     (v) => {
//         console.log(v);
//     }
// )

// console.log(r);


// CookieUtil
// class CookieUtil {
//     static get(name) {
//         let cookieName = `${encodeURIComponent(name)}=`;
//         let cookieStart = document.cookie.indexOf(cookieName);
//         let cookieValue = null;

//         if (cookieStart > -1) {
//             let cookieEnd = document.cookie.indexOf(';', cookieStart);
//             if (cookieEnd == -1) {
//                 cookieEnd = document.cookie.length;
//             }
//             cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
//         }

//         return cookieValue;
//     }

//     static set(name, value, expires, path, domain, secure) {
//         let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

//         if (expires instanceof Date) {
//             cookieText += `; expires=${expires.toGMTString()}`;
//         }

//         if (path) {
//             cookieText += `; path=${path}`;
//         }

//         if (domain) {
//             cookieText += `; domain=${domain}`;
//         }

//         if (secure) {
//             cookieText += '; secure';
//         }

//         document.cookie = cookieText;
//     }

//     static unset(name, path, domain, secure) {
//         CookieUtil.set(name, "", new Date(0), path, domain, secure);
//     }
// }


// SubCookieUtil
// class SubCookieUtil {
//     static get(name, subName) {
//         let subCookies = SubCookieUtil.getAll(name);
//         return subCookies ? subCookies[subName] : null;
//     }

//     static getAll(name) {
//         let cookieName = encodeURIComponent(name) + '=';
//         let cookieStart = document.cookie.indexOf(cookieName);
//         let cookieValue = null;
//         let cookieEnd, subCookies, parts, result = {};

//         if (cookieStart > -1) {
//             cookieEnd = document.cookie.indexOf(';', cookieStart);
//             if (cookieEnd == -1) {
//                 cookieEnd = document.cookie.length;
//             }
//             cookieValue = document.cookie.substring(
//                 cookieStart + cookieName.length,
//                 cookieEnd
//             );

//             if (cookieValue.length > 0) {
//                 subCookies = cookieValue.split('&');

//                 for (let i = 0, len = subCookies.length; i < len; ++i) {
//                     parts = subCookies[i].split('=');
//                     result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
//                 }

//                 return result;
//             }
//         }

//         return null;
//     }
// }


// let arr = [1, 2, 3, 4, 5, 6];

// let sum = arr.reduce(
//     function(pre, cur, index, arr) {
//         return pre + cur;
//     },
//     10
// );
// console.log(sum);



// // 定型数组
// const buf = new ArrayBuffer(16);
// console.log(buf);


// DataView 
// const buf = new ArrayBuffer(16);

// const fullDataView = new DataView(buf);
// console.log(fullDataView.byteOffset);
// console.log(fullDataView.byteLength);
// console.log(fullDataView.buffer == buf);

// const firstHalfDataView = new DataView(buf, 0, 8);
// console.log(firstHalfDataView.byteOffset);
// console.log(firstHalfDataView.byteLength);
// console.log(firstHalfDataView.buffer == buf);

// const secondHalfDataView = new DataView(buf, 8);
// console.log(secondHalfDataView.byteOffset);
// console.log(secondHalfDataView.byteLength);
// console.log(secondHalfDataView.buffer == buf);



// const buf = new ArrayBuffer(2);
// const view = new DataView(buf);

// console.log(view.getInt8(0));
// console.log(view.getInt8(1));

// console.log(view.getInt16(0));

// view.setUint8(0, 255);
// view.setUint8(1, 0xFF);

// console.log(view.getInt16(0));


// const buf = new ArrayBuffer(2);
// const view = new DataView(buf);

// view.setUint8(0, 0x80); // 1000 0000
// view.setUint8(1, 0x01); // 0000 0001

// console.log(view.getUint16(0)); // 10000 0000 0000 0001 ==> 32769

// console.log(view.getInt16(0, true)); // 0000 0001 1000 0000 ==> 384





// const buf = new ArrayBuffer(6);
// const view = new DataView(buf);

// view.getInt32(4); // RangeError


// const buf = new ArrayBuffer(12);

// const ints = new Int32Array(buf);
// console.log(ints.length);

// const ints2 = new Int32Array(6);
// console.log(ints2.length);
// console.log(ints2.buffer.byteLength);

// const ints3 = new Int32Array([2, 4, 6, 8]);
// console.log(ints3.length);
// console.log(ints3.buffer.byteLength);
// console.log(ints3[2]);

// const ints4 = new Int16Array(ints3);
// console.log(ints4.length);
// console.log(ints4.buffer.byteLength);
// console.log(ints4[2]);

// const ints5 = Int16Array.from([3, 5, 7, 9]);
// console.log(ints5.length);
// console.log(ints5.buffer.byteLength);
// console.log(ints5[2]);

// const floats = Float32Array.of(3.14, 1.44, 2.33);
// console.log(floats.length);
// console.log(floats.buffer.byteLength);
// console.log(floats[2]);


// const container = new Int16Array(8);

// container.set(Int8Array.of(1, 2, 3, 4));
// console.log(container);

// container.set([5, 6, 7, 8], 4);
// console.log(container);

// container.set([5, 6, 7, 8], 7);

// const source = Int16Array.of(2, 4, 6, 8);

// const fullCopy = source.subarray();
// console.log(fullCopy);

// const halfCopy = source.subarray(2);
// console.log(halfCopy);

// const partialCopy = source.subarray(1, 3);
// console.log(partialCopy);


// function typedArrayConcat(typedArrayConstructor, ...typedArrays) {
//     const numElements = typedArrays.reduce(
//         (x, y) => (x.length || x) + y.length
//     );

//     const resultArray = new typedArrayConstructor(numElements);

//     let currentOffset = 0;
//     typedArrays.map(
//         (x) => {
//             resultArray.set(x, currentOffset);
//             currentOffset += x.length;
//         }
//     );

//     return resultArray;
// }

// const concatArray = typedArrayConcat(
//     Int32Array,
//     Int8Array.of(1, 2, 3),
//     Int16Array.of(4, 5, 6),
//     Float32Array.of(7, 8, 9)
// );

// console.log(concatArray);
// console.log(typeof concatArray);
// console.log(concatArray instanceof Int32Array);

// // 实现一个带有 .clear() 方法的类 WeakMap 类
// class ClearableWeakMap {
//     constructor(init) {
//         this._wm = new WeakMap(init);
//     }
//     clear() {
//         this._wm = new WeakMap();
//     }
//     delete(k) {
//         return this._wm.delete(k);
//     }
//     get(k) {
//         return this._wm.get(k);
//     }
//     has(k) {
//         return this._wm.has(k);
//     }
//     set(k, v) {
//         this._wm.set(k, v);
//         return this;
//     }
// }


// 生成器
// function* makeRangeIterator(start=0, end=Infinity, step=1) {
//     for (let i = start; i < end; i += step) {
//         yield i;
//     }
// }

// let a = makeRangeIterator(1, 10, 2);
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());


// function* fibonacci() {
//     let fn1 = 0;
//     let fn2 = 1;
//     let current = fn1;
//     while (true) {
//         current = fn1;
//         fn1 = fn2;
//         fn2 = current + fn1;

//         var reset = yield current;

//         if (reset) {
//             fn1 = 0;
//             fn2 = 1;
//         }
//     }
// }

// let sequence = fibonacci();
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next(true).value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);


// function* g4() {
//     yield*[1, 2, 3];
//     return "foo";
// }

// var result;

// function* g5() {
//     result = yield* g4();
// }

// var iterator = g5();

// console.log(iterator.next()); // { value: 1, done: false }
// console.log(iterator.next()); // { value: 2, done: false }
// console.log(iterator.next()); // { value: 3, done: false }
// console.log(iterator.next()); // { value: undefined, done: true },
// // 此时 g4() 返回了 { value: "foo", done: true }

// console.log(result); // "foo"


// 原型式继承
// function Person(first, last, age, gender, interests) {
//     this.name = {
//         first,
//         last
//     };
//     this.age = age;
//     this.gender = gender;
//     this.interests = interests;
// }

// Person.prototype.greeting = function() {
//     console.log(`Hi! I'm ${this.name.first} .`);
// }

// function Teacher(first, last, age, gender, interests, subject) {
//     Person.call(this, first, last, age, gender, interests);
//     this.subject = subject;
// }


// function Person(name, age) {
//     console.log(`I'm ${name}, ${age} years old!`);
//     this.name = name;
//     this.age = age;
// }

// let p = new Person("周翔辉", 23);
// console.log(p);

// let Person = function() {};

// Person.prototype.name = "Nicholas";
// Person.prototype.age = 29;
// Person.prototype.sayName = function() {
//     console.log(this.name);
// }

// let p1 = new Person();
// p1.name = "jj";
// p1.sayName();

// let p2 = new Person();
// p2.name = "z";
// p2.sayName();

// console.log(p1);
// console.log(p2);
// console.log(p1.sayName == p2.sayName);


// function SuperType() {
//     this.property = true;
// }

// SuperType.prototype.getSuperValue = function() {
//     return this.property;
// }

// function SubType() {
//     this.property = false;
//     this.subproperty = false;
// }

// SubType.prototype = new SuperType();

// SubType.prototype.getSuperValue = function() {
//     return this.subproperty;
// }

// let instance = new SubType();
// console.log(instance);

// var obj = {
//     '2':3,
//     '3': 4,
//     'length': 2,
//     'splice': Array.prototype.splice,
//     'push': Array.prototype.push
// };

// obj.push(1);
// obj.push(2);
// console.log(obj);

// class Vehicle {
//     constructor(name, shape) {
//         this.name = name;
//         this.shape = shape;
//     }
// }

// class Bus extends Vehicle {
//     constructor(name, shape, size) {
//         this.size = size
//         super(name, shape)
//     }
// }

// let bus = new Bus("A32", "cube", 32);
// console.log(bus);


// Proxy
// const handler = {
//     get: function(obj, prop) {
//         return prop in obj ? obj[prop] : 37;
//     }
// };

// const p = new Proxy({}, handler);
// p.a = 1;
// p.b = undefined;

// console.log(p.a, p.b);      // 1, undefined
// console.log('c' in p, p.c); // false, 37


// var getCode = (function () {
//     var secureCode = "0]Eal(eh&2"; // A code we do not want outsiders to be able to modify...

//     return function () {
//         return secureCode;
//     };
// })();

// console.log(getCode()); // Returns the secret code


// let p = Promise.all([
//     Promise.resolve(1),
//     Promise.reject(2),
//     Promise.resolve(3)
// ]);

// p.catch(
//     (v) => console.log(v)
// )
// .then(
//     (values) => {
//         setTimeout(
//             console.log,
//             0,
//             values
//         );
//     }
// );

// async function foo() {
//     console.log('foo');
//     return 'bar';
// }

// foo().then(v => console.log(v));
// console.log('ff');


// scroll
// 正常滚动
// window.scrollTo({
//     left: 100,
//     top: 100,
//     behavior: 'auto'
// });

// // 平滑滚动
// window.scrollTo({
//     left: 100,
//     top: 100,
//     behavior: 'smooth'
// });


// location.search
// let getQueryStringQrgs = function() {
//     let gs = (location.search.length > 0 ? location.search.substring(1) : ""),
//     args = {};
//     for (const item of qs.split("&").map(kv => kv.split("="))) {
//         let name = decodeURIComponent(item[0]);
//         let value = decodeURIComponent(item[1]);
//         if (name.length) {
//             args[name] = value
//         }
//     }

//     return args;
// }


// // URLSearchParams
// let qs = "?q=javascript&num=10";

// let searchParams = new URLSearchParams(qs);

// console.log(searchParams.toString());
// console.log(searchParams.has("num"));
// console.log(searchParams.get("num"));

// searchParams.set("page", 3);
// console.log(searchParams.toString());

// searchParams.delete("q");
// console.log(searchParams.toString());


// let node = new Node('div');
// console.log(node.nodeName);


// 
// const loadData = async () => {
//     const url = `https://jsonplaceholder.typicode.com/todo1/1`;
//     const res = await fetch(url);
//     console.log(res);

// };

// loadData();


// // 动态样式
// let link = document.createElement('link');
// link.rel = 'stylesheet';
// link.type = 'text/css';
// link.href = 'style.css';
// let head = document.getElementsByTagName('head')[0];
// head.appendChild(link);


// 操作表格
// 创建表格
// let table = document.createElement('table');
// table.border = 1;
// table.width = '100%';

// // 创建表体
// let tbody = document.createElement('tbody');
// table.appendChild(tbody);

// // 创建第一行
// let row1 = document.createElement('tr');
// tbody.appendChild(row1);
// let cell1_1 = document.createElement('tr');
// cell1_1.appendChild(document.createTextNode('Cell 1, 1'));
// row1.appendChild(cell1_1);
// let cell1_2 = document.createElement('tr');
// cell1_2.appendChild(document.createTextNode('Cell 1, 2'));
// row1.appendChild(cell1_2);

// // 创建第二行
// let row2 = document.createElement('tr');
// tbody.appendChild(row1);
// let cell2_1 = document.createElement('tr');
// cell2_1.appendChild(document.createTextNode('Cell 2, 1'));
// row2.appendChild(cell2_1);
// let cell2_2 = document.createElement('tr');
// cell2_2.appendChild(document.createTextNode('Cell 2, 2'));
// row2.appendChild(cell2_2);


// // MutaionObserver 接口
// let observer = new MutationObserver(
//     () => console.log('<body>attributes changed')
// );

// observer.observe(
//     document.body, 
//     { attributes: true}
// );

// document.body.className = 'foo';
// console.log('Changed body class');

// // Changed body class
// // <body> attributed changed


// // querySelector()
// // 取得 <body> 元素
// let body = document.querySelector('body');

// // 取得 ID 为 'myDiv' 的元素
// let myDiv = document.querySelector('#myDiv');

// // 取得类名为 'selected' 的第一个元素
// let selected = document.querySelector('.selected');

// // 取得类名为 'button' 的图片
// let img = document.body.querySelector('img.button');


// // querySelectorAll()
// // 取得 ID 为 "myDiv" 的 <div> 元素中的所有 <em>元素
// let ems = document.getElementById('myDiv').querySelectorAll('em');

// // 取得所有类名中包含 'selected' 的元素
// let selecteds = document.querySelectorAll('.selected');

// // 取得所有是 <p> 元素子元素的 <strong> 元素
// let strongs = document.querySelectorAll('p strong');

// // 遍历
// for (const strong of strongs) {
//     strong.className = 'important';
// }



// // 元素遍历
// let parentElement = document.getElementById('parent');
// let currentChildElement = parentElement.firstElementChild;

// while (currentChildElement) {
//     if (currentChildElement === parentElement.lastElementChild) {
//         break;
//     }

//     currentChildElement = currentChildElement.nextElementSibling;
// }


// // 自定义数据属性
// let div = document.getElementById('myDiv');

// // 取得自定义数据属性的值
// let appId = div.dataset.appId;
// let myName = div.dataset.myname;

// // 设置自定义数据属性的值
// div.dataset.appId = 1233;
// div.dataset.myname = 'jj';

// // 有 'myname' 吗 ?
// if (div.dataset.myname) {
//     console.log(`hello ${div.dataset.myname}`);
// }


// // DOM 事件对象
// let btn = document.getElementById('myBtn');
// btn.onclick = function(event) {
//     console.log(event.type);
// };

// btn.addEventListener('click', (event) => {
//     console.log(event.type);
// }, false);


// 鼠标和滚轮事件
// let div = document.getElementById("myDiv");
// div.addEventListener("click", (event) => {
//     let keys = new Array();
//     if (event.shiftKey) {
//         keys.push("shift");
//     }
//     if (event.ctrlKey) {
//         keys.push("ctrl");
//     }
//     if (event.altKey) {
//         keys.push("alt");
//     }
//     if (event.metaKey) {
//         keys.push("meta");
//     }
//     console.log("Keys: " + keys.join(","));
// });


// // 早期定时动画
// (function() {
//     function updateAnimations() {
//         doAnimation1();
//         doAnimation2();
//     }
//     setInterval(updateAnimations, 100);
// })();


// // requestAnimationFrame()
// function updateProgress() {
//     var div = document.getElementById('status');
//     div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
//     if (div.style.left != "100%") {
//         requestAnimationFrame(updateProgress);
//     }
// }
// requestAnimationFrame(updateProgress);



// // 表单
// let form = document.getElementById('form1');

// // 取得页面中的第一个表单
// let firstForm = document.forms[0];

// // 取得名字为 “form2” 的表单
// let myForm = document.forms['form2'];

// let form = document.getElementById('myForm');

// form.addEventListener('submit', (event) => {
//     // 阻止表单提交
//     event.preventDefault();
// })

// let form = document.getElementById('myForm');
// // 提交表单
// form.onsubmit();


// // 阻止表单重置
// let form = document.getElementById('myForm');

// form.addEventListener('reset', (event) => {
//     event.preventDefault();
// })



// // 表单字段
// let form = document.getElementById('form1');

// // 取得表单中的第一个字段
// let field1 = form.elements[0];

// //  取得表单中名为 "texbox1" 的字段
// let field2 = form.elements['texbox1'];

// // 取得字段的数量
// let fieldCount = form.elements.length;


// // 表单字段的公共属性
// let form = document.getElementById('myForm');
// let field = form.elements[0];

// // 修改字段的值
// field.value = "Another Value";

// // 检查字段所属的表单
// console.log(field.form === form); // true

// // 给字段设置焦点
// field.focus();

// // 禁用字段
// field.disabled = true;

// // 改变字段的类型 (不推荐，但是可能)
// field.type = 'checkbox';


// // 避免多次提交表单的代码
// let form = document.getElementById('myForm');

// form.addEventListener('submit', (event) => {
//     let target = event.target;

//     // 取得提交按钮
//     let btn = target.elements['submit-btn'];

//     // 禁用提交按钮
//     btn.disabled = true;
// });


// 表单字段的公共方法
// window.addEventListener('load', (event) => {
//     document.forms[0].elements[0].focus();
// });

// window.addEventListener('load', (event) => {
//     let element = document.forms[0].elements[0];

//     if (element.autofocus !== true) {
//         element.focus();
//         console.log("JS Focus");
//     }
// });


// // 表单字段的公共事件
// let textbox = document.forms[0].elements[0];
// textbox.addEventListener('focus', (event) => {
//     let target = event.target;
//     if (target.style.backgroundColor != 'red') {
//         target.style.backgroundColor = 'yellow';
//     }
// });

// textbox.addEventListener('blur', (event) => {
//     let target = event.target;
//     target.style.backgroundColor = /[^\d]/.test(target.value) ? "red" : "";
// });

// textbox.addEventListener('change', (event) => {
//     let target = event.target;
//     target.style.backgroundColor = /[^\d]/.test(target.value) ? "red" : "";
// });


// 文本框编程
// let textbox = document.forms[0].elements['textbox1'];
// console.log(textbox.value);

// textbox.value = 'Some new value';

// 选择文本
// let textbox = document.forms[0].elements['textbox1'];
// textbox.select();

// textbox.addEventListener('focus', (event) => {
//     event.target.select();
// });


// // select 事件
// let textbox = document.forms[0].elements['textbox1'];

// textbox.addEventListener('select', (event) => {
//     console.log(`Text selected: ${textbox.value}`);
// })


// // 取得选中文本
// function getSelectedText(textbox) {
//     return textbox.value.substring(textbox.selectionStart,
//                                     textbox.selectionEnd);
// }


// // 部分选中文本
// textbox.value = 'hello world';

// // 选择所有文本
// textbox.setSelectionRange(0, textbox.value.length);

// // 选择前三个字符
// textbox.setSelectionRange(0, 3);


// JavaScript API
// // SharedBufferArray
// const wokerScript = `
// self.onmessage = ({data}) => {
//     const view = new Uint32Array(data);

//     // 执行 1 000 000 次 加操作
//     for (let i = 0; i < 1e6; ++i) {
//         // 线程不安全操作会导致资源争用
//         view[0] += 1;
//     }

//     self.postMessage(null);
// }
// `;

// const workerScriptBlobUrl = URL.createObjectURL(new Blob([wokerScript]));

// // 创建容量为 4 的工作线程池
// const workers = [];
// for (let i = 0; i < 4; ++i) {
//     workers.push(new Worker(workerScriptBlobUrl));
// }

// // 在最后一个线程完成后打印最终值
// let responseCount = 0;
// for (const worker of workers) {
//     worker.onmessage = () => {
//         if (++responseCount == workers.length) {
//             console.log(`Final buffer value: ${view[0]}`);
//         }
//     }
// }

// // 初始化 SharedBufferArray
// const sharedArrayBuffer = new SharedArrayBuffer(4);
// const view = new Uint32Array(sharedArrayBuffer);

// // 把 SharedArrayBuffer 发送到每个工作线程
// for (const worker of workers) {
//     worker.postMessage(sharedArrayBuffer);
// }

// // 期待结果为 4000001


// 算数及位操作方法
// 算数方法
// 创建大小为 1 的缓冲区
// let sharedArrayBuffer = new SharedArrayBuffer(1);

// // 基于缓冲创建 Uinit8Array
// let typedArray = new Uint8Array(sharedArrayBuffer);

// // 所有 ArrayBuffer 全部初始化为 0
// console.log(typedArray);

// const index = 0;
// const increment = 5;

// // 对索引 0 处的值执行原子加 5
// Atomics.add(typedArray, index, increment);

// console.log(typedArray);

// // 对索引 0 处的值执行原子减 5
// Atomics.sub(typedArray, index, increment);

// console.log(typedArray);



// 位方法
// 创建大小为 1 的缓冲区
// let sharedArrayBuffer = new SharedArrayBuffer(1);

// // 基于缓冲创建 Uint8Array
// let typedArray = new Uint8Array(SharedArrayBuffer);

// // 所有  ArrayBuffer 全部初始化为 0
// console.log(typedArray);

// const index = 0;

// // 对索引 0 出的值执行原子或 0b1111
// Atomics.or(typedArray, index, 0b1111);
// console.log(typedArray);  

// // 对索引 0 出的值执行原子与 0b1111
// Atomics.and(typedArray, index, 0b1100);
// console.log(typedArray);  

// // 对索引 0 出的值执行原子异或 0b1111
// Atomics.and(typedArray, index, 0b1111);
// console.log(typedArray); 


// // 原子读和写
// const sharedArrayBuffer = new SharedArrayBuffer(4);
// const view = new Uint32Array(sharedArrayBuffer);

// // 执行非原子写
// view[0] = 1;

// // 非原子写可以保证在这个读操作之前完成，因此这里一定会读到 1
// console.log(Atomics.load(view, 0));; // 1

// // 执行原子写
// Atomics.store(view, 0, 2);

// // 非原子读可以保证在原子写完成后发生，因此这里一定会读到 2
// console.log(view[0]); // 2

// // 原子交换
// const sharedArrayBuffer = new SharedArrayBuffer(4);
// const view = new Uint32Array(sharedArrayBuffer);

// // 在索引 0 处写入 3
// Atomics.store(view, 0, 3);

// // 从索引 0 处读取值，然后在索引 0 处写入4
// console.log(Atomics.exchange(view, 0, 4));

// // 从索引 0 处读取值
// console.log(Atomics.load(view, 0));

// 
// const sharedArrayBuffer = new SharedArrayBuffer(4);
// const view = new Uint32Array(sharedArrayBuffer);

// // 在索引 0 处写入 5
// Atomics.store(view, 0, 5);
// // 从缓冲区读值
// let initial = Atomics.load(view, 0);

// // 对这个值执行非原子操作
// let result = initial**2;

// // 只在缓冲区未被修改是才会想缓冲区写入新值
// Atomics.compareExchange(view, 0, initial, result);

// // 检查写入成功
// console.log(Atomics.load(view, 0));


// // 原子 Futex 操作与加锁
// const workerScript = `
// self.onmessage = ({data}) => {
//     const view = new Int32Array(data);

//     console.log('Waiting to obtain lock');

//     // 遇到初始值则停止 10000 毫秒超时
//     Atomics.wait(view, 0, 0, 1e5);

//     console.log('Obtained lock');

//     // 在索引 0 处加1
//     Atomics.add(view, 0, 1);

//     console.log('Releasing lock');

//     // 只允许 1 个工作线程继续执行
//     Atomics.notify(view, 0, 1);

//     self.postMessage(null);
// };
// `;

// const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));

// const workers = [];
// for (let i = 0; i < 4; ++i) {
//     workers.push(new Worker(workerScriptBlobUrl));
// }

// // 在最后一个工作线程完成后打印最终值
// let responseCount = 0;
// for (const worker of workers) {
//     worker.onmessage = () => {
//         if (++responseCount == workers.length) {
//             console.log(`Final buffer value: ${view[0]}`);
//         }
//     };
// }

// // 初始化 SharedArrayBuffer
// const sharedArrayBuffer = new SharedArrayBuffer(8);
// const view = new Int32Array(sharedArrayBuffer);

// // 把 SharedArrayBuffer 发送到每个工作线程
// for (const worker of workers) {
//     worker.postMessage(sharedArrayBuffer);
// }

// // 1000 毫秒后释放第一个值
// setTimeout(() => {
//     Atomics.notify(view, 0, 1);
// }, 1000);


// 跨文档消息
// let iframeWindow = document.getElementById('myframe').contentWindow;
// iframeWindow.postMessage('A secret', 'http://www.wrox.com');

// window.addEventListener('message', (event) => {
//     // 确保来自预期发送者
//     if (event.origin == 'http://www.wrox.com') {
//         // 对数据进行一些处理
//         processMessage(event.data);
//         // 可选 想来源窗口发送一条消息
//         event.source.postMessage("Recieved!", 'httpL//p2p.wrox.com');
//     }
// })


// // 批量编码
// const textEncoder = new TextEncoder();
// // const decodedText = 'foo';
// const decodedText = '☺';
// const encodedText = textEncoder.encode(decodedText);

// // f 的 UTF-8 编码是 0x66 (十进制 102)
// // o 的 UTF-8 编码是 0x6F (十进制 111)
// console.log(encodedText);


// const textEncoder = new TextEncoder();
// const fooArr = new Uint8Array(3);
// const barArr = new Uint8Array(2);
// const fooResult = textEncoder.encodeInto('foo', fooArr);
// const barResult = textEncoder.encodeInto('bar', barArr);

// console.log(fooArr);
// console.log(fooResult);

// console.log(barArr);
// console.log(barResult);


// // 流编码
// async function* chars() {
//     const decodedText = 'foo';
//     for (let char of decodedText) {
//         yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
//     }
// }

// const decodedTextStream = new ReadableStream({
//     async start(controller) {
//         for await (let chunk of chars()) {
//             controller.enqueue(chunk);
//         }

//         controller.close();
//     }
// })

// const encodedTextStream = decodedTextStream.pipeThrough(new TextEncoderStream());

// const readableStreamDefaultReader = encodedTextStream.getReader();

// (async function() {
//     while (true) {
//         const {done, value} = await readableStreamDefaultReader.read();

//         if (done) {
//             break;
//         } else {
//             console.log(value);
//         }
//     }
// })();


// const textDecoder = new TextDecoder();

// const encodedText = Uint8Array.of(102, 111, 111);
// const decodedText = textDecoder.decode(encodedText);

// console.log(decodedText); // foo



// // 流编码
// async function* chars() {
//     // 每个块必须是一个定型数组
//     const encodedText = [102, 111, 111].map((x) => Uint8Array.of(x));

//     for (let char of encodedText) {
//         yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
//     }
// }

// const encodedTextStream = new ReadableStream({
//     async start(controller) {
//         for await (let chunk of chars()) {
//             controller.enqueue(chunk);
//         }

//         controller.close();
//     }
// });

// const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream());

// const readableStreamDefaultReader = decodedTextStream.getReader();

// (async function() {
//     while (true) {
//         const {done, value} = await readableStreamDefaultReader.read();

//         if (done) {
//             break;
//         } else {
//             console.log(value);
//         }
//     }
// })();


// // File
// let fileList = document.getElementById('files-list');
// fileList.addEventListener('change', (event) => {
//     let files = event.target.files;
//     let i = 0;
//     let len = files.length;

//     while (i < len) {
//         const f = files[i];
//         console.log(`${f.name} (${f.type}), ${f.size} bytes`);
//         ++i;
//     }
// });


// // FileReader
// let fileList = document.getElementById('files-list');
// fileList.addEventListener('change', (event) => {
//     let info = '',
//         output = document.getElementById('output'),
//         progress = document.getElementById('progress'),
//         files = event.target.files,
//         type = 'default',
//         reader = new FileReader();

//     if (/image/.test(files[0].type)) {
//         reader.readAsDataURL(files[0]);
//         type = 'image';
//     } else {
//         reader.readAsText(files[0]);
//         type = 'text';
//     }
// })



// // worker.js
// self.onmessage = (messageEvent) => {
//     const syncReader = new FileReaderSync();
//     console.log(syncReader);

//     const result = syncReader.readAsDataUrl(messageEvent.data);

//     console.log(result);

//     self.postMessage(result);
// }


// // Blob 与 部分读取
// console.log(new Blob(['foo']));
// // Blob {size: 3, type: ""}

// console.log(new Blob(['{"a": "b"}'], {type: 'application/json'}));
// // {size: 10, type: 'application/json'}

// console.log(new Blob(['<p>Foo</p>', '<p>Bar</p>'], {type: 'text/html'}));
// // {size: 20, type: 'text/html'}


// 自定义放置目标
// let droptarget = document.getElementById('droptarget');

// droptarget.addEventListener('dragover', (event) => {
//     event.preventDefault();
// });

// droptarget.addEventListener('dragenter', (event) => {
//     event.preventDefault();
// });


// dataTransfer 对象
// droptarget.addEventListener('drag', (event) => {
//     event.preventDefault();
//     // 传递文本
//     event.dataTransfer.setData('text', 'some text');
//     let text = event.dataTransfer.getData('text');

//     // 传递 URL
//     event.dataTransfer.setData('URL', 'https://zhouxianghui.xyz');
//     let url = event.dataTransfer.getData('URL');
// });

// while (0 == 0) {
//     console.log('hello');
// }

// if (!null) {
//     console.log(new String(-123).length);
//     console.log(undefined === true);
//     console.log(!0 && 0);
//     if (!0 && !0) {
//         console.log(!0 && 0);
//     }
// }

// // 通知权限
// Notification.requestPermission()
//     .then((permisson) => {
//         console.log('User responded to permission request', permisson);
//     });

// new Notification('Title text!', {
//     body: 'Body text!',
//     image: 'path/to/image.png',
//     vibrate: true
// });

// const n = new Notification('I will close in 1000ms');
// setTimeout(() => n.close(), 1000);


// async function* ints() {
//     // 每 1000 毫秒生成一个递增的整数
//     for (let i = 0; i < 5; ++i) {
//         yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
//     }
// }

// const readableStream = new ReadableStream({
//     async start(controller) {
//         for await (let chunk of ints()) {
//             controller.enqueue(chunk);
//         }

//         controller.close();
//     },
//     write(value) {
//         console.log(value);
//     }
// });



// console.log(readableStream.locked);
// const readableStreamDefaultReader = readableStream.getReader();
// console.log(readableStream.locked);

// // 消费者
// (async function () {
//     while (true) {
//         const {
//             done,
//             value
//         } = await readableStreamDefaultReader.read();
//         if (done) {
//             break;
//         } else {
//             console.log(value);
//         }
//     }
// })();

// const writeableStream = new WritableStream({
//     write(value) {
//         console.log(value);
//     }
// });

// console.log(writeableStream.locked);
// const writeableStreamDefaultWriter = writeableStream.getWriter();
// console.log(writeableStream.locked);


// // 生产者
// (async function () {
//     for await (let chunk of ints()) {
//         await writeableStreamDefaultWriter.ready;
//         writeableStreamDefaultWriter.write(chunk);
//     }
// })();


// console.log(Math.max(...[7,73,4,1]));

// let arr = new Array(5);
// console.log(arr.fill(0));
// arr[1] = 1;
// arr[2] = 1;
// console.log(arr.indexOf(0, 1));

// let nums = [1,2,0];

// var firstMissingPositive = function (nums) {

//     let len = nums.length;
//     let arr = new Array(len);
//     arr.fill(0);

//     for (const num of nums) {
//         if (num >= 1 && num <= len) {
//             arr[num - 1] = 1;
//         }
//     }

//     let r = arr.indexOf(0);

//     return r == -1 ? len + 1 : r;
// };

// console.log(firstMissingPositive(nums));


// 抛出错误
// class CustomError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'CustomError';
//         this.message = message;
//     }
// }

// throw new CustomError('My Message');


// error 事件
// window.onerror = (message, url, line) => {
//     console.log(message);
//     return false;
// };

// const image = new Image();

// image.addEventListener('load', (e) => {
//     console.log('Image loaded');
// });

// image.addEventListener('error', (e) => {
//     console.log('Image not loaded');
// });

// image.src = 'doesnotexist.gif';



// JavaScript 调试器
// function pauseExecution() {
//     console.log('Will print before breakpoint');
//     debugger
//     console.log('Will not print until breakpoint continues');
// }

// pauseExecution();


// 在页面中打印消息
// function log(message) {
//     // 这个函数的词法作用域会使用这个实例
//     // 而不是 window.console
//     const console = document.getElementById("debuginfo");
//     if (console === null) {
//         console = document.createElement("div");
//         console.id = "debuginfo";
//         console.style.background = "#dedede";
//         console.style.border = "1px solid silver";
//         console.style.padding = "5px";
//         console.style.width = "400px";
//         console.style.position = "absolute";
//         console.style.right = "0px";
//         console.style.top = "0px";
//         document.body.appendChild(console);
//     }
//     console.innerHTML += '<p> ${message}</p>';
// }


// JSON 对象
// let book = {
//     title: "Professional JavaScript",
//     authors: [
//         "Nicholas C. Zakas",
//         "Matt Frisbie"
//     ],
//     edition: 4,
//     year: 2017
// };
// let jsonText = JSON.stringify(book, (key, value) => {
//     switch (key) {
//         // case "authors":
//         //     return value.join(",")
//         // case "year":
//         //     return 5000;
//         // case "edition":
//         //     return undefined;
//         default:
//             return value;
//     }
// }, "----");
// console.log(jsonText);
// let jsonText = JSON.stringify(book, ["title", "edition"]);
// console.log(jsonText);

// let  bookCopy = JSON.parse(jsonText);
// console.log(bookCopy);


// XMLHttpRequest 对象
// let xhr = new XMLHttpRequest();


// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             console.log(xhr.responseText);
//         } else {
//             console.log('Request was unsuccessful: ' + xhr.status);
//         }
//     }
// }

// xhr.open('get', 'example.php', false);
// xhr.setRequestHeader("MyHeader", "MyValue");
// xhr.send(null);

// let myHeader = xhr.getResponseHeader("MyHeader");
// let allHeaders = xhr.getAllResponseHeaders();

// xhr.open('get', 'example.php?name1=value1&name2=valu2', true);
// xhr.open('post', 'example.php', true);

// let data = new FormData(document.forms[0]);
// let form = document.getElementById("user-info");
// xhr.send(new FormData(form));


// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         try {
//             if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//                 alert(xhr.responseText);
//             } else {
//                 alert("Request was unsuccessful: " + xhr.status);
//             }
//         } catch (ex) {
//             // 假设由 ontimeout 处理
//         }
//     }
// };
// xhr.open("get", "timeout.php", true);
// xhr.timeout = 1000; // 设置 1 秒超时
// xhr.ontimeout = function () {
//     alert("Request did not return in a second.");
// };
// xhr.send(null);

// let xhr = new XMLHttpRequest();
// xhr.onload = function () {
//     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//         alert(xhr.responseText);
//     } else {
//         alert("Request was unsuccessful: " + xhr.status);
//     }
// };

// xhr.onprogress = function(e) {
//     let divStatus = document.getElementById("status");
//     if (e.lengthComputable) {
//         divStatus.innerHTML = `Received ${e.position} of ${e.totalSize} bytes`;
//     }
// };
// xhr.open("get", "altevents.php", true);
// xhr.send(null);


// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             alert(xhr.responseText);
//         } else {
//             alert("Request was unsuccessful: " + xhr.status);
//         }
//     }
// };
// xhr.open("get", "http://www.somewhere-else.com/page/", true);
// xhr.send(null);


// // 图片检测
// let img = new Image();
// img.onload = img.onerror = function () {
//     console.log('done');
// };
// img.src = "http://www.example.com/test?name=Nicholas";


// JSONP
// callback({
//     "name": "Nicholas"
// });

// function handleResponse(response) {
//     console.log(`
//     You're at IP address ${response.ip}, which is in
//     ${response.city}, ${response.region_name}`);
// }
// let script = document.createElement("script");
// script.src = "http://freegeoip.net/json/?callback=handleResponse";
// document.body.insertBefore(script, document.body.firstChild);


// fetch API
// 基本用法
// let r = fetch('/bar');
// console.log(r);

// fetch('bar.txt')
//     .then((response) => {
//         console.log(response);
//     });

// fetch('bar.txt')
//     .then((response) => {
//         response.text().then((data) => {
//             console.log(data);
//         });
//     });

// fetch('bar.txt')
//     .then((response) => response.text())
//     .then((data) => console.log(data));

// fetch('/bar')
//     .then((response) => {
//         console.log(response.status); // 200
//         console.log(response.statusText); // OK
//     });

// fetch('/does-not-exist')
//     .then((response) => {
//         console.log(response.status); // 404
//         console.log(response.statusText); // Not Found
//     });

// fetch('/throw-server-error')
//     .then((response) => {
//         console.log(response.status); // 500
//         console.log(response.statusText); // Internal Server Error
//     });

// fetch('/permanent-redirect')
//     .then((response) => {
//         // 默认行为是跟随重定向直到最终 URL
//         // 这个例子会出现至少两轮网络请求
//         // <origin url>/permanent-redirect -> <redirect url>
//         console.log(response.status); // 200
//         console.log(response.statusText); // OK
//         console.log(response.redirected); // true
//     });

// fetch('/bar')
//     .then((response) => {
//         console.log(response.status); // 200
//         console.log(response.ok); // true
//     });
// fetch('/does-not-exist')
//     .then((response) => {
//         console.log(response.status); // 404
//         console.log(response.ok); // false
//     });

// fetch('/hangs-forever')
//     .then((response) => {
//             console.log(response)
//         },
//         (err) => {
//             console.log(err)
//         });
// //（浏览器超时后）
// // TypeError: "NetworkError when attempting to fetch resource."

// // foo.com/bar/baz 发送的请求
// console.log(window.location.href); // https://foo.com/bar/baz

// fetch('qux').then((response) => console.log(response.url));
// // https://foo.com/bar/qux

// fetch('/qux').then((response) => console.log(response.url));
// // https://foo.com/qux

// fetch('//qux.com').then((response) => console.log(response.url));
// // https://qux.com

// fetch('https://qux.com').then((response) => console.log(response.url));
// // https://qux.com


// 常见的 Fetch 请求模式
// 1. 发送 JSON 数据
// let payload = JSON.stringify({
//     foo: 'bar'
// });

// let jsonHeaders = new Headers({
//     'Content-type': 'application/json'
// });

// fetch('/send-me-json', {
//     method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
//     body: payload,
//     headers: jsonHeaders
// });


// // 在请求体中发送参数
// let payload = 'foo=bar&baz=qux';
// let paramHeaders = new Headers({
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// });
// fetch('/send-me-params', {
//     method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
//     body: payload,
//     headers: paramHeaders
// });


// // 3. 发送文件
// let imageFormData = new FormData();
// let imageInput = document.querySelector('input[type="file"]');

// imageFormData.append('image', imageInput.files[0]);

// fetch('/img-upload', {
//     method: 'POST',
//     body: imageFormData
// });

// // 多文件
// let imageFormData = new FormData();
// let imageInput = document.querySelector('input[type="file"][multiple]');

// for (let i = 0; i < imageInput.files.length; i++) {
//     imageFormData.append('image', imageInput.files[i]);
// }

// fetch('/img-upload', {
//     method: 'POST',
//     body: imageFormData
// });

// // 4. 加载 Blob 文件
// const imageElement = document.querySelector('img');

// fetch('my-image.png')
//     .then((response) => response.blob())
//     .then((blob) => {
//         imageElement.src = URL.createObjectURL(blob);
//     });


// // 5. 发送跨域请求
// fetch('//cross-orignin.com', {
//         method: 'no-cors'
//     })
//     .then((response) => console.log(response.type));


// // 6. 中断请求
// let abortController = new AbortController();

// fetch('wikipedia.zip', {
//         signal: abortController.signal
//     })
//     .catch(() => console.log('aborted'));

// // 10 毫秒后中断请求
// setTimeout(() => abortController.abort(), 10);

// // 已经中断

// Headers
// // 1. Header 与 Map 的相似之处
// let h = new Headers();
// let m = new Map();

// // 设置键
// h.set('foo', 'bar');
// m.set('foo', 'bar');

// // 检查键
// console.log(h.has('foo')); // true
// console.log(m.has('foo')); // true
// console.log(h.has('qux')); // false
// console.log(m.has('qux')); // false

// // 获取值
// console.log(h.get('foo')); // bar
// console.log(m.get('foo')); // bar

// // 更新值
// h.set('foo', 'baz');
// m.set('foo', 'baz');

// // 取得更新的值
// console.log(h.get('foo')); // baz
// console.log(m.get('foo')); // baz

// // 删除值
// h.delete('foo');
// m.delete('foo');

// // 确定值已经删除
// console.log(h.get('foo')); // undefined
// console.log(m.get('foo')); // undefined

// let seed = [['foo', 'bar']];

// let h =new Headers(seed);
// let m = new Map(seed);

// console.log(h.get('foo')); // bar
// console.log(m.get('foo')); // bar


// let seed = [
//     ['foo', 'bar'],
//     ['baz', 'qux']
// ];
// let h = new Headers(seed);
// let m = new Map(seed);
// console.log(...h.keys()); // foo, baz
// console.log(...m.keys()); // foo, baz
// console.log(...h.values()); // bar, qux
// console.log(...m.values()); // bar, qux
// console.log(...h.entries()); // ['foo', 'bar'], ['baz', 'qux']
// console.log(...m.entries()); // ['foo', 'bar'], ['baz', 'qux']


// // 2. Headers 的独有特性
// let seed = {
//     foo: 'bar'
// };
// let h = new Headers(seed);
// console.log(h.get('foo')); // bar
// let m = new Map(seed);
// // TypeError: object is not iterable


// let h = new Headers();

// h.append('foo', 'bar');
// console.log(h.get('foo')); // bar

// h.append('foo', 'baz');
// console.log(h.get('foo')); // bar, baz


// 模块定义
// (function () {
//     // 私有 Foo 模块的代码
//     console.log('bar');
// })();
// // bar

// var Foo = (function () {
//     console.log('bar');
// })();

// var Foo = (function () {
//     return {
//         bar: 'baz',
//         baz: function () {
//             console.log(this.bar);
//         }
//     };
// })();
// console.log(Foo.bar); // 'baz'
// Foo.baz(); // 'baz'

// var Foo = (function () {
//     var bar = 'baz';
//     var baz = function () {
//         console.log(bar);
//     };
//     return {
//         bar: bar,
//         baz: baz
//     };
// })();
// console.log(Foo.bar); // 'baz'
// Foo.baz(); // 'baz'

// var Foo = (function () {
//     return {
//         bar: 'baz'
//     };
// })();
// Foo.baz = (function () {
//     return {
//         qux: function () {
//             console.log('baz');
//         }
//     };
// })();
// console.log(Foo.bar); // 'baz'
// Foo.baz.qux(); // 'baz'

// var globalBar = 'baz';
// var Foo = (function (bar) {
//     return {
//         bar: bar,
//         baz: function () {
//             console.log(bar);
//         }
//     };
// })(globalBar);
// console.log(Foo.bar); // 'baz'
// Foo.baz(); // 'baz'

// // 原始的 Foo
// var Foo = (function (bar) {
//     var bar = 'baz';
//     return {
//         bar: bar
//     };
// })();
// // 扩展 Foo
// var Foo = (function (FooModule) {
//     FooModule.baz = function () {
//         console.log(FooModule.bar);
//     }
//     return FooModule;
// })(Foo);
// console.log(Foo.bar); // 'baz'
// Foo.baz(); // 'baz'


// // 扩展 Foo 以增加新方法
// var Foo = (function (FooModule) {
//     FooModule.baz = function () {
//         console.log(FooModule.bar);
//     }
//     return FooModule;
// })(Foo || {});
// // 扩展 Foo 以增加新数据
// var Foo = (function (FooModule) {
//     FooModule.bar = 'baz';
//     return FooModule;
// })(Foo || {});
// console.log(Foo.bar); // 'baz'
// Foo.baz(); // 'baz'


// // CommonJS
// // 简单的模块定义
// var moduleB = require('./moduleB');

// moduleB.exports = {
//     stuff: moduleB.doStufee()
// };

// console.log('moduleA');
// require('./moduleA'); // "moduleA"

// console.log('moduleA');
// var a1 = require('./moduleA');
// var a2 = require('./moduleA');
// console.log(a1 === a2); // true

// console.log('moduleA');
// if (loadCondition) {
//     require('./moduleA');
// }

// var moduleA = require('./moduleA');
// console.log(moduleA.stuff);

// // 等价操作：
// module.exports = {
//     a: 'A',
//     b: 'B'
// };
// module.exports.a = 'A';
// module.exports.b = 'B';

// class A {}
// module.exports = A;
// var A = require('./moduleA');
// var a = new A();

// if (condition) {
//     var A = require('./moduleA');
// }

// // 异步模块定义 AMD，Asynchronous Module Definition 
// // ID 为'moduleA'的模块定义。 moduleA 依赖 moduleB，
// // moduleB 会异步加载
// define('moduleA', ['moduleB'], function (moduleB) {
//     return {
//         stuff: moduleB.doStufee()
//     };
// });

// define('moduleA', ['moduleB'], function (moduleB) {
//     var moduleB = require('moduleB');

//     exports.stuff = moduleB.doStuff();
// });

// // 动态依赖
// define('moduleA', ['moduleB'], function (moduleB) {
//     if (condition) {
//         var moduleB = require('moduleB');
//     }
// });

// // 通用模块定义 UMD Universal Module Definition
// (function (root, factory) {
//     if (typeof define === 'function' && define.amd) {
//         // AMD。注册为匿名模块
//         define(['moduleB'], factory);
//     } else if (typeof module === 'object' && module.exports) {
//         // Node。不支持严格 CommonJS
//         // 但可以在 Node 这样支持 module.exports 的
//         // 类 CommonJS 环境下使用
//         module.exports = factory(require(' moduleB '));
//     } else {
//         // 浏览器全局上下文（ root 是 window）
//         root.returnExports = factory(root.moduleB);
//     }
// }(this, function (moduleB) {
//     // 以某种方式使用 moduleB
//     // 将返回值作为模块的导出
//     // 这个例子返回了一个对象
//     // 但是模块也可以返回函数作为导出值
//     return {};
// }));

// // 模块导出
// // 允许
// export...
// // 不允许
// if (condition) {
//     export...
// }

// // 允许
// const foo = 'foo';
// export {
//     foo
// };
// // 允许
// export const foo = 'foo';
// // 允许，但应该避免
// export {
//     foo
// };
// const foo = 'foo';


// // 命名导出
// export const foo = 'foo';


// const foo = 'foo';
// export {
//     foo as myFoo
// };

// const foo = 'foo';
// const bar = 'bar';
// const baz = 'baz';
// export {
//     foo,
//     bar as myBar,
//     baz
// };


// const foo = 'foo';
// // 等同于 export default foo;
// export {
//     foo as
//     default
// };

// const foo = 'foo';
// const bar = 'bar';
// export {
//     bar
// };
// export default foo;

// const foo = 'foo';
// const bar = 'bar';
// export {
//     foo as
//     default, bar
// };


// // 命名行内导出
// export const baz = 'baz';
// export const foo = 'foo',
//     bar = 'bar';
// export function foo() {}
// export function* foo() {}
// export class Foo {}
// // 命名子句导出
// export {
//     foo
// };
// export {
//     foo,
//     bar
// };
// export {
//     foo as myFoo, bar
// };
// // 默认导出
// export default 'foo';
// export default 123;
// export default / [a - z] * /;
// export default {
//     foo: 'foo'
// };
// export {
//     foo,
//     bar as
//     default
// };
// export default foo
// export default function () {}
// export default function foo() {}
// export default function* () {}
// export default class {}
// // 会导致错误的不同形式：
// // 行内默认导出中不能出现变量声明
// export default
// const foo = 'bar';
// // 只有标识符可以出现在 export 子句中
// export {
//     123 as foo
// }
// // 别名只能在 export 子句中出现
// export const foo = 'foo'
// as myFoo;


// // 模块导入
// // 允许
// import...
// // 不允许
// if (condition) {
//     import...
// }

// // 允许
// import {
//     foo
// } from './fooModule.js';
// console.log(foo); // 'foo'
// // 允许，但应该避免
// console.log(foo); // 'foo'
// import {
//     foo
// } from './fooModule.js';


// // 工作者模块
// // 第二个参数默认为{ type: 'classic' }
// const scriptWorker = new Worker('scriptWorker.js');
// const moduleWorker = new Worker('moduleWorker.js', {
//     type: 'module'
// });

// let s = 'abdc';
// console.log(s.charAt(0) === 'a');


// emptyWorker.js
// 空的 JS 线程工作者文件

// // main.js
// console.log(location.href); // "https://example.com/"
// const worker = new Worker(location.href + 'emptyWorker.js');
// console.log(worker); // Worker {}

// const worker = new Worker('./emptyWorker.js');
// console.log(worker); // Worker {}


// // globalScopeWorker.js
// console.log('inside worker:', self);

// // main.js
// const worker = new Worker('./globalScopeWorker.js');
// console.log('created worker:', worker);
// // created worker: Worker {}
// // inside worker: DedicatedWorkerGlobalScope {}


// const person = {
//     name: 'Matt',
//     age: 27,
//     job: 'Engineer'
// };
// const {
//     name,
//     ...remainingData
// } = person;

// console.log(name);
// console.log(remainingData);

// BigInt 表示任意大的整数
// const theBiggestInt = 9007199254740991n;

// const alsoHugo = BigInt(9007199254740991);

// const hugeString = BigInt("9007199254740991");

// const hugeHex = BigInt("0x1fffffffffffff");

// const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");


// yield 实现递归算法
// function* nTimes(n) {
//     if (n > 0) {
//         yield* nTimes(n - 1);
//         yield n - 1;
//     }
// }

// for (const x of nTimes(3)) {
//     console.log(x);
// }

// function SuperType() {
//     this.colors = ['red', 'blue', 'green'];
// }


// function SubType() {
//     SuperType.call(this);
// }

// SuperType.prototype.sayColor = function(){
//     console.log(this.colors);
// };
// SubType.prototype = new SuperType();

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);
// instance1.sayColor();


// let instance2 = new SubType();
// console.log(instance2.colors);
// instance2.sayColor();



// let nums = [3, 2, 2, 3];
// let num = 3;
// let index = nums.indexOf(num);
// while (index != -1) {
//     nums.splice(index, 1);
//     index = nums.indexOf(num);
// }


// console.log(nums);

// console.log(Math.log2(4));
// console.log(Math.ceil(-2.1));
// console.log((Math.pow(2, 31) - 1) / 1);

// let dividend = 2**32-1;
// let divisor = 1;
// let ans = Math.pow(2, Math.log2(Math.abs(dividend)) - Math.log2(Math.abs(divisor)));
// console.log(ans);

// console.log(Number.MAX_VALUE);
// console.log(2<<30);

let nums = [5, 4, 3, 2, 1];
console.log();