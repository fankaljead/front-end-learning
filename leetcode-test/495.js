let timeSeries = [1, 4],
  duration = 2;
let findPoisonedDuration = (timeSeries = [], duration = 1) => {
  if (timeSeries.length <= 1) {
    return duration * timeSeries.length;
  }
  let time = 0;

  for (let i = 1; i < timeSeries.length; i++) {
    //   for (
    //     let j = 0;
    //     j < timeSeries[i] - timeSeries[i - 1] && j < duration;
    //     j++
    //   ) {
    //     time++;
    //   }
    time += Math.min(timeSeries[i] - timeSeries[i - 1], duration);
  }
  time += duration;

  return time;
};

console.log(findPoisonedDuration(timeSeries, duration));
