package vn.hcmute.tlcn.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

public class WalletDTO {
    private int id;

    private UserDTO user;
    private int balance;

    private Date createdAt ;

    public WalletDTO() {
    }

    public WalletDTO(UserDTO user, int balance,Date createdAt) {
        this.user = user;
        this.balance = balance;
        this.createdAt=createdAt;
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
