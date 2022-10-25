import java.util.Arrays;
import java.util.Scanner;

public class Main22 {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String[] s1 = scanner.nextLine().split(" ");
    Long n = Long.parseLong(s1[0]);
    Long K = Long.parseLong(s1[1]);
    long[] num = Arrays.stream(scanner.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();
    Long count = 0L;
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        if (num[i] * num[j] >= K) {
          count++;
        }
      }
    }
    System.out.println(count * 2);

    scanner.close();
  }
}