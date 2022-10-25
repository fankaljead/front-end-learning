function makeChange(change = 126) {
  const COINS = [100, 50, 20, 5, 1];
  const res = [0, 0, 0, 0, 0];

  for (let i = 0; i < COINS.length && change > 0; i++) {
    const coin = COINS[i];
    if (coin <= change) {
      let c = Math.floor(change / coin);
      res[i] = c;
      change = change % coin;
    }
  }

  return res;
}

console.log(makeChange());
console.log(makeChange(99));
