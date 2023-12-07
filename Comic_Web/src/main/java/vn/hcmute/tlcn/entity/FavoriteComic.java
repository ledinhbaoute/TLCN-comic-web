package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import vn.hcmute.tlcn.primarykey.FavoriteComicKey;

@Entity
@Table(name = "favorite_comic")
@IdClass(FavoriteComicKey.class)
public class FavoriteComic {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Id
    @ManyToOne
    @JoinColumn(name = "comic_id")
    private ComicBook comicBook;

    public FavoriteComic() {
    }

    public FavoriteComic(User user, ComicBook comicBook) {
        this.user = user;
        this.comicBook = comicBook;
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
}
