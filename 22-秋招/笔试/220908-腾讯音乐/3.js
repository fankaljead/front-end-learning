const ACODE = "a".charCodeAt();
function minOperations(str = "") {
  let arr = new Array(26).fill(0);

  for (const c of str) {
    arr[c.charCodeAt() - ACODE]++;
  }

  let q = 0,
    t = 0;

  for (const a of arr) {
    t += Math.floor(a / 2);
    q += a % 2;
  }

  return t < 26 - q ? t : 2 * t - 26 + q;
}
