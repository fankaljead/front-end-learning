function printEmail(str) {
  let regex = /^[\d\w_][a-zA-Z\d\-_.]+\b@[a-zA-ZA-z0-9]+\.([a-zA-Z]{2,})/g;

  const r = str.match(regex);

  if (r) {
    let res = "true " + r.join(" ");
    return res;
  }

  return str.match(/[a-zA-Z0-9_][a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9]{1,}(\.[a-zA-Z]{2,})+/g)

  return "false";

}

console.log(printEmail("你好123@qq.cn 看了看党风2323@143.com"));
console.log(printEmail("中国124@cn"));
