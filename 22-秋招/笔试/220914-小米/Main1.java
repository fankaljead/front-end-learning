import java.util.*;

public class Main1 {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    String str = input.nextLine();

    System.out.println(longestCommonPrefix(str.split((" "))));

    input.close();
  }

  public static String longestCommonPrefix(String[] strs) {
    String s = strs[0];
    for (int i = 1; i < strs.length; i++) {
      while (!s.isEmpty() && !strs[i].startsWith(s)) {
        s = s.substring(0, s.length() - 1);
      }
    }
    return s.length() == 0 ? "" : s;
  }
}