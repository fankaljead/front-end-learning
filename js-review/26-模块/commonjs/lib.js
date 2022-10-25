var counter = 3;
function incCounter() {
  counter++;
}

var o = {
  name: "zxh",
  age: 23,
};

function changeO() {
  o.name = "ZhouXianghui";
  o.age++;
}

module.exports = {
  counter: counter,
  incCounter: incCounter,
  o: o,
  changeO: changeO,
};
