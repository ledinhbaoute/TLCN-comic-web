package vn.hcmute.tlcn.PrimaryKey;

import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.User;

import java.io.Serializable;

public class FavoriteComicKey implements Serializable {
    private User user;
    private ComicBook comicBook;

    public FavoriteComicKey(User user, ComicBook comicBook) {
        this.user = user;
        this.comicBook = comicBook;
    }

    public FavoriteComicKey() {
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
