function gcd(m = 100, n = 30) {
  if (m < n) {
    [m, n] = [n, m];
  }
  while (m > n) {
    if (m % n === 0) {
      return n;
    } else {
      const temp = m;
      m = n;
      n = temp % n;
    }
  }

  return 1;
}

console.log(gcd(100, 25));
console.log(gcd(100, 35));
console.log(gcd(100, 24));
