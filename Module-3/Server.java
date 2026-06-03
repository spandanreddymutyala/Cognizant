import java.io.*;
import java.net.*;

public class Server {

    public static void main(String[] args)
            throws Exception {

        ServerSocket serverSocket =
                new ServerSocket(5000);

        System.out.println("Server Started...");

        Socket socket =
                serverSocket.accept();

        BufferedReader in =
                new BufferedReader(
                        new InputStreamReader(
                                socket.getInputStream()));

        PrintWriter out =
                new PrintWriter(
                        socket.getOutputStream(),
                        true);

        String msg = in.readLine();

        System.out.println("Client: " + msg);

        out.println("Hello Client");

        socket.close();
        serverSocket.close();
    }
}