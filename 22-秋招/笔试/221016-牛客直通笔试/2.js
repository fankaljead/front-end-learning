function solution(nums = [1, 2, 3, 4]) {
  let initialSum = 0,
    len = nums.length;

  if (len <= 1) {
    return 0;
  } else if (len === 2) {
    return Math.abs(nums[0] - nums[1]);
  } else {
    let initialSum = 0;
    for (let i = 0; i < len - 1; i++) {
      initialSum += Math.abs(nums[i] - nums[i + 1]);
    }
    console.log(initialSum);

    nums.unshift(nums[1]);
    nums.push(nums[nums.length - 2]);
    let sum = 0;

    for (let i = 1; i <= len - 1; i++) {
      const a = nums[i - 1];
      const b = nums[i];
      const c = nums[i + 1];
      const d = nums[i + 2];

      const gap =
        Math.abs(a - c) + Math.abs(b - d) - Math.abs(a - b) - Math.abs(c - d);

      sum = Math.max(sum, initialSum + gap);
    }

    return sum;
  }
}

// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
var n = -1; // 初始状态为负数，表示还没开始读取
var ans = 0;
var cur_line = 0;
rl.on("line", function (line) {
  // javascript每行数据的回调接口
  if (n < 0) {
    // 测试用例第一行读取n
    n = parseInt(line.trim());
  } else {
    // 矩阵数据读取
    var nums = line.split(" ").map(Number);
    console.log(solution(nums));
    // 记录当前读取的行数
    cur_line += 1;
  }

  // 读取行数结束，如果确定只有一行额外的数据输入，也可以通过cur_line === 1来判断
  if (n === cur_line) {
    // 输出结果

    // 重新初始化相关变量
    n = -1;
    ans = 0;
    cur_line = 0;
  }
});
