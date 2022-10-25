import java.util.*;

public class Main2 {
  public static void main(String[] args) {
    // Integer i = 100;
    // i = (++i + i++) / 2;
    // t(i);
    // System.out.println(i);
    // int a = 7, b = 9;
    // float c = a / b;
    // System.out.println(c);

    Point[] ptr;
    // Point A, B;
    // Point C = new Point();
    ptr = new Point[4];
    ptr[0] = new Point();
    // Console.WriteLine(Point.Number);
    System.out.println(Point.Number);
  }

  static void t(Integer i) {
    i++;
  }

  public String mySubString(String str, int start, int end) {
    char[] chars = str.toCharArray();
    List<Character> res = new ArrayList<>();
    for (int i = start; i < end; ++i) {
      res.add(chars[i]);
    }

    return res.toString();
  }
}

class Point {
  public static int Number = 0;

  public Point() {
    Number++;
  }
}