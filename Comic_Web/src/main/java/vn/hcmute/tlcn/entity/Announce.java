package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "announce")
public class Announce {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User user;
    private String content;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "type")
    private String type;
    @Column(name = "isRead")
    private boolean isRead;
    @Column(name="linkTo")
    private String linkTo;

    public Announce() {
    }

    public Announce(String id, User user, String content, Date createdAt, String type, boolean isRead,String linkTo) {
        this.id=id;
        this.user = user;
        this.content = content;
        this.createdAt = createdAt;
        this.type = type;
        this.isRead = isRead;
        this.linkTo=linkTo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public String getLinkTo() {
        return linkTo;
    }

    public void setLinkTo(String linkTo) {
        this.linkTo = linkTo;
    }
}
