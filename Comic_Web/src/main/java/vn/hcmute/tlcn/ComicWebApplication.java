package vn.hcmute.tlcn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import vn.hcmute.tlcn.serviceimple.ImageStorageService;

import java.util.List;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ComicWebApplication {
	public static void main(String[] args) {


		SpringApplication.run(ComicWebApplication.class, args);
	}
}


