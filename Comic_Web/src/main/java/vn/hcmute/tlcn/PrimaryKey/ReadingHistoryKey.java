package vn.hcmute.tlcn.primarykey;

import java.io.Serializable;
import java.util.Objects;

public class ReadingHistoryKey implements Serializable {
    private String user;
    private String chapter;

    public ReadingHistoryKey() {
    }

    public ReadingHistoryKey(String user, String  chapter) {
        this.user = user;
        this.chapter = chapter;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user,chapter);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ReadingHistoryKey readingHistoryKey = (ReadingHistoryKey) obj;
        return Objects.equals(user, readingHistoryKey.user) &&
                Objects.equals(chapter, readingHistoryKey.chapter);
    }
}
