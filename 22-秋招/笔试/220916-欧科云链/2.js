function getLongestSequence(input = "abbcccdddddefffffff") {
  if (input.length <= 1) {
    return input;
  }
  let res = [];
  let p = [input[0]];
  for (let i = 1; i < input.length; ++i) {
    if (input[i] === p[p.length - 1]) {
      p.push(input[i]);
    } else {
      if (res.length < p.length) {
        res = [...p];
      }
      p = [input[i]];
    }
  }

  if (res.length < p.length) {
    res = [...p];
  }

  return res.join("");
}

console.log(getLongestSequence());
