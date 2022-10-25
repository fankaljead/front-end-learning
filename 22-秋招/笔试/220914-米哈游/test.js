let arr = [1, NaN];
let tmp = arr.includes(NaN) && arr.indexOf(NaN);
console.log(tmp);

const str = "abcabc ";
let rule = /abc/;
console.log(str.search(rule));
console.log(str.search(/abc/g));
console.log(str.search(/Abc/i));
console.log(str.search(/abc/u));
