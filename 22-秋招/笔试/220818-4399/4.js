// 给定一个字符串 s，返回两个相同字符串之间的最长子字符串的长度。
function maxLengthBetweenEqualCharacters(s) {
  const reg = /(.).*\1/g;
  if (!reg.test(s)) {
    return -1;
  }
  return Array.prototype.reduce.call(
    s,
    (pre, item, idx) => {
      const c = s.slice(idx).match(reg);
      if (c) return Math.max(c[0].length - 2, pre);
      return pre;
    },
    0
  );
}
