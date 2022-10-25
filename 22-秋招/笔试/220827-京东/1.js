function solution(n = 5, k = 3, str = "aBcBa") {
  let s1 = str.substring(0, k).toUpperCase();
  let s2 = str.substring(k).toLowerCase();
  return s1 + s2;
}

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

const [n, k] = readArray();
const str = readline();
console.log(solution());
