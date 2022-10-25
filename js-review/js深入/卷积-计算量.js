function cal(h, w, c, k, s, n, p) {
  return k * k * ((h - k + 2 * p) / s + 1) * ((w - k + 2 * p) / s + 1) * c * n;
}

console.log(cal(128, 128, 8, 3, 2, 16, 1));
