package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import vn.hcmute.tlcn.primarykey.RatingKey;

@Entity
@Table(name="ratings")
@IdClass(RatingKey.class)
public class Rating {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Id
    @ManyToOne
    @JoinColumn(name ="comic_id" )
    private ComicBook comicBook;
    private int score;
    private String comment;

    public Rating() {
    }

    public Rating(User user, ComicBook comicBook, int score, String comment) {
        this.user = user;
        this.comicBook = comicBook;
        this.score = score;
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ComicBook getComicBook() {
        return comicBook;
    }

    public void setComicBook(ComicBook comicBook) {
        this.comicBook = comicBook;
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
