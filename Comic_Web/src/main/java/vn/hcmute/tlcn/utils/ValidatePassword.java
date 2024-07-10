package vn.hcmute.tlcn.utils;

import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.springframework.stereotype.Component;
import vn.hcmute.tlcn.model.ResponseObject;

@Component
public class ValidatePassword {
    private final PasswordValidator passwordValidator;

    public ValidatePassword(PasswordValidator passwordValidator) {
        this.passwordValidator = passwordValidator;
    }
    public ResponseObject checkPasswordValid(String password){
        RuleResult ruleResult=passwordValidator.validate(new PasswordData(password));
        if(ruleResult.isValid())
            return new ResponseObject(true,"Password valid","");
        return new ResponseObject(false,translateMessage(passwordValidator.getMessages(ruleResult).get(0)),"");
    }
    public String translateMessage(String message){
        if(message.contains("8")){
            return ("Mật khẩu phải có ít nhất 8 ký tự!");
        }
        if(message.contains("lowercase")){
            return ("Mật khẩu phải có ít nhất 1 chữ viết thường!");
        }
        if(message.contains("uppercase")){
            return ("Mật khẩu phải có ít nhất 1 chữ viết hoa!");
        }
        if(message.contains("digit")){
            return ("Mật khẩu phải có ít nhất 1 chữ số!");
        }
        if(message.contains("special")){
            return ("Mật khẩu phải có ít nhất 1 ký tự đặc biệt!");
        }
        return "";
    }

}
