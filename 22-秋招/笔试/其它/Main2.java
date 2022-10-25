// import java.util.*;

public class Main2 {
  public static void main(String[] args) {
    // int maxn = 100010;
    // int cur = 1;
    // char[][] str = new char[maxn][20];
    // int vis[maxn];
  }
}

class Node {
  int num;
  int[] next;

  Node(int num) {
    this.num = num;
    this.next = new int[15];
    for (int i = 0; i < 15; ++i) {
      this.next[i] = -1;
    }
  }
}