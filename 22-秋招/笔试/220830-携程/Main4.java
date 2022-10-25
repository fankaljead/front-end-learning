import java.util.Arrays;
import java.util.Scanner;

public class Main4 {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int n = Integer.parseInt(scanner.nextLine());
    n = n + n - n;
    long[] num = Arrays.stream(scanner.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();
    getIndex(num);

    scanner.close();
  }

  public static void getIndex(long[] num) {
    long[] gap = new long[num.length - 1];
    long[] temp = new long[num.length - 1];
    for (int i = 0; i < num.length - 1; i++) {
      gap[i] = Math.abs(num[i + 1] - num[i]);
      temp[i] = gap[i];
    }
    long max = -1;
    int index = -1;
    for (int i = 0; i < gap.length; i++) {
      if (max < gap[i]) {
        max = gap[i];
        index = i;
      }
    }
    long bc = num[index];
    if (index != 0) {
      long sum = Math.abs(num[index - 1] - num[index + 1]);
      num[index] = sum / 2 + num[index - 1];
      gap[index - 1] = Math.abs(num[index] - num[index - 1]);
      gap[index] = Math.abs(num[index + 1] - num[index]);
    } else {
      num[index] = num[index + 1];
      gap[index] = 0;
    }
    long res = -1;
    for (int i = 0; i < gap.length; i++) {
      if (res < gap[i]) {
        res = gap[i];
      }
    }
    num[index] = bc;
    index += 1;

    if (index != num.length - 1) {
      long sum = Math.abs(num[index - 1] - num[index + 1]);
      num[index] = sum / 2 + num[index - 1];
      temp[index - 1] = Math.abs(num[index] - num[index - 1]);
      temp[index] = Math.abs(num[index + 1] - num[index]);
    } else {
      num[index] = num[index - 1];
      temp[index - 1] = 0;
    }
    long res2 = -1;
    for (int i = 0; i < temp.length; i++) {
      if (res2 < temp[i]) {
        res2 = temp[i];
      }
    }
    System.out.println(Math.min(res, res2));
  }
}