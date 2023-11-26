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
        return new ResponseObject(false,passwordValidator.getMessages(ruleResult).toString(),"");
    }

}
