// const res = /cc/y;
// res.test("ccwwcc");
// console.log(res.lastIndex);
// res.test("ccwwcc");
// console.log(res.lastIndex);

// function partition(arr, low, high) {
//   let pivot = arr[low];
//   while (low < high) {
//     while (low < high && arr[high] > pivot) {
//       --high;
//     }
//     arr[low] = arr[high];
//     while (low < high && arr[low] <= pivot) {
//       ++low;
//     }
//     arr[high] = arr[low];
//   }
//   arr[low] = pivot;
//   return low;
// }

// function quickSort(arr, low, high) {
//   if (low < high) {
//     let pivot = partition(arr, low, high);
//     quickSort(arr, low, pivot - 1);
//     quickSort(arr, pivot + 1, high);
//     console.log(arr);
//   }
//   return arr;
// }
// const arr = [21, 88, 19, 45, 13, 25, 66, 33, 18];
// quickSort(arr, 0, arr.length - 1);

// const a = ()=>{

// }

var num = 117;
function func1() {
  console.log(this.num);
}
(function () {
  "use strict";
  func1();
});
("use strict");
function func2() {
  console.log(this.num);
}
setTimeout(function () {
  func2.call(this);
}, 0);
