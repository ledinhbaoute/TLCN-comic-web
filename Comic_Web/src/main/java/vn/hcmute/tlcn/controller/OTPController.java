package vn.hcmute.tlcn.controller;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.OTP;
import vn.hcmute.tlcn.serviceimple.EmailService;

@RestController
@RequestMapping("api/v1/otp")

public class OTPController {
    @Autowired
    private EmailService emailService;
    private OTP otp;
    @PostMapping("/send-otp")
   public ResponseEntity<ResponseObject> sendOtp(@RequestParam("receivedMail") String email) {

        boolean isEmailValid= EmailValidator.getInstance().isValid(email);
        if(!isEmailValid)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,"Email Address Not valid!",""));
        otp = emailService.generateOtp();
        try {
            emailService.sendOtpEmail(email, "OTP Verification",otp);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"OTP sent successfully!",""));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }

    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ResponseObject> verifyOtp(@RequestParam("otp") String otpCode,@RequestParam("email") String email) {
        int check=emailService.verifyOtp(otpCode,email,otp);
        otp.setCode("");
        otp.setReceivedMail("");
        otp.setExpireTime(0);
        if (check==2){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Verify OTP successfully!",""));
        } else if (check==1) {
            return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(new ResponseObject(false,"Otp Expired!",""));
        }
        else return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseObject(false,"Otp Not Valid!",""));
    }
}
