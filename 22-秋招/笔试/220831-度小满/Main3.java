import java.util.Scanner;

public class Main3 {
  private static int index = -3;

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();

    long ans = 0;
    long result = fun(0, n, ans);
    System.out.println(result % 1000000007);

    sc.close();
  }

  public static long fun(int curr, int n, long ans) {
    if (curr == n) {
      return 1;
    }
    if (index + 2 == curr || index + 1 == curr) {
      return 8 * fun(curr + 1, n, ans);
    } else {
      ans = 8 * fun(curr + 1, n, ans);
      index = curr;
      ans += fun(curr + 1, n, ans);
    }
    return ans;
  }
}
