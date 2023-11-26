package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.Wallet;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

public class DonateDTO {
    private String id;
    private WalletDTO donateWallet;
    private WalletDTO receiverWallet;
    private String title;
    private String message;
    private int amount;
    @Column(name = "created_at")
    private Date donateDate;

    public DonateDTO() {
    }

    public DonateDTO(String id, WalletDTO donateWallet, WalletDTO receiverWallet, String title, String message, int amount, Date donateDate) {
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

    public WalletDTO getDonateWallet() {
        return donateWallet;
    }

    public void setDonateWallet(WalletDTO donateWallet) {
        this.donateWallet = donateWallet;
    }

    public WalletDTO getReceiverWallet() {
        return receiverWallet;
    }

    public void setReceiverWallet(WalletDTO receiverWallet) {
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
