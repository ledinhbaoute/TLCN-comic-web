package vn.hcmute.tlcn.primarykey;

import java.io.Serializable;
import java.util.Objects;

public class FavoriteComicKey implements Serializable {
    private String user;
    private String comicBook;

    public FavoriteComicKey(String user, String comicBook) {
        this.user = user;
        this.comicBook = comicBook;
    }

    public FavoriteComicKey() {
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getComicBook() {
        return comicBook;
    }

    public void setComicBook(String comicBook) {
        this.comicBook = comicBook;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user,comicBook);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FavoriteComicKey favoriteComicKey = (FavoriteComicKey) obj;
        return Objects.equals(user, favoriteComicKey.user) &&
                Objects.equals(comicBook, favoriteComicKey.comicBook);
    }
}
