import java.util.*;

public class Main {
  public static void main(String[] args) {
    int[][] queries = { { 1, 100 }, { 2, 100000 }, { 2, 123 }, { 1, 101 }, { 0, 123 }, { 1, 10 }, { 2, 115 },
        { 0, 100 }, { 2, 110 }, { 0, 115 } };
    Main m = new Main();
    int[] res = m.process(queries);
    for (int r : res) {
      System.out.print(r);
    }
  }

  class Node {
    int left;
    int right;

    int getMin() {
      return Math.min(left, right);
    }
  }

  public int[] process(int[][] queries) {
    Map<Integer, Node> map = new HashMap<>();
    List<Integer> res = new ArrayList<>();

    for (int[] query : queries) {
      if (query[0] == 1) {
        Node node = new Node();

        node.left = 0;
        node.right = map.size() + 1;

        plugLR(map, 1, 0);

        map.put(query[1], node);
      } else if (query[0] == 2) {
        Node node = new Node();

        node.left = map.size() + 1;
        node.right = 0;

        plugLR(map, 0, 1);

        map.put(query[1], node);
      } else if (query[0] == 0) {
        Node node = map.get(query[1]);
        
        res.add(node.getMin());
      }
    }

    return res.stream().mapToInt(Integer::valueOf).toArray();
  }

  public void plugLR(Map<Integer, Node> map, int left, int right) {
    for (Integer key : map.keySet()) {
      Node node = map.get(key);
      node.left += left;
      node.right += right;
    }
  }
}