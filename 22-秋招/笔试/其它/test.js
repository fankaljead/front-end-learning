// const [target, maxDoubles] = readline().split(",").map(Number);
const [target, maxDoubles] = [5, 0];

const time =
  maxDoubles * 2 > target
    ? maxDoubles + 1 + target - (maxDoubles - 1) * 2
    : maxDoubles + target - maxDoubles * 2;

console.log(time);
