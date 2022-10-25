
import java.util.ArrayList;
import java.util.Scanner;


public class Main2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] s = sc.nextLine().split(" ");
        ArrayList<Integer> list = new ArrayList<>();
        int k = Integer.parseInt(s[s.length-1]);
        for (int i = 0; i < s.length-1; i++) {
            list.add(Integer.parseInt(s[i]));
        }
        int res = Integer.MAX_VALUE;
        int count = 0;
        while (true){
            if (list.get(0) > list.get(1)){
                count++;
                if (count == k){
                    res = list.get(0);
                    break;
                }
                int temp = list.get(1);
                list.remove(1);
                list.add(temp);
            }else {
                count=1;
                int temp = list.get(0);
                list.remove(0);
                list.add(temp);
            }
        }
        System.out.println(res);

        sc.close();
    }
}
