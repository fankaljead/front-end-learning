public class Main {
  public static void main(String[] args) {
    solve(5);
  }

  static void solve(int n) {
    long res = 0, ep = 1;
    for (; Math.pow(2, ep) <= n; ++ep) {
      res += ep * Math.pow(2, ep - 1);
    }
    res += ep * (n - Math.pow(2, ep - 1) + 1);
    System.out.println(res);
  }
}