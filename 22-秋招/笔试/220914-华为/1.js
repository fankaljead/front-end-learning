function solution(M = 2, N = 2, K = 1, L = [2]) {
  let count = 0;
  let set = new Set(L);
  function dfs(current, m) {
    if (m <= 0) {
      return;
    }
    if (m >= 1 && current === N + 1) {
      count++;
      return;
    } else if (current > N) {
      return;
    }

    for (let i = 1; i <= 3; i++) {
      if (current + i <= N + 1) {
        const des = set.has(current + i);
        if (des) {
          dfs(current + i, m - 1);
        } else {
          dfs(current + i, m);
        }
      }
    }
  }

  dfs(0, M);

  return count;
}

// console.log(solution());
// console.log(solution(1, 3, 2, [1, 3]));

function solution2(M = 2, N = 2, K = 1, L = [2]) {
  let nums = new Array(N + 1).fill(1);
  for (const l of L) {
    nums[l] = 0;
  }
  let dp = Array.from({ length: N + 1 }, () => new Array(M).fill(0));
  dp[0][M - 1] = 1;

  for (let i = 1; i <= N; ++i) {
    if (!nums[i]) {
      for (let j = 0; j < M - 1; ++j) {
        [1, 2, 3].map((num) => {
          if (i >= num) {
            d[i][j] += dp[i - num][j + 1];
          }
        });
      }
    } else {
      for (let j = 0; j < M; ++j) {
        [1, 2, 3].map((num) => {
          if (i >= num) {
            dp[i][j] += dp[i - num][j];
          }
        });
      }
    }
  }

  let count = 0;
  let lll = Math.max(0, N - 2);
  for (let i = N; i >= lll; --i) {
    for (let j = 0; j < M; ++j) {
      count += dp[i][j];
    }
  }

  return count;
}

function solution3(M = 2, N = 2, K = 1, L = [2]) {
  let set = new Set(L);

  let dp = Array.from({ length: N + 2 }, () => new Array(M + 1).fill(0));
  dp[0][M] = 1;

  for (let i = 1; i <= N + 1; ++i) {
    for (let j = 1; j <= M; ++j) {
      if (!set.has(i)) {
        dp[i][j] += dp[i - 1][j];
        if (i > 1) {
          dp[i][j] += dp[i - 2][j];
        }
        if (i > 2) {
          dp[i][j] += dp[i - 3][j];
        }
      } else {
        if (j - 1 >= 0) {
          dp[i][j - 1] = dp[i - 1][j];
        }
        if (i > 1 && j - 1 >= 0) {
          dp[i][j - 1] += dp[i - 2][j];
        }
        if (i > 2 && j - 1 >= 0) {
          dp[i][j - 1] += dp[i - 3][j];
        }
      }
    }
  }

  let count = 0;
  for (let i = 0; i <= M; i++) {
    count += dp[N + 1][i];
  }

  return count;
}
