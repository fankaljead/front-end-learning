function countRepetition(speech = "I am so amazed by", word = "so") {
  let words = speech.split(/[\ .]/);
  console.log(words);

  return words.reduce(
    (acc, curr) => (acc += curr.toLowerCase() === word.toLowerCase() ? 1 : 0),
    0
  );
}

console.log(countRepetition());
