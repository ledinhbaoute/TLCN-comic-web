package vn.hcmute.tlcn.entity;

import javax.persistence.*;

@Entity
@Table(name = "bookmark")
public class BookMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
    @ManyToOne
    @JoinColumn(name = "chapter")
    private Chapter chapter;
    @Column(name = "current_page")
    private int currentPage;

    public BookMark() {
    }

    public BookMark(User user, Chapter chapter, int currentPage) {
        this.user = user;
        this.chapter = chapter;
        this.currentPage = currentPage;
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

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
