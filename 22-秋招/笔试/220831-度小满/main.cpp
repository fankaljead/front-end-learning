class Solution

{

public:
  int getMoneyAmount(int n)

  {

    int dp[n + 1][n + 1];

    memset(dp, 0x3f, sizeof dp);

    for (int i = 0; i <= n; i++)

      dp[i][i] = 0;

    for (int i = n - 1; i >= 1; i--)

    {

      for (int j = i + 1; j <= n; j++)

      {

        for (int k = i; k <= j; k++)

        {

          dp[i][j] = min(dp[i][j], k +

                                       max(i > k - 1 ? 0 : dp[i][k - 1],

                                           k + 1 > j ? 0 : dp[k + 1][j]));
        }
      }
    }

    return dp[1][n];
  }
};