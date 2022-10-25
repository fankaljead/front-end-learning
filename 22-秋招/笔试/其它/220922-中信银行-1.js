let str = readline();
let chars = new Array(26).fill(0);
let A_CODE = "a".charCodeAt();

for (const c of str) {
  let index = c.charCodeAt() - A_CODE;
  chars[index]++;
}

// let res = chars.filter((count) => count >= 2).map(charCode=>String.fromCharCode(i));
