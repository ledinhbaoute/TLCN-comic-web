package vn.hcmute.tlcn.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chapters")
public class Chapter {
    @Id
    private String id;
    @Column(name = "chapter_name")
    private String chapterName;

   @ManyToOne
   @JoinColumn(name="comicbook_id")
    private ComicBook comicBook;

    @Column(name = "publish_date")
    private String publishDate;
    @Column(name = "ordinal_number")
    private int ordinalNumber;

    public Chapter() {
    }

    public Chapter(String id, String chapterName, ComicBook comicBook_Id, String publishDate, int ordinalNumber) {
        this.id = id;
        this.chapterName = chapterName;
        this.comicBook = comicBook_Id;
        this.publishDate = publishDate;
        this.ordinalNumber = ordinalNumber;
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

    public ComicBook getComicBook_Id() {
        return comicBook;
    }

    public void setComicBook_Id(ComicBook comicBook_Id) {
        this.comicBook = comicBook_Id;
    }

    public String getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }
}
