package vn.hcmute.tlcn.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","http://localhost:3030") // Các domain cho phép truy cập (hoặc "*")
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức HTTP được phép
                .allowedHeaders("*") // Các header được phép
                .allowCredentials(true) // Cho phép gửi cookie
                .maxAge(3600); // Thời gian lưu cache CORS (tính bằng giây)
    }
}
