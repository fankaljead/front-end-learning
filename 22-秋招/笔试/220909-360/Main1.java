import java.util.Arrays;
import java.util.Scanner;

public class Main1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[] s = scanner.nextLine().split(" ");
        int N = Integer.parseInt(s[0]);
        N = N + N - N;
        int M = Integer.parseInt(s[1]);
        int[] num = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int[][] option = new int[M][2];
        for (int i = 0; i < M; i++) {
            option[i] = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        }
        for (int i = 0; i < M; i++) {
            if (option[i][0] == 0) { // up
                upSort(num, option[i][1]);
            } else { // down
                downSort(num, option[i][1]);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < num.length; i++) {
            sb.append(num[i]);
            if (i != num.length - 1) {
                sb.append(" ");
            }
        }
        System.out.println(sb.toString());

        scanner.close();
    }

    public static void upSort(int[] num, int x) {
        int[] temp = new int[x];
        for (int i = 0; i < x; i++) {
            temp[i] = num[i];
        }
        Arrays.sort(temp);
        for (int i = 0; i < x; i++) {
            num[i] = temp[i];
        }
    }

    public static void downSort(int[] num, int x) {
        int[] temp = new int[x];
        for (int i = 0; i < x; i++) {
            temp[i] = num[i];
        }
        Arrays.sort(temp);
        int j = 0;
        for (int i = x - 1; i >= 0; i--) {
            num[j++] = temp[i];
        }
    }
}
