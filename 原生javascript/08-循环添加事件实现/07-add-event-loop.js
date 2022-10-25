var aButtons = document.querySelectorAll("button");

// 基础
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = function () {
//     console.log(`当前索引为 ${i}`);
//   };
// }

// 闭包
// 自定义属性
// 事件委托
for (var i = 0; i < aButtons.length; i++) {
  (function (i) {
    aButtons[i].onclick = function () {
      console.log(`当前索引为 ${i}`);
    };
  })(i);
}
aButtons = null;

// 闭包
// 自定义属性
// 事件委托
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = (function (i) {
//     return function () {
//       console.log(`当前索引为 ${i}`);
//     };
//   })(i);
// }

// 闭包
// 自定义属性
// 事件委托
// for (let i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = function () {
//     console.log(`当前索引为 ${i}`);
//   };
// }

// 闭包
// 自定义属性
// 事件委托
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].myIndex = i;
//   aButtons[i].onclick = function () {
//     console.log(`当前索引为 ${this.myIndex}`);
//   };
// }
