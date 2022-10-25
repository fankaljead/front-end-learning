// 小明在看一个主播，有很多人给主播送礼物，并且各粉丝会根据最近七天内所送礼物的总价值进入排行榜。每天结束的时候，排行榜的榜一会获得一个称号。小明想要一直占据这个称号一段时间，并且他拥有预知未来的能力，可以知道如果他去争夺这个称号，其他粉丝每天分别会刷的礼物的价值。显然，根据这可以计算出小明为了占据该称号一共需要刷多少价值礼物，但小明的数学非常差，因此这个任务就交给你啦！

// 当出现几个人并列榜一时，称号会随机给他们中的一个。为了确保获得称号，小明需要自己的七日内礼物总价值比其他人都至少多1。

// 在第一天之前，主播已经七天没有开播，榜单为空

// input
// 第1行，两个空格隔开的整数 n, m，表示需要占榜一的天数、其他粉丝的数量。1 <= n <= 400，1 <= m <= 400
// 第2到n +1行，每行 m 个整数，空格隔开。第i+1行第j个数表示第i天第j个粉丝的礼物价值。这些数值都在范围 [1, 1000000] 内。

// output:
// 一个数，表示小明最少需要的礼物总价值

function solution(
  n = 7,
  m = 2,
  nums = [
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
  ]
) {
  let cur = [],
    all = 0,
    fs = new Array(m).fill(0);

  for (let i = 0; i < n; ++i) {
    if (i >= 7) {
      cur.pop();
      for (let j = 0; j < m; ++j) {
        fs[j] -= nums[i - 7][j];
      }
    }
    for (let j = 0; j < m; ++j) {
      fs[j] += nums[i][j];
    }
    let max = Math.max(...fs),
      sum = cur.reduce((a, b) => a + b, 0);

    if (sum > max) {
      for (let k = 0; k < all.length; k++) {
        all[k] += max - sum + 1;
        cur.push(max - sum + 1);
      }
    } else {
      cur.push(0);
    }
  }

  return all;
}

console.log(solution());
// console.log(solution(7, 2, []));

// const readArray = () => {
//   const line = readline();
//   return line.split(" ").map(Number);
// };

// var line;
// var m,
//   n,
//   nums = ([][(n, m)] = readArray());
// for (let i = 0; i < n; ++i) {
//   nums.push(readArray());
// }

// console.log(solution(m, nums));
