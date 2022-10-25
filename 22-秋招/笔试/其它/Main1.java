import java.util.*;

public class Main1 {
  // static Node[] list = new Node[100010];

  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    Node[] list = new Node[100010];
    int m = 0;
    m = input.nextInt();
    for (int y = 0; y < m; ++y) {
      int num = 0;
      int flag = 0;

      list[num] = new Node('0', 0);

      int n = input.nextInt();
      for (int i = 0; i < n; i++) {
        String s = input.nextLine();

        if (flag == 0) {
          int sLen = s.length();

          int k = 0, flag1 = 0;
          for (int j = 0; j < sLen; j++) {
            if (k > 0 && list[k].num == 0) {
              flag = 1;
              break;
            }

            int flag2 = 0, q = 0;
            for (q = 0; q < list[k].num; q++)

              if (flag2 == 0) {
                for (int p = j; p < sLen; p++) {
                  list[k].child[list[k].num++] = ++num;
                  // newNode(num, s.charAt(p));
                  list[num] = new Node(s.charAt(p), 0);
                  k = num;
                }
                flag1 = 1;
                break;
              } else {
                k = list[k].child[q];
              }
          }

          if (flag1 == 0) {
            flag = 1;
          }
          if (flag == 1) {
            System.out.println("NO");
          }
        }
      }
      if (flag == 0) {
        System.out.println("YES");
      }
    }

    input.close();
  }

  static void newNode(int t, char ch) {
    // Node node = new Node(ch, 0);
    // list[t] = node;

  }
}

class Node {
  char c;
  int num;
  int[] child;

  Node(char c, int num) {
    this.c = c;
    this.num = num;
    this.child = new int[10];
  }
}