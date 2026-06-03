import java.net.URI;
import java.net.http.*;
import java.io.IOException;

public class HttpClientExample {

    public static void main(String[] args)
            throws IOException, InterruptedException {

        HttpClient client =
                HttpClient.newHttpClient();

        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(URI.create(
                                "https://api.github.com/users/octocat"))
                        .build();

        HttpResponse<String> response =
                client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString());

        System.out.println("Status Code: "
                + response.statusCode());

        System.out.println(response.body());
    }
}