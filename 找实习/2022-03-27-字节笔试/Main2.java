import java.util.Scanner;

public class Main2 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int N = in.nextInt();
        int M = in.nextInt();
        int T = in.nextInt();
        int sum = 0;
        int j = 1;
        int t = 0;
        while (sum< N) {
            while (j < M && sum < N) {
                sum+=j;
                j++;
                t++;
            }
            // System.out.println("sum:"+sum+"-t:"+t);
            if (sum >= N) break;
            if (j == M) {
                for (int i = 0; i < T; i++) {
                    sum += M;
                    t++;
                    if (i == T-1 && sum < N) {
                        sum -= M;
                        t--;
                    }
                    if (sum >= N) break;
                }
            }
            // System.out.println("sum:"+sum+"-t:"+t);
            if (sum >= N) {
                break;
            }
            t += 5;
            j = M / 2;
        }
        System.out.println(t);
    }
}