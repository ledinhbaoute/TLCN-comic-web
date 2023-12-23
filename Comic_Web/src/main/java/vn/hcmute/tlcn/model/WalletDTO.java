package vn.hcmute.tlcn.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

public class WalletDTO {
    private int id;

    private UserDTO user;
    private int balance;
    private Date createdAt ;
    private String bankAccount;
    private String bankName;

    public WalletDTO() {
    }

    public WalletDTO(UserDTO user, int balance,Date createdAt,String bankAccount,String bankName) {
        this.user = user;
        this.balance = balance;
        this.createdAt=createdAt;
        this.bankAccount=bankAccount;
        this.bankName=bankName;
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

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getCreatedAt() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        return formatter.format(createdAt);
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}
