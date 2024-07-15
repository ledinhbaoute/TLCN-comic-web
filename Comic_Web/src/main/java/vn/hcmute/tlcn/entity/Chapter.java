package vn.hcmute.tlcn.entity;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "chapters")
public class Chapter {
    @Id
    private String id;
    @Column(name = "chapter_name")
    private String chapterName;
    @ManyToOne()
    @JoinColumn(name = "comicbook_id")
    private ComicBook comicBook;

    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private List<ChapterImage> chapterImages;

    @OneToMany(mappedBy = "chapter",cascade = CascadeType.ALL)
    private List<Comment>comments;
    @OneToMany(mappedBy = "chapter",cascade = CascadeType.ALL)
    private List<ReadingHistory>readingHistories;
    @OneToMany(mappedBy = "chapter",cascade = CascadeType.ALL)
    private List<BookMark>bookMarks;
    @Column(name = "publish_date")
    private Date publishDate;
    @Column(name = "ordinal_number")
    private int ordinalNumber;
    @Column(name = "public")
    private boolean open;
    @Column(name = "isAccepted")
    private boolean isAccepted;

    public Chapter() {
    }

    public Chapter(String id, String chapterName, ComicBook comicBook_Id, Date publishDate, int ordinalNumber,boolean isAccepted) {
        this.id = id;
        this.chapterName = chapterName;
        this.comicBook = comicBook_Id;
        this.publishDate = publishDate;
        this.ordinalNumber = ordinalNumber;
        this.isAccepted=isAccepted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public ComicBook getComicBook_Id() {
        return comicBook;
    }

    public void setComicBook_Id(ComicBook comicBook_Id) {
        this.comicBook = comicBook_Id;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }
}
