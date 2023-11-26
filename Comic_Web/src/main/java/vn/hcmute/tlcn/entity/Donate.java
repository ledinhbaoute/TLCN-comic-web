package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "donate")
public class Donate {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "donater_id")
    private Wallet donateWallet;
    @ManyToOne
    @JoinColumn(name="receiver_id")
    private Wallet receiverWallet;
    private String title;
    private String message;
    private int amount;
    @Column(name = "created_at")
    private Date donateDate;

    public Donate() {
    }

    public Donate(String id, Wallet donateWallet, Wallet receiverWallet, String title, String message, int amount, Date donateDate) {
        this.id = id;
        this.donateWallet = donateWallet;
        this.receiverWallet = receiverWallet;
        this.title = title;
        this.message = message;
        this.amount = amount;
        this.donateDate = donateDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Wallet getDonateWallet() {
        return donateWallet;
    }

    public void setDonateWallet(Wallet donateWallet) {
        this.donateWallet = donateWallet;
    }

    public Wallet getReceiverWallet() {
        return receiverWallet;
    }

    public void setReceiverWallet(Wallet receiverWallet) {
        this.receiverWallet = receiverWallet;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getDonateDate() {
        return donateDate;
    }

    public void setDonateDate(Date donateDate) {
        this.donateDate = donateDate;
    }
}
