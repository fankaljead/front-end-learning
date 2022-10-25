import java.util.*;

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode() {
  }

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  public static TreeNode generateTree(int[] nums, int[] pIndex) {
    TreeNode root = new TreeNode(nums[0]);
    Map<Integer, TreeNode> map = new HashMap<>();
    map.put(0, root);

    for (int i = 1; i < nums.length; i++) {
      int parentIndex = pIndex[i] - 1;

      TreeNode node = new TreeNode(nums[i]);
      if (map.containsKey(parentIndex)) {
        TreeNode parentNode = map.get(parentIndex);
        if (parentNode.left == null) {
          parentNode.left = node;
        } else {
          parentNode.right = node;
        }
      }

      map.put(i, node);
    }


    return root;
  }
}

public class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    int n = input.nextInt();
    int[] nums = new int[n];
    int[] indexs = new int[n];
    for (int i = 0; i < n; i++) {
      nums[i] = input.nextInt();
    }
    for (int i = 0; i < n; i++) {
      indexs[i] = input.nextInt();
    }

    TreeNode root = TreeNode.generateTree(nums, indexs);

    System.out.println(maxPathSum(root));

    input.close();
  }

  private static int ret = Integer.MIN_VALUE;

  public static int maxPathSum(TreeNode root) {
    getMax(root);
    return ret;
  }

  private static int getMax(TreeNode r) {
    if (r == null)
      return 0;
    int left = Math.max(0, getMax(r.left));
    int right = Math.max(0, getMax(r.right));
    ret = Math.max(ret, r.val + left + right);
    return Math.max(left, right) + r.val;
  }
}