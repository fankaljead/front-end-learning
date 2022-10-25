public class Father {
  public static void main(String[] args) {
    Father father = new Father();
    Child child = new Child();
    try {
      father.test();
      child.test();

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void test() throws RuntimeException {
    System.out.println("father");
  }

  static class Child extends Father {
    @Override
    public void test() {
      System.out.println("child");
    }
  }
}
