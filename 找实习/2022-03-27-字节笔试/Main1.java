import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner scanner=new Scanner(System.in);
        int n=scanner.nextInt();
        int m=scanner.nextInt();
        int k=scanner.nextInt();
        int[][] num=new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                num[i][j]=scanner.nextInt();
            }
        }
        int[] res=new int[m];
        int[] p=new int[m];
        for (int i = 0; i < m; i++) {
            res[i]=1;
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (num[i][j]==1){
                    p[i]=j;
                    break;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            int flag=0;
            for (int j = p[i]+1; j < n; j++) {
                if (num[i][j]==0){
                    flag++;
                }else if (num[i][j]==1){
                    if (flag<k){
                        res[i]=0;
                        break;
                    }else {
                        flag=0;
                    }
                }
            }
        }
        for (int i : res) {
            System.out.print(i);
            System.out.print(" ");
        }
    }
}