package vn.hcmute.tlcn.model;

public class FollowerDTO {
    private  UserDTO follower;
    private UserDTO user;

    public FollowerDTO() {
    }

    public FollowerDTO(UserDTO follower, UserDTO user) {
        this.follower = follower;
        this.user = user;
    }

    public UserDTO getFollower() {
        return follower;
    }

    public void setFollower(UserDTO follower) {
        this.follower = follower;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
