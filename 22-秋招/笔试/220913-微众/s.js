function solution(fullText, searchText, allowOverlap = true) {
  let len = searchText.length;
  if (len <= 0) {
    return 0;
  }
  let gap = allowOverlap ? 1 : len;
  let count = 0;
  for (let i = 0; i < fullText.length; ) {
    let s = fullText.substring(i, i + len);
    if (s === searchText) {
      count++;
      i += gap;
    } else {
      i++;
    }
  }

  return count;
}

console.log(solution("aa_bb_cc_dd_bb_e", "bb"));
console.log(solution("aaa", "aa"));
console.log(solution("abcdaacdabcda", "cda"));
console.log(solution("aaa", "aa", false));
