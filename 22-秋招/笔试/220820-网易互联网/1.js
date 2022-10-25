let line = readLine();
let nums = line.split(" ").map(Number);
let a = nums[0],
  b = nums[1];

if (b < 10 || a < 10) {
  console.log(-1);
}
