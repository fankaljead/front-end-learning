import java.util.*;

public class Main3 {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    int n = input.nextInt();
    double a[] = new double[n];
    int dp[] = new int[n];
    for (int i = 0; i < n; ++i) {
      a[i] = input.nextInt();
    }
    dp[0] = 0;
    for (int i = 1; i < n; i++) {
      if (a[i - 1] >= a[i]) {
        double times = Math.floor(a[i - 1] / a[i]);
        int count = (int) Math.floor(Math.log(times) / Math.log(2)) + 1;
        a[i] *= Math.pow(2, count);
        dp[i] = dp[i - 1] + count;
      } else {
        dp[i] = dp[i - 1];
      }
    }

    System.out.println(dp[n - 1]);

    input.close();
  }
}