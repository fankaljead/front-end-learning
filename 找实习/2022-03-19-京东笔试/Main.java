
/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-19 20:31:39
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-19 20:42:28
 * @FilePath: \京东-2022-03-19\Main.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int t = in.nextInt();
    int[] L = new int[t];
    int[] R = new int[t];
    int[] P = new int[t];
    int i = 0;
    while (i < t) {
      L[i++] = in.nextInt();
    }
    i = 0;
    while (i < t) {
      R[i++] = in.nextInt();
    }
    i = 0;
    while (i < t) {
      P[i++] = in.nextInt();
    }

    int[] result = new int[t];

    for (int j = 0; j < t; j++) {
      int len = R[j] - L[j];
      int rl = L[j] % P[j];
      if (len + rl >= P[j]) {
        result[j] = P[j] - 1;
      } else {
        result[j] = rl + len;
      }
      // for (int k = L[j]; k <= R[j]; k++) {
      // int temp = k % P[j];
      // if (temp > result[j]) {
      // result[j] = temp;
      // }
      // }
    }
    for (int j = 0; j < t; j++) {
      System.out.print(result[j]);
      System.out.print(" ");
    }
  }
}