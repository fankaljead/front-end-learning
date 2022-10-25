import java.util.Arrays;
import java.util.Scanner;

public class Main2 {
  static boolean flag = false;
  static int path = 0;

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int T = Integer.parseInt(scanner.nextLine());
    for (int i = 0; i < T; i++) {
      String[] s = scanner.nextLine().split(" ");
      int n = Integer.parseInt(s[0]);
      int m = Integer.parseInt(s[1]);
      int k = Integer.parseInt(s[2]);
      int x = Integer.parseInt(s[3]);
      int[][] num = new int[n][m];
      for (int j = 0; j < n; j++) {
        num[j] = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
      }
      path = num[0][0];
      dfs(num, 0, 0, x);
      path = 0;
      if (flag == true) {
        System.out.println("yes");
        flag = false;
      } else {
        System.out.println("no");
      }
    }
  }

  public static void dfs(int[][] num, int i, int j, int x) {
    if (i == num.length - 1 && j == num[0].length - 1 && path == x) {
      flag = true;
      return;
    }
    if (i + 1 < num.length) {
      path += num[i + 1][j];
      dfs(num, i + 1, j, x);
      path -= num[i + 1][j];
    }
    if (j + 1 < num[0].length) {
      path += num[i][j + 1];
      dfs(num, i, j + 1, x);
      path -= num[i][j + 1];
    }
  }
}