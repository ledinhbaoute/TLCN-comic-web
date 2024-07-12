package vn.hcmute.tlcn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class InvalidToken {
    @Id
    private String id;
    @Column(name = "expire_time")
    private Date expireTime;

    public InvalidToken() {
    }

    public InvalidToken(String id, Date expireTime) {
        this.id = id;
        this.expireTime = expireTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Date expireTime) {
        this.expireTime = expireTime;
    }
}
