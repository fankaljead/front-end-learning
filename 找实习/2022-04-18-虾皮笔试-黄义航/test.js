// const obj1 = {
//   name: "obj1",
//   1: 111,
//   2: 222,
// };

// const obj2 = obj1;
// obj2.type = "test";

// const keys1 = Object.keys(obj1);
// const keys2 = Object.keys(obj2);

// 拿糖果问题
// function t(n=4){
//   if (n<=3){
//     return true;
//   }
//   let start =
// }

var obj2 = {
  name: "obj2",
  innerObj: {
    name: "innerObj",
    getName: function () {
      console.log(this, this.name);
    },
  },
};
obj2.innerObj.getName();
