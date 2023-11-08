package vn.hcmute.tlcn.model;

public class OTP {
    private String code;
    private String receivedMail;
    private long expireTime;

    public OTP() {
    }

    public OTP(String code, long expireTime) {
        this.code = code;
        this.expireTime = expireTime;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getReceivedMail() {
        return receivedMail;
    }

    public void setReceivedMail(String receivedMail) {
        this.receivedMail = receivedMail;
    }

    public long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(long expireTime) {
        this.expireTime = expireTime;
    }
}
