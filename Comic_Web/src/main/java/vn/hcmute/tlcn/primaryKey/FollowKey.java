package vn.hcmute.tlcn.primarykey;

import java.io.Serializable;
import java.util.Objects;

public class FollowKey implements Serializable {
    private String follower;
    private String user;

    public FollowKey() {
    }

    public FollowKey(String follower, String user) {
        this.follower = follower;
        this.user = user;
    }

    public String getFollower() {
        return follower;
    }

    public void setFollower(String follower) {
        this.follower = follower;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        return Objects.hash(follower,user);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FollowKey followKey = (FollowKey) obj;
        return Objects.equals(user, followKey.user) &&
                Objects.equals(follower, followKey.follower);
    }
}
