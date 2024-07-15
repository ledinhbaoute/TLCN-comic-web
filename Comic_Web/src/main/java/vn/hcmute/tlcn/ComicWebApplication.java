package vn.hcmute.tlcn;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableScheduling
public class ComicWebApplication {
	public static void main(String[] args) {
		SpringApplication.run(ComicWebApplication.class, args);
	}
	@Bean
	public Cloudinary cloudinary(){
	Cloudinary c= new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "dooppr30k",
			"api_key", "856277726967137",
			"api_secret", "N1pj51_8_CNSBRGcGYNbgEFElkc",
			"secure",true));
	return c;
	}
}


