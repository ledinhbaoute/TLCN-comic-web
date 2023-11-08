package vn.hcmute.tlcn.entity;
import java.time.LocalDateTime;
public class Comment {
    private int id;
    private String user_id;
    private String chapterId;
    private LocalDateTime createAt;
    private String content;

    public Comment() {
    }

    public Comment(int id, String user_id, String chapterId, LocalDateTime createAt, String content) {
        this.id = id;
        this.user_id = user_id;
        this.chapterId = chapterId;
        this.createAt = createAt;
        this.content = content;
    }



    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
