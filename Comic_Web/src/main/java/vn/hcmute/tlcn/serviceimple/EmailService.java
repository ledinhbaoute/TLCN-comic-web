package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import vn.hcmute.tlcn.model.OTP;

import java.time.Instant;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    public OTP generateOtp() {
        long EXPIRATION_TIME_MINUTES = 5;
        long currentTime= Instant.now().getEpochSecond();
        long expireTime=currentTime+ TimeUnit.MINUTES.toSeconds(EXPIRATION_TIME_MINUTES);
        TimeUnit.DAYS.toSeconds(1);
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        String otp= String.format("%06d", number);
        return new OTP(otp,expireTime);
    }
    public void sendOtpEmail(String to, String subject,OTP otp) {
        otp.setReceivedMail(to);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText("Here is your OTP (One Time Password) ,valid for 5 minutes: " + otp.getCode());
        javaMailSender.send(message);
    }
    public int verifyOtp(String otpCodeFromUser,String emailUser,OTP otpOriginal){
        int check=0;
        if(otpCodeFromUser.equals(otpOriginal.getCode())
                && emailUser.equals(otpOriginal.getReceivedMail())){
            check=1;
        }
        if(check==1){
            if(otpOriginal.getExpireTime()>Instant.now().getEpochSecond())
                check=2;
        }
        return check;
    }
}
