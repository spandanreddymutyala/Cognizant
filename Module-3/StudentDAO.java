import java.sql.*;

public class StudentDAO {

    private static final String URL =
            "jdbc:mysql://localhost:3306/studentdb";
    private static final String USER = "root";
    private static final String PASSWORD = "root";

    public void insertStudent(int id, String name) {

        String sql =
                "INSERT INTO students(id,name) VALUES(?,?)";

        try (Connection con =
                     DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps =
                     con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.setString(2, name);

            ps.executeUpdate();

            System.out.println("Student inserted.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateStudent(int id, String name) {

        String sql =
                "UPDATE students SET name=? WHERE id=?";

        try (Connection con =
                     DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps =
                     con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setInt(2, id);

            ps.executeUpdate();

            System.out.println("Student updated.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

        StudentDAO dao = new StudentDAO();

        dao.insertStudent(101, "Spandan");
        dao.updateStudent(101, "Spandan Reddy");
    }
}