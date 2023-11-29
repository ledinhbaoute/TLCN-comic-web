package vn.hcmute.tlcn;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ComicWebApplication {
	public static void main(String[] args) {


		SpringApplication.run(ComicWebApplication.class, args);
	}
}


