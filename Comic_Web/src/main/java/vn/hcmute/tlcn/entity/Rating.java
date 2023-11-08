package vn.hcmute.tlcn.entity;

public class Rating {
    private String userId;
    private String chapterId;
    private int score;
    private String comment;

    public Rating() {
    }

    public Rating(String userId, String chapterId, int score, String comment) {
        this.userId = userId;
        this.chapterId = chapterId;
        this.score = score;
        this.comment = comment;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
