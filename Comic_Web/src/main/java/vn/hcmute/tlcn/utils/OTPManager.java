package vn.hcmute.tlcn.utils;

import org.springframework.stereotype.Component;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.OTP;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Component
public class OTPManager {
    public static Map<OTP, User> userTemporary = new HashMap<>();
    public static Map<OTP, Boolean> otpList = new HashMap<>();

    public void removeExpiredOTP() {
        for (OTP o : OTPManager.userTemporary.keySet()) {
            if (o.getExpireTime() < Instant.now().getEpochSecond())
                OTPManager.userTemporary.remove(o);
        }
        for (OTP o : OTPManager.otpList.keySet()) {
            if (o.getExpireTime() < Instant.now().getEpochSecond() && !OTPManager.otpList.get(o))
                OTPManager.otpList.remove(o);
        }
    }
}
