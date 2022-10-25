// int main(int argc, char const *argv[])
// {
//   const int &ra;
//   extern const int arr[256];
//   typedef void (*FUN)();
//   return 0;
// }
#include <iostream>
class A
{
public:
  A() { std::cout << "A"; }
};
class C : public A
{
public:
  C() { std::cout << "C"; }
};

int main()
{
  C obj;
  return 0;
}