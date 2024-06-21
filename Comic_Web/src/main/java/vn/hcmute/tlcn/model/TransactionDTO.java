package vn.hcmute.tlcn.model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TransactionDTO {
    private int id;
    private WalletDTO wallet;
    private String title;
    private String content;
    private int type;
    private int amount;

    private Date createdAt;
    private int balance;

    public TransactionDTO() {
    }

    public TransactionDTO(int id, String title, String content, int amount, Date createdAt, int type,int balance,WalletDTO wallet) {
        this.balance=balance;
        this.title = title;
        this.content = content;
        this.amount = amount;
        this.createdAt=createdAt;
        this.type=type;
        this.id=id;
        this.wallet=wallet;
    }

    public WalletDTO getWallet() {
        return wallet;
    }

    public void setWallet(WalletDTO wallet) {
        this.wallet = wallet;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getCreatedAt() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        return formatter.format(createdAt);
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
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
