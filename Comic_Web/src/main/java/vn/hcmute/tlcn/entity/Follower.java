package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import vn.hcmute.tlcn.primarykey.FollowKey;

@Entity
@Table(name = "follow")
@IdClass(FollowKey.class)
public class Follower {
    @Id
    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")

    private User user;

    public Follower() {
    }

    public Follower(User follower, User user) {
        this.follower = follower;
        this.user = user;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
