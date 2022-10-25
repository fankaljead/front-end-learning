/**
 * Main
 */
public class Main {
  public static void main(String[] args) {
    P x = new Q();
    Q y = new Q();
    P z = new Q();
    x.f(1);
    ((P) y).f(1);
    z.f(1);
  }
}

class P {
  void f(int i) {
    System.out.print(i);
  }

}

class Q extends P {

  void f(int i) {
    System.out.print(2 * i);
  }
}