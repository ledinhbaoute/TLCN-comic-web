package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.User;

import java.util.Date;

public class PrivateMessage {
    private String content;
    private User sender;
    private User receiver;
    private Date time;

    public PrivateMessage() {}

    public PrivateMessage(String content, User sender, User receiver) {
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.time=new Date();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
