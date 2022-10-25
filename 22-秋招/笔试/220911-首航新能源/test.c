#include <stdio.h>

#define INT_PTR int *
typedef int *int_ptr;
INT_PTR a, b;
int_ptr c, d;

int func(int x)
{
  int countx = 0;
  while (x)
  {
    countx++;
    x = x & (x - 1);
  }

  return countx;
}

int main()
{
  int k = 8, *p = &k;
  printf("%d\n", *p);
  printf("%d\n", func(65530));
  return 0;
}
