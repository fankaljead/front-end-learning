function gcd(a, b) {
  let max, min, temp;
  max = Math.max(a, b);
  min = Math.min(a, b);
  if (a === 0 || b === 0) {
    return max;
  }
  while (max % min) {
    temp = max % min;
    max = min;
    min = temp;
  }
  return min;
}

console.log(gcd(4, 24));
