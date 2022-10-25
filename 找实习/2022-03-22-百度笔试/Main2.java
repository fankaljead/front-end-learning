import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Scanner;

class Main2 {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    char[] array = scanner.nextLine().toCharArray();
    PriorityQueue<int[]> queue = new PriorityQueue<>(new Comparator<int[]>() {
      @Override
      public int compare(int[] a, int[] b) {
        if (a[0]!=b[0]){
          return b[0]-a[0];
        } else if (a[1]!=b[1]){
          return b[1]-a[1];
        } else {
          return b[1]+b[0]-a[1]-a[0];
        }
      }
    });
    int N = array.length;
    int[][] count0=new int[N+1][N+1];
    int[][] count1=new int[N+1][N+1];
    for (int i = 1; i <= N; i++) {
      for (int j = 1; j <= N; j++) {
        if (array[j-1]=='0'){
          count0[i][j]=count0[i][j-1]+1;
          count1[i][j]=count0[i][j-1];
        } else {
          count0[i][j]=count0[i][j-1];
          count1[i][j]=count1[i][j-1]+1;
        }
        int[] temp = new int[4];
        temp[0]=count0[i][j];
        temp[1]=count1[i][j];
        temp[2]=i;
        temp[3]=j;
        queue.offer(temp);
      }

    }
    int[] pre=queue.poll();
    int[] cur=pre;
    while(!queue.isEmpty()){
      cur=queue.poll();
      if ((pre[0]+pre[1]!=(cur[0]+cur[1]))){
        break;
      }
      pre=cur;
    }
    System.out.println(pre[2]+" "+pre[3]+" "+cur[2]+" "+cur[3]);
  }
}