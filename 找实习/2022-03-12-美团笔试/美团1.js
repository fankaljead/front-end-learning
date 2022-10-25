function isValid(num = 12) {
  let count = 0;
  while (num > 0) {
    let temp = num % 10;
    if (temp === 1) {
      count++;
    }
    if (count >= 2) {
      return true;
    }
    num = Math.floor(num / 10);
  }
  return false;
}

let n = 6;
let nums = [22, 101, 1234, 555, 10001, 132];

for (let i = 0; i < n; ++i) {
  if (isValid(nums[i])) {
    console.log("yes");
  } else {
    console.log("no");
  }
}
