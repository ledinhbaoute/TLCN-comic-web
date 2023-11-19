package vn.hcmute.tlcn.model;

import java.util.Date;

public class ChapterDTO {
    private String id;
    private String chapterName;
     private ComicBookDTO comicBookDTO;

     private Date publishDate;

    private int ordinalNumber;

    public ChapterDTO() {
    }

    public ChapterDTO(String id, String chapterName, ComicBookDTO comicBook_Id, Date publishDate, int ordinalNumber) {
        this.id = id;
        this.chapterName = chapterName;
        this.comicBookDTO = comicBook_Id;
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

    public ComicBookDTO getComicBook_Id() {
        return comicBookDTO;
    }

    public void setComicBook_Id(ComicBookDTO comicBook_Id) {
        this.comicBookDTO = comicBook_Id;
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
