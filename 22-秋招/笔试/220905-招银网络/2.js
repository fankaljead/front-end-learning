const temp = 10;
const myObj = {
  temp: 20,
  // func: () => {
  //   console.log(this.temp);
  // },
  func: function () {
    console.log(this.temp);
  },
};

myObj.func();
var yourObj = { temp: 30 };
myObj.func.apply(yourObj);
