#include <stdio.h>

int main()
{
  int n, m, ans = 0;
  scanf("%d%d", &n, &m);
  int flag[n+1];
  for (int i = 0; i <= n; ++i)
  {
    flag[i] = 1;
  }
  flag[0] = 0;
  for (int i = 0; i < m; ++i)
  {
    int left, right, x;
    scanf("%d%d%d", &left, &right, &x);
    int temp = x;
    for (int j = left; j <= right; ++j)
    {
      if (temp > 0)
      {
        if (flag[j])
        {
          temp--;
        }
      }
      else
      {
        flag[j] = 0;
      }
    }
  }
  for (int i = 0; i <= n; ++i)
  {
    ans += flag[i];
  }
  printf("%d\n", ans);
  return 0;
}