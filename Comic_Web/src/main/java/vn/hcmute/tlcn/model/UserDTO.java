package vn.hcmute.tlcn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDTO {
    private String id;
    private String name;
    private String avatar;
    private String email;

    private String phoneNumber;

    private String userName;
    @JsonIgnore
    private String password;
    private String bankAccount;

    private String bankName;
    private boolean isLocked;
    public UserDTO() {
    }

    public UserDTO(String id, String name, String avatar,  String email, String phoneNumber, String userName, String password, String bankAccount, String bankName, boolean isLocked) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;

        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.bankAccount = bankAccount;
        this.bankName = bankName;
        this.isLocked=isLocked;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public boolean isLocked() {
        return isLocked;
    }

    public void setLocked(boolean locked) {
        isLocked = locked;
    }
}
