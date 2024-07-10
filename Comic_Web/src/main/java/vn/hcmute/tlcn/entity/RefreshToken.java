package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "refreshTokenUser")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user")
    private User user;
    private String token;
    @Column(name = "expire_time")
    private Date expireTime;

    public RefreshToken() {
    }

    public RefreshToken(User user, String token, Date expireTime) {
        this.user = user;
        this.token = token;
        this.expireTime = expireTime;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Date expireTime) {
        this.expireTime = expireTime;
    }
}
