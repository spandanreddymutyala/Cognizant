public class PatternMatchingSwitch {

    static void identify(Object obj) {

        switch (obj) {
            case Integer i ->
                System.out.println("Integer value: " + i);

            case String s ->
                System.out.println("String value: " + s);

            case Double d ->
                System.out.println("Double value: " + d);

            case null ->
                System.out.println("Null value");

            default ->
                System.out.println("Unknown type");
        }
    }

    public static void main(String[] args) {

        identify(100);
        identify("Hello Java");
        identify(99.99);
        identify(null);
    }
}