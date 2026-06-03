public class VirtualThreadsExample {

    public static void main(String[] args)
            throws Exception {

        long start = System.currentTimeMillis();

        for (int i = 1; i <= 100000; i++) {

            int id = i;

            Thread.startVirtualThread(() -> {
                System.out.println(
                        "Virtual Thread " + id);
            });
        }

        Thread.sleep(3000);

        long end = System.currentTimeMillis();

        System.out.println(
                "Time Taken: "
                        + (end - start) + " ms");
    }
}