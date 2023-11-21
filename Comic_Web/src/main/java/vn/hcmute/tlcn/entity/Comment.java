package vn.hcmute.tlcn.entity;
import javax.persistence.*;


import java.util.Date;
import java.util.List;

@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
    @Column(name = "created_at")
    private Date createAt;
    private String content;
    @OneToMany(mappedBy = "comment",cascade = CascadeType.ALL)
    private List<CommentReport>commentReports;

    public Comment() {
    }

    public Comment(User user, Chapter chapter, Date createAt, String content) {
        this.user = user;
        this.chapter = chapter;
        this.createAt = createAt;
        this.content = content;
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

    public Chapter getChapter() {
        return chapter;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
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
