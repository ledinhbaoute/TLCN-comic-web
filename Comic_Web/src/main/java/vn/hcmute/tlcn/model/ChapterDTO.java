package vn.hcmute.tlcn.model;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import vn.hcmute.tlcn.entity.ComicBook;

public class ChapterDTO {
    private String id;
    private String chapterName;

     private ComicBookDTO comicBookDTO;

     private String publishDate;

    private int ordinalNumber;

    public ChapterDTO() {
    }

    public ChapterDTO(String id, String chapterName, ComicBookDTO comicBook_Id, String publishDate, int ordinalNumber) {
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
