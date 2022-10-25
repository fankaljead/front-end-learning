for (var i = 0; i < 10; ++i) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

var obj = {
  a: 1,
  b: function () {
    alert(this.a);
  },
};
var fun = obj.b;
fun();

for(let i=0;i<12;++i){}
console.log(i);
const a=12