#include <stdio.h>

int count = 0;
int M, N, K;

int has(int L[], int K, int target)
{
  for (int i = 0; i < K; i++)
  {
    if (L[i] == target)
    {
      return 1;
    }
  }

  return -1;
}

void dfs(int current, int m, int L[])
{
  if (m <= 0)
  {
    return;
  }
  if (m >= 1 && current == N + 1)
  {
    count++;
    return;
  }
  else if (current > N)
  {
    return;
  }

  for (int i = 1; i <= 3; i++)
  {
    if (current + i <= N + 1)
    {
      int des = has(L, K, current + i);
      if (des)
      {
        dfs(current + i, m - 1, L);
      }
      else
      {
        dfs(current + i, m, L);
      }
    }
  }
}

int main()
{
  scanf("%d%d%d", &M, &N, &K);

  int L[K];
  for (int i = 0; i < K; ++i)
  {
    scanf("%d", L + i);
  }

  dfs(0, M, L);
  printf("%d\n", count);

  return 0;
}