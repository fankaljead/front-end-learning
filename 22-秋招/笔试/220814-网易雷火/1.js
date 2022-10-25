// 查找最长的回文子串
function longestPalindrome(s) {
  let max = 0;
  let res = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let str = s.substring(i, j + 1);
      if (isPalindrome(str) && str.length > max) {
        max = str.length;
        res = str;
      }
    }
  }
  return res;
}

function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbeaebd"));
