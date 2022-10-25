import java.util.ArrayList;

/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-26 15:26:16
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-26 17:20:50
 * @FilePath: \2022-03-26-网易雷火笔试\Main.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
import java.util.*;

public class Main {
  public List<Integer> getTreasures(int packageSize, int wakeTime, int[][] treasureInfo) {
    List<Integer> res = new ArrayList<>();

    int[][] dp = new int[packageSize + 1][packageSize + 1];
    int distance = 0, time = 0;
    // Arrays.fill(dp, 0);

    for (int i = 1; i < treasureInfo.length; i++) {
      int treasure = treasureInfo[i][0]; // 编号
      int dis = treasureInfo[i][1]; // 距离
      int weight = treasureInfo[i][2]; // 重量
      int value = treasureInfo[i][3]; // 价值

      for (int j = 1; j <= packageSize; j++) {

        if (j >= weight) {
          distance += dis;
          time += 1;
          if (distance * 2 + time >= wakeTime) {
            distance -= dis;
            time -= 1;
            // dp[i] = dp[i - 1];
            continue;
          }
          dp[i][j] = dp[i - 1][j - weight] + value;
          res.add(treasure);
        }
      }
    }
    // for (int i : dp) {
    // System.out.println("dp: " + i);
    // }
    return res;
  }

  public static void main(String[] args) {
    // int wakeTime = 10, packageSize = 6;
    // int[][] treasureInfo = { { 1, 2, 4, 3 }, { 2, 3, 2, 2 }, { 3, 4, 1, 4 } };

    // Main m = new Main();
    // // List<Integer> res = m.getTreasures(packageSize, wakeTime, treasureInfo);

    // // for (Integer r : res) {
    // // System.out.println(r);
    // // }

    // String str = "acbccaacccb";
    // System.out.println(m.t4(str));
    // System.out.println(m.t4("dacbccab"));
    // System.out.println(m.t4("acbccaccbaac"));
    // System.out.println(comb(10, 2));
    // System.out.println(comb(1000, 20));
    long[] nums = { 2, 1, 3, 4 };
    // Arrays.sort(nums);
    // for (long l : nums) {
    // System.out.println(l);
    // }
    System.out.println(t4(nums));

  }

  // 字符串重排
  public int t1(String str) {
    // int res = 0;

    int[] count = new int[26];
    for (int i = 0; i < str.length(); i++) {
      count[str.charAt(i) - 'a']++;
    }
    int a = count[0], b = count[1], c = count[2];

    int t = Math.min(Math.min(a / 2, b / 1), c / 3);

    if (a > 2 && Math.min(b / 2, c / 3) >= 2) {
      t++;
    }

    return t;
  }

  public static long t4(long[] nums) {
    long sum = 0;

    Arrays.sort(nums);

    for (int i = 0; i < nums.length; i += 2) {

      for (int j = i / 2; j < nums.length - i / 2; j++) {
        if (i == 0) {
          sum += nums[j];
        } else {
          sum = sum + (comb(i / 2, j) * comb(i / 2, nums.length - i)) * nums[j];
        }
      }

      System.out.println("sum:" + sum);
    }

    return sum;
  }

  static Map<String, Long> map = new HashMap<String, Long>();

  private static long comb(int m, int n) {
    String key = m + "," + n;
    if (n == 0)
      return 1;
    if (n == 1)
      return m;
    if (n > m / 2)
      return comb(m, m - n);
    if (n > 1) {
      if (!map.containsKey(key))
        map.put(key, comb(m - 1, n - 1) + comb(m - 1, n));
      return map.get(key);
    }
    return -1;
  }

  private static double comb_log(int m, int n) {
    if (n > m - n)
      n = m - n;
    double s1 = 0.0;
    double s2 = 0.0;
    for (int j = m - n + 1; j <= m; j++) {
      s1 += Math.log(j);
    }
    for (int j = 1; j <= n; j++) {
      s2 += Math.log(j);
    }
    return Math.exp(s1 - s2);
  }

}