package vn.hcmute.tlcn.primarykey;

import java.io.Serializable;
import java.util.Objects;

public class RatingKey implements Serializable {
    private String user;
    private String comicBook;

    public RatingKey(String userId, String comicId) {
        this.user = userId;
        this.comicBook = comicId;
    }

    public RatingKey() {
    }

    public String getUserId() {
        return user;
    }

    public void setUserId(String userId) {
        this.user = userId;
    }

    public String getComicId() {
        return comicBook;
    }

    public void setComicId(String comicId) {
        this.comicBook = comicId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, comicBook);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingKey ratingId = (RatingKey) o;
        return Objects.equals(user, ratingId.user) &&
                Objects.equals(comicBook, ratingId.comicBook);
    }
}
