window.setTimeout(function () {
  console.log(1);
}, 1);

window.setTimeout(function () {
  console.log(2);
}, 2);

window.setTimeout(function () {
  console.log(3);
}, 3);

window.requestAnimationFrame(function () {
  console.log(4);
});
