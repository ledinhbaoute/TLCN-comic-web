package vn.hcmute.tlcn.model;

import java.time.LocalDateTime;
import java.util.Date;

public class CommentDTO {

    private int id;

    private UserDTO userDTO;

    private ChapterDTO chapterDTO;

    private Date createAt;
    private String content;

    public CommentDTO() {
    }

    public CommentDTO(UserDTO user, ChapterDTO chapter, Date createAt, String content) {
        this.userDTO = user;
        this.chapterDTO = chapter;
        this.createAt = createAt;
        this.content = content;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public UserDTO getUser() {
        return userDTO;
    }

    public void setUser(UserDTO user) {
        this.userDTO = user;
    }

    public ChapterDTO getChapter() {
        return chapterDTO;
    }

    public void setChapter(ChapterDTO chapter) {
        this.chapterDTO = chapter;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
