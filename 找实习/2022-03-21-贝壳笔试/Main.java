
/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-21 20:09:34
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-21 20:45:08
 * @FilePath: \2022-03-21-贝壳笔试\Main.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
import java.util.*;

public class Main {
  private static int[][] directions = { { 1, 0 }, { 0, 1 }, { -1, 0 }, { 0, -1 } };

  public static int exist(char[][] board, String word) {
    int count = 0;
    boolean[][] flag = new boolean[board.length][board[0].length];
    // int count=0;
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[0].length; j++) {
        if (dfs(board, i, j, word, 0, flag)) {
          // return true;
          count++;
        }
      }
    }
    // return false;
    return count;
  }

  public static boolean dfs(char[][] board, int i, int j, String word, int index, boolean[][] flag) {
    if (index == word.length()) {
      return true;
    }
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || flag[i][j]
        || board[i][j] != word.charAt(index)) {
      return false;
    }
    flag[i][j] = true;
    for (int[] direction : directions) {
      if (dfs(board, i + direction[0], j + direction[1], word, index + 1, flag)) {
        return true;
      }
    }
    flag[i][j] = false;
    return false;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    String str = sc.next();
    char[][] arr = new char[n][n];
    String[] strs = new String[n];
    for (int i = 0; i < n; i++) {
      strs[i] = sc.next();
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        arr[i][j] = strs[i].charAt(j);
      }
    }
    sc.close();
    System.out.println(exist(arr, str));
  }
}

claas Main2{
  private static int[][] directions = { { 1, 0 }, { 0, 1 } };

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    String str = sc.next();
    char[][] arr = new char[n][n];
    String[] strs = new String[n];
    for (int i = 0; i < n; i++) {
      strs[i] = sc.next();
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        arr[i][j] = strs[i].charAt(j);
      }
    }
    sc.close();

    int count = 0;

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        if (arr[i][j] == str.charAt(0) && dfs(arr, str, 0, i, j)) {
          count++;
        }
      }
    }
  }

  public static boolean dfs(char[][] arr, String str, int index, int i, int j) {
    if (index == str.length()) {
      return true;
    }
    if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length) {
      return false;
    }
    if (arr[i][j] != str.charAt(index)) {
      for (int[] direction : directions) {
        if (dfs(arr, str, index + 1, i + direction[0], j + direction[1])) {
          return true;
        }
      }
    }

    return false;
  }
}