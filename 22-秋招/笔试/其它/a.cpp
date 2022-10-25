#include <stdio.h>
#include <string.h>

typedef struct node
{
  char c;
  int num;
  int child[10];
} triNode;

triNode list[100010];

void newNode(long int t, char ch)
{
  list[t].c = ch;
  list[t].num = 0;
}

int main()
{
  long int m, y;
  scanf("%d", &m);
  for (y = 0; y < m; y++)
  {
    long int num = 0, n, i, j, p, flag = 0;
    char s[11];
    newNode(num, '0');
    scanf("%d", &n);

    for (i = 0; i < n; i++)
    {
      scanf("%s", s);
      if (flag == 0)
      {
        int sLen = strlen(s);

        long int k = 0, flag1 = 0;
        for (j = 0; j < sLen; j++)
        {
          if (k > 0 && list[k].num == 0)
          {
            flag = 1;
            break;
          }

          int flag2 = 0, q = 0;
          for (q = 0; q < list[k].num; q++)
            if (list[list[k].child[q]].c == s[j])
            {
              flag2 = 1;
              break;
            }

          if (flag2 == 0)
          {
            for (p = j; p < sLen; p++)
            {
              list[k].child[list[k].num++] = ++num;
              newNode(num, s[p]);
              k = num;
            }
            flag1 = 1;
            break;
          }
          else
            k = list[k].child[q];
        }

        if (flag1 == 0)
          flag = 1;
        if (flag == 1)
          printf("NO\n");
      }
    }
    if (flag == 0)
      printf("YES\n");
  }
  return 0;
}
