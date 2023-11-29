package vn.hcmute.tlcn.entity;

import vn.hcmute.tlcn.primarykey.ReadingHistoryKey;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="history_reading")
@IdClass(ReadingHistoryKey.class)
public class ReadingHistory {
    @Id
    @ManyToOne
    @JoinColumn(name ="user_id")
    private User user;
    @Id
    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
    @Column(name = "reading_time")
    private Date readingTime;

    public ReadingHistory() {
    }

    public ReadingHistory(User user, Chapter chapter, Date readingTime) {
        this.user = user;
        this.chapter = chapter;
        this.readingTime = readingTime;
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

    public Date getReadingTime() {
        return readingTime;
    }

    public void setReadingTime(Date readingTime) {
        this.readingTime = readingTime;
    }
}
