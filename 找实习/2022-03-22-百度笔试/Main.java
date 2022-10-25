import java.util.Scanner;

/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-22 19:49:18
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-22 19:51:29
 * @FilePath: \2022-03-22-百度笔试\Main.java
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int h = sc.nextInt();
    int p = sc.nextInt();
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < h; i++) {
      for (int j = 0; j < h; j++) {
        int cur = sc.nextInt();
        for (int k = 0; k < p; k++) {
          sb.append(cur);
          sb.append(" ");
        }
      }
      for (int j = 0; j < p; j++) {
        System.out.println(sb.toString());
      }
      sb = new StringBuffer();
    }
  }
}