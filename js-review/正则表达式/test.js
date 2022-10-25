var regex = /(ab){2,4}/g;

console.log("ab abab ababab abababab abbaba".match(regex));
console.log(regex.test("ab"));
console.log(regex.test("ab".repeat(2)));
console.log(regex.test("ab".repeat(3)));
console.log(regex.test("ab".repeat(4)));
console.log(regex.test("ab".repeat(5)));

// 1. 匹配 16 进制颜色
const regex1 = /^#([\da-fA-F]{3}|[\da-fA-F]{6})\b$/g;
console.log("#fff #e232323 #2ee211 #jkiadk".match(regex1));
"".split('').slice(1,-1)