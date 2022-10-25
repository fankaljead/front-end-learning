function getMessage(input = "you got a message") {
  const words = input.split(" ").map((word) =>
    word
      .split("")
      .map((c, index) => {
        if (index === 0) {
          return c.toUpperCase();
        } else {
          return c;
        }
      })
      .join("")
  );

  const res = [],
    len = words.length;
  for (let i = 0; i < len; ++i) {
    res.push(words[i]);
  }
  for (let i = len - 2; i >= 0; --i) {
    res.push(words[i]);
  }

  return res.join(" ");
}

console.log(getMessage());
