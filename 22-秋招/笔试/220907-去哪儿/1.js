function solution(url = "https://sample.com?a=1&e&b=2&d#hash") {
  let obj = {};
  let s = url.split("?")[1].split("#")[0].split("&");

  for (const ss of s) {
    const [k, v] = ss.split("=");
    obj[k] = v === undefined ? "" : v;
  }

  return JSON.stringify(obj);
}

// function main() {
//   const url = readline();
//   console.log(solution(url));
// }

// main();

console.log(solution());
