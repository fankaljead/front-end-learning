import java.util.*;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int k = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }

    solution(n, k, arr);
  }

  static void solution(int n, int k, int[] nums) {
    int count = 0;

    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j <= n; j++) {
        int[] arr = Arrays.copyOfRange(nums, i, j);
        Arrays.sort(arr);
        if (k * arr[0] == arr[arr.length - 1]) {
          count++;
        }
      }
    }

    System.out.println(count);
  }
}