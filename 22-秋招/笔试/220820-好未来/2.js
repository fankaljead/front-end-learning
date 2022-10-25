function getMaxLengthChar(s = "abcabcabcbbcccccc") {
  let max = 0;
  let maxChar = "";
  for (let i = 0; i < s.length; i++) {
    let count = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[i] === s[j]) {
        count++;
      }
    }
    if (count > max) {
      max = count;
      maxChar = s[i];
    }
  }
  return maxChar;
}

console.log(getMaxLengthChar());
