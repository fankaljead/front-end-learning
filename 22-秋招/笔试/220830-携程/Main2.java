import java.util.Arrays;
import java.util.Scanner;

public class Main2 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int q = Integer.parseInt(in.nextLine());
        for (int i = 0; i < q; i++) {
            int[] num = Arrays.stream(in.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            getScore(num);
        }

        in.close();
    }
    public static void getScore(int[] num) {
        int a = num[0];
        int b = num[1];
        int c = num[2];
        int min = Math.min(a, b);
        min = Math.min(min, c);
        a = a - min; // y
        b = b - min; // o
        c = c - min; // u
        if (b == 0) {
            System.out.println(min*2);
        } else {
            System.out.println(min*2 + b-1);
        }
    }
}