function isPalindrome(x = 121) {
  let s = x.toString();
  if (s.length === 1) {
    return 1;
  }
  let len = s.length;
  for (let i = 0; i <= len / 2; ++i) {
    if (s[i] !== s[len - i - 1]) {
      return 0;
    }
  }
  return 1;
}
