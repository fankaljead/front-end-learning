function largestNumber(nums) {
  return nums
    .sort(
      (a, b) => -Number(String(a) + String(b)) + Number(String(b) + String(a))
    )
    .join("")
    .replace(/^0+/g, "0");
}
