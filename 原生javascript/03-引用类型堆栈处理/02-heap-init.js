// var obj1 = { x: 100 };
// var obj2 = obj1;

// // 1
// // obj2["x"] = 200;

// // 2
// obj2 = {
//   name: "alishi",
// };

// console.log(obj1.x);

var obj1 = { x: 100 };
var obj2 = obj1;
obj1.y = obj1 = { x: 200 };
console.log(obj1.y);
console.log(obj2);

var a = 1;
var b = (a = 3);
console.log(a);
console.log(b);
console.log(typeof (a = 3));
