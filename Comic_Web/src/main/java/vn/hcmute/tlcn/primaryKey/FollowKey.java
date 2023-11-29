package vn.hcmute.tlcn.primaryKey;

import vn.hcmute.tlcn.entity.User;

import java.io.Serializable;

public class FollowKey implements Serializable {
    private User follower;
    private User user;

    public FollowKey() {
    }

    public FollowKey(User follower, User user) {
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
