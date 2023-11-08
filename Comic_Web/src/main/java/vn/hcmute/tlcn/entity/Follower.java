package vn.hcmute.tlcn.entity;

public class Follower {
    private int followerId;
    private int userID;

    public Follower() {
    }

    public Follower(int followerId, int userID) {
        this.followerId = followerId;
        this.userID = userID;
    }

    public int getFollowerId() {
        return followerId;
    }

    public void setFollowerId(int followerId) {
        this.followerId = followerId;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
