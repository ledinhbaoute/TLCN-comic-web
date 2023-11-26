package vn.hcmute.tlcn.model;

import java.util.Date;

public class TransactionDTO {
    private int id;

    private WalletDTO wallet;
    private String title;
    private String content;

    private int type;
    private int amount;

    private Date createdAt;

    public TransactionDTO() {
    }

    public TransactionDTO(int id,WalletDTO wallet, String title, String content, int amount, Date createdAt, int type) {
        this.wallet = wallet;
        this.title = title;
        this.content = content;
        this.amount = amount;
        this.createdAt=createdAt;
        this.type=type;
        this.id=id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }


    public WalletDTO getWallet() {
        return wallet;
    }

    public void setWallet(WalletDTO wallet) {
        this.wallet = wallet;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
