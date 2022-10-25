#include<stdio.h>
#include<stdlib.h>
int main(){
  fork()||fork();
  printf("hello world\n");
  sleep(1);
  exit(0)
}