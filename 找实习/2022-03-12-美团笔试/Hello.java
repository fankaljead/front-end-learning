/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-12 13:57:01
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-12 15:51:50
 * @FilePath: \test\Hello.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
class Hello {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    // 随机生成一个数组
    int[] arr = new int[10];
    for (int i = 0; i < arr.length; i++) {
      arr[i] = (int) (Math.random() * 100);
    }
    // 数组排序
    quickSort(arr, 0, arr.length - 1);
    // 打印数组
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
  }

  // N皇后问题
  public static void nQueen(int n) {
    int[] arr = new int[n];
    nQueen(arr, 0);
  }



  // 快速排序
  public static void quickSort(int[] arr, int left, int right) {
    if (left < right) {
      int i = left, j = right;
      int tmp = arr[i];
      while (i < j) {
        while (i < j && arr[j] >= tmp) {
          j--;
        }
        arr[i] = arr[j];
        while (i < j && arr[i] <= tmp) {
          i++;
        }
        arr[j] = arr[i];
      }
      arr[i] = tmp;
      quickSort(arr, left, i - 1);
      quickSort(arr, i + 1, right);
    }
  }

  // kmp
  public static int kmp(String s, String t) {
    int i = 0, j = 0;
    int[] next = getNext(t);
    while (i < s.length() && j < t.length()) {
      if (j == -1 || s.charAt(i) == t.charAt(j)) {
        i++;
        j++;
      } else {
        j = next[j];
      }
    }
    if (j == t.length()) {
      return i - j;
    } else {
      return -1;
    }
  }

  // 获取next数组
  public static int[] getNext(String t) {
    int[] next = new int[t.length()];
    next[0] = -1;
    int i = 0, j = -1;
    while (i < t.length() - 1) {
      if (j == -1 || t.charAt(i) == t.charAt(j)) {
        i++;
        j++;
        next[i] = j;
      } else {
        j = next[j];
      }
    }
    return next;
  }

  // 接雨水
  public static int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int res = 0;
    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          res += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          res += rightMax - height[right];
        }
        right--;
      }
    }
    return res;
  }

  // 解数独

  // 判断是否是回文数
  public static boolean isPalindrome(int x) {
    if (x < 0) {
      return false;
    }
    int res = 0;
    while (x > res) {
      res = res * 10 + x % 10;
      x /= 10;
    }
    return x == res || x == res / 10;
  }

  // 动态规划
  public static int maxProfit(int[] prices) {
    if (prices.length == 0) {
      return 0;
    }
    int[] dp = new int[prices.length];
    dp[0] = 0;
    int min = prices[0];
    for (int i = 1; i < prices.length; i++) {
      min = Math.min(min, prices[i]);
      dp[i] = Math.max(dp[i - 1], prices[i] - min);
    }
    return dp[prices.length - 1];
  }
}

class Apple {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }

// 翻转二叉树
  public static TreeNode invertTree(TreeNode root) {
    if (root == null) {
      return null;
    }
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
  }

  // 判断是否是二叉搜索树
  public static boolean isValidBST(TreeNode root) {
    return isValidBST(root, null, null);
  }

  public static boolean isValidBST(TreeNode root, Integer min, Integer max) {
    if (root == null) {
      return true;
    }
    if (min != null && root.val <= min) {
      return false;
    }
    if (max != null && root.val >= max) {
      return false;
    }
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
  }

  // 判断是否是平衡二叉树
  public static boolean isBalanced(TreeNode root) {
    if (root == null) {
      return true;
    }
    int left = getDepth(root.left);
    int right = getDepth(root.right);
    if (Math.abs(left - right) > 1) {
      return false;
    }
    return isBalanced(root.left) && isBalanced(root.right);
  }

  public static int getDepth(TreeNode root) {
    if (root == null) {
      return 0;
    }
    return Math.max(getDepth(root.left), getDepth(root.right)) + 1;
  }

  // 判断是否是二叉搜索树
  public static boolean isValidBST2(TreeNode root) {
    return isValidBST2(root, null, null);
  }



  // kmp
  public static int kmp(String s, String t) {
    int i = 0, j = 0;
    int[] next = getNext(t);
    while (i < s.length() && j < t.length()) {
      if (j == -1 || s.charAt(i) == t.charAt(j)) {
        i++;
        j++;
      } else {
        j = next[j];
      }
    }
    if (j == t.length()) {
      return i - j;
    } else {
      return -1;
    }
  }
  // getNext
  public static int[] getNext(String t) {
    int[] next = new int[t.length()];
    next[0] = -1;
    int i = 0, j = -1;
    while (i < t.length() - 1) {
      if (j == -1 || t.charAt(i) == t.charAt(j)) {
        i++;
        j++;
        next[i] = j;
      } else {
        j = next[j];
      }
    }
    return next;
  }

  // 四数之和
  public static List<List<Integer>> fourSum(int[] nums, int target) {
    List<List<Integer>> res = new ArrayList<>();
    if (nums.length < 4) {
      return res;
    }
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) {
        continue;
      }
      for (int j = i + 1; j < nums.length - 2; j++) {
        if (j > i + 1 && nums[j] == nums[j - 1]) {
          continue;
        }
        int left = j + 1;
        int right = nums.length - 1;
        while (left < right) {
          int sum = nums[i] + nums[j] + nums[left] + nums[right];
          if (sum == target) {
            res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
            while (left < right && nums[left] == nums[left + 1]) {
              left++;
            }
            while (left < right && nums[right] == nums[right - 1]) {
              right--;
            }
            left++;
            right--;
          } else if (sum < target) {
            left++;
          } else {
            right--;
          }
        }
      }
    }
    return res;
  }

  // 回文数
  public static boolean isPalindrome(int x) {
    if (x < 0) {
      return false;
    }
    int res = 0;
    while (x > res) {
      res = res * 10 + x % 10;
      x /= 10;
    }
    return x == res || x == res / 10;
  }

  // 镜像对称
  public static boolean isSymmetric(TreeNode root) {
    if (root == null) {
      return true;
    }
    return isSymmetric(root.left, root.right);
  }

  // 镜像字符串
  public static boolean isPalindrome(String s) {
    if (s == null || s.length() == 0) {
      return true;
    }
    s = s.toLowerCase();
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
        left++;
      }
      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
        right--;
      }
      if (s.charAt(left) != s.charAt(right)) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  
}