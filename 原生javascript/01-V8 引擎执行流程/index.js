const username = 'alishi';

function func1() {
  console.log('fonc1');
}
function func2() {
  console.log('func2');
}

func2();



// 声明时未调用，因此会被认为是不被执行的代码，进行预解析
function foo() {
  console.log('foo')
}

// 声明时未调用，因此会被认为是不被执行的代码，进行预解析
function fn() {}

// 函数立即执行，只进行一次全量解析
(function bar() {
 
})()

// 执行 foo 那么需要重新对 foo 函数进行全量解析，此时 foo 函数被解析了两次
foo()

