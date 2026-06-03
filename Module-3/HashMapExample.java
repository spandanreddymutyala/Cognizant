import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        HashMap<Integer, String> map = new HashMap<>();

        System.out.print("How many students? ");
        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            System.out.print("Enter ID: ");
            int id = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter Name: ");
            String name = sc.nextLine();

            map.put(id, name);
        }

        System.out.print("\nEnter ID to search: ");
        int searchId = sc.nextInt();

        if (map.containsKey(searchId))
            System.out.println("Name: " + map.get(searchId));
        else
            System.out.println("ID not found.");

        sc.close();
    }
}