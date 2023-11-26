package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="wallets")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private int balance;
    @Column(name = "created_at")
    private Date createdAt ;

    public Wallet() {
    }

    public Wallet(User user, int balance,Date createdAt) {
        this.user = user;
        this.balance = balance;
        this.createdAt=createdAt;
    }

    public int getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}
