
/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 15:59:57
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 16:09:16
 * @FilePath: \2022-03-27-网易笔试\Main.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int m = scanner.nextInt();
    int n = scanner.nextInt();
    int[][] numbers = new int[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        numbers[i][j] = scanner.nextInt();
      }
    }

    t4(m, n, numbers);
  }

  public static void t4(int m, int n, int[][] numbers) {
    int[][] dp = new int[m][n];
    dp[0][0] = 0;

    for (int i = 1; i < m; i++) {
      if (numbers[i][0] != numbers[i - 1][0]) {
        dp[i][0] = dp[i - 1][0] + 2;
      } else {
        dp[i][0] = dp[i - 1][0] + 1;
      }
    }

    for (int i = 1; i < n; i++) {
      if (numbers[0][i] != numbers[0][i - 1]) {
        dp[0][i] = dp[0][i - 1] + 2;
      } else {
        dp[0][i] = dp[0][i - 1] + 1;
      }
    }

    for (int i = 1; i < m; i++) {
      for (int j = 1; j < n; j++) {
        int p1 = 0, p2 = 0;
        if (numbers[i][j] != numbers[i - 1][j]) {
          p1 = 2;
        } else {
          p1 = 1;
        }
        if (numbers[i][j] != numbers[i][j - 1]) {
          p2 = 2;
        } else {
          p2 = 1;
        }
        dp[i][j] = Math.min(dp[i - 1][j] + p1, dp[i][j - 1] + p2);
      }
    }
    System.out.println(dp[m - 1][n - 1]);
  }
}