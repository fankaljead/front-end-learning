function solution(arr = [1, 2, 3, 4]) {
  const sum = arr.reduce((a, b) => a + b);

  return sum;
}

console.log(solution());
