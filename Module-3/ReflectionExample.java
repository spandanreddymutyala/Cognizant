import java.lang.reflect.Method;

class Sample {

    public void greet() {
        System.out.println("Hello Reflection");
    }
}

public class ReflectionExample {

    public static void main(String[] args)
            throws Exception {

        Class<?> cls =
                Class.forName("Sample");

        System.out.println("Methods:");

        for (Method m :
                cls.getDeclaredMethods()) {

            System.out.println(m.getName());
        }

        Object obj =
                cls.getDeclaredConstructor()
                        .newInstance();

        Method method =
                cls.getMethod("greet");

        method.invoke(obj);
    }
}