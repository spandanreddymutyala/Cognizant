import java.sql.*;

public class TransactionHandling {

    static final String URL =
            "jdbc:mysql://localhost:3306/bankdb";
    static final String USER = "root";
    static final String PASSWORD = "root";

    public static void transfer(
            int fromId,
            int toId,
            double amount) {

        try (Connection con =
                     DriverManager.getConnection(
                             URL, USER, PASSWORD)) {

            con.setAutoCommit(false);

            PreparedStatement debit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance=balance-? WHERE id=?");

            debit.setDouble(1, amount);
            debit.setInt(2, fromId);
            debit.executeUpdate();

            PreparedStatement credit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance=balance+? WHERE id=?");

            credit.setDouble(1, amount);
            credit.setInt(2, toId);
            credit.executeUpdate();

            con.commit();

            System.out.println("Transfer successful.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        transfer(1, 2, 1000);
    }
}