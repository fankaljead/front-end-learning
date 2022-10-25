var v = "hello";
(function () {
  console.log(v);
  var v = "happy";
  console.log(v);
})();

function show() {
  var s;
  s = 3 + 2;
  console.log(s);
}
show();
console.log(s);
