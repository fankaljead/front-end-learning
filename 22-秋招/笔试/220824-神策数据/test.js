// let str = "0005000";
// let res = +str.substr(2, 2);
// console.log(res);

// getRes(res);
// str = "0";
// console.log(res);

// function getRes(res) {
//   res = (str && (str = +str)) || "ok";
//   console.log(res);
// }

// function foo(a) {
//   console.log(a + b);
// }
// var a = 3;
// var b = 4;
// foo(2);

function demo() {
  console.log(a());
  var a = 1;
  var a = function () {
    console.log(111);
  };
  function a() {
    console.log(222);
  }
}
demo();
