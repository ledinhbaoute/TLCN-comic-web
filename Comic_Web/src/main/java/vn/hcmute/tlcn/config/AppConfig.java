package vn.hcmute.tlcn.config;

import org.modelmapper.ModelMapper;
import org.passay.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("quylang0612@gmail.com");
        mailSender.setPassword("nhzgamremlmcavct");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        props.put("mail.smtp.ssl.trust", "*");
        props.put("mail.smtp.ssl.protocols","TLSv1.2");

        return mailSender;
    }
    @Bean
    public PasswordValidator passwordValidator() {
        List<Rule> rules = Arrays.asList(
                new LengthRule(8, 30), // Độ dài từ 8 đến 30 ký tự
                new CharacterRule(EnglishCharacterData.UpperCase, 1), // Ít nhất 1 ký tự viết hoa
                new CharacterRule(EnglishCharacterData.LowerCase, 1), // Ít nhất 1 ký tự viết thường
                new CharacterRule(EnglishCharacterData.Digit, 1), // Ít nhất 1 chữ số
                new CharacterRule(EnglishCharacterData.Special, 1) // Ít nhất 1 ký tự đặc biệt
        );
        return new PasswordValidator(rules);
    }
}
