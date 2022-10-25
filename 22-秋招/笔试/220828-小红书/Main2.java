import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Main2 {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int n = scanner.nextInt();
    int m = scanner.nextInt();
    int id = scanner.nextInt();
    int[][] arr = new int[n][m];
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        arr[i][j] = scanner.nextInt();
      }
    }
    solution(n, m, id, arr);

    scanner.close();
  }

  public static void solution(int n, int m, int id, int[][] arr) {
    int[][] sn = new int[n][2];
    for (int i = 0; i < n; i++) {
      int total = 0;
      for (int j = 0; j < m; j++) {
        total += arr[i][j];
      }
      sn[i][0] = total;
      sn[i][1] = i + 1;
    }
    Arrays.sort(sn, new Comparator<int[]>() {
      @Override
      public int compare(int[] o1, int[] o2) {
        if (o1[0] != o2[0]) {
          return o2[0] - o1[0];
        } else {
          return o1[1] - o2[1];
        }
      }
    });
    int res = -1;
    for (int i = 0; i < n; i++) {
      if (sn[i][1] == id) {
        res = i + 1;
        break;
      }
    }
    System.out.println(res);
  }
}