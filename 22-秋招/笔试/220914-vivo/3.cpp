#include <iostream>
#include <deque>
#include <vector>
#include <unordered_map>
#include <queue>
#include <unordered_set>
#include <algorithm>
using namespace std;

long long minTime(int n, int a, int b)
{
  vector<long long> dp(n + 1);
  dp[1] = 1;
  for (long long i = 2; i <= n; i++)
  {
    long long ret = 2e18;
    for (long long g = 2; g <= i; g++)
    {
      int k = n / g;
      if (n % g != 0)
        k++;
      ret = min(ret, dp[k] + (long long)n * a + (long long)g * b);
    }
    dp[i] = ret;
  }
  return dp[n];
}
int main()
{
  int n = 22;
  int a = 1, b = 3;
  cout << minTime(n, a, b);
  return 0;
}
