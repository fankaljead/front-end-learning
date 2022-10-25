// 找到 s 中第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
// 字符串中只包含小写字母。
// 您可以假定 s 字符串的长度不会超过 50000。
function firstUniqChar(s) {
  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      map[s[i]]++;
    } else {
      map[s[i]] = 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) {
      return i;
    }
  }
  return -1;
}
function solution(s) {}
