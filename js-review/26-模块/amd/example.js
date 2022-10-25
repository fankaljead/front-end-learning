// AMD 规范模块
define(["package/lib"], function (lib) {
  function foo() {
    lib.log("hello world!");
  }
  return {
    foo: foo,
  };
});
