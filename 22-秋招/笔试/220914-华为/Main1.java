import java.util.*;

public class Main1 {
  static int count = 0;
  static List<Integer> L = new ArrayList<>();
  static int M, N, K;

  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    M = input.nextInt();
    N = input.nextInt();
    K = input.nextInt();
    for (int i = 0; i < K; ++i) {
      L.add(input.nextInt());
    }
    dfs(0, M);

    System.out.println(count);
    input.close();
  }

  public static void dfs(int current, int m) {
    if (m <= 0) {
      return;
    }
    if (m >= 1 && current == N + 1) {
      count++;
      return;
    } else if (current > N) {
      return;
    }

    for (int i = 1; i <= 3; i++) {
      if (current + i <= N + 1) {
        boolean des = L.contains(current + i);
        if (des) {
          dfs(current + i, m - 1);
        } else {
          dfs(current + i, m);
        }
      }
    }
  }
}