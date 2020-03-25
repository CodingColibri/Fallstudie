package Backend.Fallstudie.DB;
import java.sql.*;
import java.util.*;

public class db {
    public static void main (String args[]) {
        try {

            Class.forName("org.mariadb.jdbc.Driver");
            Connection con;
            String url ="jdbc:mysql://localhost/vorlesungsplan";
            con = DriverManager.getConnection(url);
            Statement stmt = con.createStatement();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

    }
}