public class TypeCastingExample {
    public static void main(String[] args) {

        double d = 12.78;
        int i = (int) d;

        System.out.println("Double value: " + d);
        System.out.println("After casting to int: " + i);

        int num = 25;
        double converted = (double) num;

        System.out.println("Integer value: " + num);
        System.out.println("After casting to double: " + converted);
    }
}