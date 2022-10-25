
var string = "string";
var number = 0;
var bool = true;
console.log(number || string);
console.log(number && string);
console.log(bool || number);
console.log(bool && number);

for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}


const a=()=>{}