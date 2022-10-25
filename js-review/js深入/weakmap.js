// 1. 在 DOM 对象上保存相关数据
/**
 * 传统使用 jQuery 的时候，我们会通过 $.data() 方法在 DOM 对象上储存相关信息(就比如在删除按钮元素上储存帖子的 ID 信息)，jQuery 内部会使用一个对象管理 DOM 和对应的数据，当你将 DOM 元素删除，DOM 对象置为空的时候，相关联的数据并不会被删除，你必须手动执行 $.removeData() 方法才能删除掉相关联的数据，WeakMap 就可以简化这一操作：
 */
let wm = new WeakMap(),
  element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(element);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;

// 2. 数据缓存
/**
 * 我们需要关联对象和数据，比如在不修改原有对象的情况下储存某些属性或者根据对象储存一些计算的值等，而又不想管理这些数据的死活时非常适合考虑使用 WeakMap。数据缓存就是一个非常好的例子：
 */
const cache = new WeakMap();
function countOwnKeys(obj) {
  if (cache.has(obj)) {
    console.log("Cached");
    return cache.get(obj);
  } else {
    console.log("Computed");
    const count = Object.keys(obj).length;
    cache.set(obj, count);
    return count;
  }
}

// 3. 私有属性
/**
 * WeakMap 也可以被用于实现私有变量，不过在 ES6 中实现私有变量的方式有很多种，这只是其中一种：
 */
(function () {
  const privateData = new WeakMap();
  class Person {
    constructor(name, age) {
      privateData.set(this, { name, age });
    }
    getName() {
      return privateData.get(this).name;
    }
    getAge() {
      return privateData.get(this).age;
    }
  }
})();

class A {
  #name = "A";
  name = "AA";
}

let a = new A();
