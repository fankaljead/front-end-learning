const readInt = () => {
  return parseInt(readline());
};

const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

function solution(n = 3, nums = [1, 3, 4]) {
  let gap = new Array(n).fill(0),
    temp = new Array(n).fill(0);
  for (let i = 0; i < nums.length - 1; i++) {
    gap[i] = Math.abs(nums[i + 1] - nums[i]);
    temp[i] = gap[i];
  }
  let max = -1;
  let index = -1;
  for (let i = 0; i < gap.length; i++) {
    if (max < gap[i]) {
      max = gap[i];
      index = i;
    }
  }
  let bc = nums[index];
  if (index != 0) {
    let sum = Math.abs(nums[index - 1] - nums[index + 1]);
    nums[index] = Math.floor(sum / 2 + nums[index - 1]);
    gap[index - 1] = Math.abs(nums[index] - nums[index - 1]);
    gap[index] = Math.abs(nums[index + 1] - nums[index]);
  } else {
    nums[index] = nums[index + 1];
    gap[index] = 0;
  }
  let res = -1;
  for (let i = 0; i < gap.length; i++) {
    if (res < gap[i]) {
      res = gap[i];
    }
  }
  nums[index] = bc;
  index += 1;

  if (index != nums.length - 1) {
    let sum = Math.abs(nums[index - 1] - nums[index + 1]);
    nums[index] = Math.floor(sum / 2 + nums[index - 1]);
    temp[index - 1] = Math.abs(nums[index] - nums[index - 1]);
    temp[index] = Math.abs(nums[index + 1] - nums[index]);
  } else {
    nums[index] = nums[index - 1];
    temp[index - 1] = 0;
  }
  let res2 = -1;
  for (let i = 0; i < temp.length; i++) {
    if (res2 < temp[i]) {
      res2 = temp[i];
    }
  }
  return Math.min(res, res2);
}

function main() {
  const n = readInt();
  const nums = readArray();
  console.log(solution(n, nums));
}

main();
