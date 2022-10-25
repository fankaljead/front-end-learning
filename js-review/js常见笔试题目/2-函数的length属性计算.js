function foo(age, male, name = "zxh", ...hobbies) {
  console.log(arguments.length);
  console.log([...arguments]);
}
foo();
console.log(foo.length); // 2
