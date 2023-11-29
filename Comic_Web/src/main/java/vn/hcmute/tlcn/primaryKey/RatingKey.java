package vn.hcmute.tlcn.primaryKey;

import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.User;

import java.io.Serializable;

public class RatingKey implements Serializable {
    private User user;
    private ComicBook comicBook;


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
