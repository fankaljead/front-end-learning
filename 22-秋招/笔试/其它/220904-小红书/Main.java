class Main {
  static void solution(int[] arr) {
    int min = Integer.MAX_VALUE;
    int index;
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] < 0) {
        if (Math.abs(arr[i] + 7) < min) {
          min = Math.abs(arr[i] + 7);
          index = i;
        }
      } else {
        if (Math.abs(arr[i] - 7) < min) {
          min = Math.abs(arr[i] - 7);
          index = i;
        }
      }
    }

    int sum = min, sign = 1;
    for (int i = 0; i < arr.length; i++) {
      if (i == index) {
        continue;
      }
    }
  }
}